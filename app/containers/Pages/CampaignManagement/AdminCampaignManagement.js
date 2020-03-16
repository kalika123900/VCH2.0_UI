import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import NotCancelCampaign from './NotCancelCampaign'
import CancelCampaign from './CancelCampaign'

class AdminCampaignManagement extends Component {
  render() {
    return (
      <Grid container spacing={3} >
        <Grid item md={6} xs={12}>
          <NotCancelCampaign />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <CancelCampaign />
        </Grid>
      </Grid>
    )
  }
}

export default AdminCampaignManagement;