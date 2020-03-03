import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../Templates/ClientDashboard';
import { Footer } from 'dan-components';
import {
  ClientDashboard, Campaigns, Explore, BulkEmails,
  CampaignManagement, CampaignDetails, EditDetails, ClientMessage,
  BulkEmailManagement, BulkEmailDetails, SeatManagement, Email,
  CampaignEdit, ClientSettings, NotFound
}
  from '../pageListAsync';

class Client extends React.Component {
  constructor(props) {
    super(props);
    let { isLoggedIn } = props;
    isLoggedIn ? true : props.history.push('/signin');
  }

  render() {
    const { changeMode, history } = this.props;
    return (
      <Fragment>
        <Dashboard history={history} changeMode={changeMode}>
          <Switch>
            <Route exact path="/client" component={ClientDashboard} />
            <Route exact path="/client/campaigns" component={Campaigns} />
            <Route exact path="/client/explore" component={Explore} />
            <Route exact path="/client/bulk-emails" component={BulkEmails} />
            <Route exact path='/client/campaign-management' component={CampaignManagement} />
            <Route exact path='/client/campaign-details' component={CampaignDetails} />
            <Route exact path='/client/edit-details' component={EditDetails} />
            <Route exact path='/client/messages' component={Email} />
            <Route exact path='/client/email-management' component={BulkEmailManagement} />
            <Route exact path='/client/email-details' component={BulkEmailDetails} />
            <Route exact path='/client/seat-management' component={SeatManagement} />
            <Route exact path='/client/edit-campaign/:id' component={CampaignEdit} />
            <Route exact path='/client/settings' component={ClientSettings} />
            <Route component={NotFound} />
          </Switch>
        </Dashboard>
        <Footer />
      </Fragment>
    );
  }
}

Client.propTypes = {
  changeMode: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const reducerAuth = 'clientAuth';

const mapStateToProps = state => ({
  isLoggedIn: state.getIn([reducerAuth, 'isLoggedIn']),
});

const ClientMapped = connect(
  mapStateToProps,
)(Client);

export default (ClientMapped);