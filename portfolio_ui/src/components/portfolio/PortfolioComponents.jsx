import {Box, Typography, CardMedia, CardAction, CardActionArea, Grid, Card, CardContent, CircularProgress } from "@mui/material"
import { shivanshResume } from "../../data"
import {styled} from '@mui/material/styles'
import {useTransition, animated} from 'react-spring'
import React, {useState} from 'react'


export const Education = () => {
    return (
    <>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          className="animate__animated animate__fadeInUp"
          sx={{width:"100%", backgroundColor:"black", color:"white", textAlign:"center", padding:"5px"}}
        >
          Education
        </Typography>
        <Grid container spacing={2} className="animate__animated animate__fadeInUp">
            {shivanshResume.education.map((edu) => (
            <Grid item xs={12} sm={6} md={4} key={edu.degree}>
                <Card sx={{ height: "100%" }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                    {edu.degree}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                    {edu.duration}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                    {edu.score}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
    </>
    )
}



const SkillCard = styled(Card)(({ theme }) => ({
    width: 200,
    height: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color:"white",
    backgroundColor: theme.palette.grey[900],
    "&:hover": {
      transform: "scale(1.1)",
      transition: "all 0.3s ease-in-out",
      boxShadow: theme.shadows[10],
      // Use a dark background color on hover
    },
  }));
  
  // A custom SVG component to create the circular bar with border width and gradient colors
  const SkillBar = ({ percentage }) => {
    // Calculate the stroke dasharray and dashoffset based on the percentage
    const radius = 50;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const dasharray = circumference;
    const dashoffset = circumference - (percentage / 100) * circumference;
  
    return (
    <Box component="div" display="flex">
      <svg height="80" width="80" viewBox="0 0 120 120" style={{margin:"0 auto"}}>
        {/* Define the gradient colors */}
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#ff0000", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#ffff00", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Draw a circle with the gradient colors and the stroke dasharray and dashoffset */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#grad1)"
          strokeWidth={strokeWidth}
          strokeDasharray={dasharray}
          strokeDashoffset={dashoffset}
        />
        {/* Show the percentage as text in the center of the circle */}
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="white">
          {percentage}%
        </text>
      </svg>
      </Box>
    );
  };
  
  export const Skills = () => {
    return (
      <>
        {/* Skills section */}
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          className="animate__animated animate__fadeInUp"
          sx={{width:"100%", backgroundColor:"black", color:"white", textAlign:"center", padding:"5px"}}
        >
          Skills
        </Typography>
  
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "40px",
            // Use flexbox to align the content in center
            alignItems: "center",
            justifyContent: "center",
          }}
          className="animate__animated animate__fadeInUp"
        >
          {shivanshResume.skills.map((skill) => (
            // Use the custom card component for each skill
            <SkillCard key={skill.name}>
              <CardContent>
                {/* Use the custom SVG component to show the percentage */}
                <SkillBar percentage={skill.percentage} />
                {/* Show the skill name and years of experience below the progress */}
                <Typography variant="p" component="div" sx={{ marginTop: "10px", textAlign:"center" }}>
                  {skill.name}
                </Typography>
                <Typography variant="body2" component="div" sx={{textAlign:"center"}}>
                  {skill.years} years
                </Typography>
              </CardContent>
            </SkillCard>
          ))}
        </Box>
      </>
    );
  }; 



export const WorkExperiences = () => {
    return (
        <>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          className="animate__animated animate__fadeInUp"
          sx={{width:"100%", backgroundColor:"black", color:"white", textAlign:"center", padding:"5px"}}
        >
          Work Experience
        </Typography>
        <Grid container spacing={2} className="animate__animated animate__fadeInUp">
            {shivanshResume.workExperience.map((work) => (
            <Grid item xs={12} sm={6} md={4} key={work.company}>
                <Card 
                    sx={{ 
                        height: "100%",
                    }}
                >
                <CardContent>
                    <Typography variant="h6" component="div">
                        {work.company}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {work.location}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {work.role}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {work.duration}
                    </Typography>
                    <ul>
                    {
                        work.achievements.map((achievement) => (
                            <li key={achievement}>{achievement}</li>
                        ))
                    }
                    </ul>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
        </>
    )
}