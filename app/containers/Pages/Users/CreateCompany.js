import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { CreateCompanyForm } from 'dan-components';
import { makeSecureDecrypt } from 'dan-helpers/security';
import styles from 'dan-components/Forms/user-jss';

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

async function postFormData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    body: data
  });
  return await response.json();
}

class CreateCompany extends React.Component {
  state = {
    cLogo: '',
    logo: null
  }

  handleFileChange = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    })
  }

  submitForm(values) {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const MappedValues = values.toJS();
    const { cName, cEmail, cPhone, cHeadquarter } = MappedValues;
    const data = { cName, cEmail, cPhone, cHeadquarter, logo: this.state.cLogo, managed_by: user.id };

    postData(`${API_URL}/admin/create-company`, data)
      .then((res) => {
        if (res.status === 1) {
          this.props.history.push('/admin/company-profile');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleChangeLogo = () => {
    var data = new FormData();

    data.append('logo', this.state.logo);

    postFormData(`${API_URL}/admin/add-company-logo`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({ cLogo: res.result.secure_url });
          this.setState({ logo: null });
        }
      })
      .catch((err) => {
        this.setState({ logo: null });
        console.log(err);
      });
  }


  componentDidUpdate() {
    if (this.state.logo != null) {
      this.handleChangeLogo()
    }
  }


  render() {
    const title = brand.name + ' - CreateCompany';
    const description = brand.desc;
    const { classes } = this.props;
    const { logo, cLogo } = this.state;

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
            <CreateCompanyForm
              onSubmit={(values) => this.submitForm(values)}
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

CreateCompany.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateCompany);
