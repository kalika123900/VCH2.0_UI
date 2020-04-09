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

function createData(id, name, username, email, phone, status) {
  return {
    id,
    name,
    username,
    email,
    phone,
    status
  };
}

var seatData = [];

class SeatManagementTable extends React.Component {
  state = {
    isSeatData: false
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
    };

    postData(`${API_URL}/client/get-seats`, data)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let tempData = [];
            res.data.map(item => {
              const name = `${item.firstname} ${item.lastname}`;
              const status = item.status == 0 ? 'Deactivated' : 'Active';
              tempData.push(createData(item.id, name, item.username, item.email, item.phone, status));
            });
            seatData = tempData;
            this.setState({ isSeatData: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { isSeatData } = this.state;

    return (
      <Fragment>
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Created Seats</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          {isSeatData
            ?
            (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Username</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {seatData.map(n => ([
                    <TableRow key={n.id}>
                      <TableCell align="left">{n.name}</TableCell>
                      <TableCell align="left">{n.username}</TableCell>
                      <TableCell align="left">{n.email}</TableCell>
                      <TableCell align="left">{n.phone}</TableCell>
                      <TableCell align="left">{n.status}</TableCell>
                      <TableCell align="left"> <Button><DeleteIcon /></Button></TableCell>
                    </TableRow>
                  ]))}
                </TableBody>
              </Table>
            )
            : (
              <Typography
                color="textSecondary"
                variant="body1"
                className={classes.warnMsg}
              >
                No Seats are created yet !
              </Typography>
            )
          }
        </div >
      </Fragment>
    );
  }
}

SeatManagementTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeatManagementTable);