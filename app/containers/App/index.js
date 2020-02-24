import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Client from './Client';
import Student from './Student';
import Admin from './Admin';
import LandingCorporate from './Landing';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
import { HelpSupport } from '../pageListAsync';
import { Footer, HeaderLanding } from 'dan-components';
import { makeSecureDecrypt } from '../../Helpers/security';
import { studentLoggedIn } from 'dan-actions/StudentActions';
import { adminLoggedIn } from 'dan-actions/AdminActions';
import { clientLoggedIn } from 'dan-actions/ClientActions';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.hasOwnProperty('user')) {
      let user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );
      switch (user.type) {
        case 'STUDENT':
          props.authStudent();
          props.history.push('/student');
          break;
        case 'ADMIN':
          props.authAdmin();
          props.history.push('/admin');
          break;
        case 'CLIENT':
          props.authClient();
          props.history.push('/client');
          break;
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
                  render={(props) => {
                    return (
                      <Fragment>
                        <HeaderLanding />
                        <HelpSupport {...props} changeMode={changeMode} />
                        <Footer />
                      </Fragment>
                    )
                  }}
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
  authClient: bindActionCreators(clientLoggedIn, dispatch)
});

export default withRouter(connect(null, mapDispatchToProps)(App));
