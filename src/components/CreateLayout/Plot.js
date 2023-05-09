import React, { useState } from "react";
import "./Plot.css"

function Plot({id, category, onDrop}) {
  const [title, setTitle] = useState("");

  function handleDrop(event) {
    event.preventDefault();
    const category = event.dataTransfer.getData("text");
    setTitle(category);
    onDrop(id, category);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <div
      className={`box ${category}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {title || id}
    </div>
  );
}

export default Plot;
