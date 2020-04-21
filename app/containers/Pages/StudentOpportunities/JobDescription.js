import React, { Component } from 'react'
import { ClientJobDescription } from 'dan-components'

export default class JobDescription extends Component {

  render() {
    const parseData = JSON.parse(atob(this.props.match.params.id))
    return (
      <div>
        <ClientJobDescription data={parseData} />
      </div>
    )
  }
}
