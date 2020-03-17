import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeAuth } from 'dan-actions/AuthActions';

class Signout extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.hasOwnProperty('user')) {
      localStorage.removeItem('user');
      this.props.removeAuth();
      props.history.push('/');
    }
    else {
      props.history.push('/');
    }
  }
  state = {
    expanded: null,
  };

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

