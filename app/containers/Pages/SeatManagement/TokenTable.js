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
import formatDate from '../../../Helpers/formatDate';
import qs from 'qs';
import { CustomConfirmation } from 'dan-components';
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

function createData(id, name, email, created_at, status) {
  return {
    id,
    name,
    email,
    created_at,
    status
  };
}

var tokenData = [];

class TokenTable extends React.Component {
  state = {
    istokenData: false,
    open: false,
    token_id: -1,
  }

  handleConfirmation = (id) => {
    let value = this.state.open ? false : true
    this.setState({ open: value, token_id: id })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleAction = () => {
    this.removeToken(this.state.token_id);
  }

  getTokens = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
    };

    postData(`${API_URL}/client/get-staff-tokens`, data)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let tempData = [];
            res.data.map(item => {
              const name = `${item.firstname} ${item.lastname}`;
              const status = item.status == 0 ? 'Not Used Yet' : 'Expired';
              const created_at = formatDate(item.created_at);
              tempData.push(createData(item.id, name, item.email, created_at, status));
            });
            tokenData = tempData;
            this.setState({ istokenData: true });
          } else {
            tokenData = [];
            this.setState({ istokenData: false });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeToken = (id) => {
    const data = {
      token_id: id,
    };

    postData(`${API_URL}/client/remove-staff-token`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ open: false });
          this.getTokens();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getTokens();
  }

  render() {
    const { classes } = this.props;
    const { istokenData, open } = this.state;

    return (
      <Fragment>
        <CustomConfirmation
          open={open}
          handleClose={this.handleClose}
          handleAction={this.handleAction}
        />
        <div className={classes.rootTable} style={{ wordBreak: 'normal' }}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Created Seat Tokens</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          {istokenData
            ?
            (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Created At</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tokenData.map(n => ([
                    <TableRow key={n.id}>
                      <TableCell align="left">{n.name}</TableCell>
                      <TableCell align="left">{n.email}</TableCell>
                      <TableCell align="left">{n.created_at}</TableCell>
                      <TableCell align="left">{n.status}</TableCell>
                      <TableCell align="left">
                        <Button onClick={() => this.handleConfirmation(n.id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
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
                No Seats tokens are created yet !
              </Typography>
            )
          }
        </div >
      </Fragment>
    );
  }
}

TokenTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TokenTable);