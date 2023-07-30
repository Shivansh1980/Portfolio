import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import {staticUrl} from '../../Global'

const CarouselCard = ({ project }) => {
  return (
    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', flexWrap:'wrap'}}>
      <Box sx={{ position: "relative", width: "60%", height: "auto" }}>
        <Box
          component="img"
          src={project.image}
          alt={project.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          component={Card}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 345,
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {project.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              {project.skills.join(", ")}
            </Button>
            <Button size="small" color="primary" href={project.link}>
              Learn More
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Box>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={staticUrl + project.image}
          alt={project.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
          <br/>
          <Typography variant="body2">
            <b>Skills: </b>{project.skills.join(", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={project.link}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};


export {CarouselCard, ProjectCard};
