import React, { memo } from 'react';

export default memo(({ favorites }) => (
  <div>
    <h2>Favorites</h2>
    {favorites}
  </div>
));
