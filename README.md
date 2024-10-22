# FAQ Search System with Spell Correction and Contextual Matching

## Project Overview

This is a full-stack FAQ search system that uses **Sentence-BERT** for context-aware FAQ retrieval and **SymSpell** for spell correction. The project is built with a **React frontend** and a **Flask backend**. Users can input queries, and the system will return the most relevant FAQs based on semantic similarity, while also correcting spelling mistakes in the input query.

### Key Features:
- **Contextual FAQ Search**: Uses Sentence-BERT to understand and retrieve semantically similar FAQs.
- **Spell Correction**: Utilizes SymSpell to correct spelling errors before processing the query.
- **Flexible Architecture**: Designed for easy integration into real websites.
- **Frontend**: Built using React for a seamless user experience.
- **Backend**: Powered by Flask for handling API requests and processing search queries.

---

## Project Structure

project-root/  
│  
├── Backend/ # Flask backend  
│     ├── app.py # Main Flask app  
│     ├── requirements.txt # Backend dependencies  
│     ├── faqs.json # FAQs dataset  
│     └── frequency_dictionary_en_82_765.txt # SymSpell dictionary file  
│  
├── Frontend/ # React frontend  
│     ├── public/  
│     ├── src/  
│     │   ├── App.js # Main React component  
│     │   ├── App.css # Styles for the frontend  
│     ├── package.json # Frontend dependencies  
│     └── README.md # Project documentation 


---

## Prerequisites

### Backend (Flask)
- Python 3.x
- `virtualenv` for creating a virtual environment

### Frontend (React)
- Node.js (with npm or yarn)

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Shivam-Gujjar-Boy/SARCathon2024.git
cd SARCathon2024
```
### 2. Navigate to the backend folder  

```bash
cd Backend
```

### 3. Create and activate a virtual environment  

```bash
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
```

### 4. Install the required dependencies  

```bash
pip install -r requirements.txt
```

### 5. Run the Flask Backend

```bash
python app.py
```


