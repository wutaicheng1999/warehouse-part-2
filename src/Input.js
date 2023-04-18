import React, { useState } from 'react';

function ImageInput(props) {
  const [urls, setUrls] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(urls);
  };

  const handleUrlChange = (event, index) => {
    const newUrls = [...urls];
    newUrls[index] = event.target.value;
    setUrls(newUrls);
  };

  const addUrl = () => {
    setUrls([...urls, '']);
  };

  return (
    <form onSubmit={handleSubmit}>
      {urls.map((url, index) => (
        <div key={index}>
          <label>
            Image URL #{index + 1}:
            <input
              type="text"
              value={url}
              onChange={(event) => handleUrlChange(event, index)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={addUrl}>Add another image URL</button>
      <button type="submit">Extract Text</button>
    </form>
  );
}

export default ImageInput;
