import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeAuth } from 'dan-actions/AuthActions';
import { makeSecureEncrypt } from '../../../Helpers/security';
import { makeSecureDecrypt } from '../../../Helpers/security';

class Signout extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.hasOwnProperty('oldUser')) {
      const oldUser = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('oldUser'))
      );
      localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
        id: oldUser.id,
        type: 'ADMIN',
        token: oldUser.token,
      })));
      localStorage.removeItem('oldUser');
      window.location.reload();
    } else if (localStorage.hasOwnProperty('user')) {
      localStorage.removeItem('user');
      this.props.removeAuth();
      props.history.push('/');
    }
    else {
      props.history.push('/');
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  removeAuth: bindActionCreators(removeAuth, dispatch),
});
const SignoutMapped = connect(null,
  mapDispatchToProps,
)(Signout);

export default (SignoutMapped);
