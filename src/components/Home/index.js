import React, { Fragment, lazy, memo, Suspense } from 'react';
import PropTypes from 'prop-types';

import RecipeDetail from '../Recipe/RecipeDetail';
import Loading from '../Loading';

const RecipeList = lazy(() => import('../Recipe/RecipeList'));

const Home = memo(
  ({ recipes, onRecipeClick, onFavorite, isFavorite, recipeDetail }) => (
    <Fragment>
      <main className="px4 flex">
        <div style={{ flex: 3 }}>
          <h2 className="h2">Recipes</h2>
          <Suspense
            maxDuration={1200}
            fallback={<Loading text="Recipes are loading..." />}
          >
            <RecipeList
              recipes={recipes}
              handleClick={onRecipeClick}
              onFavorite={onFavorite}
              isFavorite={isFavorite}
            />
          </Suspense>
        </div>
        <RecipeDetail
          className="ml4"
          style={{ flex: 5 }}
          detail={recipeDetail[recipeDetail.current]}
          error={recipeDetail.error}
          loading={recipeDetail.loading}
        />
      </main>
    </Fragment>
  ),
);

Home.propTypes = {
  onRecipeClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object.isRequired,
  recipes: PropTypes.shape({
    fullList: PropTypes.array,
    favorites: PropTypes.object,
    completed: PropTypes.bool,
    updateFavs: PropTypes.bool,
  }).isRequired,
  recipeDetail: PropTypes.shape({
    detail: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      category: PropTypes.string,
      calories: PropTypes.calories,
      ingredients: PropTypes.array,
      steps: PropTypes.array,
    }),
    error: PropTypes.error,
    loading: PropTypes.bool,
  }),
};

export default Home;
