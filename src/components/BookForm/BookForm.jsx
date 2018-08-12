import React, { Component } from 'react';

import { checkValidity } from '../../tools/validation';
import BookService from '../../services/BookService';
import { Book, getInitialStateFields } from '../../modeles/Book';
import Input from '../UI/Form/Input/Input';
import Button from '../UI/Button/Button';
import styles from './BookForm.css';

export default class BookForm extends Component {
  state = {
    form: {
      fields: {},
      valid: false,
    },
  };

  bookService = new BookService();
  formEl = null;

  shouldComponentUpdate() {
    console.log('BookForm - Updated');
    return true;
  }

  constructor(props) {
    super(props);

    const fields = getInitialStateFields(props.selectedBook);
    this.state.form.fields = {
      ...this.state.form.fields,
      ...fields,
    };
    this.state.form.valid = this.isFormValid(this.state.form.fields);
  }


  isFormValid(fields) {
    let valid = true;

    Object.keys(fields).forEach(prop => {
      if (!valid) return true;

      valid = valid && this.state.form.fields[prop].valid;
    });

    return valid;
  };

  onChange = (e, name) => {
    const updatedForm = { ...this.state.form };
    const updatedField = { ...updatedForm.fields[name] };

    updatedField.value = e.target.value;
    updatedField.valid = checkValidity(
      updatedField.value, updatedField.validation
    );
    updatedForm.fields[name] = updatedField;
    updatedForm.valid = this.isFormValid(updatedForm.fields);
    this.setState({ form: updatedForm });
  };

  onBlur = (e, name) => {
    if (this.state.form.fields[name].blurred) {
      return;
    }

    const updatedForm = { ...this.state.form };
    const updatedField = { ...updatedForm.fields[name] };

    updatedField.blurred = true;
    updatedForm.fields[name] = updatedField;
    this.setState({ form: updatedForm });
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.form.valid) return;

    const fields = this.state.form.fields;
    const newBook = new Book(
      fields.label.value,
      fields.author.value,
      fields.publication.value,
      fields.pageCount.value,
    );

    this.bookService.saveBook(newBook);
    this.formReset();
  };

  formReset() {
    const form = { ...this.state.form };
    form.valid = false;
    form.fields = {
      ...form.fields,
      ...getInitialStateFields()
    };

    this.setState({
      form
    });
  }

  renderFields = () => {
    const fields = this.state.form.fields;

    return Object.keys(fields).map(name => (
      <Input
        key={ name }
        name={ name }
        placeholder={ fields[name].label }
        value={ fields[name].value }
        type={ fields[name].type }
        valid={ fields[name].valid }
        blurred={ fields[name].blurred }
        onChange={ e => this.onChange(e, name) }
        onBlur={ e => this.onBlur(e, name) }
      />
    ));
  };

  render() {
    return (
      <div className={ styles.form }>
        <h4 className={ styles.header }>
          Add a book to the library
        </h4>
        <form
          onSubmit={ this.onSubmit }
          ref={ el => this.formEl = el }
        >
          { this.renderFields() }
          <div className={ styles.control }>
            <Button
              type="submit"
              disabled={ !this.state.form.valid }
              btnType="Success"
            >
              { this.props.editMode ? 'Update' : 'Create' }
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
