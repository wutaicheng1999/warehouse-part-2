import React, { useState } from 'react';
import UrlInput from './Input';

function App() {
  const [text, setText] = useState([]);

  const handleSubmit = async (urls) => {
    await fetch("https://warehouse-part-2.azurewebsites.net/api/HttpTrigger1?code=XxfnqFjp657yzp5k4Ppvkve1Aoucgyl53WW-2awsrtjrAzFuUqlm1w==", {
      method: "POST",
      body: JSON.stringify(urls),
    });
    setText(urls);
    console.log(urls);
  };

  return (
    <div>
      <UrlInput onSubmit={handleSubmit} />
      <p>Uploaded URLs:</p>
      <p>{text.map((str, index) => (
        <p key={index}>{str}</p>
      ))}</p>
    </div>
  );
}

export default App;
