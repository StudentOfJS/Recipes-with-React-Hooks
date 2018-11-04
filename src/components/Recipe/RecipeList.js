import React, { memo } from "react";

export default memo(({ handleClick, style, recipes }) => {
  return (
    <div style={style}>
      <h2>Recipes</h2>
      <ul>
        {recipes.map(({ id, name, category }) => (
          <li key={id} onClick={() => handleClick(id)}>
            <span>{name}</span>
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
