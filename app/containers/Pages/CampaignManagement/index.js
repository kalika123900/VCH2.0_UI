import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PendingCampaigns from './PendingCampaigns'
import OngoingCampaigns from './OngoingCampaigns'

class CampaignManagement extends Component {
  render() {
    return (
      <Grid container spacing={3} >
        <Grid item md={6} xs={12}>
          <PendingCampaigns />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <OngoingCampaigns />
        </Grid>
      </Grid>
    )
  }
}

export default CampaignManagement;