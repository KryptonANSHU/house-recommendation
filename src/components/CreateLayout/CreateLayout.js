import React, { useState } from "react";
import "./CreateLayout.css"
import Plot from "./Plot";

const CreateLayout = () => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [gridData, setGridData] = useState(
    Array(rows * cols).fill({ id: "", category: "" })
  );

  function handleRowsChange(event) {
    setRows(event.target.value);
    setGridData(Array(event.target.value * cols).fill({ id: "", category: "" }));
  }

  function handleColsChange(event) {
    setCols(event.target.value);
    setGridData(Array(rows * event.target.value).fill({ id: "", category: "" }));
  }

  function handleDrop(id, category) {
    setGridData(
      gridData.map((gridItem, index) => {
        if (index === id) {
          return { ...gridItem, category };
        }
        return gridItem;
      })
    );
  }

  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.category);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="label-container">
        <label>
          Rows:
          <input type="number" value={rows} onChange={handleRowsChange} />
        </label>
        <label>
          Columns:
          <input type="number" value={cols} onChange={handleColsChange} />
        </label>
      </div>
      <div className="categories">
        <button
          className="house"
          draggable
          onDragStart={handleDragStart}
          data-category="House"
        >
          House
        </button>
        <button
          className="gym"
          draggable
          onDragStart={handleDragStart}
          data-category="Gym"
        >
          Gym
        </button>
        <button
          className="restaurant"
          draggable
          onDragStart={handleDragStart}
          data-category="Restaurant"
        >
          Restaurant
        </button>
        <button
          className="hospital"
          draggable
          onDragStart={handleDragStart}
          data-category="Hospital"
        >
          Hospital
        </button>
      </div>
      <div className="map-container">
        <div className="map">
          {gridData.map((item, index) => (
            <Plot
              key={index}
              id={index}
              category={item.category}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateLayout;
