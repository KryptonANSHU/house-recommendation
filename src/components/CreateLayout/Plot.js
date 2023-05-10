import "./Plot.css"
import { useSelector} from "react-redux";

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
    <div className="flex flex-col">
      <h1 className="">{gridData[id].plotName }</h1>
      <div className="flex">
      {/* <h1>{gridData[id].coordinates.row}</h1>
      <h1>{gridData[id].coordinates.col}</h1> */}
      </div>
    </div>
    </div>
  );
}

export default Plot;
