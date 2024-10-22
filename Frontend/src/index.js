import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // You can create an index.css for any global styles you may need
import App from './App';  // Importing the main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Render the App component inside the 'root' div in the HTML
);
