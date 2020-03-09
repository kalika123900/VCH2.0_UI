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
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import styles from 'dan-components/Tables/tableStyle-jss';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

let id = 0;
function createData(student_name, email, university, gender, status) {
  id += 1;
  return {
    id,
    student_name,
    email,
    university,
    gender,
    status
  };
}

const data = [
  createData('Jhon Doe', 'dummyemail@gmail.com', 'Lorem Ipsum', 'Male', 'Active'),
  createData('Aron Finch', 'dummyemail@gmail.com', 'Lorem Ipsum', 'Male', 'Inactive'),
  createData('Tony Stark', 'dummyemail@gmail.com', 'Lorem Ipsum', 'Male', 'Active'),
  createData('Jhon Cena', 'dummyemail@gmail.com', 'Lorem Ipsum', 'Male', 'Inactive'),
  createData('Big Dog', 'dummyemail@gmail.com', 'Lorem Ipsum', 'Male', 'Active'),
  createData('Spider Man', 'dummyemail@gmail.com', 'Lorem Ipsum', 'Male', 'Inactive'),
  createData('Hulk', 'dummyemail@gmail.com', 'Lorem Ipsum', 'Male', 'Active'),
];

class StudentTable extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Our Clients</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          <Table className={classNames(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
                <TableCell padding="default">Student Name</TableCell>
                <TableCell align="left">Student Email</TableCell>
                <TableCell align="left">University</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => ([
                <TableRow key={n.id} >
                  <TableCell padding="default">{n.student_name}</TableCell>
                  <TableCell align="left">{n.email}</TableCell>
                  <TableCell align="left">{n.university}</TableCell>
                  <TableCell align="left">{n.gender}</TableCell>
                  <TableCell align="left">{n.status}</TableCell>
                  <TableCell align="left">
                    <Button>
                      <NotInterestedIcon />
                    </Button>
                    <Button >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ]))}
            </TableBody>
          </Table>
        </div >
      </Fragment>
    );
  }
}

StudentTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTable);
