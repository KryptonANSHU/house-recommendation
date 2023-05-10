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
  const recommended_house = useSelector((state)=> state.coordinates.recommended_house)
  const homeCordinates = useSelector((state)=> state.coordinates.homeCordinates);
  

  const [numRows, setNumRows] = useState(5);
  const [numCols, setNumCols] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleRowsChange = (event) => {
    setNumRows(event.target.value);
  };

  const handleColsChange = (event) => {
    setNumCols(event.target.value);
  };


  // const isCoordinatePresentInGym = (gridData, id, gymCoordinates) => {
  //   const coordinate = gridData[id].coordinates;
  //   return gymCoordinates.some(gymCoordinate => {
  //     return gymCoordinate.row === coordinate.row && gymCoordinate.col === coordinate.col;
  //   });
  // };
  // const isCoordinatePresentInHospital = (gridData, id, hospitalCoordinates) => {
  //   const coordinate = gridData[id].coordinates;
  //   return hospitalCoordinates.some(hospitalCoordinate => {
  //     return hospitalCoordinate.row === coordinate.row && hospitalCoordinate.col === coordinate.col;
  //   });
  // };
  // const isCoordinatePresentInRestaurant = (gridData, id, restaurantCoordinates) => {
  //   const coordinate = gridData[id].coordinates;
  //   return restaurantCoordinates.some(restaurantCoordinate => {
  //     return restaurantCoordinate.row === coordinate.row && restaurantCoordinate.col === coordinate.col;
  //   });
  // };
  
  const isPlotNameAlreadyExists = (gridData, id, newPlotName) => {
    const plotNames = gridData[id].plotName;
    return plotNames.includes(newPlotName);
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

  function handleDrop(id, category, plotName,type) { 

    if(gridData[id].plotName.length === 0){
      dispatch(set_GridItem({ id, category, plotName, type }));     
      if (category === "house") {
        const coordinates = {
          name: plotName,
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
      return;
    }

    if(gridData[id].plotName.length !== 0){
      if(gridData[id].type === "COMMERCIAL"){
        alert("This Field if of Type COMMERCIAL. Services cannot be added here")
        return;
      }else{
        if(gridData[id].plotScore >= 3){
          alert("Not More than 3 Services can be added");
          return;
        }else{
            if(isPlotNameAlreadyExists(gridData,id,plotName)){
                alert("Same SERVICE cannot be added on same plot twice")
                return;
            }else{
              if(category === "house"){
                alert("Home Cannot be Added in SERVICE type Plot")
                return;
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
        }
      }
      dispatch(update_GridItem({id,category,plotName}))
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
          className="house COMMERCIAL"
          draggable
          onDragStart={handleDragStart}
          data-category="house"
        >
          House
        </button>
        <button
          className="gym SERVICE"
          draggable
          onDragStart={handleDragStart}
          data-category="gym"
        >
          Gym
        </button>
        <button
          className="restaurant SERVICE"
          draggable
          onDragStart={handleDragStart}
          data-category="restaurant"
        >
          Restaurant
        </button>
        <button
          className="hospital SERVICE"
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

      {
        show && (
          (recommended_house) !== -1 ? (<>
          <h1>Answere is {homeCordinates[recommended_house].name}</h1>
        </>) : (<>
          <h1>Waiting for Answer</h1>
        </>)
        )
  
      }
    </div>
  );
};

export default CreateLayout;
