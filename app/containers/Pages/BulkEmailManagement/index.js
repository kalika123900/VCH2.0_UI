import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PendingBulkEmail from './PendingBulkEmail';
import OngoingBulkEmail from './OngoingBulkEmail';

class BulkEmailManagement extends Component {
  render() {
    return (
      <Grid container spacing={3} >
        <Grid item md={6} xs={12}>
          <OngoingBulkEmail />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <PendingBulkEmail />
        </Grid>
      </Grid>
    )
  }
}

export default BulkEmailManagement;