const initialState = {
    rows: 5,
    cols: 5,
    gridData: Array(25).fill({ id: '', category: '', propertyScore: 0 })
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_ROWS':
        return {
          ...state,
          rows: action.payload,
          gridData: Array(action.payload * state.cols).fill({ id: '', category: '', propertyScore: 0 })
        };
      case 'SET_COLS':
        return {
          ...state,
          cols: action.payload,
          gridData: Array(state.rows * action.payload).fill({ id: '', category: '', propertyScore: 0 })
        };
      case 'SET_GRID_DATA':
        return {
          ...state,
          gridData: state.gridData.map((gridItem, index) => {
            if (index === action.payload.id) {
              return { ...gridItem, category: action.payload.category, id: action.payload.id, propertyScore: action.payload.propertyScore };
            }
            return gridItem;
          })
        };
      case 'RESET_GRID_DATA':
        return {
          ...state,
          gridData: state.gridData.map(item => ({ ...item, id:'' ,category: '', propertyScore: 0 }))
        };
      default:
        return state;
    }
  }
  
  export default rootReducer;
  