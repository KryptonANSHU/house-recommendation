import "./Plot.css"
import { useSelector} from "react-redux";


const AnswerPlot =({distanceIndex, name})=> {
  const gridData = useSelector((state) => state.grid.gridData);
  const distance = useSelector((state)=> state.coordinates.distance)
    const arr = name.split(" ");
    const id = arr[1];
    let gymDist = (distance[distanceIndex].gymDist- 1) + ' Km';
    let hospitalDist = (distance[distanceIndex].hospitalDist - 1) +' Km';
    let restaurantDist = (distance[distanceIndex].restaurantDist -1) + ' Km'

    if(gymDist === '-2 Km') gymDist = "Does Not Exist"
    if(hospitalDist === '-2 Km') hospitalDist = "Does Not Exist"
    if(restaurantDist === '-2 Km') restaurantDist = "Does Not Exist"
  return (
    <div className="flex w-full">

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

    <div className="p-2 font-bold -mt-4">
        <h1>Distance from Nearest Gym : {gymDist}</h1>
        <h1>Distance from Nearest Hospital : {hospitalDist}</h1>
        <h1>Distance from Nearest Restaurant : {restaurantDist}</h1>
    </div>
    </div>
  );
}

export default AnswerPlot;
