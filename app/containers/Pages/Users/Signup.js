import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { SignupForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { Typography } from '@material-ui/core';
import { ErrorWrap } from 'dan-components';
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

class Signup extends React.Component {
  state = {
    isVerified: false,
    token: '',
    errorMessage: '',
    flash: false,
    firstname: '',
    lastname: '',
    username: '',
    useremail: '',
    phone: '',
    cName: '',
    cEmail: '',
    cPhone: '',
    cHeadquarter: '',
    cLogo: '',
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

  verifyToken = () => {
    const searchString = (this.props.location.search).split('?token=');
    const data = {
      token: searchString[1]
    }

    postData(`${API_URL}/utils/verify-token`, data)
      .then((res) => {
        if (res.status == 1) {
          this.setState({
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            useremail: res.data.email,
            username: res.data.username,
            phone: res.data.phone,
            cName: res.data.company_name,
            cEmail: res.data.company_email,
            cPhone: res.data.company_phone,
            cHeadquarter: res.data.company_headquarter,
            cLogo: res.data.logo,
            isVerified: true,
            token: searchString[1]
          })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.verifyToken();
  }

  handleFlash = () => {
    this.setState({ errorMessage: '', flash: false });
  }

  submitForm(values) {
    const { firstname, lastname, email, username, password, phone, cName, cEmail, cPhone, cHeadquarter } = values;
    const { token, cLogo } = this.state;
    const data = { firstname, lastname, email, username, password, phone, token, cName, cEmail, cPhone, cHeadquarter, cLogo }

    postData(`${API_URL}/client/signup`, data)
      .then((res) => {
        if (res.status === 1) {
          this.props.history.push('/signin');
        } else {
          this.setState({ errorMessage: res.errorMessage, flash: true });
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
    const title = brand.name + ' - Signup';
    const description = brand.desc;
    const { classes } = this.props;
    const { errorMessage, flash, firstname, lastname, username, phone, useremail, isVerified, cName, cEmail, cPhone, cHeadquarter, cLogo } = this.state;
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
            {isVerified ?
              <SignupForm
                firstname={firstname}
                lastname={lastname}
                useremail={useremail}
                username={username}
                phone={phone}
                cName={cName}
                cEmail={cEmail}
                cPhone={cPhone}
                cHeadquarter={cHeadquarter}
                cLogo={cLogo}
                handleSubmit={(values) => this.submitForm(values)}
                handleFlash={this.handleFlash}
                errorMessage={errorMessage}
                flash={flash}
              />
              :
              <Fragment>
                <ErrorWrap {...this.props} title="" desc="Oops, Unauthorized signup :(" />
              </Fragment>
            }
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

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
