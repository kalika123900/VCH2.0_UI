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

function createData(id, client_name, username, email, status, created_at) {
  return {
    id,
    client_name,
    username,
    email,
    status,
    created_at
  };
}

class ClientAccounts extends React.Component {
  state = {
    tokenData: [],
    page: 0,
    rowsPerPage: 5,
    isDeleted: false
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  newToken = () => {
    this.props.history.push('/admin/token')
  }

  getTokens = () => {
    const _that = this;

    getData(`${API_URL}/admin/get-tokens`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            var tokenData = [];
            res.data.map(item => {
              const client_name = item.firstname + ' ' + item.lastname;
              const status = item.status == 0 ? 'Not Used Yet' : 'Expired';
              const created_at = formatDate(item.created_at);

              tokenData.push(
                createData(item.id, client_name, item.username, item.email, status, created_at)
              );
              _that.setState({ tokenData });
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDelete = (n) => {
    const data = {
      id: n.id
    }

    postData(`${API_URL}/admin/remove-token`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
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
    const { rowsPerPage, page, tokenData } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tokenData.length - (page * rowsPerPage));

    return (
      <Fragment>
        <div className={classes.rootTable}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Your Generated Tokens</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Add Campaign">
                <Button variant="contained" onClick={() => this.newToken()} color="secondary" className={classes.button}>
                  <AddIcon className={classNames(isWidthUp('sm', 'sm') && classes.leftIcon, classes.iconSmall)} />
                  {isWidthUp('sm', 'sm') && 'New Token'}
                </Button>
              </Tooltip>
            </div>
          </Toolbar>
          {tokenData.length > 0
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="default">Client Name</TableCell>
                    <TableCell padding="default">Username</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Created At</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tokenData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} >
                      <TableCell padding="default">{n.client_name}</TableCell>
                      <TableCell padding="default">{n.username}</TableCell>
                      <TableCell align="left">{n.email}</TableCell>
                      <TableCell align="left">{n.created_at}</TableCell>
                      <TableCell align="left">{n.status}</TableCell>
                      <TableCell align="left">
                        <Button onClick={() => this.handleDelete(n)}>
                          <DeleteIcon />
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
                      count={tokenData.length}
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
                Oops! No tokens are generated yet.
              </Typography>
            )
          }
        </div>
      </Fragment>
    );
  }
}

ClientAccounts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientAccounts);
