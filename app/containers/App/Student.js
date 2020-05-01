import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/StudentDashboard';
import { Footer } from 'dan-components';
import {
  StudentDashboard, EditStudentDetails, StudentMessage,
  StudentAccount, StudentSettings, NotFound, JobProfiles,
  JobDescription, StudentEmail, Signout, StudentEmailThread
}
  from '../pageListAsync';

class Student extends React.Component {
  constructor(props) {
    super(props);
    let { isLoggedIn } = props;
    isLoggedIn ? true : props.history.push('/student-signin');
  }

  render() {
    const { changeMode, history } = this.props;
    return (
      <Fragment>
        <Dashboard history={history} changeMode={changeMode}>
          <Switch>
            <Route exact path="/student" component={StudentDashboard} />
            <Route exact path="/student/edit-details" component={EditStudentDetails} />
            <Route exact path="/student/messages" component={StudentEmail} />
            <Route exact path="/student/messages/:thread" component={StudentEmailThread} />
            <Route exact path="/student/profile" component={StudentAccount} />
            <Route exact path="/student/settings" component={StudentSettings} />
            <Route exact path='/student/opportunities' component={JobProfiles} />
            <Route exact path='/student/opportunities/:id' component={JobDescription} />
            <Route exact path="/student/signout" component={Signout} />
            <Route component={NotFound} />
          </Switch>
        </Dashboard>
        <Footer />
      </Fragment>
    );
  }
}

Student.propTypes = {
  changeMode: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const reducerAuth = 'studentAuth';

const mapStateToProps = state => ({
  isLoggedIn: state.getIn([reducerAuth, 'isLoggedIn'])
});

const StudentMapped = connect(
  mapStateToProps,
)(Student);

export default (StudentMapped);
