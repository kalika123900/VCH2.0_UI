import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import { SignupForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';

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
    errorMessage: '',
    flash: false
  }

  handleFlash = () => {
    this.setState({ errorMessage: '', flash: false });
  }

  submitForm(values) {
    const MappedValues = values.toJS();
    const { firstname, lastname, email, username } = MappedValues;
    const data = { firstname, lastname, email, username };

    postData(`${API_URL}/admin/create-token`, data)
      .then((res) => {
        if (res.status === 1) {
          this.props.history.push('/admin/client-accounts');
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
            <SignupForm
              onSubmit={(values) => this.submitForm(values)}
              handleFlash={this.handleFlash}
              errorMessage={errorMessage}
              flash={flash}
            />
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
