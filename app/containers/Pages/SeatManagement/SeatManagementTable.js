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
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

let id = 0;
function createData(name, token, date_create, date_used, status) {
  id += 1;
  return {
    id,
    name,
    token,
    date_create,
    date_used,
    status
  };
}

const data = [
  createData('Lorem Ipsum', '5fswe5fs1fa5', '01-January-2020', '01-March-2020', 'Active'),
  createData('Lorem Ipsum', '5fswe5fs1fa5', '02-January-2020', '01-February-2020', 'Inactive'),
  createData('Lorem Ipsum', '5fswe5fs1fa5', '04-January-2020', '01-April-2020', 'Active'),
  createData('Lorem Ipsum', '5fswe5fs1fa5', '05-January-2020', '01-September-2020', 'Inactive'),
  createData('Lorem Ipsum', '5fswe5fs1fa5', '01-February-2020', '01-October-2020', 'Active'),
  createData('Lorem Ipsum', '5fswe5fs1fa5', '05-February-2020', '08-October-2020', 'Inactive'),
  createData('Lorem Ipsum', '5fswe5fs1fa5', '14-February-2020', '12-October-2020', 'Active'),
];

class SeatManagementTable extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Created Seats</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          <Table className={classNames(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
                <TableCell padding="default">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Token</TableCell>
                <TableCell align="left">Create Date</TableCell>
                <TableCell align="left">Used Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => ([
                <TableRow key={n.id}>
                  <TableCell padding="default">{n.id}</TableCell>
                  <TableCell padding="default">{n.name}</TableCell>
                  <TableCell padding="default">{n.token}</TableCell>
                  <TableCell align="left">{n.date_create}</TableCell>
                  <TableCell align="left">{n.date_used}</TableCell>
                  <TableCell align="left">{n.status}</TableCell>
                  <TableCell align="left"> <Button><DeleteIcon /></Button></TableCell>
                </TableRow>
              ]))}
            </TableBody>
          </Table>
        </div >
      </Fragment>
    );
  }
}

SeatManagementTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeatManagementTable);