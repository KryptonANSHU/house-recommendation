import React, { useState } from "react";
import "./Plot.css"
import { useSelector,useDispatch } from "react-redux";
import { updateGridItem,setGridItem } from "../../redux/gridSlice";

function Plot({ id, onDrop }) {
  const gridData = useSelector((state) => state.grid.gridData);

  function handleDrop(event) {
    event.preventDefault();
    const category = event.dataTransfer.getData("text");
    const uniqueId = category + id;
    onDrop(id,category,uniqueId)

  }

  function handleDragOver(event) {
    event.preventDefault();
  }
  return (
    <div
      className={`box ${gridData[id].category}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {gridData[id].plotName }
    </div>
  );
}

export default Plot;
