import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { emailStep2Info } from 'dan-actions/BulkEmailActions';
import { withStyles } from '@material-ui/core/styles';

const filter = createFilterOptions();
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiAutocomplete-tag': {
      paddingTop: '0px !important',
    },
  },
})(() => null);

class SelectAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: this.props.dataList,
      open: false,
      dialogValue: '',
      dataValue: ''
    };
  }

  handleClose = () => {
    const value = '';
    this.setState({ dialogValue: value, open: false });
  };

  handleSubmit = (event, type) => {
    // event.preventDefault();
    // event.stopPropagation();

    // const { dialogValue } = this.state;
    // if (this.state.dataValue instanceof Array) {
    //   const temp = this.state.dataValue;
    //   temp.push(dialogValue);
    //   this.setState({ dataValue: temp });
    // } else {
    //   const temp = [];
    //   temp.push(dialogValue);
    //   this.setState({ dataValue: temp });
    // }
    // this.handleClose();
  };

  handleChange = (event, newValue) => {
    const { addInfo, addBulkEmailInfo, addRoleInfo } = this.props;

    const latest = newValue[newValue.length - 1];
    if (latest !== undefined) {
      // if (newValue && (typeof latest === 'string' || latest.hasOwnProperty('inputValue'))) {
      //   this.setState({ open: true });
      //   this.setState({
      //     dialogValue: latest.inputValue
      //   });
      // } 
      // else {
      this.setState({ dataValue: newValue });
      if (this.props.type === 'location') {
        addBulkEmailInfo({ ...this.props, workLocation: newValue });
      }
      if (this.props.type === 'sectors') {
        addBulkEmailInfo({ ...this.props, interestedSectors: newValue });
      }
      if (this.props.type === 'keywords') {
        addBulkEmailInfo({ ...this.props, keywords: newValue });
      }
      // }
    }
    else {
      this.setState({ dataValue: '' });
      if (this.props.type === 'location') {
        addBulkEmailInfo({ ...this.props, workLocation: newValue });
      }
      if (this.props.type === 'sectors') {
        addBulkEmailInfo({ ...this.props, interestedSectors: newValue });
      }
      if (this.props.type === 'keywords') {
        addBulkEmailInfo({ ...this.props, keywords: newValue });
      }
    }
  }

  render() {
    const { dataList, open, dialogValue } = this.state;
    const {
      type, workLocation, interestedSectors, keywords,
    } = this.props;
    const MapworkLocation = workLocation.toJS();
    const MapinterestedSectors = interestedSectors.toJS();
    const Mapkeywords = keywords.toJS();

    return (
      <Fragment>
        <GlobalCss />
        <Autocomplete
          style={{ width: '100%' }}
          multiple
          defaultValue={type == 'location' ? [dataList[1]] : null}
          className={this.props.classes.autoComplete}
          value={
            type === 'location'
              ? MapworkLocation
              : type === 'keywords'
                ? Mapkeywords
                : type === 'courses'
                  ? MapCourses
                  : type === 'roleDescriptors'
                    ? MapRoleDescriptors
                    : MapinterestedSectors
          }
          onChange={(e, newValue) => this.handleChange(e, newValue)}
          // filterOptions={(options, params) => {
          //   const filtered = filter(options, params);

          //   if (params.inputValue !== '') {
          //     filtered.push({
          //       inputValue: params.inputValue,
          //       value: `Add "${params.inputValue}"`,
          //     });
          //   }

          //   return filtered;
          // }}
          id={this.props.type}
          options={dataList}
          getOptionLabel={option => {
            if (typeof option === 'undefined') {
              return;
            }
            if (typeof option === 'string') {
              return option;
            }
            // if (option.hasOwnProperty('inputValue')) {
            //   return option;
            // }
            return option;
          }}
          renderOption={option => option}
          style={{ width: 300 }}
          freeSolo
          renderInput={params => (
            <TextField
              className={this.props.classes.autoCompleteInner}
              {...params}
              label={this.props.label}
              variant="outlined"
            />
          )}
        />
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={(e) => this.handleSubmit(e, this.props.type)}>
            <DialogTitle id="form-dialog-title">
              Add a new
              {this.props.label}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Did you miss any
                {' '}
                {this.props.label}
                {' '}
                in our list? Please, add it!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue}
                onChange={event => this.setState({ dialogValue })}
                label={this.props.label}
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

SelectAdd.propTypes = {
  classes: PropTypes.object.isRequired,
  university: PropTypes.object.isRequired,
  subjects: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  keywords: PropTypes.object.isRequired,
  gender: PropTypes.object.isRequired,
  selectedYear: PropTypes.object.isRequired,
  ethnicity: PropTypes.string.isRequired,
  interestedSectors: PropTypes.object.isRequired,
  workLocation: PropTypes.object.isRequired,
  experience: PropTypes.string.isRequired,
  minGrade: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired
};

const reducerBulkEmail = 'bulkEmail';

const mapStateToProps = state => ({
  university: state.getIn([reducerBulkEmail, 'university']),
  subjects: state.getIn([reducerBulkEmail, 'subjects']),
  skills: state.getIn([reducerBulkEmail, 'skills']),
  keywords: state.getIn([reducerBulkEmail, 'keywords']),
  gender: state.getIn([reducerBulkEmail, 'gender']),
  selectedYear: state.getIn([reducerBulkEmail, 'selectedYear']),
  ethnicity: state.getIn([reducerBulkEmail, 'ethnicity']),
  interestedSectors: state.getIn([reducerBulkEmail, 'interestedSectors']),
  workLocation: state.getIn([reducerBulkEmail, 'workLocation']),
  experience: state.getIn([reducerBulkEmail, 'experience']),
  minGrade: state.getIn([reducerBulkEmail, 'minGrade']),
  languages: state.getIn([reducerBulkEmail, 'languages']),
  qualificationType: state.getIn([reducerBulkEmail, 'qualificationType']),
});

const mapDispatchToProps = dispatch => ({
  addBulkEmailInfo: bindActionCreators(emailStep2Info, dispatch)
});

const SelectAddMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectAdd);

export default SelectAddMapped;
