import React, { Component } from 'react'
import { BulkEmailPieChart, BulkEmailGraph, BulkEmailStats, BulkEmailInfo } from 'dan-components'
import Grid from '@material-ui/core/Grid'
import { makeSecureDecrypt } from 'dan-helpers/security';

class BulkEmailDetails extends Component {
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    if (user.cId == null) {
      this.props.history.push('/client/unauthorized');
    }

    else if (user.managerType != 2) {
      if (user.capabilities == 3)
        this.props.history.push('/client/unauthorized');
    }
  }

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
