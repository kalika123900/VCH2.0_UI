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
import { storeStep3Info } from 'dan-actions/CampaignActions';
import { emailStep2Info } from 'dan-actions/BulkEmailActions';
import { storeRoleInfo } from 'dan-actions/RoleActions';
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
        addInfo({ ...this.props, workLocation: newValue });
        // addBulkEmailInfo({ ...this.props, workLocation: newValue });
      }
      if (this.props.type === 'roleDescriptors') {
        addRoleInfo({ ...this.props, roleDescriptors: newValue });
      }
      if (this.props.type === 'sectors') {
        addInfo({ ...this.props, interestedSectors: newValue });
        // addBulkEmailInfo({ ...this.props, interestedSectors: newValue });
      }
      if (this.props.type === 'courses') {
        addRoleInfo({ ...this.props, courses: newValue });
      }
      if (this.props.type === 'keywords') {
        addInfo({ ...this.props, keywords: newValue });
        // addBulkEmailInfo({ ...this.props, keywords: newValue });
      }
      // }
    }
    else {
      this.setState({ dataValue: '' });
      if (this.props.type === 'location') {
        addInfo({ ...this.props, workLocation: newValue });
        // addBulkEmailInfo({ ...this.props, workLocation: newValue });
      }
      if (this.props.type === 'roleDescriptors') {
        addRoleInfo({ ...this.props, roleDescriptors: newValue });
      }
      if (this.props.type === 'sectors') {
        addInfo({ ...this.props, interestedSectors: newValue });
        // addBulkEmailInfo({ ...this.props, interestedSectors: newValue });
      }
      if (this.props.type === 'courses') {
        addRoleInfo({ ...this.props, courses: newValue });
      }
      if (this.props.type === 'keywords') {
        addInfo({ ...this.props, keywords: newValue });
        // addBulkEmailInfo({ ...this.props, keywords: newValue });
      }
    }
  }

  render() {
    const { dataList, open, dialogValue } = this.state;
    const {
      type, workLocation, interestedSectors, keywords, courses, roleDescriptors
    } = this.props;
    const MapworkLocation = workLocation.toJS();
    const MapinterestedSectors = interestedSectors.toJS();
    const Mapkeywords = keywords.toJS();
    const MapCourses = courses.toJS();
    const MapRoleDescriptors = roleDescriptors.toJS();

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
  addInfo: PropTypes.func.isRequired,
  addRoleInfo: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired
};

const reducerCampaign = 'campaign';
const reducerBulkEmail = 'bulkEmail';
const reducerRole = 'role';

const mapStateToProps = state => ({
  university: state.getIn([reducerCampaign, 'university']),
  subjects: state.getIn([reducerCampaign, 'subjects']),
  skills: state.getIn([reducerCampaign, 'skills']),
  keywords: state.getIn([reducerCampaign, 'keywords']),
  gender: state.getIn([reducerCampaign, 'gender']),
  selectedYear: state.getIn([reducerCampaign, 'selectedYear']),
  ethnicity: state.getIn([reducerCampaign, 'ethnicity']),
  interestedSectors: state.getIn([reducerCampaign, 'interestedSectors']),
  workLocation: state.getIn([reducerCampaign, 'workLocation']),
  experience: state.getIn([reducerCampaign, 'experience']),
  minGrade: state.getIn([reducerCampaign, 'minGrade']),
  roleName: state.getIn([reducerRole, 'roleName']),
  courses: state.getIn([reducerRole, 'courses']),
  skills: state.getIn([reducerRole, 'skills']),
  roleDeadline: state.getIn([reducerRole, 'roleDeadline']),
  roleDescriptors: state.getIn([reducerRole, 'roleDescriptors']),
  roleLink: state.getIn([reducerRole, 'roleLink']),
  languages: state.getIn([reducerCampaign, 'languages']),
  qualificationType: state.getIn([reducerCampaign, 'qualificationType']),
  roleType: state.getIn([reducerRole, 'roleType']),
  experienceLevel: state.getIn([reducerRole, 'experienceLevel']),
  societies: state.getIn([reducerCampaign, 'societies']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep3Info, dispatch),
  addBulkEmailInfo: bindActionCreators(emailStep2Info, dispatch),
  addRoleInfo: bindActionCreators(storeRoleInfo, dispatch)
});

const SelectAddMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectAdd);

export default SelectAddMapped;
