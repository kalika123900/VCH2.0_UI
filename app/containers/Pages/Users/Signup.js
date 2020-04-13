import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import { SignupForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { Typography } from '@material-ui/core';
import { ErrorWrap } from 'dan-components';

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
    cHeadquarter: ''
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
    const { token } = this.state;

    const data = { firstname, lastname, email, username, password, phone, token, cName, cEmail, cPhone, cHeadquarter }

    postData(`${API_URL}/client/signup`, data)
      .then((res) => {
        if (res.status === 1) {
          this.props.history.push('/signin');
        } else {
          this.setState({ errorMessage: res.errorMessage, flash: true });
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
    const { errorMessage, flash, firstname, lastname, username, phone, useremail, isVerified, cName, cEmail, cPhone, cHeadquarter } = this.state;
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
                handleSubmit={(values) => this.submitForm(values)}
                handleFlash={this.handleFlash}
                errorMessage={errorMessage}
                flash={flash}
              />
              :
              <Fragment>
                <ErrorWrap title="" desc="Oops, Unauthorized signup :(" />
              </Fragment>
            }
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
