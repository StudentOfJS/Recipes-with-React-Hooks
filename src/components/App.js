import React, { Fragment, useReducer, useEffect, memo } from "react";
import { fetch } from "whatwg-fetch";
import Header from "./Header";
import RecipeList from "./Recipe/RecipeList";
import RecipeDetail from "./Recipe/RecipeDetail";

const recipesReducer = (state, action) => {
  console.log(JSON.stringify(state));
  if (JSON.stringify(state) !== JSON.stringify(action)) {
    return action;
  } else {
    return state;
  }
};

export default () => {
  const [recipes, dispatch] = useReducer(recipesReducer, []);

  useEffect(
    () => {
      fetch(`http://reactrecipes.herokuapp.com/v1/recipes`)
        .then(res => res.json())
        .then(json => dispatch(json));
    },
    [recipes]
  );
  return (
    <Fragment>
      <Header />
      <main style={{ display: "flex" }}>
        <RecipeList style={{ flex: 3 }} recipes={recipes} />
        <RecipeDetail style={{ flex: 5 }} />
      </main>
    </Fragment>
  );
};
