import React from 'react';
import PropTypes from 'prop-types';
import RecipeListItem from './RecipeListItem';

const RecipeList = ({ handleClick, isFavorite, onFavorite, recipes }) => (
  <ul className="list-reset" role="Menu">
    {recipes.map(({ id, name, category }) => (
      <RecipeListItem
        key={id}
        onClickOrPress={handleClick}
        favorited={isFavorite(id)}
        id={id}
        name={name}
        category={category}
        onFavorite={onFavorite}
      />
    ))}
  </ul>
);

RecipeList.propTypes = {
  handleClick: PropTypes.func,
  isFavorite: PropTypes.func,
  onFavorite: PropTypes.func,
  recipes: PropTypes.arrayOf(PropTypes.object),
};

RecipeList.defaultProps = {
  handleClick: () => {},
  isFavorite: () => false,
  onFavorite: () => {},
  recipes: [],
};

export default RecipeList;
