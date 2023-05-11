import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputErrorModal from "../Modals/InputErrorModal";
import "./CreateLayout.css";
import Plot from "./Plot";
import AnswerPlot from "./AnswerePlot";
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
  const [show, setShow] = useState(false);
  
  // States Used for Rendering Modal
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalSubheading, setModalSubheading] = useState("");


  const handleRowsChange = (event) => {
    setNumRows(event.target.value);
  };

  const handleColsChange = (event) => {
    setNumCols(event.target.value);
  };

  
  const isPlotNameAlreadyExists = (gridData, id, newPlotName) => {
    const plotNames = gridData[id].plotName;
    return plotNames.includes(newPlotName);
  };

  function handleGenerateClick() {
    if (numRows <= 0 || numCols <= 0) {
      setShowModal(true);
      setModalHeading("Enter Valid Values")
      setModalSubheading("Rows and Coloumns can't be Negative or Zero!")
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
      if(gridData[id].type === "RESIDENTIAL"){
        setShowModal(true);
        setModalHeading("Residential Area!!")
        setModalSubheading("This is a Residential Area. Services Cannot be added here")
        return;
      }else{
        if(gridData[id].plotScore >= 3){
          setShowModal(true);
        setModalHeading("Limit Reached!!")
        setModalSubheading("Already 3 Services present on 1 plot. Can't add more")
        return;
        }else{
            if(isPlotNameAlreadyExists(gridData,id,plotName)){
              setShowModal(true);
              setModalHeading("Duplicate Service!!")
              setModalSubheading("Same Service cannot be added twice on a Plot")
              return;
            }else{
              if(category === "house"){
                setShowModal(true);
                setModalHeading("Service Area")
                setModalSubheading("This is a Service Area. Homes Cannot be added here!")
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
    if(homeCordinates.length === 0){
      setShowModal(true);
      setModalHeading("No Homes Found!!")
      setModalSubheading("What would I suggest you if there are no Homes on the map. Add at least one Home")
      return;
    }

    dispatch(calc_distance());
  };
  return (
    <div className="container">
    <div className="top-part ">
      <InputErrorModal showModal={showModal} setshowModal={setShowModal} heading={modalHeading} subheading={modalSubheading}/>
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
          className="house RESIDENTIAL"
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
      {
        show && (
      <div>
        <h1 className="text-sm font-semibold text-center rounded-lg">(Drag and Drop Entities to set on the Map)</h1>
      </div>
      )
      }

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
        <div className="flex">
          <button className="reset-button m-4" onClick={handleReset}>
            Reset
          </button>
          <button className="reset-button m-4" onClick={handleRecommend}>
            Recommend Best House
          </button>
        </div>
        </>
      )}
      <div className="answer mt-5">
      {
        show && (
          (recommended_house) !== -1 ? (<>
          <h1 className="text-2xl font-semibold">Recommend {homeCordinates[recommended_house].name}</h1>
          <AnswerPlot name = {homeCordinates[recommended_house].name}/>
        </>) : (<>
          <h1 className="text-2xl font-semibold">Its Quite a tough task to choose the best home isn't it?</h1>
        </>)
        )
  
      }
      </div>
    </div>
  );
};

export default CreateLayout;
