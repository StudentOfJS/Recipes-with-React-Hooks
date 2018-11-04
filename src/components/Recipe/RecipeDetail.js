import React, { memo } from "react";
import classNames from "classnames";

export default memo(({ className, detail, error, loading, style }) => {
  if (!detail)
    return (
      <p
        className={classNames(
          "h3 p2 bg-white italic center rounded",
          className
        )}
        style={style}
      >
        Please select a recipe to see the detail
      </p>
    );
  return (
    <div style={style} className={classNames("p2 bg-white rounded", className)}>
      {error && <p>{error}</p>}
      {loading && <p>{loading}</p>}

      <span>
        <h2 className="h2">{detail.name}</h2>
        <h4>{detail.category}</h4>
      </span>
      <img
        src={detail.image}
        alt={detail.name + " image"}
        className="rounded fit"
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
