import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: 5,
  cols: 5,
  gridData: Array(25).fill({ id: '', category: '', propertyScore: 0 }),
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
      state.gridData = Array(action.payload * state.cols).fill({ id: '', category: '', propertyScore: 0 });
    },
    setCols: (state, action) => {
      state.cols = action.payload;
      state.gridData = Array(state.rows * action.payload).fill({ id: '', category: '', propertyScore: 0 });
    },
    setGridItem: (state, action) => {
      state.gridData = state.gridData.map((gridItem, index) => {
        if (index === action.payload.id) {
          return {
            ...gridItem,
            id: action.payload.id,
            category: action.payload.category,
            propertyScore: gridItem.propertyScore + 1,
          };
        }
        return gridItem;
      });
    },
    resetGrid: (state) => {
      state.gridData = state.gridData.map((item) => ({ ...item, id: '', category: '', propertyScore: 0 }));
    },
  },
});

export const { setRows, setCols, setGridItem, resetGrid } = gridSlice.actions;

export default gridSlice.reducer;
