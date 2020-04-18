import React, { Fragment } from 'react';
import {
  BrowserRouter, Switch, Route, withRouter
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import { Footer, HeaderLanding, HelpSupportHeader } from 'dan-components';
import { studentLoggedIn } from 'dan-actions/StudentActions';
import { adminLoggedIn } from 'dan-actions/AdminActions';
import { clientLoggedIn } from 'dan-actions/ClientActions';
import { setAuth } from 'dan-actions/AuthActions';
import Auth from './Auth';
import Client from './Client';
import Student from './Student';
import Admin from './Admin';
import LandingCorporate from './Landing';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
import { HelpSupport } from '../pageListAsync';
import { makeSecureDecrypt } from '../../Helpers/security';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.hasOwnProperty('user')) {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );
      const baseUrl = this.props.location.pathname;
      const urlArray = baseUrl.split('/');
      this.props.setAuth({ userType: user.type, userDetail: { id: user.id } });
      switch (user.type) {
        case 'STUDENT':
          props.authStudent();
          break;
        case 'ADMIN':
          props.authAdmin();
          break;
        case 'CLIENT':
          props.authClient();
          break;
      }
      if (urlArray[1].toLowerCase() == 'help-support') {
        props.history.push('/help-support');
      }
      else if (user.type.toLowerCase() != urlArray[1].toLowerCase()) {
        props.history.push('/' + user.type.toLowerCase());
      }
    }
  }

  render() {
    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {(changeMode) => (
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={LandingCorporate} />
                <Route
                  path="/client"
                  render={(props) => <Client {...props} changeMode={changeMode} />}
                />
                <Route
                  path="/student"
                  render={(props) => <Student {...props} changeMode={changeMode} />}
                />
                <Route
                  path="/admin"
                  render={(props) => <Admin {...props} changeMode={changeMode} />}
                />
                <Route
                  path="/help-support"
                  render={(props) => (
                    <Fragment>
                      <HelpSupportHeader />
                      <HelpSupport {...props} changeMode={changeMode} />
                      <Footer />
                    </Fragment>
                  )}
                />
                <Route component={Auth} />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    );
  }
}

App.propTypes = {
  authStudent: PropTypes.func.isRequired,
  authAdmin: PropTypes.func.isRequired,
  authClient: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  authStudent: bindActionCreators(studentLoggedIn, dispatch),
  authAdmin: bindActionCreators(adminLoggedIn, dispatch),
  authClient: bindActionCreators(clientLoggedIn, dispatch),
  setAuth: bindActionCreators(setAuth, dispatch),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
