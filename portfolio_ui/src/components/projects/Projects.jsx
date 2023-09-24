import React, { useState, useEffect } from "react";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid , Box} from "@mui/material";
// import Carousel from "react-material-ui-carousel";
import {ProjectCard, CarouselCard} from './Cards';
import { baseUrl } from "../../Global";

const Projects = (props) => {
  const [projects, setProjects] = useState(props.projects?props.projects:[]);
  const [width, setWidth] = useState("60%");

  const fetchProjects = async () => {
    const response = await fetch(baseUrl + "/api/projects/");
    const data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth * 0.6 + "px");
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCards = (projects) => {
    return (
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.name}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <div style={{ margin: "20px", ...props.style}}>
        {renderCards(projects)}
      </div>
    </>
  );
};

export default Projects;