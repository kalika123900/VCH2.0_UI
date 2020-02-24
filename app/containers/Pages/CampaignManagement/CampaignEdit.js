import React, { Component } from 'react'
import { CampaignEditForm } from 'dan-components'
import { Grid } from '@material-ui/core'

export default class CampaignEdit extends Component {
  render() {
    return (
      <Grid>
        <CampaignEditForm />
      </Grid>
    )
  }
}

