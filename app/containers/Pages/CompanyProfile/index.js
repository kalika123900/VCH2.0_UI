import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeSecureEncrypt } from 'dan-helpers/security';
import { makeSecureDecrypt } from 'dan-helpers/security';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';

import { CustomConfirmation } from 'dan-components';
import { isWidthUp } from '@material-ui/core/withWidth';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
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
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import formatDate from '../../../Helpers/formatDate';

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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

function createData(id, name, email, phone, establish_at, status, manager_id, manager_email, firstname, lastname, username, manager_phone) {
  return {
    id,
    name,
    email,
    phone,
    establish_at,
    status,
    manager_id,
    manager_email,
    firstname,
    lastname,
    username,
    manager_phone
  };
}

class CompanyProfile extends React.Component {
  state = {
    companyData: [],
    page: 0,
    rowsPerPage: 5,
    isDeleted: false,
    open: false,
    companyId: -1,
  }

  handleConfirmation = (e, id) => {
    let value = this.state.open ? false : true
    this.setState({ open: value, companyId: id })
  }

  showCompany = (e, id) => {
    this.props.history.push(`/admin/company-profile/${btoa(id)}`)
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  newCompany = () => {
    this.props.history.push('/admin/create-company')
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleAction = () => {
    this.removeCompany(this.state.companyId);
  }

  removeCompany = (id) => {
    const data = {
      companyId: id
    };

    postData(`${API_URL}/admin/remove-company`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ open: false });
          this.getCompanies();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getCompanies();
  }

  companyLogin = (n) => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      id: n.manager_id,
      email: n.manager_email,
      name: `${n.firstname} ${n.lastname}`,
      username: n.username,
      phone: n.manager_phone,
      type: 'CLIENT',
      token: user.token,
      cId: n.id,
      role: 'COMPANY-ADMIN',
      managerType: 2,
      mode: 'light',
      theme: 'blueTheme',
      via: 'ADMIN'
    }

    localStorage.setItem('user', makeSecureEncrypt(JSON.stringify(data)));
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

    window.location.reload();
  }

  getCompanies = () => {
    const _that = this;

    getData(`${API_URL}/admin/get-companies`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            var companyData = [];
            res.data.map(item => {
              const status = item.status == 0 ? 'Deactivated' : 'Active';
              const establish_at = formatDate(item.establish_at);

              companyData.push(
                createData(item.id, item.name, item.email, item.phone, establish_at, status, item.manager_id, item.manager_email, item.firstname, item.lastname, item.username, item.manager_phone)
              );
              _that.setState({ companyData });
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
    const { rowsPerPage, page, companyData, open } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, companyData.length - (page * rowsPerPage));

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
              <Typography variant="h6">Company Profiles</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Managed by me">
                <Button variant="contained" onClick={() => this.newCompany()} color="secondary" className={classes.button}>
                  <AddIcon className={classNames(isWidthUp('sm', 'sm') && classes.leftIcon, classes.iconSmall)} />
                  {isWidthUp('sm', 'sm') && 'Managed by me'}
                </Button>
              </Tooltip>
            </div>
          </Toolbar>
          {companyData.length > 0
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="default">Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">Created At</TableCell>
                    <TableCell align="left">Edit Profile</TableCell>
                    <TableCell align="left">Action</TableCell>
                    <TableCell align="left">Manage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companyData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id}  >
                      <TableCell padding="default">{n.name}</TableCell>
                      <TableCell align="default">{n.email}</TableCell>
                      <TableCell align="left">{n.phone}</TableCell>
                      <TableCell align="left">{n.establish_at}</TableCell>
                      <TableCell align="left">
                        <Button name='edit' onClick={(e) => this.showCompany(e, n.id)}>
                          <EditIcon />
                        </Button>
                      </TableCell>
                      <TableCell name='confirm' align="left">
                        <Button onClick={(e) => this.handleConfirmation(e, n.id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => this.companyLogin(n)}>
                          Login
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
                      count={companyData.length}
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
                Oops! No Companies are generated yet.
              </Typography>
            )
          }
        </div>
      </Fragment>
    );
  }
}

CompanyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompanyProfile);
