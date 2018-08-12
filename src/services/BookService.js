import { Book } from '../modeles/Book';

const STORE_KEY = 'books';

export default class BookService {
  static getBooks() {
    const books = JSON.parse(
      localStorage.getItem(STORE_KEY)
    );

    return Array.isArray(books)
      ? books.map(book => new Book(book))
      : []
    ;
  }

  constructor(subscriber) {
    if (typeof subscriber === 'function') {
      this.subscriber = subscriber;
    }
  }

  _emit() {
    if (!this.subscriber) return;

    this.subscriber(BookService.getBooks());
  }

  _saveBooks(books = []) {
    localStorage.setItem(
      STORE_KEY, JSON.stringify(books)
    );

    this._emit();
  }

  saveBook(book) {
    if (!Book.isBook(book)) return;

    const books = BookService.getBooks();
    const index = books.findIndex(b => b.id === book.id);

    index === -1 ? books.push(book) : books[index] = book;
    this._saveBooks(books);
  }

  removeBook(book) {
    if (!Book.isBook(book)) return;

    const books = BookService.getBooks();
    const index = books.findIndex(b => b.id === book.id);

    if (index === -1) return;

    books.splice(index, 1);
    this._saveBooks(books);
  }
}