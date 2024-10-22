from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
from symspellpy.symspellpy import SymSpell, Verbosity
from flask_cors import CORS
import os
import json

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the pre-trained Sentence-BERT model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Load FAQs from the faqs.json file
faq_file_path = os.path.join(os.path.dirname(__file__), 'faqs.json')
with open(faq_file_path, 'r') as file:
    faq_list = json.load(file)

# Encode the FAQ questions using Sentence-BERT
faq_questions = [faq['question'] for faq in faq_list]
faq_embeddings = model.encode(faq_questions)

# Initialize SymSpell for spell correction
max_edit_distance_dictionary = 2
prefix_length = 7
sym_spell = SymSpell(max_edit_distance_dictionary, prefix_length)

# Load the frequency dictionary
dictionary_path = os.path.join(os.path.dirname(__file__), "frequency_dictionary_en_82_765.txt")
sym_spell.load_dictionary(dictionary_path, 0, 1)

def spell_correct(query):
    """
    Perform spell check and return the corrected query using SymSpell.
    """
    corrected_query = []
    for word in query.split():
        suggestions = sym_spell.lookup(word, Verbosity.CLOSEST, max_edit_distance=2)
        if suggestions:
            corrected_query.append(suggestions[0].term)  # Choose the best suggestion
        else:
            corrected_query.append(word)  # Keep the original word if no suggestions
    return " ".join(corrected_query)

@app.route('/search', methods=['POST'])
def search_faq():
    try:
        data = request.json
        query = data.get('query', '')

        # Check if query is empty
        if not query:
            return jsonify({"error": "Query is required"}), 400

        # Step 1: Perform spell check based on FAQ context
        corrected_query = spell_correct(query)

        # Step 2: Encode the user's query (whether corrected or original)
        query_embedding = model.encode([corrected_query])

        # Step 3: Compute cosine similarities between the query and FAQ embeddings
        cosine_scores = util.pytorch_cos_sim(query_embedding, faq_embeddings)[0]

        # Step 4: Sort the FAQ results by similarity score (descending order)
        top_indices = cosine_scores.argsort(descending=True)

        # Step 5: Limit the results to the top 5 (if available)
        max_results = min(5, len(faq_list))
        relevant_faqs = []
        for i in range(max_results):
            faq_index = top_indices[i].item()
            faq_data = {
                "question": faq_list[faq_index]['question'],
                "answer": faq_list[faq_index]['answer'],
                "similarity_score": cosine_scores[faq_index].item()
            }
            relevant_faqs.append(faq_data)

        # Return the most relevant FAQs as JSON
        response = {
            "corrected_query": corrected_query,
            "faqs": relevant_faqs
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
