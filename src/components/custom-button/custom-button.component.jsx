import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({ children, isGoogleButt, ...otherProps }) => (
  <button className={`${isGoogleButt? 'googlebutton' : ''} custom-button`} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
