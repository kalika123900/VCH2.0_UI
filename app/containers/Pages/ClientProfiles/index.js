import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import formatDate from '../../../Helpers/formatDate';
import qs from 'qs';
import { makeSecureEncrypt } from '../../../Helpers/security';
import { makeSecureDecrypt } from '../../../Helpers/security';

function createData(id, client_name, username, email, phone, password) {
  return {
    id,
    client_name,
    username,
    email,
    phone,
    password
  };
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

class ClientProfile extends React.Component {
  state = {
    clientData: [],
    page: 0,
    rowsPerPage: 5
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRedirect = (n) => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      username: n.username,
      password: n.password,
      userType: "ADMIN"
    }

    postData(`${API_URL}/client/signin`, data)
      .then((res) => {
        if (res.status === 1) {
          localStorage.setItem('oldUser', makeSecureEncrypt(JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            phone: user.phone,
            managerType: user.type,
            type: "ADMIN",
            token: user.token
          })));

          if (res.data.type == 2) {
            localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
              id: res.data.id,
              cId: res.data.cId,
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
              username: res.data.username,
              phone: res.data.phone,
              managerType: res.data.type,
              type: 'CLIENT',
              token: res.data.token
            })));
          } else {
            localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
              id: res.data.id,
              cId: res.data.cId,
              name: res.data.name,
              email: res.data.email,
              username: res.data.username,
              phone: res.data.phone,
              managerType: res.data.type,
              role: res.data.role,
              capabilities: res.data.capabilities,
              type: 'CLIENT',
              token: res.data.token
            })));
          }
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    const _that = this;
    async function getData(url) {
      const response = await fetch(url, {
        method: 'GET',
      });

      return await response.json();
    }

    getData(`${API_URL}/admin/client-profiles`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            var clientData = [];
            res.data.map(item => {
              const client_name = item.firstname + ' ' + item.lastname;
              const phone = item.phone == null ? 'Not Avilable' : item.phone;
              clientData.push(
                createData(item.id, client_name, item.username, item.email, phone, item.password)
              );
              _that.setState({ clientData });
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page, clientData } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, clientData.length - (page * rowsPerPage));

    return (
      <Fragment>
        <div className={classes.rootTable}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Our Clients</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          {clientData.length > 0
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="default">Client Name</TableCell>
                    <TableCell padding="default">Username</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} >
                      <TableCell padding="default">{n.client_name}</TableCell>
                      <TableCell padding="default">{n.username}</TableCell>
                      <TableCell align="left">{n.email}</TableCell>
                      <TableCell align="left">{n.phone}</TableCell>
                      <TableCell align="left">
                        <Button variant="contained" color="primary" onClick={() => this.handleRedirect(n)}>
                          LogIn As Client
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={3}
                      count={clientData.length}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[5, 10, 15]}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            )
            : (
              <Typography
                color="textSecondary"
                variant="body1"
                className={classes.warnMsg}
              >
                Oops! client not exist in a platform, Please Make New Clients.
              </Typography>
            )
          }
        </div>
      </Fragment>
    );
  }
}

ClientProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientProfile);
