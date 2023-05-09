import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: 5,
  cols: 5,
  gridData: Array(25).fill({ id: '', category: '', plotName:'', plotScore: 0, }),
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
      state.gridData = Array(action.payload * state.cols).fill({ id: '', category: '', plotScore: 0, plotName:'' });
    },
    setCols: (state, action) => {
      state.cols = action.payload;
      state.gridData = Array(state.rows * action.payload).fill({ id: '', category: '', plotScore: 0,plotName:'' });
    },
    setGridItem: (state, action) => {
      state.gridData = state.gridData.map((gridItem, index) => {
        if (index === action.payload.id) {
          return {
            ...gridItem,
            id: action.payload.id,
            category: action.payload.category,
            plotName: action.payload.plotName,
            plotScore: gridItem.plotScore + 1
          };
        }
        return gridItem;
      });
    },
    updateGridItem: (state, action) => {
        const { id, category,plotName } = action.payload;
        state.gridData[id] = { id, category, plotName };
      },
    resetGrid: (state) => {
      state.gridData = state.gridData.map((item) => ({ ...item, id: '', category: '', plotScore: 0, plotName:'' }));
    },
  },
});

export const { setRows, setCols, setGridItem, updateGridItem,resetGrid } = gridSlice.actions;

export default gridSlice.reducer;
