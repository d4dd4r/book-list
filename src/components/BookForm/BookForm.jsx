import React from 'react';

import { checkValidity } from '../../tools/validation';
import { Book, getInitialStateFields } from '../../modeles/Book';
import Input from '../UI/Form/Input/Input';
import Button from '../UI/Button/Button';
import styles from './BookForm.css';

export default class BookForm extends React.Component {
  state = {
    form: {
      fields: {},
      valid: false,
    },
  };

  shouldComponentUpdate() {
    console.log('BookForm - Updated');
    return true;
  }

  getFields = selectedBook => ({
    ...this.state.form.fields,
    ...getInitialStateFields(selectedBook),
  });

  constructor(props) {
    super(props);

    this.state.form.fields = this.getFields(props.selectedBook);
    this.state.form.valid = this.isFormValid(this.state.form.fields);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.selectedBook) !== JSON.stringify(prevProps.selectedBook)) {
      const form = { ...this.state.form };
      form.fields = this.getFields(this.props.selectedBook);
      form.valid = this.isFormValid(form.fields);

      this.setState({ form });
    }
  }

  isFormValid(fields) {
    let valid = true;

    Object.keys(fields).forEach(prop => {
      if (!valid) return true;

      valid = valid && fields[prop].valid;
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
    const newBook = new Book({
      id: this.props.selectedBook ? this.props.selectedBook.id : null,
      label: fields.label.value,
      author: fields.author.value,
      publication: fields.publication.value,
      pageCount: fields.pageCount.value,
    });

    this.props.bookService.saveBook(newBook);
    this.formReset();
  };

  formReset = () => {
    const form = { ...this.state.form };
    form.valid = false;
    form.fields = {
      ...form.fields,
      ...getInitialStateFields()
    };

    this.setState({
      form
    }, this.props.onFormReset());
  };

  isResetButtonEnabled = () => {
    const fields = this.state.form.fields;

    return Object.keys(fields)
      .reduce(
        (prev, key) => prev || fields[key].value,
        false,
      )
    ;
  };

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
    const title = this.props.editMode
      ? 'Update the book'
      : 'Add a book to the library'
    ;

    return (
      <div className={ styles.form }>
        <h4 className={ styles.header }>
          { title }
        </h4>
        <form onSubmit={ this.onSubmit }>
          { this.renderFields() }
          <div className={ styles.control }>
            <Button
              cssClass={ styles.button }
              clicked={ this.formReset }
              disabled={ !this.isResetButtonEnabled() }
            >
              Reset
            </Button>

            <Button
              type="submit"
              disabled={ !this.state.form.valid }
              btnType="Success"
            >
              { this.props.editMode ? 'Update' : 'Add' }
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
