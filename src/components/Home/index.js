import React, { Fragment, useReducer, useEffect, lazy, Suspense } from 'react';
import { fetch } from 'whatwg-fetch';

import RecipeDetail from '../Recipe/RecipeDetail';

const RecipeList = lazy(() => import('../Recipe/RecipeList'));

const loadingFunction = () => (
  <div style={{ flex: 5 }}>
    <h2>Recipe list is loading...</h2>
  </div>
);

const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return action.payload;
    case 'ERROR':
      return state;
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
  const [recipes, dispatch] = useReducer(recipesReducer, []);
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
    [recipes],
  );

  const onRecipeClick = id => {
    if (recipeDetail.current === id) return;
    const recipeExists = recipeDetail[id];
    if (recipeExists) {
      dispatchDetail({ type: 'CHANGE', id });
    } else {
      dispatchDetail({ type: 'LOADING' });
      fetch(`http://reactrecipes.herokuapp.com/v1/recipes/${id}`)
        .then(res => res.json())
        .then(payload => dispatchDetail({ type: 'ADD', id, payload }))
        .catch(error => dispatchDetail({ type: 'ERROR', error }));
    }
  };

  return (
    <Fragment>
      <main className="px4 flex">
        <Suspense maxDuration={800} fallback={loadingFunction()}>
          <RecipeList
            style={{ flex: 3 }}
            recipes={recipes}
            handleClick={onRecipeClick}
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
