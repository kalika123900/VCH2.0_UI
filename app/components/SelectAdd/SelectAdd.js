import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

class SelectAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: this.props.dataList,
      open: false,
      dialogValue: { id: -1, value: '' },
      dataValue: ''
    };
  }

  handleClose = () => {
    const value = { id: -1, value: '' };
    this.setState({ dialogValue: value, open: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const { dialogValue } = this.state;
    if (this.state.dataValue instanceof Array) {
      const temp = this.state.dataValue;
      temp.push(dialogValue);
      this.setState({ dataValue: temp });
    } else {
      const temp = [];
      temp.push(dialogValue);
      this.setState({ dataValue: temp });
    }

    this.handleClose();
  };

  handleChange = (event, newValue) => {
    const latest = newValue[newValue.length - 1];
    if (latest !== undefined) {
      if (newValue && (typeof latest === 'string' || latest.hasOwnProperty('inputValue'))) {
        this.setState({ open: true });
        this.setState({
          dialogValue: {
            id: null,
            value: latest.inputValue,
          }
        });
      } else {
        this.setState({ dataValue: newValue });
      }
    } else {
      this.setState({ dataValue: '' });
    }
  }

  render() {
    const {
      dataList, open, dialogValue, dataValue
    } = this.state;

    return (
      <Fragment>
        <Autocomplete
          style={{ width: '100%' }}
          multiple
          className={this.props.classes.autoComplete}
          value={dataValue}
          onChange={(e, newValue) => this.handleChange(e, newValue)}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                value: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          id="tags-standard"
          options={dataList}
          getOptionLabel={option => {
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.value;
          }}
          renderOption={option => option.value}
          style={{ width: 300 }}
          freeSolo
          renderInput={params => (
            <TextField
              className={this.props.classes.autoCompleteInner}
              {...params}
              label="Work Location"
              variant="outlined"
            />
          )}
        />
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Add a new location</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Did you miss any location in our list? Please, add it!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.value}
                onChange={event => this.setState({ ...dialogValue, id: event.target.value })}
                label="Location"
                type="text"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Fragment>
    );
  }
}

export default SelectAdd;
