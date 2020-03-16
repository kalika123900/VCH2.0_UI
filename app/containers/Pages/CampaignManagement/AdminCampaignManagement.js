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
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import { CampaignFilter } from 'dan-components';
import Grid from '@material-ui/core/Grid';

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

class CampaignTable extends React.Component {
  state = {
    redirect: false,
    showFilter: false,
    btnText: 'Show Filter',
    campaignData: [],
    isCampaigns: false
  }

  componentDidMount() {
    const _that = this;
    async function getData(url) {
      const response = await fetch(url, {
        method: 'GET',
      });

      return await response.json();
    }

    getData(`${API_URL}/campaign/pending-campaigns`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            const campaignData = [];
            res.data.map(item => {
              const client_name = item.firstname + ' ' + item.lastname;
              item.campaign_masters.map(campaign => {
                const date = formatDate(campaign.created_at);
                campaignData.push(
                  createData(campaign.id, client_name, campaign.campaign_name, date)
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

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/admin/campaign-review" />;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {this.renderRedirect()}
        <Grid style={{ width: '100%' }}>
          {this.state.showFilter && <CampaignFilter />}
        </Grid>
        <div className={classes.rootTable}>
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
          <Table className={classNames(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
                <TableCell padding="left">Campaign Name</TableCell>
                <TableCell padding="left">Client Name</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => ([
                <TableRow key={n.id} onClick={this.setRedirect}>
                  <TableCell padding="left">{n.campaigns}</TableCell>
                  <TableCell padding="left">{n.client_name}</TableCell>
                  <TableCell align="left">{n.start_date}</TableCell>
                  <TableCell align="left">{n.end_date}</TableCell>
                  <TableCell align="left">{n.status}</TableCell>
                </TableRow>
              ]))}
            </TableBody>
          </Table>
        </div>
      </Fragment>
    );
  }
}

CampaignTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignTable);
