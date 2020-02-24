import React, { Component } from 'react'
import {
  CampaignPieChart, CampaignGraph,
  CampaignStats, CampaignInfo
}
  from 'dan-components'
import Grid from '@material-ui/core/Grid'

class CampaignDetails extends Component {
  render() {
    return (
      <Grid>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <CampaignStats />
          </Grid>
          <Grid item md={6} xs={12}>
            <CampaignGraph />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <CampaignPieChart />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <CampaignInfo />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default CampaignDetails;
