import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: 0,
  cols: 0,
  gridData: Array(0).fill({ 
    id: '', 
    category: '', 
    plotName:'', 
    coordinates: {row:-1,col:-1}, 
    plotScore: 0,
  }),
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    set_Rows: (state, action) => {
      state.rows = action.payload;
      state.gridData = Array(action.payload * state.cols).fill({id:'' , category: '', plotScore: 0, plotName:''});
    },
    set_Cols: (state, action) => {
      state.cols = action.payload;
      state.gridData = Array(state.rows * action.payload).fill({id:'', category: '', plotScore: 0,plotName:'' });
    },

    update_Coordinates: (state, action) => {
      const {id, coordinates} = action.payload;
      state.gridData[id].coordinates = coordinates;
      state.gridData[id].id = id;
    },
    set_GridItem: (state, action) => {
      state.gridData = state.gridData.map((gridItem, index) => {
        if (index === action.payload.id) {
          return {
            ...gridItem,
            id: action.payload.id,
            category: action.payload.category,
            plotName: action.payload.plotName,
            plotScore: gridItem.plotScore + 1,
          };
        }
        return gridItem;
      });
    },
    update_GridItem: (state, action) => {
      const newGrid = state.gridData = state.gridData.map((gridItem, index) => {
        if (index === action.payload.id) {
          return {
            ...gridItem,
            category: action.payload.category,
            plotName: `${gridItem.plotName}+${action.payload.plotName}`,
            plotScore: gridItem.plotScore + 1,
          };
        }
        return gridItem;
      });
      state.gridData = newGrid
    },

    reset_Grid: (state) => {
      // state.gridData = state.gridData.map((item) => ({ ...item, category: '', plotScore: 0, plotName:'' }));
      state.gridData = [];
    },
  },
});

export const { set_Rows, set_Cols, set_GridItem,update_GridItem,reset_Grid, update_Coordinates } = gridSlice.actions;

export default gridSlice.reducer;
