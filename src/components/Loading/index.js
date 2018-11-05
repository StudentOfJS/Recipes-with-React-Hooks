import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ text }) => (
  <div style={{ flex: 5 }} className="ml4">
    <h2>{text}</h2>
  </div>
);

export default Loading;

Loading.propTypes = {
  text: PropTypes.string.isRequired,
};
