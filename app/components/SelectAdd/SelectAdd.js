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
      dialogValue: { id: '', value: '' },
      dataValue: ''
    }
  }
  render() {
    const { dataList, open, dialogValue, dataValue } = this.state;

    return (
      <Fragment>
        <Autocomplete
          style={{ width: '100%' }}
          multiple
          className={this.props.classes.autoComplete}
          value={dataValue}
          onChange={(event, newValue) => {
            let latest = newValue[newValue.length - 1];
            if (newValue && latest.hasOwnProperty('inputValue')) {
              this.setState({ open: true });
              this.setState({
                dialogValue: {
                  id: null,
                  value: latest.inputValue,
                }
              })
            }
            this.setState({ dataValue: newValue })
          }}
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
              label="Free solo dialog"
              variant="outlined"
            />
          )}
        />
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Add a new film</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Did you miss any film in our list? Please, add it!
            </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.id}
                onChange={event => this.setState({ ...dialogValue, id: event.target.value })}
                label="title"
                type="text"
              />
              <TextField
                margin="dense"
                id="name"
                value={dialogValue.value}
                onChange={event => this.setState({ ...dialogValue, value: event.target.value })}
                label="year"
                type="number"
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
    )
  }
}

export default SelectAdd;
