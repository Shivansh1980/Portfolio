import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Select,
  Checkbox,
  Input,
  Grid
} from "@mui/material";

import Api from "../../Api";

// Define a custom component for each AI model card
function AIModelCard(props) {
  // Use state hooks to store the model metadata and prediction
  const [metadata, setMetadata] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const api = new Api();

  // Use state hook to store the model input data
  const [modelInputData, setModelInputData] = useState({});

  // Define a function to handle the click event on the "Use This AI" button
  function handleClick() {
    // Get the model metadata from the props
    const modelMetadata = props.model.metadata;

    // Set the metadata state to the model metadata
    setMetadata(modelMetadata);

    // Reset the prediction state to null
    setPrediction(null);

    // Reset the model input data state to an empty object
    setModelInputData({});
  }

  function handleChange(event) {

    const { name, value, type } = event.target;
    if (type === "file") {
      const file = event.target.files[0];
  
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const dataURL = e.target.result;
        setModelInputData((prevData) => ({
          ...prevData,
          [name]: dataURL,
        }));
      };

      // // Read the file as a data URL
      reader.readAsDataURL(file);
    } else {
      setModelInputData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }
  

  // Define a function to handle the submit event on the form
  function handleSubmit(event) {
    event.preventDefault();
    api.getModelPrediction(props.model.id, modelInputData)
    .then(response => {
      if(response.data.type == 'IMAGE'){
        setPrediction(
          <>
            <div className="predicted_image_container" style={{display:"flex", flexWrap:"wrap", width:"100%", justifyContent:"space-around", alignItems:"center"}}>
              <div>
                <img src={response.data.original_image_src} className='predicted_image'/>
                <p>Original Image</p>
              </div>
              <div>
                <img src={response.data.encoded_image_src} className='predicted_image'/>
                <p>Encoded Image</p>
              </div>
              <div>
                <img src={response.data.output_image_src} className='predicted_image'/>
                <p>Output Image</p>
              </div>
            </div>
          </>
        )
      }
      else if(response.data.type == 'text'){
        setPrediction(response.data.prediction);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Card sx={{ margin: 2, boxShadow: 3 }} className="card">
      <CardContent>
        <Typography variant="h5" component="div">
          {props.model.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.model.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleClick}>
          Use This AI
        </Button>
      </CardActions>
      {metadata && (
        <form onSubmit={handleSubmit}>
          {metadata.input_fields.map((field) => {
            switch (field.type) {
              case "text":
                return (
                  <TextField
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    label={field.placeholder}
                    variant="outlined"
                    required
                    sx={{ margin: 1 }}
                    onChange={handleChange}
                    value={modelInputData[field.name] || ""}
                  />
                );
              case "select":
                return (
                  <Select
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    label={field.placeholder}
                    variant="outlined"
                    required
                    sx={{ margin: 1 }}
                    onChange={handleChange}
                    value={modelInputData[field.name] || ""}
                  >
                    {/* Add some options here */}
                  </Select>
                );
              case "checkbox":
                return (
                  <div key={field.id} sx={{ margin: 1 }}>
                    <label htmlFor={field.id}>{field.placeholder}</label>
                    {field.values.map((value) => (
                      <Checkbox
                        key={value}
                        id={value}
                        name={value}
                        value={value}
                        required
                        onChange={handleChange}
                        checked={modelInputData[value] || false}
                      />
                    ))}
                  </div>
                );
                case "file":
                  return (
                    <Input
                      id={field.id}
                      key={field.id}
                      type="file"
                      name={field.name}
                      value={modelInputData[field.name] || ""}
                      onChange={handleChange}
                    />
                  )
                case "image":
                  return (
                    <Input
                      id={field.id}
                      key={field.id}
                      type="file"
                      inputProps={{accept:'image/*'}}
                      name={field.name}
                      onChange={handleChange}
                    />
                  )
              default:
                return null;
            }
          })}
          <Button type="submit" variant="contained" color="success" sx={{ margin: 1 }}>
            Submit
          </Button>
        </form>
      )}
      {prediction && (
        <Typography variant="h6" component="div" sx={{ margin: 2, fontWeight: "bold" }}>
          Prediction: {prediction}
        </Typography>
      )}
    </Card>
  );
}

// Define a custom component for displaying all AI models
function AIModelList() {
  // Use state hook to store the AI models data
  const [models, setModels] = useState([]);
  const api = new Api();

  useEffect(() => {
      api.getAIModels().then(models => {
        setModels(models);
      })
  }, []);

  return (
    <div
      sx={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80)",
        background:
          "linear-gradient(to right bottom, rgba(30,30,30,0.8), rgba(90,90,90,0.6))",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <Typography variant="h2" component="h1" sx={{ margin: 2 }}>
        AI Models
      </Typography>
      {models.map((model) => (
        <AIModelCard key={model.id} model={model} />
      ))}
    </div>
  );
}

// Export the AI model list component as default
export default AIModelList;
