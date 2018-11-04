import React, { memo } from 'react';
import PropTypes from 'prop-types';

const RecipeList = memo(({ handleClick, style, recipes }) => (
  <div style={style}>
    <h2 className="h2">Recipes</h2>
    <ul className="list-reset" role="Menu">
      {recipes.map(({ id, name, category }) => {
        const onClickOrPress = e => {
          e.preventDefault();
          handleClick(id);
        };
        return (
          <li
            key={id}
            className="py2 border-bottom border-bottom-dashed pointer"
          >
            <button
              type="button"
              onClick={onClickOrPress}
              onKeyPress={onClickOrPress}
              className="menu-button"
            >
              {`${name} - ${category}`}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
));

RecipeList.propTypes = {
  handleClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object),
};

export default RecipeList;
