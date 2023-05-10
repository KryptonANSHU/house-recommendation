import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputErrorModal from "../Modals/InputErrorModal";
import "./CreateLayout.css";
import Plot from "./Plot";
import {
  set_Cols,
  set_Rows,
  set_GridItem,
  update_Coordinates,
  reset_Grid,
  update_GridItem,
} from "../../redux/gridSlice";

import {
  set_Home_Cordinates,
  set_Hospital_Cordinates,
  set_Restaurant_Cordinates,
  set_Gym_Cordinates,
  reset_Coordinates,
  calc_distance,
} from "../../redux/cordinateSlice";

const CreateLayout = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.grid.rows);
  const cols = useSelector((state) => state.grid.cols);
  const gridData = useSelector((state) => state.grid.gridData);
  const recommended_house_id = useSelector(
    (state) => state.coordinates.recommended_house
  );

  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleRowsChange = (event) => {
    setNumRows(event.target.value);
  };

  const handleColsChange = (event) => {
    setNumCols(event.target.value);
  };

  function handleGenerateClick() {
    if (numRows <= 0 || numCols <= 0) {
      // setShowModal(true);
      alert("Enter Valid Values")
      return;
    }

    dispatch(set_Rows(numRows));
    dispatch(set_Cols(numCols));

    setShow(true);

    for (let i = 0; i < numRows * numCols; i++) {
      let fact = Math.floor(i / numCols);
      const coordinates = {
        row: fact,
        col: i - fact * numCols,
      };
      const id = i;
      dispatch(update_Coordinates({ id, coordinates }));
    }
  }

  function handleDrop(id, category, plotName) {

    if (gridData[id].plotName === "") {
      dispatch(set_GridItem({ id, category, plotName }));

      if (category === "house") {
        const coordinates = {
          row: gridData[id].coordinates.row,
          col: gridData[id].coordinates.col,
        };
        dispatch(set_Home_Cordinates(coordinates));
      }
      if (category === "gym") {
        const coordinates = {
          row: gridData[id].coordinates.row,
          col: gridData[id].coordinates.col,
        };
        dispatch(set_Gym_Cordinates(coordinates));
      }
      if (category === "restaurant") {
        const coordinates = {
          row: gridData[id].coordinates.row,
          col: gridData[id].coordinates.col,
        };
        dispatch(set_Restaurant_Cordinates(coordinates));
      }
      if (category === "hospital") {
        const coordinates = {
          row: gridData[id].coordinates.row,
          col: gridData[id].coordinates.col,
        };
        dispatch(set_Hospital_Cordinates(coordinates));
      }
    }
    
    if (gridData[id].plotName !== "") {      
      if(gridData[id].plotScore === 3){
        alert("More Services Cannot be added")
        return;
      }
      return dispatch(update_GridItem({ id, category, plotName }));
    }

  
    
    if(gridData[id].category === "house"){
      alert("A House is Present over here. Services cannot be added in this block")
      return;
    }


  }

  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.category);
  }

  const gridStyle = {
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  };

  const handleReset = () => {
    dispatch(reset_Grid());
    dispatch(reset_Coordinates());
    setNumCols(0);
    setNumRows(0);
    setShow(false);
  };

  const handleRecommend = () => {
    dispatch(calc_distance());
  };

  return (
    <div className="container">
      {/* <InputErrorModal showModal={showModal} setshowModal={setShowModal} /> */}
      <div className="label-container">
        <label>
          Rows:
          <input type="number" value={numRows} onChange={handleRowsChange} />
        </label>
        <label>
          Columns:
          <input type="number" value={numCols} onChange={handleColsChange} />
        </label>
        <button className="h-10 border-2 mt-6" onClick={handleGenerateClick}>
          Generate
        </button>
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
            <Plot key={index} id={index} onDrop={handleDrop} />
          ))}
        </div>
      </div>
      {show && (
        <>
          <button className="reset-button m-2" onClick={handleReset}>
            Reset
          </button>
          <button className="reset-button m-4" onClick={handleRecommend}>
            Recommend Best House
          </button>
        </>
      )}
    </div>
  );
};

export default CreateLayout;
