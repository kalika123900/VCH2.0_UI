import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import { isWidthUp } from '@material-ui/core/withWidth';
import Tooltip from '@material-ui/core/Tooltip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import styles from 'dan-components/Tables/tableStyle-jss';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import qs from 'qs';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { CustomConfirmation } from 'dan-components';
import { makeSecureDecrypt } from '../../../Helpers/security';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
}

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
var menuItem = [];

class MiniSeatTable extends React.Component {
  state = {
    isSeatData: false,
    open: false,
    staff_id: -1,
    userType: 'CLIENT',
    openList: false,
    user_id: ''
  }

  handleConfirmation = (id) => {
    let value = this.state.open ? false : true
    this.setState({ open: value, staff_id: id })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleAction = () => {
    this.removeStaff(this.state.staff_id);
  }

  getStaff = () => {
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

  removeStaff = (id) => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const data = {
      staff_id: id,
      company_id: user.cId
    };

    postData(`${API_URL}/client/remove-seat`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ open: false });
          this.getStaff();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addMember = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const data = {
      user_id: this.state.user_id,
      company_id: user.cId
    };

    postData(`${API_URL}/admin/add-client-staff`, data)
      .then((res) => {
        if (res.status === 1) {
          this.handleDialogClose();
          this.getStaff();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addStaff = () => {
    getData(`${API_URL}/admin/get-unassociated-client`) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          menuItem = res.data;
          let value = !this.state.openList;
          this.setState({ openList: value });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDialogClose = () => {
    let value = !this.state.openList;
    this.setState({ openList: value });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.getStaff();
    if (localStorage.hasOwnProperty('oldUser')) {
      this.setState({ userType: 'ADMIN' })
    }
  }

  render() {
    const { classes } = this.props;
    const { isSeatData, open, openList, user_id } = this.state;

    return (
      <Fragment>
        {/* <CustomConfirmation
          open={open}
          handleClose={this.handleClose}
          handleAction={this.handleAction}
        />
        <Grid container justify="center" direction="column">
          <Dialog
            open={openList}
            onClose={this.handleDialogClose}
            aria-labelledby="form-dialog-title"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Add Staff</DialogTitle>
            <DialogContent style={{ width: '100%' }}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel id="select-helper-label">Select Staff</InputLabel>
                <Select
                  labelId="select-helper-label"
                  id="select-helper"
                  name='user_id'
                  value={user_id}
                  onChange={(e) => this.handleChange(e)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {menuItem.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{`${item.firstname} ${item.lastname}`}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Choose already existing unassociated client memeber</FormHelperText>
              </FormControl>
              <Button onClick={() => this.handleDialogClose()} variant="text" >cancel</Button>
              <Button
                disabled={this.state.user_id == '' ? true : false}
                variant="text"
                color="secondary"
                onClick={() => this.addMember()}
              >
                Add
              </Button>
            </DialogContent>
          </Dialog>
        </Grid> */}
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Created Seats</Typography>
            </div>
            <div className={classes.spacer} />
            {/* {this.state.userType == 'ADMIN' &&
              <div className={classes.actions}>
                <Tooltip title="Add Existing Client">
                  <Button variant="contained" onClick={() => this.addStaff()} color="secondary" className={classes.button}>
                    <AddIcon className={classNames(isWidthUp('sm', 'sm') && classes.leftIcon, classes.iconSmall)} />
                    {isWidthUp('sm', 'sm') && 'Add Staff'}
                  </Button>
                </Tooltip>
              </div>
            } */}
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
                    {/* <TableCell align="left">Phone</TableCell> */}
                    <TableCell align="left">Status</TableCell>
                    {/* <TableCell align="left">Actions</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {seatData.map(n => ([
                    <TableRow key={n.id}>
                      <TableCell align="left">{n.name}</TableCell>
                      <TableCell align="left">{n.username}</TableCell>
                      <TableCell align="left">{n.email}</TableCell>
                      {/* <TableCell align="left">{n.phone}</TableCell> */}
                      <TableCell align="left">{n.status}</TableCell>
                      {/* <TableCell align="left">
                        <Button onClick={(e) => this.handleConfirmation(n.id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell> */}
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

MiniSeatTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniSeatTable);