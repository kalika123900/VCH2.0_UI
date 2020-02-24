import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/AdminDashboard';
import { Footer } from 'dan-components';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import {
  AdminDashboard, AdminSeatManagement, AdminCampaignManagement, CampaignEdit,
  ClientAccounts, ClientProfiles, StudentReview
}
  from '../pageListAsync';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    let { isLoggedIn } = props;
    isLoggedIn ? true : props.history.push('/admin-signin');
  }

  render() {
    const { changeMode, history } = this.props;
    return (
      <Fragment>
        <Dashboard history={history} changeMode={changeMode}>
          <Switch>
            <Route exact path="/admin" component={AdminDashboard} />
            <Route exact path="/admin/seat-management" component={AdminSeatManagement} />
            <Route exact path="/admin/campaign-management" component={AdminCampaignManagement} />
            <Route exact path="/admin/campaign-review" component={CampaignEdit} />
            <Route exact path="/admin/client-accounts" component={ClientAccounts} />
            <Route exact path="/admin/client-profiles" component={ClientProfiles} />
            <Route exact path="/admin/student-review" component={StudentReview} />
            <Route component={NotFound} />
          </Switch>
        </Dashboard>
        <Footer />
      </Fragment>
    );
  }
}

Admin.propTypes = {
  changeMode: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const reducerAuth = 'adminAuth';

const mapStateToProps = state => ({
  isLoggedIn: state.getIn([reducerAuth, 'isLoggedIn']),
});

const AdminMapped = connect(
  mapStateToProps,
)(Admin);

export default (AdminMapped);
