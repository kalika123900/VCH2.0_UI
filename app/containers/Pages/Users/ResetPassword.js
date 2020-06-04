import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ResetForm } from 'dan-components';

import styles from '../../../components/Forms/user-jss';

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

class ResetPassword extends React.Component {
  state = {
    success: false,
    isProgress: false
  }

  submitForm(values) {
    this.setState({ isProgress: true });
    const MappedValues = values.toJS();
    const searchString = (this.props.location.search).split('?user=');
    const type = searchString[1];
    const data = {
      email: MappedValues.email,
      type
    }

    postData(`${API_URL}/utils/send-reset-url`, data)
      .then((res) => {
        if (res.status == 1) {
          this.setState({ success: true });
          this.setState({ isProgress: false });
        }
      })
      .catch((err) => {
        this.setState({ isProgress: false });
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
            <ResetForm onSubmit={(values) => this.submitForm(values)} success={this.state.success} isProgress={this.state.isProgress} />
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
