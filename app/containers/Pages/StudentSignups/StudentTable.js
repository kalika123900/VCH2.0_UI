import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from 'dan-components/Tables/tableStyle-jss';

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
}

function formatData(data) {
  const k = {
    0: 'students_past_week',
    1: 'students_past_day',
    2: 'students_verified_past_week',
    3: 'students_verified_past_day'
  }

  let tempObj = {}
  let temp = 0
  let tempArr = []

  for (let item of data) {
    for (let i of item[k[temp]]) {
      if (tempObj.hasOwnProperty(i.university_name)) {
        tempObj[i.university_name][k[temp]] = parseInt(i[k[temp]])
      } else {
        tempObj[i.university_name] = {};
        tempObj[i.university_name][k[temp]] = parseInt(i[k[temp]])
      }
    }

    temp++
  }

  Object.keys(tempObj).forEach((key) => {
    tempArr.push({
      university_name: key,
      students_past_week: 0,
      students_past_day: 0,
      students_verified_past_week: 0,
      students_verified_past_day: 0,
      ...tempObj[key]
    })
  })

  return tempArr;
}

class StudentTable extends React.Component {
  state = {
    data: [],
    isStudents: false
  }

  getStudents = () => {
    getData(`${API_URL}/admin/get-student-signup-university-stats`) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const tempData = formatData(res.data);
          if (tempData.length > 0) {
            this.setState({ data: tempData, isStudents: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getStudents();
  }

  render() {
    const { classes } = this.props;
    const { isStudents, data } = this.state;

    return (
      <Fragment>
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Student Signups Stats</Typography>
            </div>
          </Toolbar>
          {isStudents
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">University Name</TableCell>
                    <TableCell align="center">Students Past Day</TableCell>
                    <TableCell align="center">Students Past Week</TableCell>
                    <TableCell align="center">Verified Past Day</TableCell>
                    <TableCell align="center">Verified Past Week</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(n => (
                    <TableRow>
                      <TableCell align="left">{n.university_name}</TableCell>
                      <TableCell align="center">{n.students_past_day}</TableCell>
                      <TableCell align="center">{n.students_past_week}</TableCell>
                      <TableCell align="center">{n.students_verified_past_day}</TableCell>
                      <TableCell align="center">{n.students_verified_past_week}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
            : (
              <Typography
                color="textSecondary"
                variant="body1"
                className={classes.warnMsg}
              >
                No Signups Found !
              </Typography>
            )
          }
        </div >
      </Fragment>
    );
  }
}

StudentTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTable);
