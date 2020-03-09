import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import CampaignTable from './CampaignTable'

class CampaignManagement extends Component {
  render() {
    return (
      <Grid>
        <CampaignTable />
      </Grid>
    )
  }
}

export default CampaignManagement;