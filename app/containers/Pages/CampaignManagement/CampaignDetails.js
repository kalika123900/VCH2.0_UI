import React, { Component } from 'react'
import {
  CampaignPieChart, CampaignGraph,
  CampaignStats, CampaignInfo
}
  from 'dan-components'
import { makeSecureDecrypt } from 'dan-helpers/security';
import Grid from '@material-ui/core/Grid'

class CampaignDetails extends Component {
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    if (user.managerType != 2) {
      if (user.capabilities == 3)
        this.props.history.push('/client/unauthorized');
    }
  }

  render() {
    const campaignId = this.props.match.params.campaignId;

    return (
      <Grid>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <CampaignStats campaignId={campaignId} />
          </Grid>
          <Grid item md={6} xs={12}>
            <CampaignGraph campaignId={campaignId} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <CampaignPieChart campaignId={campaignId} />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <CampaignInfo campaignId={campaignId} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default CampaignDetails;
