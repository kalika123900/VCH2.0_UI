import React, { Component } from 'react'
import { AdminSeatCreation } from 'dan-components'
import AdminSeatTable from './AdminSeatTable'

class AdminSeatManagement extends Component {
  render() {
    return (
      <div>
        <AdminSeatCreation />
        <AdminSeatTable />
      </div>
    )
  }
}

export default AdminSeatManagement
