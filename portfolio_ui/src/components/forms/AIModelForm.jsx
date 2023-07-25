import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const dataTypes = [
  { value: 'MODEL', label: 'Model' },
  { value: 'DATASET', label: 'Dataset' },
  { value: 'CODE', label: 'Code' },
];

const AIModelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    data: null,
    data_type: '',
    metadata: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, data: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create a form data object to send the file and other fields
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('data', formData.data);
    data.append('data_type', formData.data_type);
    data.append('metadata', formData.metadata);

    try {
      // make a post request to the api
      const response = await axios.post('/api/aimodels/', data);
      console.log(response.data);
      // handle success as needed
    } catch (error) {
      console.error(error.response.data);
      // handle error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        variant="outlined"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        variant="outlined"
        multiline
        rows={4}
      />
      <TextField
        label="Data"
        type="file"
        name="data"
        accept=".zip,.tar,.gz,.h5,.pt,.pkl,.csv,.json,.txt"
        onChange={handleFileChange}
        required
        variant="outlined"
      />
      <FormControl variant="outlined">
        <InputLabel id="data-type-label">Data Type</InputLabel>
        <Select
          labelId="data-type-label"
          label="Data Type"
          name="data_type"
          value={formData.data_type}
          onChange={handleChange}
          required
        >
          {dataTypes.map((dataType) => (
            <MenuItem key={dataType.value} value={dataType.value}>
              {dataType.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Metadata"
        name="metadata"
        value={formData.metadata}
        onChange={handleChange}
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AIModelForm;