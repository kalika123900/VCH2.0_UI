import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { adminProfileDetails, adminProfileInit } from 'dan-actions/adminProfileActions';
import TextField from '@material-ui/core/TextField';
import { makeSecureDecrypt } from 'dan-helpers/security';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import qs from 'qs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import messageStyles from 'dan-styles/Messages.scss';
import styles from '../../../components/Forms/user-jss';
import { SetNewPassword } from 'dan-components';
import avatarApi from 'dan-api/images/avatars';
import Avatar from '@material-ui/core/Avatar';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);
const user = JSON.parse(
  makeSecureDecrypt(localStorage.getItem('user'))
);

async function postJSON(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
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

class EditDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      openStyle: false,
      messageType: 'error',
      notifyMessage: '',
      avatar: '',
      profile: null,
      isProgress: false
    };
  }

  goNextTab = () => {
    this.setState({ tab: this.state.tab + 1 });
  }

  successMsg = () => {
    this.setState({ notifyMessage: 'Information updated' });
    this.setState({ messageType: 'success' });
    this.setState({ openStyle: true });
  }

  errorMsg = () => {
    this.setState({ notifyMessage: 'Information not updated' });
    this.setState({ messageType: 'error' });
    this.setState({ openStyle: true });
  }

  resetTab = () => {
    this.setState({ tab: 0 });
  }


  submitForm(values) {
    this.setState({ isProgress: true })
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const MappedValues = values.toJS();

    const data = {
      user_id: user.id,
      newPassword: MappedValues.password,
      oldPassword: MappedValues.oldPassword,
      type: 'admin'
    }

    postData(`${API_URL}/utils/set-new-password`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ isProgress: false })
          this.successMsg()
          this.resetTab();
        } else {
          this.setState({ isProgress: false })
          this.setState({ notifyMessage: 'Old Password is not correct' });
          this.setState({ messageType: 'error' });
          this.setState({ openStyle: true });
        }
      })
      .catch((err) => {
        this.setState({ isProgress: false })
        console.error(err);
      });
  }

  handleChangeProfile = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    var data = new FormData();

    data.append('profile', this.state.profile);
    data.append('client_id', user.id);

    postFormData(`${API_URL}/client/update-profile`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({ profile: null });
          this.getAccountInfo();
          this.successMsg();
        } else {
          this.setState({ profile: null });
          this.errorMsg();
        }
      })
      .catch((err) => {
        this.setState({ profile: null });
        console.log(err);
      });
  }

  getAccountInfo = () => {
    const _that = this;
    const data = {
      id: user.id
    };

    postData(`${API_URL}/admin/get-account-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const firstName = res.data.firstname;
          const lastName = res.data.lastname;
          const userEmail = res.data.email;
          const { phone } = res.data;
          const { username } = res.data;
          const clientProfileData = {
            firstName,
            lastName,
            userEmail,
            phone,
            username,
          };
          this.setState({ avatar: res.data.profile });
          _that.props.adminInit(clientProfileData);
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getAccountInfo();
  }

  componentDidUpdate() {
    if (this.state.profile != null) {
      this.handleChangeProfile()
    }
  }

  handleFileChange = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    })
  };

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  handleClient = (e) => {
    const _that = this;
    e.preventDefault();
    const {
      firstName,
      lastName,
      username,
      userEmail,
      phone,
    } = this.props;

    const data = {
      firstName,
      lastName,
      username,
      email: userEmail,
      phone,
      id: user.id,
    };
    postJSON(`${API_URL}/admin/update-account-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          _that.setState({ notifyMessage: 'Information update successfully' });
          _that.setState({ messageType: 'success' });
          _that.setState({ openStyle: true });
          _that.goNextTab();
        } else {
          _that.setState({ notifyMessage: res.errorMessage.toUpperCase() });
          _that.setState({ messageType: 'error' });
          _that.setState({ openStyle: true });
        }
        setTimeout(() => { _that.setState({ openStyle: false }); }, 5000);
      })
      .catch((err) => {
        _that.setState({ notifyMessage: 'Something went wrong, Please try after sometime.' });
        _that.setState({ messageType: 'error' });
        _that.setState({ openStyle: true });
        setTimeout(() => { _that.setState({ openStyle: false }); }, 5000);
      });
  }

  handleChange = event => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, [event.target.name]: event.target.value });
  };

  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  }

  render() {
    const {
      firstName,
      lastName,
      userEmail,
      phone,
      username,
      classes,
    } = this.props;
    const { tab, avatar, profile } = this.state;
    return (
      <Paper className={classes.fullWrap}>
        <Tabs
          value={tab}
          onChange={this.handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="Personal Details" />
          <Tab label="Security" />
        </Tabs>
        <section className={classes.pageFormWrap}>
          {tab === 0 && (
            <form onSubmit={(e) => this.handleClient(e)}>
              <div className={classes.row}>
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
              <div>
                <FormControl className={classes.formControl}>
                  <label for="profile" className={classes.customFileUpload}>
                    {profile == null ? 'Change Profile' : profile.name}
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
                    name="firstName"
                    margin="normal"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => this.handleChange(e)}
                    validate={[required]}
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
                    margin="normal"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => this.handleChange(e)}
                    validate={[required]}
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Username"
                    className={classes.textField}
                    type="text"
                    name="username"
                    margin="normal"
                    variant="outlined"
                    value={username}
                    onChange={(e) => this.handleChange(e)}
                    validate={[required]}
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Email"
                    className={classes.textField}
                    type="email"
                    name="userEmail"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    value={userEmail}
                    onChange={(e) => this.handleChange(e)}
                    validate={[required, email]}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Phone Number"
                    className={classes.textField}
                    type="phone"
                    autoComplete="phone"
                    name="phone"
                    margin="normal"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => this.handleChange(e)}
                    validate={[required]}
                  />
                </FormControl>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" fullWidth color="primary" type="submit">
                  Save Changes
              </Button>
              </div>
            </form>
          )}
          {tab === 1 && (
            <SetNewPassword onSubmit={(values) => this.submitForm(values)} isProgress={this.state.isProgress} />
          )}
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
        </section>
      </Paper>
    );
  }
}

const reducerAdmin = 'adminEditProfile';

EditDetailsForm.propTypes = {
  classes: PropTypes.object.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  clientInit: PropTypes.func.isRequired,
  addInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  firstName: state.getIn([reducerAdmin, 'firstName']),
  lastName: state.getIn([reducerAdmin, 'lastName']),
  userEmail: state.getIn([reducerAdmin, 'userEmail']),
  phone: state.getIn([reducerAdmin, 'phone']),
  username: state.getIn([reducerAdmin, 'username']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(adminProfileDetails, dispatch),
  adminInit: bindActionCreators(adminProfileInit, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDetailsForm);

export default withStyles(styles)(StepMapped);
