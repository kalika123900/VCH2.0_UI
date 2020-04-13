import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ResetPasswordForm } from 'dan-components';
import qs from 'qs';
import styles from '../../../components/Forms/user-jss';

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

class ResetPassword extends React.Component {
  state = {
    success: false
  }

  submitForm(values) {
    const MappedValues = values.toJS();
    const searchString = (this.props.location.search).split('&');
    const type = searchString[1].split('=');
    const id = searchString[0].split('=');

    const data = {
      user_id: id[1],
      password: MappedValues.password,
      type: type[1]
    }

    postData(`${API_URL}/utils/reset-password`, data)
      .then((res) => {
        if (res.status == 1) {
          this.props.history.push(`/${type[1]}`)
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const title = brand.name + ' - Reset Password';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <ResetPasswordForm onSubmit={(values) => this.submitForm(values)} success={this.state.success} />
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);
