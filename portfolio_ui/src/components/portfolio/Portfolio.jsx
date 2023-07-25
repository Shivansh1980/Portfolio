import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import {shivanshResume} from '../../data'
import Projects from "../projects/Projects";
import 'animate.css';
import { Education, Skills, WorkExperiences } from "./PortfolioComponents";

const Portfolio = () => {
    return (
      <Box sx={{ margin: "20px" }}>
        <Grid container rowGap={2}>
        <Grid item xs = {12} sm={4}>
        {/* Header section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"column",
          }}
        >
          {/* Image */}
          <Box
            component="img"
            src={shivanshResume.image}
            alt={shivanshResume.name}
            sx={{ width: 150, height: 150, borderRadius: "50%" }}
            className="animate__animated animate__fadeInRight"
          />
          {/* Name and role */}
          <Typography
            variant="h5"
            component="div"
            className="animate__animated animate__fadeInLeft"
            sx={{textAlign:"center"}}
          >
            {shivanshResume.name}
            <Typography 
              variant="h6" 
              color="text.secondary" 
              align="center"
              sx={{textAlign:"center"}}
            >
              {shivanshResume.role}
            </Typography>
          </Typography>
        </Box>
        </Grid>
        {/* Bio section */}
        <Grid item xs = {12} sm={8}>
          <p style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%", textAlign:"center"}}>
            {shivanshResume.bio}
          </p>
        </Grid>

        <Grid item xs={12}>
            <Skills/>
        </Grid>

      {/* Work experience section */}
      <Grid item xs={12}>
        <WorkExperiences/>
      </Grid>

      {/* Education section */}
      <Grid item xs={12}>
        <Education/>
      </Grid>

      {/* Achievements section */}
      <Grid item xs={12}>
      <Typography
          variant="h5"
          component="div"
          gutterBottom
          className="animate__animated animate__fadeInUp"
          sx={{width:"100%", backgroundColor:"black", color:"white", textAlign:"center", padding:"5px"}}
        >
          Acheivements
        </Typography>
      <ul className="animate__animated animate__fadeInUp">
        {shivanshResume.achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
      </Grid>

      {/* Projects section */}
      <Grid item xs={12}>
      <Typography
          variant="h5"
          component="div"
          gutterBottom
          className="animate__animated animate__fadeInUp"
          sx={{width:"100%", backgroundColor:"black", color:"white", textAlign:"center", padding:"5px"}}
        >
          Projects
        </Typography>
      <Projects projects={shivanshResume.projects} />
      </Grid>

      {/* Hobbies section */}
      <Typography
          variant="h5"
          component="div"
          gutterBottom
          className="animate__animated animate__fadeInUp"
          sx={{width:"100%", backgroundColor:"black", color:"white", textAlign:"center", padding:"5px"}}
        >
          Hobbies
      </Typography>
      <ul className="animate__animated animate__fadeInUp">
        {shivanshResume.hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
      
      {/* Social links section */}
      <Grid item xs={12}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginTop: "40px",
          marginBottom: "20px",
        }}
        className="animate__animated animate__fadeInUp"
      >
        {shivanshResume.socialLinks.map((link) => (
          <Button
            key={link.name}
            variant="outlined"
            color="primary"
            startIcon={link.icon}
            href={link.url}
            target="_blank"
          >
            {link.name}
          </Button>
        ))}
      </Box>
      </Grid>
      </Grid>
    </Box>
  );
};

export default Portfolio;