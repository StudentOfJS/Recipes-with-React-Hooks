import React, { memo } from "react";

export default memo(({ detail, error, loading, style }) => {
  if (!detail) return;
  return (
    <div style={style}>
      {error && <p>{error}</p>}
      {loading && <p>{loading}</p>}

      <span>
        <h2>{detail.name}</h2>
        <h4>{detail.category}</h4>
      </span>
      <img
        src={detail.image}
        alt={detail.name + " image"}
        style={{ width: 300, borderRadius: 10 }}
      />
      <h3>Ingredients</h3>
      <ul>
        {detail.ingredients.map((ingredient, i) => (
          <li key={`ingredient-${i}`}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps</h3>
      <ol>
        {detail.steps.map((step, i) => (
          <li key={`step-${i}`}>{step}</li>
        ))}
      </ol>
    </div>
  );
});
