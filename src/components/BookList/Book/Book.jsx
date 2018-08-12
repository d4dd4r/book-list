import React from 'react';

import Button from '../../UI/Button/Button';
import styles from './Book.css';

const book = ({ book, onEdit, onRemove }) => (
  <div className={ styles.wrapper }>
    <div className={ styles.book }>
      <div className={ styles.info }>
        <p className={ styles.author }>{ book.author }</p>
        <p className={ styles.label }>{ book.label }</p>
      </div>
      <div className={ styles.actions }>
        <Button
          btnType="primary"
          cssClass={ styles.button }
          clicked={ () => onEdit(book) }
        >
          Edit
        </Button>
        <Button
          btnType="danger"
          cssClass={ styles.button }
          clicked={ () => onRemove(book) }
        >
          Remove
        </Button>
      </div>
    </div>
  </div>
);

export default book;
