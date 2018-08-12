import React, { Component, Fragment } from 'react';

import { generateId } from '../../tools/generation';
import Book from './Book/Book';
import styles from './BookList.css';

class BookList extends Component {
  shouldComponentUpdate(prevProps) {
    return JSON.stringify(this.props.books) !== JSON.stringify(prevProps.books);
  }

  renderBooks = () => this.props.books.length
    ? this.props.books.map(book => (
      <Book
        key={ generateId() }
        book={ book }
        onEdit={ this.props.onEdit }
        onRemove={ this.props.onRemove }
      />
    ))
    : (
      <Fragment>
        <p className={ styles.text }>Library is empty.</p>
        <p className={ styles.text }>You can add some book to the library.</p>
      </Fragment>
    )
  ;

  render() {
    return (
      <div className={ styles.list }>
        <h4 className={ styles.header }>
          Library
        </h4>
        { this.renderBooks() }
      </div>
    );
  }
}

export default BookList;
