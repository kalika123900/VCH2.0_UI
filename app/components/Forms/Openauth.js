import { PureComponent } from "react";
import React from 'react';
import Button from '@material-ui/core/Button';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';

const LINKEDIN_STATE = 'ivhdRLo4m4HNZkdG';
const LINKEDIN_RIDERECT = 'https://backend.varsitycareershub.co.uk/student/oauth/callback';
const LINKEDIN_CLIENT_ID = '86hjqcfyyu993o';
const LINKEDIN_URL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_RIDERECT}&state=${LINKEDIN_STATE}&scope=r_liteprofile%20r_emailaddress`;

class openAuth extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1646737018783797',
        cookie: true,
        xfbml: true,
        version: 'v2.1'
      });
    };
  };

  signInWithLinkedin = () => {
    window.open(LINKEDIN_URL, '_self', 'width=600,height=600');
  };

  facebookLogin = () => {
    window.FB.login(
      function (resp) {
        this.statusChangeCallback(resp);
      }.bind(this)
    );
  };

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.fetchDataFacebook();
    } else if (response.status === 'not_authorized') {
      console.log('Import error', 'Authorize app to import data', 'error')
    } else {
      console.log('Import error', 'Error occured while importing data', 'error')
    }
  }

  fetchDataFacebook = () => {
    var _that = this;
    window.FB.api('/me?fields=name,email', function (user) {
      var picture = 'https://graph.facebook.com/' + user.id + '/picture?type=large';
      _that.props.handleSuccess({
        ...user,
        picture,
        provider: 'facebook'
      })
    });
  };

  render() {
    if (this.props.type == 'linkedin') {
      return <Button
        variant="contained"
        fullWidth
        size="small"
        style={{
          background: '#0077b5',
          color: ' white'
        }}
        onClick={this.signInWithLinkedin}
      >
        <LinkedInIcon style={{ marginRight: '10px' }} />
        Continue with LinkedIn
      </Button>
    }
    else if (this.props.type == 'facebook') {
      return <Button
        variant="contained"
        fullWidth
        size="small"
        style={{
          background: '#4267b2',
          color: ' white'
        }}
        onClick={this.facebookLogin}
      >
        <FacebookIcon style={{ marginRight: '10px' }} />
        Continue with Facebook
      </Button>
    }
    else {
      return null;
    }
  }
}

export default openAuth;
