import React, { memo } from 'react';
import RecipeList from '../Recipe/RecipeList';

export default memo(({ isFavorite, onFavorite, onRecipeClick, recipes }) => (
  <div className="px4">
    <h2 className="h2">Favorites</h2>
    <RecipeList
      recipes={recipes}
      handleClick={onRecipeClick}
      onFavorite={onFavorite}
      isFavorite={isFavorite}
    />
  </div>
));
