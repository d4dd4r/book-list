import React, { Component } from 'react';

import styles from './HomePage.css';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookService from '../../services/BookService';
import { Book } from '../../modeles/Book';

class HomePage extends Component {
  state = {
    books: [],
    selectedBook: undefined,
    editMode: false,
  };

  bookService = new BookService(books => (
    this.setState({ books })
  ));

  constructor(props) {
    super(props);

    this.state.books = BookService.getBooks();
  }

  shouldComponentUpdate() {
    console.log('HomePage - Updated');
    return true;
  }

  onBookEdit = book => {
    if (Book.isBook(book)) {
      this.setState({
        selectedBook: book,
        editMode: true,
      });
    }
  };

  onBookRemove = book => {
    console.log('onBookRemove', book);
    this.bookService.removeBook(book);
  };

  onFormReset = () => (
    this.setState({
      selectedBook: undefined,
      editMode: false,
    })
  );

  render() {
    return (
      <div className={ styles.page }>
        <div className={ styles.wrapper }>
          <div className={ styles.form }>
            <BookForm
              bookService={ this.bookService }
              selectedBook={ this.state.selectedBook }
              editMode={ this.state.editMode }
              onFormReset={ this.onFormReset }
            />
          </div>
        </div>
        <div className={ styles.wrapper }>
          <div className={ styles.list }>
            <BookList
              books={ this.state.books }
              onEdit={ this.onBookEdit }
              onRemove={ this.onBookRemove }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
