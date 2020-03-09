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
import qs from 'qs';
import { makeSecureDecrypt } from '../../../Helpers/security';
import formatDate from '../../../Helpers/formatDate';

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

const campaignData = [];

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

    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      client_id: user.id
    };

    getData(`${API_URL}/campaign/client/campaigns`, data)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            res.data.map(item => {
              item.views = '0k';
              if (item.status == 0) {
                item.status = 'Pending';
              }
              const createDate = formatDate(item.created_at);
              const deadline = formatDate(item.deadline);
              campaignData.push(createData(item.campaign_name, createDate, deadline, item.views, item.status));
            });
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
    });
  }

  setNewCampaign = () => {
    this.setState({
      addNewCampaign: true,
    });
  }

  addNewCampaign = () => {
    if (this.state.addNewCampaign) {
      return <Redirect to="/client/campaigns" />;
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/client/campaign-details" />;
    }
  }

  render() {
    const { classes } = this.props;
    const { isCampaigns } = this.state;

    return (
      <Fragment>
        {this.renderRedirect()}
        {this.addNewCampaign()}
        <div className={classes.rootTable}>
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
            ? (
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
            )
            : (
              <Typography
                color="textSecondary"
                variant="body1"
                className={classes.warnMsg}
              >
              No Ongoing campaigns !
              </Typography>
            )
          }
        </div>
      </Fragment>
    );
  }
}

CampaignTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignTable);
