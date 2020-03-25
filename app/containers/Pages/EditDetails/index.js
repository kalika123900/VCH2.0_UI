import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { clientProfileDetails, clientProfileInit } from 'dan-actions/clientProfileActions';
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
import messageStyles from 'dan-styles/Messages.scss';
import styles from '../../../components/Forms/user-jss';

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
      openStyle: false,
      messageType: 'error',
      notifyMessage: ''
    };
  }

  componentDidMount() {
    const _that = this;
    const data = {
      client_id: user.id

    };
    postData(`${API_URL}/client/get-account-info`, data) // eslint-disable-line
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
          _that.props.clientInit(clientProfileData);
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClient = (e) => {
    const _that = this;
    e.preventDefault();
    const {
      userEmail,
      phone,
    } = this.props;
    const data = {
      email: userEmail,
      phone,
      client_id: user.id,
    };
    postJSON(`${API_URL}/client/update-account-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          _that.setState({ notifyMessage: 'Information update successfully' });
          _that.setState({ messageType: 'success' });
          _that.setState({ openStyle: true });
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
    return (
      <Paper className={classes.fullWrap}>
        <section className={classes.pageFormWrap}>
          <form onSubmit={(e) => this.handleClient(e)}>
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
                  InputProps={{
                    readOnly: true,
                  }}
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
                  InputProps={{
                    readOnly: true,
                  }}
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
                  InputProps={{
                    readOnly: true,
                  }}
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

const reducerClient = 'clientEditProfile';

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
  firstName: state.getIn([reducerClient, 'firstName']),
  lastName: state.getIn([reducerClient, 'lastName']),
  userEmail: state.getIn([reducerClient, 'userEmail']),
  phone: state.getIn([reducerClient, 'phone']),
  username: state.getIn([reducerClient, 'username']),

});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(clientProfileDetails, dispatch),
  clientInit: bindActionCreators(clientProfileInit, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDetailsForm);


export default withStyles(styles)(StepMapped);
