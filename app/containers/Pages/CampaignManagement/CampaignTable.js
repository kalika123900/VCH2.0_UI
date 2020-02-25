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
import AddIcon from '@material-ui/icons/Add';
import styles from 'dan-components/Tables/tableStyle-jss';
import { makeSecureDecrypt } from '../../../Helpers/security';
import qs from 'qs';

let id = 0;
function createData(campaigns, start_date, end_date, views, status) {
  id += 1;
  return {
    id,
    campaigns,
    start_date,
    end_date,
    views,
    status
  };
}

const campaignData = [
  // createData('Campaign 1', '01-January-2020', '01-March-2020', '14k', 'Active'),
  // createData('Campaign 2', '02-January-2020', '01-February-2020', '18k', 'Inactive'),
  // createData('Campaign 3', '04-January-2020', '01-April-2020', '13k', 'Active'),
  // createData('Campaign 4', '05-January-2020', '01-September-2020', '35k', 'Inactive'),
  // createData('Campaign 5', '01-February-2020', '01-October-2020', '24k', 'Active'),
  // createData('Campaign 6', '05-February-2020', '08-October-2020', '45k', 'Inactive'),
  // createData('Campaign 7', '14-February-2020', '12-October-2020', '68k', 'Active'),
];

class CampaignTable extends React.Component {
  state = {
    redirect: false,
    addNewCampaign: false,
    isCampaigns: false
  }

  componentDidMount() {
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

    let user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    let data = {
      client_id: user.id
    }

    getData(`${API_URL}/campaign/client/pending-campaigns`, data)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let campaignResData = res.data.map(item => {
              item.views = "21k"
              if (item.status == 0) {
                item.status = "Pending"
              }
              return (
                createData(item.campaign_name, item.created_at, item.deadline, item.views, item.status)
              )
            })
            campaignData = campaignResData;
            this.setState({ isCampaigns: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setRedirect = () => {
    this.setState({
      redirect: true,
    })
  }
  setNewCampaign = () => {
    this.setState({
      addNewCampaign: true,
    })
  }
  addNewCampaign = () => {
    if (this.state.addNewCampaign) {
      return <Redirect to='/client/campaigns' />
    }
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/client/campaign-details' />
    }
  }
  render() {
    const { classes } = this.props;
    const { isCampaigns } = this.state;

    return (
      <Fragment>
        {this.renderRedirect()}
        {this.addNewCampaign()}
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Ongoing Campaigns</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Add Campaign">
                <Button variant="contained" onClick={() => this.setNewCampaign()} color="secondary" className={classes.button}>
                  <AddIcon className={classNames(isWidthUp('sm', 'sm') && classes.leftIcon, classes.iconSmall)} />
                  {isWidthUp('sm', 'sm') && 'New Campaign'}
                </Button>
              </Tooltip>
            </div>
          </Toolbar>
          {isCampaigns
            ?
            <Table className={classNames(classes.table, classes.hover)}>
              <TableHead>
                <TableRow>
                  <TableCell padding="default">Campaign Name</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">End Date</TableCell>
                  <TableCell align="left">Views</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaignData.map(n => ([
                  <TableRow key={n.id} onClick={this.setRedirect}>
                    <TableCell padding="default">{n.campaigns}</TableCell>
                    <TableCell align="left">{n.start_date}</TableCell>
                    <TableCell align="left">{n.end_date}</TableCell>
                    <TableCell align="left">{n.views}</TableCell>
                    <TableCell align="left">{n.status}</TableCell>
                  </TableRow>
                ]))}
              </TableBody>
            </Table>
            :
            <Typography color="textSecondary" variant="body1"
              className={classes.warnMsg}
            >
              No Ongoing campaigns !
            </Typography>
          }
        </div >
      </Fragment>
    );
  }
}

CampaignTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignTable);
