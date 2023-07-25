// Import React and React Animated 3D Card from CodeSandbox
import React from "react";
import { Card } from "@sl-codeblaster/react-3d-animated-card";

// Define a function component that takes a card object as props
const Card3D = ({ card }) => {
  // Destructure the card object into image, title, list, and button properties
  const { image, title, list, button } = card;

  // Return a JSX element that renders the card using the Card component
  return (
    <Card
      style={{
        // Set the width and height of the card
        width: "300px",
        height: "400px",
        // Set the margin and padding of the card
        margin: "20px",
        padding: "10px",
        // Set the border radius and box shadow of the card
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      }}
    >
      <div className="card-content">
        {/* Render the image using an img tag */}
        <img src={image} alt={title} style={{ width: "100%", height: "50%" }} />
        {/* Render the title using an h3 tag */}
        <h3 style={{ textAlign: "center", margin: "10px 0" }}>{title}</h3>
        {/* Render the list using an ul tag */}
        <ul style={{ listStyle: "none", padding: "0" }}>
          {list.map((item) => (
            // Render each list item using an li tag
            <li key={item} style={{ margin: "5px 0" }}>
              {item}
            </li>
          ))}
        </ul>
        {/* Render the button using a button tag */}
        <button style={{ width: "100%", height: "40px", color: "white", backgroundColor: "#007bff", border: "none", borderRadius: "5px" }}>
          {button}
        </button>
      </div>
    </Card>
  );
};

// Define a function component that renders multiple cards in a grid
const CardGrid = () => {
  // Define an array of card objects with different properties
  const cards = [
    {
      image:
        "https://images.unsplash.com/photo-1534375971785-5c1826f739d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2NpZW5jZSUyMGZpY3Rpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Science Fiction",
      list: ["Aliens", "Space", "Time Travel"],
      button: "Read More",
    },
    {
      image:
        "https://images.unsplash.com/photo-1563207153-f403bf289096?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2NpZW5jZSUyMGZpY3Rpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Fantasy",
      list: ["Dragons", "Magic", "Swords"],
      button: "Read More",
    },
    {
      image:
        "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2NpZW5jZSUyMGZpY3Rpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Horror",
      list: ["Zombies", "Ghosts", "Vampires"],
      button: "Read More",
    },
  ];

  // Return a JSX element that renders the cards using the Card3D component
  return (
    <div
      className="card-grid"
      style={{
        // Set the display and grid properties of the grid container
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "20px",
        // Set the width and height of the grid container
        width: "1000px",
        height: "500px",
        // Set the margin and padding of the grid container
        margin: "50px auto",
        padding: "20px",
        // Set the background image of the grid container using a sci-fi background from Freepik
        backgroundImage:
          "url(https://image.freepik.com/free-vector/futuristic-science-fiction-background_52683-18867.jpg)",
        backgroundSize: "cover",
      }}
    >
      {cards.map((card) => (
        // Render each card using the Card3D component
        <Card3D key={card.title} card={card} />
      ))}
    </div>
  );
};

// Export the CardGrid component as default
export default CardGrid;