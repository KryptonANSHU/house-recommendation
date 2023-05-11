import "./Plot.css"
import { useSelector} from "react-redux";
const TYPE = {
  SERVICE:"SERVICE",
  RESIDENTIAL:"RESIDENTIAL"
}

function Plot({ id, onDrop }) {
  const gridData = useSelector((state) => state.grid.gridData);

  function handleDrop(event) {
    event.preventDefault();
    const category = event.dataTransfer.getData("text");
    const name = (`${category} ${id}`).toUpperCase();
    let type='';

    if(category === "house"){
       type = TYPE.RESIDENTIAL
    }else{
       type = TYPE.SERVICE
    }
    onDrop(id,category,name,type)
  }

  function handleDragOver(event) {
    event.preventDefault();
  }
  return (
    <div
      className={`box ${gridData[id].type}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
        <div className="flex flex-col w-full h-full">
          <div className="h-3/4">
        {
          gridData[id].plotName.map((name,index)=>{
            return <h1 className="block">{name}</h1>
          })
        }
          </div>
          <div className="h-1/4">
          <h1 className="text-right text-[8px]">{gridData[id].id}</h1>
          </div>
        </div>
    </div>
  );
}

export default Plot;
