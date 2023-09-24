import { CircularProgress, Grid } from "@mui/material"
import './ai.css'
import { GenerateButton } from "../Buttons";
import { useState } from "react";
import axios from 'axios';
import { baseUrl } from "../../Global";
import Tools from "../../Tools";
import Carousel from "../mini-components/Carousel";

export const ImageToStoryTeller = (props) => {
    const [modelOutput, setModelOutput] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    function handleGenerateStory(e) {
        setLoading(true);
        if(!imageFile) {
            alert('image file is required as input');
        }
        var formData = new FormData();
        formData.append('image', imageFile);
        axios.post(
            baseUrl+'/api/ai_model/get_story_from_image/', 
            formData, {
                headers:{
                    'Content-Type':'multipart/form-data'
            }}
        ).then(res => {
            setModelOutput(res.data.story);
            setLoading(false);
        }).catch(ex => {
            console.log(ex);
            setLoading(false);
            alert(ex.message);
        })
    }
    function handleFileChange(e) {
        const file = e.target.files[0];
        setImageFile(file);
    }
    return (
        <>
            <div className="model_form">
                <button className="cross_button" onClick={props.close}>Close</button>
                <div className="header">
                    <p>
                        Image To Story
                    </p>
                    <p>(created by shivansh)</p>
                </div>
                
                <div className="file_container image_file_contaienr">
                    <div class="file_container_label">Select The Image To Generate Story</div>
                    <input id="image_file_id" class="file_container_input image_file_input" type='file' accept="image/*" name='my_image' onChange={handleFileChange}/>
                </div>
                <GenerateButton onClick={handleGenerateStory} style={{height:"50px", width:"200px", margin:"10px"}}/>
                {loading?<CircularProgress style={{marginTop:"10px"}}/>:null}
                {modelOutput?
                    <div className="model_text_output">
                        <h4 align="center">Model Output</h4>
                        <p><b><u>Story</u></b>: {modelOutput}</p>
                    </div>:null
                }
                
            </div>
        </>
    )
}

export const ImageSegmentation = (props) => {
    const [modelOutput, setModelOutput] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    function updateModelOutput(data) {
        const masks = data.masks;
        const seperatedImages = data.seperatedImages;
        console.log(masks);
        console.log(seperatedImages);
        setModelOutput(seperatedImages);
    }
    function handleGenerateStory(e) {
        setLoading(true);
        if(!imageFile) {
            alert('image file is required as input');
        }
        var formData = new FormData();
        formData.append('image', imageFile);
        axios.post(
            baseUrl+'/api/ai_model/segment_image/', 
            formData, {
                headers:{
                    'Content-Type':'multipart/form-data'
            }}
        ).then(res => {
            updateModelOutput(res.data);
            setLoading(false);
        }).catch(ex => {
            console.log(ex);
            setLoading(false);
            alert(ex.response && ex.response.data?ex.response.data.message:ex.message);
        })
    }
    function handleFileChange(e) {
        const file = e.target.files[0];
        setImageFile(file);
    }
    return (
        <>
            <div className="model_form for_image_display">
                <button className="cross_button" onClick={props.close}>Close</button>
                <div className="header">
                    <p>
                        Segment Any Image Into Different Classes
                    </p>
                    <p>(created by shivansh)</p>
                </div>
                
                <div className="file_container image_file_contaienr">
                    <div class="file_container_label">Select The Image To Segment</div>
                    <input id="image_file_id" class="file_container_input image_file_input" type='file' accept="image/*" name='my_image' onChange={handleFileChange}/>
                </div>
                <GenerateButton onClick={handleGenerateStory} style={{height:"50px", width:"200px", margin:"10px"}} text={"Segment Image"}/>
                {loading?<CircularProgress style={{marginTop:"10px"}}/>:null}
                {modelOutput? <Carousel slides={modelOutput}/>:null
                }
                
            </div>
        </>
    )
}