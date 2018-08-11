import React, { Component } from 'react';

import { VALIDATORS, checkValidity } from '../../tools/validation';
import Input from '../UI/Form/Input/Input';
import Button from '../UI/Button/Button';
import styles from './BookForm.css';

export default class BookForm extends Component {
  state = {
    form: {
      fields: {
        label: {
          label: 'Label',
          value: '',
          validation: [
            { type: VALIDATORS.REQUIRED },
          ],
          valid: false,
          blurred: false,
        },
        author: {
          label: 'Author',
          value: '',
          validation: [
            { type: VALIDATORS.REQUIRED },
          ],
          valid: false,
          blurred: false,
        },
        publication: {
          label: 'Publication date',
          type: 'number',
          value: '',
          validation: [
            { type: VALIDATORS.REQUIRED },
            { type: VALIDATORS.MIN_LENGTH, val: 4 },
            { type: VALIDATORS.MAX_LENGTH, val: 4 },
          ],
          valid: false,
          blurred: false,
        },
        pageCount: {
          label: 'Page count',
          type: 'number',
          value: '',
          validation: [
            { type: VALIDATORS.REQUIRED },
            { type: VALIDATORS.MIN_LENGTH, val: 2 },
            { type: VALIDATORS.MAX_LENGTH, val: 4 },
          ],
          valid: false,
          blurred: false,
        },
      },
      valid: false,
    },
  };

  isFormValid = fields => {
    let valid = true;

    Object.keys(fields).forEach(prop => {
      if (!valid) {
        return true;
      }

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

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className={ styles.form }>
        <h4 className={ styles.header }>
          Add a book to the library
        </h4>
        <form onSubmit={ this.onSubmit }>
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
