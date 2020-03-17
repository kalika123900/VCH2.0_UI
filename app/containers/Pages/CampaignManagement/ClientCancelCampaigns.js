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

function createData(id, campaigns, start_date, end_date, views) {
  return {
    id,
    campaigns,
    start_date,
    end_date,
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

const campaignData = [];

class OngoingCampaigns extends React.Component {
  state = {
    redirect: false,
    isCampaigns: false,
    cId: null,
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

    getData(`${API_URL}/campaign/client/cancel-campaigns`, data)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            res.data.map(item => {
              item.views = '0k';
              const createDate = formatDate(item.created_at);
              const deadline = formatDate(item.deadline);
              campaignData.push(createData(item.id, item.campaign_name, createDate, deadline, item.views));
            });
            this.setState({ isCampaigns: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setRedirect = (e, id) => {
    this.setState({
      redirect: true,
      cId: id
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/client/campaign-details/${this.state.cId}`} />;
    }
  }

  render() {
    const { classes } = this.props;
    const { isCampaigns, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, campaignData.length - (page * rowsPerPage));

    return (
      <Fragment>
        {this.renderRedirect()}
        <div className={classes.rootTable}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Cancel Campaigns</Typography>
            </div>
          </Toolbar>
          {isCampaigns
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="default">Campaign Name</TableCell>
                    <TableCell align="left">Start Date</TableCell>
                    <TableCell align="left">End Date</TableCell>
                    <TableCell align="left">Views</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaignData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} onClick={(e) => this.setRedirect(e, n.id)}>
                      <TableCell padding="default">{n.campaigns}</TableCell>
                      <TableCell align="left">{n.start_date}</TableCell>
                      <TableCell align="left">{n.end_date}</TableCell>
                      <TableCell align="left">{n.views}</TableCell>
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
                      count={campaignData.length}
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
                No Cancel campaigns !
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
