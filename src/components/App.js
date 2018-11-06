import React, { lazy, Suspense, useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { fetch } from 'whatwg-fetch';

import Header from './Header';
import NotFound from './NotFound';
import Loading from './Loading';
import { recipesReducer, recipeDetailReducer } from '../reducers';
import Recipe from './Recipe';

const Home = lazy(() => import('./Home'));
const Favorites = lazy(() => import('./Favorites'));

const App = () => {
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

  const getRecipeDetail = id => {
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

  const onRecipeClick = e => {
    e.stopPropagation();
    e.preventDefault();
    const {
      currentTarget: { value },
    } = e;
    getRecipeDetail(value);
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

  const favList = Object.keys(recipes.favorites).reduce(
    (ar, key) =>
      recipes.favorites[key] ? ar.concat(recipes.favorites[key]) : ar,
    [],
  );

  return (
    <BrowserRouter>
      <main>
        <Header />
        <Switch>
          <Redirect from="/home" to="/" />
          <Suspense maxDuration={800} fallback={<Loading text="loading..." />}>
            <Route
              path="/favorites"
              render={() => (
                <Favorites
                  onRecipeClick={onRecipeClick}
                  isFavorite={isFavorite}
                  onFavorite={onFavorite}
                  recipes={favList}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  onRecipeClick={onRecipeClick}
                  isFavorite={isFavorite}
                  onFavorite={onFavorite}
                  recipes={recipes.fullList}
                  recipeDetail={recipeDetail}
                />
              )}
            />
            <Route
              path="/recipe/:id"
              render={({
                match: {
                  params: { id },
                },
              }) => (
                <Recipe
                  id={id}
                  recipe={recipeDetail}
                  getDetail={getRecipeDetail}
                />
              )}
            />
          </Suspense>
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
