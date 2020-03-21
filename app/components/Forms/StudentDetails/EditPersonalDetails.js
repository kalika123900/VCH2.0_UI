import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MaterialDropZone from '../../Forms/MaterialDropZone';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import { storeProfileDetails } from 'dan-actions/studentProfileActions';
import { makeSecureDecrypt } from 'dan-helpers/security';
import qs from 'qs';
import { genderItems, ethnicityItems, nationalityItems } from 'dan-api/apps/profileOption';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const emailValidator = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class EditPersonalDetails extends React.Component {

  handleDOB = date => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, dob: date });
  };

  handleChange = event => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
      firstName,
      lastName,
      alternateEmail,
      phoneNumber,
      dob,
      nationality,
      files,
      ethnicity,
      gender,
      handleSubmit
    } = this.props;

    return (

      <section className={classes.pageFormWrap}>
        <form >
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="First Name"
                className={classes.textField}
                type="text"
                value={firstName}
                name="firstName"
                margin="normal"
                variant="outlined"
                validate={[required]}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="Last Name"
                className={classes.textField}
                type="text"
                name="lastName"
                value={lastName}
                margin="normal"
                variant="outlined"
                validate={[required]}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="Email"
                className={classes.textField}
                type="email"
                name="alternateEmail"
                value={alternateEmail}
                autoComplete="email"
                margin="normal"
                variant="outlined"
                validate={[required, emailValidator]}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="Phone Number"
                className={classes.textField}
                type="text"
                value={phoneNumber}
                autoComplete="phone"
                name="phoneNumber"
                margin="normal"
                variant="outlined"
                validate={[required]}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  placeholder="Date of Birth"
                  format="dd/MM/yyyy"
                  value={dob}
                  name="dob"
                  onChange={this.handleDOB}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-gender"
              >
                Gender
                  </InputLabel>
              <Select
                placeholder="select-gender"
                value={gender}
                name="gender"
                onChange={e => this.handleChange(e)}
                MenuProps={MenuProps}
              >
                {genderItems.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>

            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-ethnicity"
              >
                Ethnicity
                  </InputLabel>
              <Select
                placeholder="select-ethnicity"
                value={ethnicity}
                name="ethnicity"
                onChange={e => this.handleChange(e)}
                MenuProps={MenuProps}
              >
                {ethnicityItems.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>

            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-nationality"
              >
                Nationality
                  </InputLabel>
              <Select
                placeholder="select-nationality"
                value={nationality}
                name="nationality"
                onChange={e => this.handleChange(e)}
                MenuProps={MenuProps}
              >
                {nationalityItems.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>

            </FormControl>
          </div>
          <div>
            <MaterialDropZone
              files={files.toJS()}
              showPreviews
              maxSize={5000000}
              filesLimit={1}
              text="Drag and drop file(s) here to upload CV"
            />
          </div>
          <div className={classes.btnArea} style={{ marginTop: '35px' }}>
            <Button variant="contained" fullWidth color="primary" onClick={() => handleSubmit()}>
              Save Changes
              </Button>
          </div>
        </form>
      </section >

    );
  }
}
const reducerCampaign = 'studentProfile';

EditPersonalDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  alternateEmail: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  ethnicity: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  files: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired,
  studentInit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  firstName: state.getIn([reducerCampaign, 'firstName']),
  lastName: state.getIn([reducerCampaign, 'lastName']),
  alternateEmail: state.getIn([reducerCampaign, 'alternateEmail']),
  phoneNumber: state.getIn([reducerCampaign, 'phoneNumber']),
  dob: state.getIn([reducerCampaign, 'dob']),
  gender: state.getIn([reducerCampaign, 'gender']),
  ethnicity: state.getIn([reducerCampaign, 'ethnicity']),
  nationality: state.getIn([reducerCampaign, 'nationality']),
  files: state.getIn([reducerCampaign, 'files']),
  // intrestedIndustries: state.getIn([reducerCampaign, 'intrestedIndustries']),
  // intrestedCompanies: state.getIn([reducerCampaign, 'intrestedCompanies']),
  // skills: state.getIn([reducerCampaign, 'skills']),
  // education: state.getIn([reducerCampaign, 'education']),
  // experience: state.getIn([reducerCampaign, 'experience'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeProfileDetails, dispatch),
  studentInit: bindActionCreators(storeProfileDetails, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPersonalDetails);


export default withStyles(styles)(StepMapped);
