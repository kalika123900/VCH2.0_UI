import React, { Component } from 'react'
import AwaitingCampaigns from '../Pages/CampaignManagement/AwaitingCampaigns';
import AwaitingBulkEmails from '../Pages/BulkEmailManagement/AwaitingBulkEmails';
import Grid from '@material-ui/core/Grid';
import StudentSignupFeed from '../Widgets/StudentSignupFeed';
import { TimelineWidget } from 'dan-components';
import StudentSignupChart from '../Charts/StudentSignupChart';

class AdminDashboard extends Component {
  render() {
    return (
      <Grid>
        <Grid container spacing={2} >
          <Grid item md={6} xs={12}>
            <AwaitingCampaigns />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <AwaitingBulkEmails />
          </Grid>
        </Grid>
        <Grid container spacing={2} >
          <Grid item md={6} xs={12}>
            <StudentSignupChart />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TimelineWidget />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default AdminDashboard;