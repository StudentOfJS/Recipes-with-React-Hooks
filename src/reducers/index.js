export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, completed: true, fullList: [...action.payload] };
    case 'ERROR':
      return state;
    case 'ADD_FAVORITE':
      return {
        ...state,
        updateFavs: true,
        favorites: Object.assign(state.favorites, {
          [action.id]: state.fullList.find(r => r.id === Number(action.id)),
        }),
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        updateFavs: true,
        favorites: Object.assign(state.favorites, {
          [action.id]: null,
        }),
      };
    case 'RESET_FAV_CHECK':
      return { ...state, updateFavs: false };
    default:
      return state;
  }
};

export const recipeDetailReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CHANGE':
      return {
        ...state,
        current: action.id,
        loading: false,
      };
    case 'ADD':
      return {
        ...state,
        [action.id]: action.payload,
        current: action.id,
        loading: false,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
