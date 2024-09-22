
import React, { useState } from "react";
import JSONInput from "./JSONInput";
import ResponseDisplay from "./ResponseDisplay";
import "./App.css";

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // const handleSubmit = async data => {
  //   setJsonData(data);
  //   try {
  //     const response = await fetch(
  //       "https://bajaj-task-smoky-rho.vercel.app/bfhl",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(data),
  //       }
  //     );
  //     const result = await response.json();
  //     setResponse(result);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setResponse({ error: "Failed to fetch data from the API." });
  //   }
  // };
  const handleSubmit = async (data) => {
  try {
    const response = await fetch("https://bajaj-task-smoky-rho.vercel.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),  // Ensure data structure is correct
    });
    const result = await response.json();
    setResponse(result);
  } catch (error) {
    setResponse({ error: "Failed to fetch data from the API." });
  }
};


  return (
    <div className="App">
      <h1>ABCD123</h1>
      <JSONInput onSubmit={handleSubmit} />
      <ResponseDisplay
        response={response}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
};

export default App;
