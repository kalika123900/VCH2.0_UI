import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { StudentSigninForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import qs from 'qs';
import { makeSecureEncrypt } from '../../../Helpers/security';

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
  constructor(props) {
    super(props)
    if (this.props.location.search) {
      var response = this.props.location.search.split('?')
      if (response.length == 2) {
        var res = JSON.parse(atob(response[1]))
        if (res.status === 1) {
          localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
            id: res.data.id,
            type: 'STUDENT',
            token: res.data.token
          })));
          window.location.reload();
        }
      }
    }
  }

  state = {
    errorMessage: '',
    flash: false
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
            token: res.data.token
          })));
          window.location.reload();
        } else {
          this.setState({ errorMessage: res.errorMessage, flash: true });
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
            token: res.data.token
          })));
          window.location.reload();
        } else {
          this.setState({ errorMessage: res.errorMessage, flash: true });
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
      </Fragment>
    );
  }
}

StudentSignin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentSignin);
