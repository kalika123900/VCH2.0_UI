import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import qs from 'qs';
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
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });
  return await response.json();
}

function createData(id, name, email, phone, establish_at, status) {
  return {
    id,
    name,
    email,
    phone,
    establish_at,
    status
  };
}

class CompanyProfile extends React.Component {
  state = {
    companyData: [],
    page: 0,
    rowsPerPage: 5,
    isDeleted: false
  }

  showCompany = (id) => {
    this.props.history.push(`/admin/company-profile/${id}`)
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

  componentDidMount() {
    this.getCompanies();
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
                createData(item.id, item.name, item.email, item.phone, establish_at, status)
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
    const { rowsPerPage, page, companyData } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, companyData.length - (page * rowsPerPage));

    return (
      <Fragment>
        <div className={classes.rootTable} style={{ wordBreak: 'normal' }}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Company Profiles</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Add Company">
                <Button variant="contained" onClick={() => this.newCompany()} color="secondary" className={classes.button}>
                  <AddIcon className={classNames(isWidthUp('sm', 'sm') && classes.leftIcon, classes.iconSmall)} />
                  {isWidthUp('sm', 'sm') && 'Add Company'}
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
                    <TableCell padding="left">Phone</TableCell>
                    <TableCell align="left">Established At</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companyData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} onClick={() => this.showCompany(n.id)} >
                      <TableCell padding="default">{n.name}</TableCell>
                      <TableCell padding="default">{n.email}</TableCell>
                      <TableCell align="left">{n.phone}</TableCell>
                      <TableCell align="left">{n.establish_at}</TableCell>
                      <TableCell align="left">{n.status}</TableCell>
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
