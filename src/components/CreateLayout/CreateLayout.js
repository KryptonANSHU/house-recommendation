import React, { useState } from "react";
import "./CreateLayout.css"
import Plot from "./Plot";

const CreateLayout = () => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [gridData, setGridData] = useState(
    Array(rows * cols).fill({ id: "", category: "", plotScore: 0, plotName: "" })
  );

  function handleRowsChange(event) {
    setRows(event.target.value);
    setGridData(Array(event.target.value * cols).fill({ id: "", category: "" ,plotScore: 0, plotName: "" }));
  }

  function handleColsChange(event) {
    setCols(event.target.value);
    setGridData(Array(rows * event.target.value).fill({ id: "", category: "",plotScore: 0, plotName: ""  }));
  }

  function handleDrop(id, category, plotScore, plotName) {
    setGridData(
      gridData.map((gridItem, index) => {
        if (index === id) {
          return { ...gridItem, category, id, plotScore, plotName };
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

  const gridStyle = {
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`
  };


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
          data-category="house"
        >
          House
        </button>
        <button
          className="gym"
          draggable
          onDragStart={handleDragStart}
          data-category="gym"
        >
          Gym
        </button>
        <button
          className="restaurant"
          draggable
          onDragStart={handleDragStart}
          data-category="restaurant"
        >
          Restaurant
        </button>
        <button
          className="hospital"
          draggable
          onDragStart={handleDragStart}
          data-category="hospital"
        >
          Hospital
        </button>
      </div>

      <div className="map-container" style={gridStyle}>
      <div className="map" style={gridStyle}>
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
