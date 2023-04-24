import React, { useState } from 'react';
import { TextField, Button, IconButton, Box } from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';


function UrlInput(props) {
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

  const deleteUrl = (index) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {urls.map((url, index) => (
        <Box key={index} display="flex" alignItems="center">
          <TextField
            label={`Image URL #${index + 1}`}
            value={url}
            onChange={(event) => handleUrlChange(event, index)}
          />
          <IconButton onClick={() => deleteUrl(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={addUrl} startIcon={<AddIcon />}>
        Add another image URL
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Extract Text From Images
      </Button>
    </Box>
  );
}

export default UrlInput;
