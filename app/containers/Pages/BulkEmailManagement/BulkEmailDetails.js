import React, { Component } from 'react'
import { BulkEmailPieChart, BulkEmailGraph, BulkEmailStats, BulkEmailInfo } from 'dan-components'
import Grid from '@material-ui/core/Grid'

class BulkEmailDetails extends Component {
  render() {
    return (
      <Grid>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <BulkEmailStats />
          </Grid>
          <Grid item md={6} xs={12}>
            <BulkEmailGraph />

          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <BulkEmailPieChart />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <BulkEmailInfo />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default BulkEmailDetails;
