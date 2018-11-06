import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { onEnterKey } from '../../utils';

const RecipeListItem = memo(
  ({ id, name, category, favorited, onClickOrPress, onFavorite }) => {
    const onKeyPress = onEnterKey(onFavorite);
    return (
      <li
        key={id}
        className="py2 border-bottom border-bottom-dashed pointer flex"
      >
        <span
          className="checkbox-container"
          role="checkbox"
          aria-checked={favorited}
          aria-label="check box to favorite recipe"
          id={id}
          onClick={onFavorite}
          tabIndex={id + id - 1}
          onKeyPress={onKeyPress}
        >
          <input
            aria-label="check box to favorite recipe"
            type="checkbox"
            checked={favorited}
            onChange={onFavorite}
          />
          <span className="checkmark" />
        </span>
        <button
          type="button"
          value={id}
          onClick={onClickOrPress}
          onKeyPress={onClickOrPress}
          className="menu-button"
          tabIndex={id + id}
        >
          {`${name} - ${category}`}
        </button>
      </li>
    );
  },
);

RecipeListItem.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  onClickOrPress: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

RecipeListItem.defaultProps = {
  id: 0,
  category: '',
  name: '',
  favorited: false,
  onClickOrPress: () => {},
  onFavorite: () => {},
};

export default RecipeListItem;
