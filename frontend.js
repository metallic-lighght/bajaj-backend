import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [operationCode, setOperationCode] = useState(null);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post('http://127.0.0.1:5000/bfhl', parsedInput);
      setResponseData(response.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or API error. Please check your input.');
      setResponseData(null);
    }
  };

  const handleGetOperationCode = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/bfhl');
      setOperationCode(response.data.operation_code);
      setError('');
    } catch (err) {
      setError('Error fetching operation code.');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!responseData) return null;
    let filteredData = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }
    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <textarea 
        value={jsonInput} 
        onChange={handleJsonChange} 
        placeholder="Enter your JSON here" 
        rows="10" 
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseData && (
        <>
          <label>Select data to display:</label>
          <select multiple={true} onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </>
      )}
      {renderResponse()}
      <br />
      <button onClick={handleGetOperationCode}>Get Operation Code</button>
      {operationCode && (
        <div>
          <h3>Operation Code:</h3>
          <p>{operationCode}</p>
        </div>
      )}
    </div>
  );
}
export default App;