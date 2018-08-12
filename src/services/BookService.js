import { Book } from '../modeles/Book';

const STORE_KEY = 'books';

export default class BookService {
  constructor(subscriber) {
    this.subscriber = subscriber;
  }

  getBooks() {
    const books = localStorage.getItem(STORE_KEY);
    return books ? JSON.parse(books) : [];
  }

  saveBooks(books = []) {
    localStorage.setItem(
      STORE_KEY, JSON.stringify(books)
    );

    this._emit();
  }

  saveBook(book) {
    if (!(book instanceof Book)) return;

    const books = this.getBooks();
    books.push(book);

    this.saveBooks(books);
  }

  removeBook(id) {
    const books = this.getBooks();
    const index = books.findIndex(book => book.id === id);

    if (index === -1) return;

    books.splice(index, 1);
    this.saveBooks(books);
  }

  _emit() {
    if (!this.subscriber) return;

    this.subscriber(this.getBooks());
  }
}