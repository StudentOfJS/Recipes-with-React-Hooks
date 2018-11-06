import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const RecipeDetail = memo(({ className, detail, style }) => (
  <div style={style} className={classNames('p2 bg-white rounded', className)}>
    <span>
      <h2 className="h2">{detail.name}</h2>
      <h4>{detail.category}</h4>
    </span>
    <img src={detail.image} alt={detail.name} className="rounded fit" />
    <h3>Ingredients</h3>
    <ul>
      {detail.ingredients.map((ingredient, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={`ingredient-${i}`}>{ingredient}</li>
      ))}
    </ul>
    <h3>Steps</h3>
    <ol>
      {detail.steps.map((step, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={`step-${i}`}>{step}</li>
      ))}
    </ol>
  </div>
));

RecipeDetail.propTypes = {
  className: PropTypes.string,
  detail: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    calories: PropTypes.number,
    ingredients: PropTypes.array,
    steps: PropTypes.array,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

RecipeDetail.defaultProps = {
  className: 'ml4',
  detail: {
    name: '',
    image: '',
    category: '',
    calories: 0,
    ingredients: [],
    steps: [],
  },
  // eslint-disable-next-line react/forbid-prop-types
  style: { flex: 5 },
};

export default RecipeDetail;
