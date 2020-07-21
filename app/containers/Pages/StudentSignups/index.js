import React, { Fragment } from 'react';
import StudentSignupStats from '../../Charts/StudentSignupStats';
import StudentTable from './StudentTable';

class StudentSignups extends React.Component {
  render() {
    return (
      <Fragment>
        <StudentSignupStats />
        <StudentTable />
      </Fragment>
    )
  }
}

export default StudentSignups;
