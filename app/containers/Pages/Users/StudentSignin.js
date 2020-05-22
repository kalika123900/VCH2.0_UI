import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { StudentSigninForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import qs from 'qs';
import { makeSecureEncrypt } from '../../../Helpers/security';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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

class StudentSignin extends React.Component {
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
          localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
            id: res.data.id,
            type: 'STUDENT',
            token: res.data.token,
            email: res.data.email,
            name: res.data.name
          })));
          window.location.reload();
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

  submitForm = (values) => {
    const { entries } = values._root;
    const data = {};

    entries.forEach((item) => {
      data[item[0]] = item[1];
    });

    postData(`${API_URL}/student/signin`, data)
      .then((res) => {
        if (res.status === 1) {
          localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
            id: res.data.id,
            type: 'STUDENT',
            token: res.data.token,
            email: res.data.email,
            name: res.data.name
          })));
          window.location.reload();
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

  render() {
    const title = brand.name + ' - Signin';
    const description = brand.desc;
    const { classes } = this.props;
    const { errorMessage, flash } = this.state;

    return (
      <Fragment>
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
              <StudentSigninForm
                onSubmit={(values) => this.submitForm(values)}
                handleFlash={this.handleFlash}
                errorMessage={errorMessage}
                flash={flash}
                handleOauth={this.handleOauth}
              />
            </div>
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
      </Fragment>
    );
  }
}

StudentSignin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentSignin);
