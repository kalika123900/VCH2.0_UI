import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { isWidthUp } from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import { CampaignFilter } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import formatDate from '../../../Helpers/formatDate';

function createData(id, campaigns, client_name, start_date, end_date, status) {
  return {
    id,
    campaigns,
    client_name,
    start_date,
    end_date,
    status
  };
}

class NotCancelCampaign extends React.Component {
  state = {
    redirect: false,
    showFilter: false,
    btnText: 'Show Filter',
    campaignId: null,
    campaignData: [],
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

    getData(`${API_URL}/campaign/admin/campaign-management`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            const campaignData = [];
            res.data.map(item => {
              const client_name = item.name;
              item.campaign_masters.map(campaign => {
                const date = campaign.created_at == null ? 'Not avilable' : formatDate(campaign.created_at);
                const endDate = campaign.deadline == null ? 'No Deadline' : formatDate(campaign.deadline);
                const status = campaign.status === 1 ? 'Ongoing' : campaign.status === 0 ? 'Pending' : 'Paused';
                campaignData.push(
                  createData(campaign.id, campaign.campaign_name, client_name, date, endDate, status)
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

  handleFilter = () => {
    if (this.state.showFilter) {
      this.setState({ showFilter: false, btnText: 'Show Filter' });
    } else {
      this.setState({ showFilter: true, btnText: 'Hide Filter' });
    }
  }

  setRedirect = (id) => {
    this.setState({
      redirect: true,
      campaignId: id
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/admin/campaign-review/${btoa(this.state.campaignId)}`} />;
    }
  }

  render() {
    const { classes } = this.props;
    const { campaignData, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, campaignData.length - (page * rowsPerPage));

    return (
      <Fragment>
        {this.renderRedirect()}
        <Grid style={{ width: '100%' }}>
          {this.state.showFilter && <CampaignFilter />}
        </Grid>
        <div className={classes.rootTable} style={{ wordBreak: 'normal' }}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Campaigns</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="filter">
                <Button variant="contained" onClick={(e) => this.handleFilter(e)} color="primary" className={classes.button}>
                  {isWidthUp('sm', 'sm') && this.state.btnText}
                </Button>
              </Tooltip>
            </div>
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
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaignData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} onClick={e => this.setRedirect(n.id)}>
                      <TableCell align="left">{n.campaigns}</TableCell>
                      <TableCell align="left">{n.client_name}</TableCell>
                      <TableCell align="left">{n.start_date}</TableCell>
                      <TableCell align="left">{n.end_date}</TableCell>
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
                No campaigns !
              </Typography>
            )
          }
        </div>
      </Fragment>
    );
  }
}

NotCancelCampaign.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotCancelCampaign);
