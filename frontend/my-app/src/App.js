
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [jsonInput, setJsonInput] = useState('{"data": ["M", "1", "334", "4", "B", "Z", "a"], "file_b64": "BASE_64_STRING"}');
//     const [responseData, setResponseData] = useState(null);
//     const [error, setError] = useState('');

//     const handleSubmit = async () => {
//         try { 
//             const parsedInput = JSON.parse(jsonInput);  
 
//             if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
//                 throw new Error('Data must be an array.');
//             }
//             if (typeof parsedInput.file_b64 !== 'string') {
//                 throw new Error('File_b64 must be a string.');
//             }

//             const response = await axios.post('https://bajaj-task-smoky-rho.vercel.app/bfhl', parsedInput);
//             setResponseData(response.data);
//             setError('');  
//         } catch (err) {
//             console.error('Error making API call:', err);
//             setError('Invalid JSON input: ' + err.message);  
//         }
//     };

//     return (
//         <div>
//             <h1>Your Roll Number</h1>
//             <textarea 
//                 value={jsonInput} 
//                 onChange={(e) => setJsonInput(e.target.value)} 
//                 placeholder='Enter JSON here' 
//                 rows="10"
//                 cols="50"
//             />
//             <button onClick={handleSubmit}>Submit</button>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {responseData && (
//                 <div>
//                     <h2>Response:</h2>
//                     <pre>{JSON.stringify(responseData, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [operationCode, setOperationCode] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // On page load, fetch the /bfhl data
        const fetchOperationCode = async () => {
            try {
                const response = await axios.get('https://bajaj-task-smoky-rho.vercel.app/bfhl'); // Make sure this URL points to your deployed backend
                setOperationCode(response.data.operation_code);
            } catch (err) {
                setError('Error fetching operation code: ' + err.message);
            }
        };

        fetchOperationCode();
    }, []); // Only run once when the component mounts

    return (
        <div>
            <h1>Your Roll Number</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {operationCode !== null ? (
                <p>Operation Code: {operationCode}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;
