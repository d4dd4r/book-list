import React from 'react';

import styles from './Wrapper.css';

const wrapper = ({ children }) => (
  <div className={ styles.wrapper }>
    { children }
  </div>
);

export default wrapper;
