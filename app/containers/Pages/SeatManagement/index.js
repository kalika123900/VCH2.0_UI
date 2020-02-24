import React, { Component } from 'react'
import { SeatManagementForm } from 'dan-components'
import SeatManagementTable from './SeatManagementTable'

class SeatManagement extends Component {
  render() {
    return (
      <div>
        <SeatManagementForm />
        <SeatManagementTable />
      </div>
    )
  }
}

export default SeatManagement
