import React from 'react';

import styles from './Button.css';

const button = ({
  disabled, type, btnType, clicked, children,
}) => (
  <button
      disabled={ disabled }
      type={ type || 'button' }
      className={ [styles.button, styles[btnType]].join(' ') }
      onClick={ clicked }>
    { children }
  </button>
);

export default button;
