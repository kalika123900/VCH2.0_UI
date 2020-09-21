import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { StudentSignupForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { makeSecureEncrypt } from '../../../Helpers/security';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

class StudentSignup extends React.Component {
  constructor(props) {
    super(props);

  }
  state = {
    errorMessage: '',
    flash: false,
    openStyle: false,
    messageType: 'error',
    notifyMessage: ''
  }

  handleCloseStyle = () => {
    this.setState({ openStyle: false });
  }

  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  }

  handleOauth = (data) => {
    const apiData = {
      name: data.name,
      email: data.email,
      profile: data.picture,
      user_id: data.id,
      type: data.provider
    }

    postData(`${API_URL}/student/oauth`, apiData)
      .then((res) => {
        if (res.status === 1) {
          try {
            if (this.props.match.params.userId) {
              const invited_by = this.props.match.params.userId;


              postData(`${API_URL}/utils/invited`, { invited_by, accepted_by: res.data.id })
                .catch(e => {
                  console.error(e);
                });
            }
          } catch (e) {
            console.error(e);
            console.log('fatta')
          }

          localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
            id: res.data.id,
            type: 'STUDENT',
            token: res.data.token,
            email: res.data.email
          })));
          if (res.data.status == 0 || res.data.isEditDetails)
            window.location.href = '/student/edit-details';
          else {
            window.location.reload();
          }
        } else {
          this.setState({ notifyMessage: res.errorMessage });
          this.setState({ messageType: 'error' });
          this.setState({ openStyle: true });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleFlash = () => {
    this.setState({ errorMessage: '', flash: false });
  }

  submitForm(values) {
    const MappedValues = values.toJS();
    const data = {
      auth_via: 'form',
      firstname: MappedValues.firstname.trim(),
      lastname: MappedValues.lastname.trim(),
      email: MappedValues.email.trim(),
      password: MappedValues.password.trim()
    }

    postData(`${API_URL}/student/signup`, data)
      .then((res) => {
        if (res.status === 1) {
          try {
            if (this.props.match.params.userId) {
              const invited_by = this.props.match.params.userId;

              postData(`${API_URL}/utils/invited`, { invited_by, accepted_by: res.data.id })
                .catch(e => {
                  console.error(e);
                });
            }
          } catch (e) {
            console.error(e);
          }

          localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
            id: res.data.id,
            type: 'STUDENT',
            token: res.data.token,
            email: res.data.email
          })));

          // window.location.href = '/student/edit-details';

        } else {
          this.setState({ notifyMessage: res.errorMessage });
          this.setState({ messageType: 'error' });
          this.setState({ openStyle: true });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    if (this.props.location.search.length > 0) {
      let res = this.props.location.search.split('?res=');
      if (res[1] == 'NOT_SUPPORTED')
        this.setState({ notifyMessage: 'LinkedIn Authentication not supported for You', messageType: 'warning', openStyle: true })
    }
  }

  render() {
    const title = brand.name + ' - Signup';
    const description = brand.desc;
    const { classes } = this.props;
    const { errorMessage, flash } = this.state;
    return (
      <div className={classes.rootFull}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.fullFormWrap}>
            <StudentSignupForm
              onSubmit={(values) => this.submitForm(values)}
              handleFlash={this.handleFlash}
              errorMessage={errorMessage}
              flash={flash}
              handleOauth={this.handleOauth}
            />
          </div>
        </div>
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
      </div>
    );
  }
}

StudentSignup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentSignup);
