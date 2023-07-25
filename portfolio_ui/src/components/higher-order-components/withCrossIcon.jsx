import React from "react";
import CloseIcon from "@mui/icons-material/Close";

// Define a function that takes a component as a parameter
function withCrossIcon(Component) {
  // Return another component that wraps the original component with a div element
  return function (props) {
    // Define an onClick handler for the cross icon
    function handleCrossClick() {
      // Perform some action, such as closing the component or navigating to another route
      console.log("Cross icon clicked");
    }

    return (
      <div>
        {/* Render the cross icon with CSS properties */}
        <CloseIcon
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
          onClick={handleCrossClick}
        />
        {/* Render the original component with props */}
        <Component {...props} />
      </div>
    );
  };
}

// Export the function as the higher-order component
export default withCrossIcon;
