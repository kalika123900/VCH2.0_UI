import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import PendingCampaigns from './PendingCampaigns'
import OngoingCampaigns from './OngoingCampaigns'
import PausedCampaigns from './PausedCampaigns';
import ClientCancelCampaigns from './ClientCancelCampaigns';


class CampaignManagement extends Component {
  render() {
    return (
      <Fragment>
        <Grid container spacing={3} >
          <Grid item md={6} xs={12}>
            <PendingCampaigns />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <OngoingCampaigns />
          </Grid>
        </Grid>
        <Grid container spacing={3} >
          <Grid item md={6} xs={12}>
            <PausedCampaigns />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <ClientCancelCampaigns />
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default CampaignManagement;