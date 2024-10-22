import React, { Component } from 'react'
import { SeatManagementForm } from 'dan-components'
import SeatManagementTable from './SeatManagementTable'
import TokenTable from './TokenTable';

import Grid from '@material-ui/core/Grid';
import { makeSecureDecrypt } from '../../../Helpers/security';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

class SeatManagement extends Component {
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    if (user.cId == null) {
      this.props.history.push('/client/unauthorized');
    } else if (user.managerType != 2) {
      this.props.history.push('/client/unauthorized');
    }
  }

  submitForm(values) {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const MappedValues = values.toJS();
    const { firstname, lastname, email, username, phone, tier } = MappedValues;
    const data = { firstname, lastname, email, username, phone, tier, company_id: user.cId };

    postData(`${API_URL}/client/create-seat`, data)
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
            <SeatManagementForm onSubmit={(values) => this.submitForm(values)} />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TokenTable />
          </Grid>
        </Grid>
        <SeatManagementTable />
      </div>
    )
  }
}

export default SeatManagement
