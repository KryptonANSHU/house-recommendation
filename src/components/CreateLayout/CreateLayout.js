import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCols,setRows,setGridItem, resetGrid, updateGridItem} from "../../redux/gridSlice";
import "./CreateLayout.css"
import Plot from "./Plot";

const CreateLayout = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.grid.rows);
  const cols = useSelector((state) => state.grid.cols);
  const gridData = useSelector((state) => state.grid.gridData);

  function handleRowsChange(event) {
    dispatch(setRows(event.target.value));
  }

  function handleColsChange(event) {
    dispatch(setCols(event.target.value));
  }

  function handleDrop(id, category, plotName) {
    dispatch(setGridItem({ id, category, plotName }));
    // dispatch(updateGridItem({ id, category, plotName }));
  }

  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.category);
  }

  const gridStyle = {
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  };

  const handleReset = () => {
    dispatch(resetGrid());
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
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
    <button className="reset-button" onClick={handleReset}>
      Reset
    </button>
    </div>

  );
}

export default CreateLayout;
