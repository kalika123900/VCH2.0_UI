import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import {
  Signin, Signup, Login,
  ResetPassword, LockScreen, ComingSoon,
  Maintenance, AdminSignin,
  NotFound, StudentSignin, StudentSignup, StaffSignup
} from '../pageListAsync';

class Auth extends React.Component {
  render() {
    return (
      <Outer>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/staff-signup" component={StaffSignup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/lock-screen" component={LockScreen} />
          <Route exact path="/maintenance" component={Maintenance} />
          <Route exact path="/coming-soon" component={ComingSoon} />
          <Route exact path="/student-signin" component={StudentSignin} />
          <Route exact path="/student-signup" component={StudentSignup} />
          <Route exact path="/admin-signin" component={AdminSignin} />
          <Route component={NotFound} />
        </Switch>
      </Outer>
    );
  }
}

export default Auth;
