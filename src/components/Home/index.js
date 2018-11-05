import React, {
  Fragment,
  useReducer,
  useEffect,
  useState,
  lazy,
  Suspense,
} from 'react';
import { fetch } from 'whatwg-fetch';

import RecipeDetail from '../Recipe/RecipeDetail';
import Loading from '../Loading';

const RecipeList = lazy(() => import('../Recipe/RecipeList'));

const recipesReducer = (state, action) => {
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

const recipeDetailReducer = (state, action) => {
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

export default () => {
  const [favs, setFavs] = useState({});
  const [recipes, dispatch] = useReducer(recipesReducer, {
    favorites: {},
    fullList: [],
    completed: false,
    updateFavs: false,
  });
  const [recipeDetail, dispatchDetail] = useReducer(recipeDetailReducer, {
    loading: false,
    error: '',
  });

  useEffect(
    () => {
      fetch('http://reactrecipes.herokuapp.com/v1/recipes')
        .then(res => res.json())
        .then(payload => dispatch({ type: 'ADD', payload }))
        .catch(error => dispatch({ type: 'ERROR', error }));
    },
    [recipes.completed],
  );

  useEffect(
    () => {
      setFavs(recipes.favorites);
      dispatch({ type: 'RESET_FAV_CHECK' });
    },
    [recipes.updateFavs],
  );

  const onRecipeClick = e => {
    e.stopPropagation();
    e.preventDefault();
    const {
      currentTarget: { value },
    } = e;
    if (recipeDetail.current === value) return;
    const recipeExists = recipeDetail[value];
    if (recipeExists) {
      dispatchDetail({ type: 'CHANGE', value });
    } else {
      dispatchDetail({ type: 'LOADING' });
      fetch(`http://reactrecipes.herokuapp.com/v1/recipes/${value}`)
        .then(res => res.json())
        .then(payload => dispatchDetail({ type: 'ADD', value, payload }))
        .catch(error => dispatchDetail({ type: 'ERROR', error }));
    }
  };

  const isFavorite = id => !!favs[id];

  const onFavorite = e => {
    e.preventDefault();
    const { id } = e.currentTarget;
    if (recipes.favorites[id]) {
      dispatch({ type: 'REMOVE_FAVORITE', id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', id });
    }
  };

  return (
    <Fragment>
      <main className="px4 flex">
        <Suspense
          maxDuration={1200}
          fallback={<Loading text="Recipes are loading..." />}
        >
          <RecipeList
            style={{ flex: 3 }}
            recipes={recipes}
            handleClick={onRecipeClick}
            onFavorite={onFavorite}
            isFavorite={isFavorite}
          />
        </Suspense>
        <RecipeDetail
          className="ml4"
          style={{ flex: 5 }}
          detail={recipeDetail[recipeDetail.current]}
          error={recipeDetail.error}
          loading={recipeDetail.loading}
        />
      </main>
    </Fragment>
  );
};
