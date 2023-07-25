import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Chip, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import CloseIcon from "@mui/icons-material/Close";

const skills = [
  { id: 1, name: 'Python' },
  { id: 2, name: 'Django' },
  { id: 3, name: 'React' },
  { id: 4, name: 'JavaScript' },
  // add more skills as needed
];

const ProjectForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    description: '',
    skills: [],
    link: '',
    metadata: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSkillChange = (e) => {
    const skillIds = e.target.value;
    setFormData((prev) => ({ ...prev, skills: skillIds }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create a form data object to send the file and other fields
    const data = new FormData();
    data.append('name', formData.name);
    data.append('image', formData.image);
    data.append('description', formData.description);
    data.append('skills', formData.skills.join(','));
    data.append('link', formData.link);
    data.append('metadata', formData.metadata);

    try {
      // make a post request to the api
      const response = await axios.post('/api/projects/', data);
      console.log(response.data);
      // handle success as needed
    } catch (error) {
      console.error(error.response.data);
      // handle error as needed
    }
  };

  return (<>
    {props.isPopup?<CloseIcon
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
          onClick={props.close}
        />:null}
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
        label="Image"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        required
        variant="outlined"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        variant="outlined"
        multiline
        rows={4}
      />
      <FormControl variant="outlined">
        <InputLabel id="skills-label">Skills</InputLabel>
        <Select
          labelId="skills-label"
          label="Skills"
          name="skills"
          value={formData.skills}
          onChange={handleSkillChange}
          required
          multiple
          renderValue={(selected) =>
            selected.map((id) => (
              <Chip key={id} label={skills.find((s) => s.id === id).name} />
            ))
          }
        >
          {skills.map((skill) => (
            <MenuItem key={skill.id} value={skill.id}>
              {skill.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Link"
        name="link"
        value={formData.link}
        onChange={handleChange}
        variant="outlined"
      />
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
    </form></>
  );
};

export default ProjectForm;