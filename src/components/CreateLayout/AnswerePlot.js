import "./Plot.css"
import { useSelector} from "react-redux";


const AnswerPlot =({ name})=> {
  const gridData = useSelector((state) => state.grid.gridData);
    const arr = name.split(" ");
    const id = arr[1];
  return (
    <div
      className={`box ${gridData[id].type}`}
    >
        <div className="flex flex-col w-full h-full">
          <div className="h-3/4">
            <h1 className="block">{name}</h1>
          </div>
          <div className="h-1/4">
          <h1 className="text-right text-[8px]">{id}</h1>
          </div>
        </div>
    </div>
  );
}

export default AnswerPlot;
