import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Footer } from 'dan-components';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Dashboard from '../Templates/Dashboard';
import EditScheduledCampaign from '../../containers/Tables/EditScheduledCampaign';
import {
  AdminDashboard, AdminSeatManagement, AdminCampaignManagement, CampaignEdit,
  ClientAccounts, ClientProfiles, StudentReview, Campaigns, Signout, BulkEmailEdit,
  Token, CreateCompany, CompanyProfile, EditCompanyForm, AdminEditDetails, StudentSignups
}
  from '../pageListAsync';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    const { isLoggedIn } = props;
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
            <Route exact path="/admin/campaign-review/:campaignId" component={CampaignEdit} />
            <Route exact path="/admin/bulkemail-review/:bulkEmailId" component={BulkEmailEdit} />
            <Route exact path="/admin/client-tokens" component={ClientAccounts} />
            <Route exact path="/admin/client-profiles" component={ClientProfiles} />
            <Route exact path="/admin/student-review" component={StudentReview} />
            <Route exact path="/admin/student-signups" component={StudentSignups} />
            <Route exact path="/admin/edit-details" component={AdminEditDetails} />
            <Route exact path="/admin/signout" component={Signout} />
            <Route exact path="/admin/company-profile" component={CompanyProfile} />
            <Route exact path="/admin/company-profile/:cId" component={EditCompanyForm} />
            <Route exact path="/admin/create-company" component={CreateCompany} />
            <Route exact path="/admin/token" component={Token} />
            <Route exact path="/admin/scheduled-email" component={EditScheduledCampaign} />
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
