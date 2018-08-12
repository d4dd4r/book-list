import { VALIDATORS, checkValidity } from '../tools/validation';
import { generateId } from '../tools/generation';

export class Book {
  static isBook(book) {
    return book instanceof Book;
  }

  constructor(data = {}) {
    this.id = data.id || generateId();
    this.label = data.label || '';
    this.author = data.author || '';
    this.publication = data.publication || '';
    this.pageCount = data.pageCount || '';
  }
}

export const getInitialStateFields = (book = new Book()) => {
  const validation = {
    label: [
      { type: VALIDATORS.REQUIRED },
    ],
    author: [
      { type: VALIDATORS.REQUIRED },
    ],
    publication: [
      { type: VALIDATORS.REQUIRED },
      { type: VALIDATORS.MIN_LENGTH, val: 4 },
      { type: VALIDATORS.MAX_LENGTH, val: 4 },
    ],
    pageCount: [
      { type: VALIDATORS.REQUIRED },
      { type: VALIDATORS.MIN_LENGTH, val: 2 },
      { type: VALIDATORS.MAX_LENGTH, val: 4 },
    ],
  };

  return {
    label: {
      label: 'Label',
      value: book.label,
      validation: validation.label,
      valid: checkValidity(book.label, validation.label),
      blurred: false,
    },
    author: {
      label: 'Author',
      value: book.author,
      validation: validation.author,
      valid: checkValidity(book.author, validation.author),
      blurred: false,
    },
    publication: {
      label: 'Publication date',
      type: 'number',
      value: book.publication,
      validation: validation.publication,
      valid: checkValidity(book.publication, validation.publication),
      blurred: false,
    },
    pageCount: {
      label: 'Page count',
      type: 'number',
      value: book.pageCount,
      validation: validation.pageCount,
      valid: checkValidity(book.pageCount, validation.pageCount),
      blurred: false,
    },
  };
};
