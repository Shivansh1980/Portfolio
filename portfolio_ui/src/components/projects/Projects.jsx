import React, { useState, useEffect } from "react";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid , Box} from "@mui/material";
// import Carousel from "react-material-ui-carousel";
import {ProjectCard, CarouselCard} from './Cards';
import { baseUrl } from "../../Global";
import Carousel from "../designs/Carousel";

// Dummy data for testing
const projects_array = [
  {
    name: "Project 1",
    image: "https://source.unsplash.com/random/300x200",
    description: "This is a sample project description.",
    skills: ["React", "Django", "Python"],
    link: "https://example.com/project1",
  },
  {
    name: "Project 2",
    image: "https://source.unsplash.com/random/300x200",
    description: "This is another sample project description.",
    skills: ["HTML", "CSS", "JavaScript"],
    link: "https://example.com/project2",
  },
  {
    name: "Project 3",
    image: "https://source.unsplash.com/random/300x200",
    description: "This is yet another sample project description.",
    skills: ["Java", "Spring Boot", "MySQL"],
    link: "https://example.com/project3",
  },
];

const Projects = (props) => {
  const [view, setView] = useState("carousel");
  const [projects, setProjects] = useState([]);
  const [width, setWidth] = useState("60%");

  const fetchProjects = async () => {
    const response = await fetch(baseUrl + "/api/projects/");
    const data = await response.json();
    console.log(data);
    return data;
  };

  // Use effect hook to fetch projects when component mounts
  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    getProjects();
  }, []);

  // Use effect hook to add and remove window resize event listener
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set carousel width to state
      setWidth(window.innerWidth * 0.6 + "px");
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  // Function for rendering projects in carousel view
  const renderCarousel = (projects) => {
    return (
      <Box sx={{ margin: "10px", width: width, mx: "auto" }}>
        <Carousel>
          {projects.map((project) => (
            <CarouselCard key={project.name} project={project} />
          ))}
        </Carousel>
      </Box>
    );
  };

  // Function for rendering projects in cards view
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