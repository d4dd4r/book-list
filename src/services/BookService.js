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

  saveBooks(books = []) {
    localStorage.setItem(
      STORE_KEY, JSON.stringify(books)
    );

    this._emit();
  }

  saveBook(book) {
    if (!Book.isBook(book)) return;

    const books = BookService.getBooks();
    books.push(book);

    this.saveBooks(books);
  }

  removeBook(book) {
    if (!Book.isBook(book)) return;

    const books = BookService.getBooks();
    const index = books.findIndex(b => b.id === book.id);
    console.log('books', books);
    console.log('book', book);
    if (index === -1) return;

    books.splice(index, 1);
    this.saveBooks(books);
  }

  _emit() {
    if (!this.subscriber) return;

    this.subscriber(BookService.getBooks());
  }
}