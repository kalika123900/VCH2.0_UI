import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import BulkEmailTable from './BulkEmailTable'

class BulkEmailManagement extends Component {
  render() {
    return (
      <Grid>
        <BulkEmailTable />
      </Grid>
    )
  }
}

export default BulkEmailManagement;