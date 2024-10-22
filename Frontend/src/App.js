// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';  // Import the CSS file

// function App() {
//   const [query, setQuery] = useState('');
//   const [correctedQuery, setCorrectedQuery] = useState('');
//   const [faq, setFaq] = useState(null);
//   const [error, setError] = useState('');


//   const handleSearch = async () => {
//     try {
//       // Make a POST request to the Flask backend
//       const response = await axios.post('http://localhost:5000/search', {
//         query: query,
//       });
      
//       // If there’s an error in the backend response
//       if (response.data.error) {
//         setError(response.data.error);
//         setFaq(null);
//         setCorrectedQuery('');
//       } else {
//         setCorrectedQuery(response.data.corrected_query);
//         setFaq(response.data.faq);
//         setError('');
//       }
//     } catch (err) {
//       setError('An error occurred while fetching the data.');
//       setFaq(null);
//       setCorrectedQuery('');
//     }
//   };

//   // Function to handle key down (Enter key)
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="App">
//       <h1>FAQ Search</h1>
      
//       {/* Input for user to type their query */}
//       <input 
//         type="text" 
//         placeholder="Enter your query..." 
//         value={query} 
//         onChange={(e) => setQuery(e.target.value)} 
//         onKeyDown={handleKeyDown}  // Listen for "Enter" key down
//       />
      
//       <button onClick={handleSearch}>Search</button>

//       {/* Display error if any */}
//       {error && <p className="error">{error}</p>}
      
//       {/* Display corrected query */}
//       {/* {correctedQuery && (
//         <p><strong>Corrected Query:</strong> {correctedQuery}</p>
//       )} */}

//       {/* Display the most relevant FAQ */}
//       {faq && (
//         <div className="result-container">
//           <p><strong>Question:</strong> {faq.question}</p>
//           <p><strong>Answer:</strong> {faq.answer}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

function App() {
  const [query, setQuery] = useState('');
  // const [correctedQuery, setCorrectedQuery] = useState('');
  const [faqs, setFaqs] = useState([]);  // Updated to handle multiple FAQs
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      // Make a POST request to the Flask backend
      const response = await axios.post('http://localhost:5000/search', {
        query: query,
      });
      
      // If there’s an error in the backend response
      if (response.data.error) {
        setError(response.data.error);
        setFaqs([]);  // Clear the FAQ list in case of error
        // setCorrectedQuery('');
      } else {
        // setCorrectedQuery(response.data.corrected_query);
        setFaqs(response.data.faqs);  // Set the list of FAQs
        setError('');
      }
    } catch (err) {
      setError('An error occurred while fetching the data.');
      setFaqs([]);  // Clear FAQs in case of error
      // setCorrectedQuery('');
    }
  };

  // Function to handle key down (Enter key)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <h1>FAQ Search</h1>
      
      {/* Input for user to type their query */}
      <input 
        type="text" 
        placeholder="Enter your query..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        onKeyDown={handleKeyDown}  // Listen for "Enter" key down
      />
      
      <button onClick={handleSearch}>Search</button>

      {/* Display error if any */}
      {error && <p className="error">{error}</p>}


      {/* Display multiple relevant FAQs */}
      {faqs.length > 0 && (
        <div className="result-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <p><strong>Question:</strong> {faq.question}</p>
              <p><strong>Answer:</strong> {faq.answer}</p>
              <p><em>Similarity Score:</em> {faq.similarity_score.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
