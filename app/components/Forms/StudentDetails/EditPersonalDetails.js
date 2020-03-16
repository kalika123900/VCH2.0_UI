import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
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
      gender
    } = this.props;

    return (

      <section className={classes.pageFormWrap}>
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
              label="Alternative Email"
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
              value={gender}
              name="gender"
              onChange={e => this.handleChange(e)}
              input={<Input id="select-ethnicity" />}
              renderValue={selected => {
                var genderName = '';
                genderItems.map((value, index) => {
                  if (selected.includes(value)) {
                    genderName = value;
                  }
                });
                return genderName;
              }}
              MenuProps={MenuProps}
            >
              {genderItems.map((item) => (
                (item != '') &&
                <MenuItem key={item} value={item}>
                  <Checkbox checked={gender.indexOf(item) > -1} />
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
              value={ethnicity}
              name="ethnicity"
              onChange={e => this.handleChange(e)}
              input={<Input id="select-ethnicity" />}
              renderValue={selected => {
                var ethinicityName = '';
                ethnicityItems.map((value, index) => {
                  if (selected.includes(value)) {
                    ethinicityName = value;
                  }
                });
                return ethinicityName;
              }}
              MenuProps={MenuProps}
            >
              {ethnicityItems.map((item, index) => (
                (item != '') &&
                <MenuItem key={index} value={item}>
                  <Checkbox checked={ethnicity.indexOf(item) > -1} />
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
              value={nationality}
              name="nationality"
              onChange={e => this.handleChange(e)}
              input={<Input id="select-nationality" />}
              renderValue={selected => {
                var nationalityName = '';
                nationalityItems.map((value, index) => {
                  if (selected.includes(value)) {
                    nationalityName = value;
                  }
                });
                return nationalityName;
              }}
              MenuProps={MenuProps}
            >
              {nationalityItems.map((item, index) => (
                (item != '') &&
                <MenuItem key={index} value={item}>
                  <Checkbox checked={nationality.indexOf(item) > -1} />
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
  gender: PropTypes.object.isRequired,
  ethnicity: PropTypes.object.isRequired,
  nationality: PropTypes.object.isRequired,
  files: PropTypes.object.isRequired,
  // intrestedIndustries: PropTypes.string.isRequired,
  // intrestedCompanies: PropTypes.number.isRequired,
  // skills: PropTypes.object.isRequired,
  // education: PropTypes.string.isRequired,
  // experience: PropTypes.number.isRequired,
  addInfo: PropTypes.func.isRequired
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
  addInfo: bindActionCreators(storeProfileDetails, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPersonalDetails);


export default withStyles(styles)(StepMapped);
