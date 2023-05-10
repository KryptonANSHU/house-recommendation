import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeCordinates: [],
  hospitalCordinates: [],
  gymCordinates: [],
  restaurantCordinates: [],
  distance: [],
  recommended_house: -1
  
};

export const cordinateSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    set_Home_Cordinates: (state, action) => {
     
      state.homeCordinates.push(action.payload);
    },
    set_Hospital_Cordinates: (state, action) => {
      state.hospitalCordinates.push(action.payload);
    },
    set_Gym_Cordinates: (state, action) => {
      state.gymCordinates.push(action.payload);
    },
    set_Restaurant_Cordinates: (state, action) => {
      state.restaurantCordinates.push(action.payload);
    },
    calc_distance: (state) => {
      const distances = state.homeCordinates.map((home) => {
        let gymDist = 0;
        let hospitalDist = 0;
        let restaurantDist = 0;
        // 0 means Service is not there on the Map

        if (state.gymCordinates.length !== 0) {
          gymDist = state.gymCordinates.reduce((prev, curr) => {
            const dist =
              Math.abs(home.row - curr.row) + Math.abs(home.col - curr.col);
            return dist < prev ? dist : prev;
          }, Infinity);
        }
        if (state.restaurantCordinates.length !== 0) {
            restaurantDist = state.restaurantCordinates.reduce((prev, curr) => {
              const dist =
                Math.abs(home.row - curr.row) + Math.abs(home.col - curr.col);
              return dist < prev ? dist : prev;
            }, Infinity);
          }
        if (state.hospitalCordinates.length !== 0) {
          hospitalDist = state.hospitalCordinates.reduce((prev, curr) => {
            const dist =
              Math.abs(home.row - curr.row) + Math.abs(home.col - curr.col);
            return dist < prev ? dist : prev;
          }, Infinity);
        }
        return {
          gymDist,
           hospitalDist,
         restaurantDist,
        };
      });
      state.distance = distances;
      console.log(state.distance)

      // Now lets see the minimum distance
      let minimumDistance = Infinity;
      let index = -1;
      distances.forEach((distance, i) => {
        const sum = Object.keys(distance).reduce((acc, key) => acc + distance[key], 0);
        if (sum < minimumDistance) {
                minimumDistance=sum;
                index= i;
        }
      });
      console.log(minimumDistance,"--",index)
      state.recommended_house = index;
    },
    reset_Coordinates: (state) => {
      state.homeCordinates = [];
      state.hospitalCordinates = [];
      state.gymCordinates = [];
      state.restaurantCordinates = [];
      state.distance = [];
      state.recommended_house = -1;
    },
  },
});

export const {
  set_Gym_Cordinates,
  set_Home_Cordinates,
  set_Hospital_Cordinates,
  set_Restaurant_Cordinates,
  calc_distance,
  reset_Coordinates,
} = cordinateSlice.actions;

export default cordinateSlice.reducer;
