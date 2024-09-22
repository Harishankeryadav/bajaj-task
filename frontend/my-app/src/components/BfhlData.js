import React, { useState } from 'react';

const BfhlData = () => {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('http://localhost:5000/bfhl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    });
    const result = await res.json();
    setResponse(result);
  };

  return (
    <div>
      <h1>BFHL Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value.split(','))}
          placeholder="Enter data separated by commas"
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BfhlData;
