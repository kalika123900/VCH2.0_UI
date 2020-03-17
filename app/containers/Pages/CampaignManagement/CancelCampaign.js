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
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import formatDate from '../../../Helpers/formatDate';

function createData(id, campaigns, client_name, start_date, end_date, cancel_by) {
  return {
    id,
    campaigns,
    client_name,
    start_date,
    end_date,
    cancel_by
  };
}

class CancelCampaign extends React.Component {
  state = {
    redirect: false,
    campaignData: [],
    campaignId: null,
    isCampaigns: false,
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
    const _that = this;
    async function getData(url) {
      const response = await fetch(url, {
        method: 'GET',
      });

      return await response.json();
    }

    getData(`${API_URL}/campaign/admin/cancel-campaign`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            const campaignData = [];
            res.data.map(item => {
              const client_name = item.firstname + ' ' + item.lastname;
              item.campaign_masters.map(campaign => {
                const date = formatDate(campaign.created_at);
                const endDate = formatDate(campaign.deadline);
                const cancel = campaign.status === -1 ? 'Admin' : 'Client';
                campaignData.push(
                  createData(campaign.id, campaign.campaign_name, client_name, date, endDate, cancel)
                );
              });
              _that.setState({ campaignData });
            });
            this.setState({ isCampaigns: true });
          } else {
            this.setState({ isCampaigns: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setRedirect = (id) => {
    this.setState({
      redirect: true,
      campaignId: id
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/admin/campaign-review/${this.state.campaignId}`} />;
    }
  }

  render() {
    const { classes } = this.props;
    const { campaignData, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, campaignData.length - (page * rowsPerPage));

    return (
      <Fragment>
        {/* {this.renderRedirect()} */}
        <div className={classes.rootTable}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Cancel Campaigns</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          {campaignData.length > 0
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Campaign Name</TableCell>
                    <TableCell align="left">Client Name</TableCell>
                    <TableCell align="left">Start Date</TableCell>
                    <TableCell align="left">End Date</TableCell>
                    <TableCell align="left">Cancel by</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaignData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} onClick={(e) => this.setRedirect(n.id)}>
                      <TableCell align="left">{n.campaigns}</TableCell>
                      <TableCell align="left">{n.client_name}</TableCell>
                      <TableCell align="left">{n.start_date}</TableCell>
                      <TableCell align="left">{n.end_date}</TableCell>
                      <TableCell align="left">{n.cancel_by}</TableCell>
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
                      rowsPerPageOptions={[5, 10, 15, 20]}
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

CancelCampaign.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CancelCampaign);
