import React, { Component } from 'react'
import { AdminSeatManagementForm } from 'dan-components'
import AdminSeatManagementTable from './AdminSeatManagementTable'
import AdminTokenTable from './AdminTokenTable';
import qs from 'qs';
import Grid from '@material-ui/core/Grid';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });

  return await response.json();
}

class SeatManagement extends Component {
  submitForm(values) {
    const MappedValues = values.toJS();
    const { firstname, lastname, email, username, phone } = MappedValues;
    const data = { firstname, lastname, email, username, phone };

    postData(`${API_URL}/admin/create-seat`, data)
      .then((res) => {
        if (res.status === 1) {
          window.location.reload();
        }
        else {
          console.log("Something not good");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <Grid container spacing={3} >
          <Grid item md={6} xs={12}>
            <AdminSeatManagementForm onSubmit={(values) => this.submitForm(values)} />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <AdminTokenTable />
          </Grid>
        </Grid>
        <AdminSeatManagementTable />
      </div>
    )
  }
}

export default SeatManagement
