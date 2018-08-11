import React, { Component } from 'react';

import styles from './HomePage.css';
import BookForm from '../../components/BookForm/BookForm';

class HomePage extends Component {
  state = {
    books: [],
    selectedBook: null,
    editMode: false,
  };

  render() {
    return (
      <div className={ styles.page }>
        <div className={ styles.wrapper }>
          <div className={ styles.form }>
            <BookForm
              book={ this.selectedBook }
              editMode={ this.state.editMode }
            />
          </div>
        </div>
        <div className={ styles.wrapper }>
          <div className={ styles.list }>
            {/*<BookList />*/}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
