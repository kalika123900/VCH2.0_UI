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
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import styles from 'dan-components/Tables/tableStyle-jss';
import { EditClientDialog } from 'dan-components';

let id = 0;
function createData(client_name, email, company, budget, status) {
  id += 1;
  return {
    id,
    client_name,
    email,
    company,
    budget,
    status
  };
}

const data = [
  createData('Jhon Doe', 'dummyemail@gmail.com', 'Lorem Ipsum', '14$', 'Active'),
  createData('Aron Finch', 'dummyemail@gmail.com', 'Lorem Ipsum', '18$', 'Inactive'),
  createData('Tony Stark', 'dummyemail@gmail.com', 'Lorem Ipsum', '13$', 'Active'),
  createData('Jhon Cena', 'dummyemail@gmail.com', 'Lorem Ipsum', '35$', 'Inactive'),
  createData('Big Dog', 'dummyemail@gmail.com', 'Lorem Ipsum', '24$', 'Active'),
  createData('Spider Man', 'dummyemail@gmail.com', 'Lorem Ipsum', '45$', 'Inactive'),
  createData('Hulk', 'dummyemail@gmail.com', 'Lorem Ipsum', '68$', 'Active'),
];



class ClientTable extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = (e) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <EditClientDialog open={open} handleClose={this.handleClose} />
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
                <TableCell padding="default">Client Name</TableCell>
                <TableCell align="left">Client Email</TableCell>
                <TableCell align="left">Company Name</TableCell>
                <TableCell align="left">Budget</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => ([
                <TableRow key={n.id} >
                  <TableCell padding="default">{n.client_name}</TableCell>
                  <TableCell align="left">{n.email}</TableCell>
                  <TableCell align="left">{n.company}</TableCell>
                  <TableCell align="left">{n.budget}</TableCell>
                  <TableCell align="left">{n.status}</TableCell>
                  <TableCell align="left">
                    <Button onClick={(e) => this.handleClickOpen(e)} >
                      <EditIcon />
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

ClientTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientTable);
