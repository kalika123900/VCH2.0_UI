import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MaterialDropZone from '../../Forms/MaterialDropZone';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { storeProfileDetails, warnMsgInit, warnMsgRemove } from 'dan-actions/studentProfileActions';
import { genderItems, ethnicityItems, nationalityItems } from 'dan-api/apps/profileOption';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';

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

function formatDeadline(dateStr) {
  const d = new Date(dateStr)
  const year = d.getFullYear()
  let month = d.getMonth() + 1;
  let date = d.getDate();
  if (month < 10) {
    month = `0` + month;
  }
  if (date < 10) {
    date = `0` + date;
  }
  return (year + '-' + month + '-' + date);
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });
  return await response.json();
}

class EditPersonalDetails extends React.Component {
  handleSubmit = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      phone: this.props.phoneNumber,
      dob: this.props.dob,
      gender: this.props.gender,
      ethnicity: this.props.ethnicity,
      nationality: this.props.nationality,
      resume: '',
      user_id: user.id
    };

    postData(`${API_URL}/student/create-personal-details`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.props.addMsg({ warnMsg: 'Updated SuccessFully' });
          setTimeout(() => {
            this.props.removeMsg();
          }, 4000)
        } else {
          this.props.addMsg({ warnMsg: 'Information Not updated' });
          setTimeout(() => {
            this.props.removeMsg();
          }, 4000)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    };

    postData(`${API_URL}/student/get-personal-details`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const dob = formatDeadline(res.data.dob);

          const studentProfileData = {
            firstName: res.data.firstname,
            lastName: res.data.lastname,
            email: res.data.email,
            phoneNumber: res.data.phone,
            gender: res.data.gender,
            ethnicity: res.data.ethnicity,
            nationality: res.data.nationality,
            resume: [],
            dob,
          };
          this.props.addInfo(studentProfileData);
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      email,
      phoneNumber,
      dob,
      nationality,
      resume,
      ethnicity,
      gender,
      warnMsg,
    } = this.props;

    return (
      <Fragment>

        <section className={classes.pageFormWrap}>
          <Grid className={classes.warnMsg}>
            {warnMsg}
          </Grid>
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
                  name="email"
                  value={email}
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
                files={resume.toJS()}
                showPreviews
                maxSize={5000000}
                filesLimit={1}
                text="Drag and drop file(s) here to upload CV"
              />
            </div>
            <div className={classes.btnArea} style={{ marginTop: '35px' }}>
              <Button variant="contained" fullWidth color="primary" onClick={() => this.handleSubmit()}>
                Save Changes
            </Button>
            </div>
          </form>
        </section >
      </Fragment>
    );
  }
};

const reducerStudent = 'studentProfile';

EditPersonalDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  ethnicity: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  resume: PropTypes.object.isRequired,
  warnMsg: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired,
  addMsg: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  firstName: state.getIn([reducerStudent, 'firstName']),
  lastName: state.getIn([reducerStudent, 'lastName']),
  email: state.getIn([reducerStudent, 'email']),
  phoneNumber: state.getIn([reducerStudent, 'phoneNumber']),
  dob: state.getIn([reducerStudent, 'dob']),
  warnMsg: state.getIn([reducerStudent, 'warnMsg']),
  gender: state.getIn([reducerStudent, 'gender']),
  ethnicity: state.getIn([reducerStudent, 'ethnicity']),
  nationality: state.getIn([reducerStudent, 'nationality']),
  resume: state.getIn([reducerStudent, 'resume']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeProfileDetails, dispatch),
  addMsg: bindActionCreators(warnMsgInit, dispatch),
  removeMsg: bindActionCreators(warnMsgRemove, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPersonalDetails);

export default withStyles(styles)(StepMapped);
