import React, { useState } from 'react';
import ImageInput from './Input';

function App() {
  const [text, setText] = useState('');

  const handleSubmit = (urls) => {
    // Call the Azure OCR API to extract text from each image URL here
    // and set the extracted text in the state using setText
  };

  return (
    <div>
      <ImageInput onSubmit={handleSubmit} />
      <p>Extracted text: {text}</p>
    </div>
  );
}

export default App;
