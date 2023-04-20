import React, { useState } from 'react';
import UrlInput from './Input';

function App() {
  const [text, setText] = useState('');

  const handleSubmit = async (urls) => {
    // Call the Azure OCR API to extract text from each image URL here
    // and set the extracted text in the state using setText
    const res = await fetch("https://warehouse-part-2.azurewebsites.net/api/HttpTrigger1?code=XxfnqFjp657yzp5k4Ppvkve1Aoucgyl53WW-2awsrtjrAzFuUqlm1w==", {
      method: "POST",
      body: JSON.stringify(urls),
    });
    setText(urls);
    console.log(urls);
  };

  return (
    <div>
      <UrlInput onSubmit={handleSubmit} />
      <p>Extracted text: {text}</p>
    </div>
  );
}

export default App;
