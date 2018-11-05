import React from 'react';
import PropTypes from 'prop-types';
import RecipeListItem from './RecipeListItem';

const RecipeList = ({
  handleClick,
  isFavorite,
  onFavorite,
  style,
  recipes,
}) => (
  <div style={style}>
    <h2 className="h2">Recipes</h2>
    <ul className="list-reset" role="Menu">
      {recipes.fullList.map(({ id, name, category }) => (
        <RecipeListItem
          onClickOrPress={handleClick}
          favorited={isFavorite(id)}
          id={id}
          name={name}
          category={category}
          onFavorite={onFavorite}
        />
      ))}
    </ul>
  </div>
);

RecipeList.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object.isRequired,
  recipes: PropTypes.shape({
    fullList: PropTypes.array,
    favorites: PropTypes.object,
  }).isRequired,
};

export default RecipeList;
