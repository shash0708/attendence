import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://bjp-suru.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;
