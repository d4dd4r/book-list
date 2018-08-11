import React from 'react';

import Wrapper from '../Wrapper/Wrapper';
import styles from './Input.css';

const input = ({
  blurred, valid, name, value, type,
  onChange, onBlur, placeholder,
}) => {
  let tooltip = null;
  const classes = [styles.field];

  if (blurred && !valid) {
    classes.push(styles.invalid);
    tooltip = <small className={ styles.tooltip }>Please enter a valid value!</small>;
  }

  return (
    <Wrapper>
      <input
        className={ classes.join(' ') }
        name={ name }
        value={ value }
        type={ type || 'text' }
        onChange={ onChange }
        onBlur={ onBlur }
        autoComplete="off" />
      <span className={ styles.label }>
        { placeholder }
      </span>
      { tooltip }
    </Wrapper>
  );
};

export default input;
