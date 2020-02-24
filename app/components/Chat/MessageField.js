import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { val } = this.state;
    const { onChange } = this.props;
    const value = e ? e.target.value : val;

    this.setState({ value }, () => {
      if (typeof onChange === 'function') {
        onChange(e, value);
      }
    });
  }

  onPickerkeypress(e) {
    if (e.keyCode === 27 || e.which === 27 || e.key === 'Escape' || e.code === 'Escape') {
      this.closePicker();
    }
  }

  render() {
    const {
      onChange,
      fieldType,
      ...rest
    } = this.props;

    const className = `emoji-text-field emoji-${fieldType}`;
    const { value } = this.state;
    const isInput = fieldType === 'input';
    const ref = (_field) => {
      this._field = _field;
      return this._field;
    };

    return (
      <div className={className}>
        { (isInput) && (<input {...rest} onChange={this.onChange} type="text" ref={ref} value={value} />) }
        { (!isInput) && (<textarea {...rest} onChange={this.onChange} ref={ref} value={value} />) }
      </div>
    );
  }
}

MessageField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  fieldType: PropTypes.string.isRequired
};

MessageField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default MessageField;
