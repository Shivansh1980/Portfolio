import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import {shivanshResume} from '../../data'
import Projects from "../projects/Projects";
import { Education, Skills, WorkExperiences } from "./PortfolioComponents";
import './portfolio.css'

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
            src={process.env.PUBLIC_URL+"/images/shivansh_image.png"}
            alt={shivanshResume.name}
            sx={{ width: 150, height: 150, borderRadius: "50%" }}
            className="animate__animated animate__fadeInRight"
          />
          {/* Name and role */}
          <Typography
            variant="h5"
            component="div"
            sx={{textAlign:"center"}}
          >
            {shivanshResume.name}
            <Typography 
              variant="h6"  
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
          <Box>
            <p style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%", textAlign:"center"}}>
              {shivanshResume.bio}
            </p>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box className="skill_container">
            <Skills/>
          </Box>
        </Grid>

      {/* Work experience section */}
      <Grid item xs={12}>
        <Box className="work_experience_container">
          <WorkExperiences/>
        </Box>
      </Grid>

      {/* Education section */}
      <Grid item xs={12}>
        <Box>
          <Education/>
        </Box>
      </Grid>

      {/* Achievements section */}
      <Grid item xs={12}>
      <Box>
        <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{width:"100%", backgroundColor:"black", color:"white", textAlign:"center", padding:"5px"}}
          >
            Acheivements
        </Typography>
        <ul>
          {shivanshResume.achievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      </Box>
      </Grid>

      {/* Projects section */}
      <Grid item xs={12}>
        <Box>
          <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{width:"100%", backgroundColor:"black", color:"white", textAlign:"center", padding:"5px"}}
            >
              Projects
          </Typography>
          <Projects projects={shivanshResume.projects} />
        </Box>
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