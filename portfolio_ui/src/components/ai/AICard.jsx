import React from 'react'
import {Card, CardActions, CardMedia, CardContent, Typography, Button} from '@mui/material'
import { AIModelNames } from './AIConstants';
import { useNavigate } from 'react-router-dom';
import Tools from '../../Tools';
import { ImageSegmentation, ImageToStoryTeller } from './AIModels';
const AICard = ({ aiproject }) => {
    const handleUseModelClick = (e)=> {
        var tool = new Tools();
        if(AIModelNames.IMAGE_TO_STORY_TELLER == aiproject.name){
            if(document.getElementById('image_to_story_popup_id')) return;
            var div = document.createElement('div');
            div.id = "image_to_story_popup_id"
            document.getElementById('root').appendChild(div);
            tool.displayComponent(<ImageToStoryTeller/>, div.id);
        }
        if(AIModelNames.IMAGE_SEGMENTATION == aiproject.name){
          if(document.getElementById('image_segmentation_popup_id')) return;
          var div = document.createElement('div');
          div.id = "image_segmentation_popup_id"
          document.getElementById('root').appendChild(div);
          tool.displayComponent(<ImageSegmentation/>, div.id);
        }
    }
    return (
      <Card sx={{ maxWidth: 345, height:"450px", backgroundColor:"#2c2c2c" }} className="project_card">
          <CardMedia
            component="img"
            height="140"
            image={process.env.PUBLIC_URL + "/images/project_images/" + aiproject.image}
            alt={aiproject.name}
          />
          <CardContent className="project_card_content">
            <Typography gutterBottom variant="h6" component="div">
              {aiproject.name}
            </Typography>
            <Typography variant="body2" className="project_card_content_description">
              {aiproject.description}
            </Typography>
            <br/>
            <Typography variant="body2">
              <b>Skills: </b>{aiproject.skills.join(", ")}
            </Typography>
          </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={(e) => handleUseModelClick(e)}>
            Use This Model
          </Button>
        </CardActions>
      </Card>
    );
};

export default AICard;