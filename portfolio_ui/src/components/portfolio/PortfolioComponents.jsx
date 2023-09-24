import {Box, Typography, CardMedia, CardAction, CardActionArea, Grid, Card, CardContent, CircularProgress } from "@mui/material"
import { shivanshResume } from "../../data"
import {styled} from '@mui/material/styles'
import React, {useState, useEffect, useRef} from 'react'
import {useSpring, animated} from 'react-spring'
import { useInView } from "react-intersection-observer"
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const Education = () => {
    return (
    <>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          className="animate__animated animate__fadeInUp"
          sx={{width:"100%", backgroundColor:"black", textAlign:"center", padding:"5px"}}
        >
          Education
        </Typography>
        <Grid container spacing={2} className="animate__animated animate__fadeInUp">
            {shivanshResume.education.map((edu) => (
            <Grid item xs={12} sm={6} md={4} key={edu.degree}>
                <Card sx={{ height: "100%", backgroundColor:"#2c2c2c", boxShadow:"2px 2px 5px 5px black" }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                    {edu.degree}
                    </Typography>
                    <Typography variant="subtitle1">
                    {edu.duration}
                    </Typography>
                    <Typography variant="subtitle2">
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
  const CircularBar = (props) => {
    const percentage = props.percentage?props.percentage:0;
    const config = props.config?props.config:{};

    const [inViewRef, inView] = useInView({
      triggerOnce: true,
    });
  
    const [isAnimated, setIsAnimated] = useState(false);
  
    useEffect(() => {
      if (inView) {
        setIsAnimated(true);
      }
    }, [inView]);
  
    return (
      <div 
        className="circular_bar" 
        ref={inViewRef}
        // style={{width:config.width?config.width:"100px", height:config.height?config.height:"100px"}}
      >
        <CircularProgressbar value={percentage} text={`${percentage}%`}/>
      </div>
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
          sx={{width:"100%",textAlign:"center", padding:"5px", backgroundColor:"black"}}
        >
          Skills
        </Typography>
  
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="skills_cards_container"
        >
          {shivanshResume.skills.map((skill) => (
            // Use the custom card component for each skill
            <div id={skill.name} className="skill_card">
              <CircularBar percentage={skill.percentage} />
              <div className="skill_card_content">
                <p>{skill.name}</p>
              </div>
            </div>
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
          sx={{width:"100%", textAlign:"center", padding:"5px", backgroundColor:"black"}}
        >
          Work Experience
        </Typography>
        <Grid container spacing={2}>
            {shivanshResume.workExperience.map((work) => (
            <Grid item xs={12} sm={6} md={4} key={work.company}>
                <Card 
                    className="work_experience_card"
                    sx={{ 
                      width:"100%",
                      height: "100%",
                      backgroundColor:" #2c2c2c",
                      boxShadow:"2px 2px 5px 5px black"
                  }}
                >
                <CardContent className="work_experience_card_content">
                    <Box variant="h6" component="div" sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", width:"100%", flexWrap:"wrap"}}>
                      <div><img width="100px" height="100px" src={process.env.PUBLIC_URL+"/images/"+work.companyLogo}/></div>
                      <Typography variant="h6" component="div" sx={{textAlign:"center"}}>
                          {work.company} {work.location != "" ? `(${work.location})`: ""}
                      </Typography>
                      <Typography variant="subtitle2">
                          {work.role}
                      </Typography>
                      <Typography variant="subtitle2">
                          {work.duration}
                      </Typography>
                    </Box>
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