import React, { useState } from "react";
import "./Plot.css"

function Plot({ id, category, onDrop }) {
  const checkService=(category)=>{
    if(category === "house"){
      return false;
    }
    return true;
  }
  const [plotName, setPlotName] = useState("");
  const [plotScore,setPlotScore] = useState(1);

  function handleDrop(event) {
    event.preventDefault();
    const category = event.dataTransfer.getData("text");

    if(checkService(category)){
      setPlotScore(prevCount => prevCount + 1);
      console.log(plotScore)
    }

    const uniqueId = category + id;
    setPlotName(uniqueId);
    onDrop(id, category, plotScore, plotName);
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
      {plotName}
    </div>
  );
}

export default Plot;
