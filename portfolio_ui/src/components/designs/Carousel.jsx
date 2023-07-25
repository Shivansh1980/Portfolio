import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

// A custom hook to get the window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // A handler to update the window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away to set initial size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};

// A custom component that takes an array of card components as props and renders a carousel
const Carousel = ({ cards }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [index, setIndex] = useState(0); // The current index of the card
  const [direction, setDirection] = useState("right"); // The direction of the transition

  // A function to handle the left arrow click
  const handleLeftClick = () => {
    setDirection("left");
    setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  // A function to handle the right arrow click
  const handleRightClick = () => {
    setDirection("right");
    setIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // Get the window size using the custom hook
  const size = useWindowSize();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: isMobile ? "90%" : "60%",
        }}
      >
        {/* Left arrow button */}
        <Box
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleLeftClick}
        >
          {"<"}
        </Box>
        {/* Card container */}
        <Box
          sx={{
            width: isMobile ? "80%" : "50%",
            height: isMobile ? `${size.width * 0.8 * 0.75}px` : "300px", // Maintain the aspect ratio of 4:3
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Render the cards with transition effect */}
          {cards.map((CardComponent, i) => (
            <CardComponent
              key={i}
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left:
                  direction === "right"
                    ? i === index
                      ? 0 // Current card
                      : i === (index - 1 + cards.length) % cards.length
                      ? "-100%" // Previous card
                      : "100%" // Next card
                    : i === index
                    ? 0 // Current card
                    : i === (index + 1) % cards.length
                    ? "100%" // Next card
                    : "-100%", // Previous card
                transition: "left 0.5s ease-in-out", // Smooth transition effect
              }}
            />
          ))}
        </Box>
        {/* Right arrow button */}
        <Box
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleRightClick}
        >
          {">"}
        </Box>
      </Box>
    </Box>
  );
};

export default Carousel;