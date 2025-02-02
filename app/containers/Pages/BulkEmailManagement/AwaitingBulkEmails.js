import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import formatDate from '../../../Helpers/formatDate';

function createData(id, client, bulk_email, create_date) {
  return {
    id,
    client,
    bulk_email,
    create_date,
  };
}

class BulkEmailTable extends React.Component {
  state = {
    redirect: false,
    isBulkEmails: false,
    bulkEmailId: null,
    bulkEmailData: [],
    page: 0,
    rowsPerPage: 5
  }

  setRedirect = (id) => {
    this.setState({
      redirect: true,
      bulkEmailId: id
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/admin/bulkemail-review/${btoa(this.state.bulkEmailId)}`} />
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentDidMount() {
    const _that = this;
    async function getData(url) {
      const response = await fetch(url, {
        method: 'GET',
      });

      return await response.json();
    }

    getData(`${API_URL}/bulkemail/pending-bulkemail`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            const bulkEmailData = [];
            res.data.map(item => {
              const name = item.name;
              item.bulk_email_masters.map(bulkemail => {
                const date = formatDate(bulkemail.created_at);
                bulkEmailData.push(
                  createData(bulkemail.id, name, bulkemail.name, date)
                );
              });
              _that.setState({ bulkEmailData });
            });
            this.setState({ isBulkEmails: true });
          } else {
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
    const { isBulkEmails, rowsPerPage, page, bulkEmailData } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, bulkEmailData.length - (page * rowsPerPage));

    if (isBulkEmails == false) return null;

    return (
      <Fragment>
        {this.renderRedirect()}
        <div className={classes.rootTable} style={{ wordBreak: 'normal' }}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Recent Awaiting Bulk Emails</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          {bulkEmailData.length > 0
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="default">Client Name</TableCell>
                    <TableCell align="left">Bulk Email Name</TableCell>
                    <TableCell align="left">Create Date</TableCell>
                    {/* <TableCell align="left">Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bulkEmailData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} onClick={() => this.setRedirect(n.id)}>
                      <TableCell padding="default">{n.client}</TableCell>
                      <TableCell padding="default">{n.bulk_email}</TableCell>
                      <TableCell align="left">{n.create_date}</TableCell>
                      {/* <TableCell align="left">
                        <Button >
                          <DeleteIcon />
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
                No Awaiting bulk emails !
              </Typography>
            )
          }
        </div >
      </Fragment>
    );
  }
}

BulkEmailTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulkEmailTable);
