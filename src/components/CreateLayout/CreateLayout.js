import React, { useState } from "react";
import "./CreateLayout.css"
import Plot from "./Plot";

const CreateLayout = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleRowChange = (e) => {
    setRows(parseInt(e.target.value));
  };

  const handleColChange = (e) => {
    setCols(parseInt(e.target.value));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const renderMap = () => {
    let map = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(
          <Plot
            key={`${i}-${j}`}
            id={`${i}-${j}`}
            title={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        );
      }
      map.push(<div key={i} className="row">{row}</div>);
    }
    return map;
  };

  return (
    <div>
      <label>
        Rows:
        <input type="number" value={rows} onChange={handleRowChange} />
      </label>
      <label>
        Columns:
        <input type="number" value={cols} onChange={handleColChange} />
      </label>
      <div className="categories">
        <button onClick={() => handleCategoryChange("House")}>House</button>
        <button onClick={() => handleCategoryChange("Gym")}>Gym</button>
        <button onClick={() => handleCategoryChange("Restaurant")}>Restaurant</button>
        <button onClick={() => handleCategoryChange("Hospital")}>Hospital</button>
      </div>
      <div className="map">{renderMap()}</div>
    </div>
  );
}

export default CreateLayout;
