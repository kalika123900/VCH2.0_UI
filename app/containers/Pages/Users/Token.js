import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import { TokenForm } from 'dan-components';
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

async function postFormData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    body: data
  });
  return await response.json();
}

class Token extends React.Component {
  state = {
    errorMessage: '',
    flash: false,
    cLogo: '',
    logo: null
  }

  handleFileChange = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    })
  }

  handleChangeLogo = () => {
    var data = new FormData();

    data.append('logo', this.state.logo);

    postFormData(`${API_URL}/admin/add-company-logo`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({ cLogo: res.result.url });
          this.setState({ logo: null });
        }
      })
      .catch((err) => {
        this.setState({ logo: null });
        console.log(err);
      });
  }


  handleFlash = () => {
    this.setState({ errorMessage: '', flash: false });
  }

  submitForm(values) {
    const MappedValues = values.toJS();
    const { firstname, lastname, email, username, phone, cName, cEmail, cPhone, cHeadquarter } = MappedValues;
    const cLogo = this.state.cLogo;
    const data = { firstname, lastname, email, username, phone, cName, cEmail, cPhone, cHeadquarter, cLogo };

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

  componentDidUpdate() {
    if (this.state.logo != null) {
      this.handleChangeLogo()
    }
  }

  render() {
    const title = brand.name + ' - Token';
    const description = brand.desc;
    const { classes } = this.props;
    const { errorMessage, flash, logo, cLogo } = this.state;

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
            <TokenForm
              onSubmit={(values) => this.submitForm(values)}
              handleFlash={this.handleFlash}
              errorMessage={errorMessage}
              flash={flash}
              handleFileChange={this.handleFileChange}
              logo={logo}
              cLogo={cLogo}
            />
          </div>
        </div>
      </div>
    );
  }
}

Token.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Token);
