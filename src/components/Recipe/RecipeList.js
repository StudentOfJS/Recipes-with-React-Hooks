import React, { memo } from "react";

export default memo(({ handleClick, style, recipes }) => {
  return (
    <div style={style}>
      <h2 className="h2">Recipes</h2>
      <ul className="list-reset">
        {recipes.map(({ id, name, category }) => (
          <li
            key={id}
            onClick={() => handleClick(id)}
            className="py2 border-bottom border-bottom-dashed pointer"
          >
            <span>{name}</span>
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
