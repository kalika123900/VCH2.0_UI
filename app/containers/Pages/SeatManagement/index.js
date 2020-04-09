import React, { Component } from 'react'
import { SeatManagementForm } from 'dan-components'
import SeatManagementTable from './SeatManagementTable'
import qs from 'qs';
import { makeSecureDecrypt } from '../../../Helpers/security';

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
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const MappedValues = values.toJS();
    const { firstname, lastname, email, username, phone } = MappedValues;
    const data = { firstname, lastname, email, username, phone, company_id: user.cId };

    postData(`${API_URL}/client/create-seat`, data)
      .then((res) => {
        if (res.status === 1) {
          this.props.history.push('/client/seat-management');
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
        <SeatManagementForm onSubmit={(values) => this.submitForm(values)} />
        <SeatManagementTable />
      </div>
    )
  }
}

export default SeatManagement
