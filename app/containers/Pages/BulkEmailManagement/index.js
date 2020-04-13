import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PendingBulkEmail from './PendingBulkEmail';
import OngoingBulkEmail from './OngoingBulkEmail';
import { makeSecureDecrypt } from 'dan-helpers/security';

class BulkEmailManagement extends Component {
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