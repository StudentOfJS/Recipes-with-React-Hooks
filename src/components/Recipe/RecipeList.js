import React from 'react';
import PropTypes from 'prop-types';
import RecipeListItem from './RecipeListItem';

const RecipeList = ({ handleClick, isFavorite, onFavorite, recipes }) => (
  <ul className="list-reset" role="Menu">
    {recipes.map(({ id, name, category }) => (
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
);

RecipeList.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeList;
