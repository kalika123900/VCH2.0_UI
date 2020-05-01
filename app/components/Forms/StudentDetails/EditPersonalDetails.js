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
import { genderItems, ethnicityItems, nationalityItems, languageOption } from 'dan-api/apps/profileOption';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import avatarApi from 'dan-api/images/avatars';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom'
import CloudUpload from '@material-ui/icons/CloudUpload';

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

async function postFormData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    body: data
  });
  return await response.json();
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
  constructor(props) {
    super(props);
    this.state = {
      openStyle: false,
      messageType: 'error',
      notifyMessage: '',
      profile: null,
      cv: null
    };
  }

  handleFileChange = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  }

  handleChangeProfile = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    var data = new FormData();

    data.append('profile', this.state.profile);
    data.append('user_id', user.id);

    postFormData(`${API_URL}/student/update-profile`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({ profile: null });
          this.getPersonalDetails();
          this.props.successMsg();
        } else {
          this.setState({ profile: null });
          this.props.errorMsg();
        }
      })
      .catch((err) => {
        this.setState({ profile: null });
        console.log(err);
      });
  }

  handleUploadCV = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    var data = new FormData();

    data.append('cv', this.state.cv);
    data.append('user_id', user.id);

    postFormData(`${API_URL}/student/upload-cv`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({ cv: null });
          this.getPersonalDetails();
          this.props.successMsg();
        } else {
          this.setState({ cv: null });
          this.props.errorMsg();
        }
      })
      .catch((err) => {
        this.setState({ cv: null });
        console.log(err);
      });
  }

  componentDidUpdate() {
    if (this.state.profile != null) {
      this.handleChangeProfile()
    }
    if (this.state.cv != null) {
      this.handleUploadCV()
    }
  }

  handleSubmit = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      firstname: this.props.firstName,
      lastname: this.props.lastName,
      phone: this.props.phoneNumber,
      dob: this.props.dob,
      gender: this.props.gender,
      ethnicity: this.props.ethnicity,
      nationality: this.props.nationality,
      user_id: user.id
    };

    postData(`${API_URL}/student/create-personal-details`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.props.successMsg()
          this.props.goNextTab();
        } else {
          this.props.errorMsg();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getPersonalDetails = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    };

    postData(`${API_URL}/student/get-personal-details`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const dob = res.data.dob == null ? null : formatDeadline(res.data.dob);

          const studentProfileData = {
            firstName: res.data.firstname,
            lastName: res.data.lastname,
            email: res.data.email,
            phoneNumber: res.data.phone,
            gender: res.data.gender,
            ethnicity: res.data.ethnicity,
            nationality: res.data.nationality,
            avatar: res.data.profile,
            resume: res.data.resume,
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

  componentDidMount() {
    this.getPersonalDetails();
  }

  handleDOB = date => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, dob: date });
  };

  handleChange = event => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, [event.target.name]: event.target.value });
  };

  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  }

  showResume = () => {
    window.open(this.props.resume);
  }

  render() {
    const {
      avatar,
      classes,
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      nationality,
      ethnicity,
      gender,
      resume
    } = this.props;
    const { profile, cv } = this.state;

    return (
      <Fragment>
        <section className={classes.pageFormWrap}>
          <form >
            <div className={classes.row} style={{ textAlign: 'center' }}>
              <IconButton>
                <Avatar
                  alt="profile"
                  src={(avatar == '' || avatar == null) ? avatarApi[7] : avatar}
                  className={classes.avatar}
                  style={{
                    width: '103px',
                    display: 'inline-block',
                    height: 'auto',
                  }}
                />
              </IconButton>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FormControl className={classes.formControl}>
                <label htmlFor="profile" className={classes.customFileUpload}>
                  {profile == null ? 'Change Profile Picture' : profile.name}
                </label>
                <input
                  id="profile"
                  name="profile"
                  type="file"
                  onChange={this.handleFileChange}
                  style={{ display: 'none' }}
                />
              </FormControl>
            </div>
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                    item.length > 0 &&
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
            {(resume != '' && resume != null) &&
              <div style={{ textAlign: 'center' }}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={() => this.showResume()}
                >
                  Click to view uploaded CV
                <span className={classes.rightIcon}>
                    <CloudUpload />
                  </span>
                </Button>
              </div>
            }
            <div style={{ textAlign: 'center' }}>
              <FormControl className={classes.formControl}>
                <label htmlFor="cv" className={classes.customFileUpload}>
                  {cv == null ? 'Upload Your Resume' : cv.name}
                </label>
                <input
                  id="cv"
                  name="cv"
                  type="file"
                  onChange={this.handleFileChange}
                  style={{ display: 'none' }}
                />
              </FormControl>
            </div>
            <div className={classes.btnArea} style={{ marginTop: '35px' }}>
              <Button variant="contained" fullWidth color="primary" onClick={() => this.handleSubmit()}>
                Save Changes
            </Button>
            </div>
          </form>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.openStyle}
            autoHideDuration={6000}
            onClose={this.handleCloseStyle}
          >
            <SnackbarContent
              className={this.state.messageType == 'error' ? messageStyles.bgError : messageStyles.bgSuccess}
              aria-describedby="client-snackbar"
              message={(
                <span id="client-snackbar" className={classes.message}>
                  {
                    (this.state.messageType == 'error') && <ErrorIcon className="success" />
                  }
                  {
                    (this.state.messageType == 'success') && <CheckCircleIcon className="success" />
                  }

                  &nbsp;
                  {this.state.notifyMessage}
                </span>
              )}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.noticeClose}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
            />
          </Snackbar>
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
  avatar: state.getIn([reducerStudent, 'avatar']),
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

export default withStyles(styles)(withRouter(StepMapped));
