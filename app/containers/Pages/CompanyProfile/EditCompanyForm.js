import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import FlashMessage from 'react-flash-message';
import { makeSecureDecrypt } from '../../../Helpers/security';
import styles from '../../../components/Forms/user-jss';
import qs from 'qs';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import avatarApi from 'dan-api/images/avatars';
import Avatar from '@material-ui/core/Avatar';
import MaterialDropZone from 'dan-components/Forms/MaterialDropZone';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const emailValidator = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const minTextLength = minLength(3);
const maxTextLength = maxLength(20);

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

async function postFormData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });
  return await response.json();
}

class SignupForm extends React.Component {
  state = {
    cName: '',
    cEmail: '',
    cPhone: '',
    cHeadquarter: '',
    openStyle: false,
    messageType: 'error',
    notifyMessage: '',
    logo: null,
  };

  componentDidMount() {
    var data = {};
    if (this.props.userType == 'ADMIN') {
      data = {
        company_id: this.props.match.params.cId
      }
    } else {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );

      data = {
        company_id: user.cId
      }
    }

    postData(`${API_URL}/utils/get-company-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({
            cName: res.data.name,
            cEmail: res.data.email,
            cPhone: res.data.phone,
            cHeadquarter: res.data.headquarter,
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    console.log(e)
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmitForm = (e) => {
    e.preventDefault();

    var data = {};

    if (this.props.userType == 'ADMIN') {
      data = {
        company_id: this.props.match.params.cId,
        cName: this.state.cName,
        cEmail: this.state.cEmail,
        cPhone: this.state.cPhone,
        cHeadquarter: this.state.cHeadquarter
      }
    } else {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );
      data = {
        company_id: user.cId,
        cName: this.state.cName,
        cEmail: this.state.cEmail,
        cPhone: this.state.cPhone,
        cHeadquarter: this.state.cHeadquarter,
        logo: this.state.logo
      }
    }

    postFormData(`${API_URL}/utils/update-company-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (this.props.userType == 'ADMIN') {
            this.setState({ notifyMessage: 'Information update successfully' });
            this.setState({ messageType: 'success' });
            this.setState({ openStyle: true });
          }
          else {
            this.setState({ notifyMessage: 'Information update successfully' });
            this.setState({ messageType: 'success' });
            this.setState({ openStyle: true });
          }
        }
        else {
          this.setState({ notifyMessage: 'Something went wrong' });
          this.setState({ messageType: 'error' });
          this.setState({ openStyle: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  }

  render() {
    const {
      classes,
      deco
    } = this.props;
    const { cName, cEmail, cPhone, cHeadquarter, logo } = this.state;
    return (
      <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Edit Company Profile
        </Typography>
        <section className={classes.pageFormWrap}>
          <form enctype="multipart/form-data" onSubmit={(e) => this.handleSubmitForm(e)}>
            <div className={classes.row}>
              <IconButton>
                <Avatar
                  alt="Remy Sharp"
                  src='https://res.cloudinary.com/dxclvhyan/image/upload/c_scale,w_103,h_103/v1587025805/tqlzewb27b48mqutg4fz.jpg'
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
                <TextField
                  name="cName"
                  value={cName}
                  placeholder="Company Name"
                  label="Company Name"
                  required
                  validate={[minTextLength, maxTextLength]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="cEmail"
                  value={cEmail}
                  placeholder="Company Email"
                  label="Company Email"
                  required
                  validate={[required, emailValidator]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="cPhone"
                  value={cPhone}
                  placeholder="Company Phone"
                  label="Company Phone"
                  required
                  validate={[minTextLength, maxTextLength]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="cHeadquarter"
                  value={cHeadquarter}
                  placeholder="Company Headquarter"
                  label="Company Headquarter"
                  required
                  validate={[required]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <input
                  name="logo"
                  value={logo}
                  required
                  accept="image/*"
                  type="file"
                  validate={[required]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" fullWidth color="primary" type="submit">
                Save Changes
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
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
      </Paper >
    );
  }
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  deco: PropTypes.bool.isRequired,
};

const reducer = 'ui';
const reducerA = 'Auth';
const SignupFormMapped = connect(
  state => ({
    deco: state.getIn([reducer, 'decoration']),
    userType: state.getIn([reducerA, 'userType']),
  }),
)(SignupForm);

export default withStyles(styles)(SignupFormMapped);
