import React, { Fragment } from 'react';

import { generateId } from '../../tools/generation';
import Book from './Book/Book';
import styles from './BookList.css';

const bookList = ({
  books, onEdit, onRemove,
}) => {
  console.log('BookList updated');

  const renderBooks = () => books.length
    ? books.map(book => (
      <Book
        key={ generateId() }
        book={ book }
        onEdit={ onEdit }
        onRemove={ onRemove }
      />
    ))
    : (
      <Fragment>
        <p className={ styles.text }>Library is empty.</p>
        <p className={ styles.text }>You can add some book to the library.</p>
      </Fragment>
    )
  ;

  return (
    <div className={ styles.list }>
      <h4 className={ styles.header }>
        Library
      </h4>
      { renderBooks() }
    </div>
  );
};

export default bookList;
