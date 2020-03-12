import { PureComponent } from "react";
import React from 'react';
import Button from '@material-ui/core/Button';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import Facebook from './Facebook';
import FacebookLogin from "react-facebook-login";

const PROVIDER = { LINKEDIN: 'linkedin', FACEBOOK: 'facebook' };


const getURLWithQueryParams = (base, params) => {
  const query = Object
    .entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  return `${base}?${query}`
}

const LINKEDIN_STATE = 'sdfhasdflasd89';
const LINKEDIN_SCOPE = 'r_liteprofile r_emailaddress';
const LINKEDIN_RIDERECT = 'http://localhost:3000/student-signin';
const LINKEDIN_CLIENT_ID = '81rgkufnb8jcm8';

const LINKEDIN_URL = getURLWithQueryParams('https://www.linkedin.com/oauth/v2/authorization', {
  response_type: "code",
  client_id: LINKEDIN_CLIENT_ID,
  redirect_uri: LINKEDIN_RIDERECT,
  state: LINKEDIN_STATE,
  scope: LINKEDIN_SCOPE
});

const queryToObject = queryString => {
  const pairsString = queryString[0] === '?' ? queryString.slice(1) : queryString
  const pairs = pairsString
    .split('&')
    .map(str => str.split('=').map(decodeURIComponent))
  return pairs.reduce((acc, [key, value]) => key ? { ...acc, [key]: value } : acc, {})
}
class openAuth extends PureComponent {
  constructor(props) {
    super(props);
    if (window.location.search) {
      const params = queryToObject(window.location.search)
      if (params.state === LINKEDIN_STATE && window.opener) {
        window.opener.postMessage(params)
      }
    }
    // this.state = {
    //   isLoggedIn: false,
    //   userID: '',
    //   name: '',
    //   email: '',
    //   picture: ''
    // };

  }

  signInWithLinkedin = () => {
    this.popup = window.open(LINKEDIN_URL, '_blank', 'width=600,height=600')
    window.addEventListener('message', this.receiveLinkedInMessage)
  }
  receiveLinkedInMessage = ({ origin, data: { state, code, error, ...rest } }) => {
    if (origin !== window.location.origin || state !== LINKEDIN_STATE) return

    if (code) {
      this.props.receiveProviderToken({ provider: PROVIDER.LINKEDIN, token: code })
      // // const LINKEDIN_ATOKEN_URL = getURLWithQueryParams('https://www.linkedin.com/oauth/v2/accessToken', {
      // //   grant_type: 'authorization_code',
      // //   redirect_uri: LINKEDIN_RIDERECT,
      // //   client_id: LINKEDIN_CLIENT_ID,
      // //   client_secret: 'Vso9w48vqEnxRtIL',
      // //   code: code,
      // // });
      // const formData = new FormData();
      // formData.append('grant_type', 'authorization_code');
      // formData.append('redirect_uri', LINKEDIN_RIDERECT);
      // formData.append('client_id', LINKEDIN_CLIENT_ID);
      // formData.append('client_secret', 'Vso9w48vqEnxRtIL');
      // formData.append('code', code);
      // let _that = this;

      // var xhr = new XMLHttpRequest();
      // xhr.open("POST", 'https://www.linkedin.com/oauth/v2/accessToken', true);
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      // xhr.onreadystatechange = function () { // Call a function when the state changes.
      //   if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      //     
      //   }
      // }
      // xhr.send(formData);
    } else if (error && !['user_cancelled_login', 'user_cancelled_authorize'].includes(error)) {
      this.props.failToReceiveProviderToken({ provider: PROVIDER.LINKEDIN, error: { error, ...rest } })
    }
    this.popup.close()
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.receiveLinkedInMessage)
    this.popup && this.popup.close()
  }

  // responseFacebook = response => {
  //   console.log(response);

  //   this.setState({
  //     isLoggedIn: true,
  //     userID: response.userID,
  //     name: response.name,
  //     email: response.email,

  //   });
  // };

  // responseFacebook = response => {
  //   console.log(response);

  //   this.setState({
  //     isLoggedIn: true,
  //     userID: response.userID,
  //     name: response.name,
  //     email: response.email,
  //     picture: response.picture.data.url
  //   });
  // };

  componentDidMount() {
    // Load the required SDK asynchronously for facebook, google and linkedin
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1587076038083305',
        cookie: true,  // enable cookies to allow the server to access the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.1' // use version 2.1
      });
    };
  }
  facebookLogin = () => {
    window.FB.login(
      function (resp) {
        this.statusChangeCallback(resp);
      }.bind(this), { scope: 'email,public_profile' });

  }

  checkLoginState() {
    alert("Checking Login Status")
    console.log("Checking login status...........");

    window.FB.getLoginStatus(function (response) {
      alert("FB Callback")
      console.log("----------->")
      console.log(response)
      this.statusChangeCallback(response);
    }.bind(this));
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      alert("Connected to facebook. Retriving user from fb");
      // Logged into your app and Facebook.
      this.fetchDataFacebook();
    } else if (response.status === 'not_authorized') {
      console.log('Import error', 'Authorize app to import data', 'error')
    } else {
      console.log('Import error', 'Error occured while importing data', 'error')
    }
  }
  fetchDataFacebook = () => {
    console.log('Welcome!  Fetching your information.... ');

    window.FB.api('/me', function (user) {
      console.log(user);
      console.log('Successful login from facebook : ' + user.name);
      alert('Successful login for: ' + user.name);
    });
  }



  render() {

    // let fbContent;

    // if (this.state.isLoggedIn) {
    //   fbContent = null;


    // } else {
    //   fbContent = (
    //     <FacebookLogin
    //       appId="1587076038083305"
    //       autoLoad={true}
    //       fields="name,email,picture"
    //       onClick={this.componentClicked}
    //       callback={this.responseFacebook}
    //     />
    //   );
    // }


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