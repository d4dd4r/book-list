import React from 'react';

import { generateId } from '../../tools/generation';
import Book from './Book/Book';
import styles from './BookList.css';

const bookList = ({
  books, onEdit, onRemove,
}) => {
  console.log('BookList updated');

  const renderBooks = () => books.map(book => (
    <Book
      key={ generateId() }
      book={ book }
      onEdit={ onEdit }
      onRemove={ onRemove }
    />
  ));

  return (
    <div className={ styles.list }>
      { renderBooks() }
    </div>
  );
};

export default bookList;
