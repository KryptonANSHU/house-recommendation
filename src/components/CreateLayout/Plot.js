import React, { useState } from "react";
import "./Plot.css"

function Plot(props) {
  const [category, setCategory] = useState("");

  const handleClick = () => {
    props.onCategoryChange(category);
  };

  const getCategoryClass = () => {
    switch (category) {
      case "House":
        return "house";
      case "Gym":
        return "gym";
      case "Restaurant":
        return "restaurant";
      case "Hospital":
        return "hospital";
      default:
        return "";
    }
  };

  return (
    <div
      className={`box ${getCategoryClass()}`}
      onClick={handleClick}
    >
      {category}
    </div>
  );
}

export default Plot;
