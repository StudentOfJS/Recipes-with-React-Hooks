import React, { useEffect } from 'react';
import RecipeDetail from './RecipeDetail';

const Recipe = ({ getDetail, recipe, id }) => {
  useEffect(
    () => {
      getDetail(id);
    },
    [id],
  );
  return (
    recipe.current === id && (
      <div>
        <RecipeDetail
          className="ml4"
          style={{ flex: 5 }}
          detail={recipe[recipe.current] || []}
          error={recipe.error || ''}
          loading={recipe.loading}
        />
      </div>
    )
  );
};

export default Recipe;
