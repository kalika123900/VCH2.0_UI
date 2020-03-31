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
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { ConfirmationDialog } from 'dan-components';
import styles from 'dan-components/Tables/tableStyle-jss';
import qs from 'qs';
import { makeSecureDecrypt } from '../../../Helpers/security';
import formatDate from '../../../Helpers/formatDate';
import { Button } from '@material-ui/core';

function createData(id, bulkEmail, created_at, deadline, views) {
  return {
    id,
    bulkEmail,
    created_at,
    deadline,
    views
  };
}

async function getData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });

  return await response.json();
}

let bulkEmailData = [];

class OngoingCampaigns extends React.Component {
  state = {
    isBulkEmails: false,
    page: 0,
    rowsPerPage: 5
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      client_id: user.id
    };

    getData(`${API_URL}/bulkemail/client/ongoing-bulkemails`, data)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let tempData = [];
            res.data.map(item => {
              item.views = '0k';
              const createDate = formatDate(item.created_at);
              const deadline = formatDate(item.deadline);
              tempData.push(createData(item.id, item.name, createDate, deadline, item.views));
            });
            bulkEmailData = tempData;
            this.setState({ isBulkEmails: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { isBulkEmails, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, bulkEmailData.length - (page * rowsPerPage));

    return (
      <Fragment>
        <div className={classes.rootTable}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Ongoing Bulk Emails</Typography>
            </div>
          </Toolbar>
          {isBulkEmails
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="default">Email Name</TableCell>
                    <TableCell align="left">Created At</TableCell>
                    <TableCell align="left">Deadline</TableCell>
                    <TableCell align="left">Views</TableCell>
                    {/* <TableCell align="left">Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bulkEmailData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} >
                      <TableCell padding="default">{n.bulkEmail}</TableCell>
                      <TableCell align="left">{n.created_at}</TableCell>
                      <TableCell align="left">{n.deadline}</TableCell>
                      <TableCell align="left">{n.views}</TableCell>
                      {/* <TableCell align="left">
                        <Button
                          color="primary"
                          onClick={() => this.handleConfirmation("pause", n.id)}
                        >
                          Pause
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => this.handleConfirmation("cancel", n.id)}
                        >
                          Cancel
                        </Button>
                      </TableCell> */}
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
                      count={bulkEmailData.length}
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
                No Ongoing Bulk Emails !
              </Typography>
            )
          }
        </div>
      </Fragment>
    );
  }
}

OngoingCampaigns.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OngoingCampaigns);
