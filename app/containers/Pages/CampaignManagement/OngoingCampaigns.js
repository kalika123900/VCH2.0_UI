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
import { ConfirmationDialog } from 'dan-components';
import styles from 'dan-components/Tables/tableStyle-jss';
import qs from 'qs';
import { makeSecureDecrypt } from '../../../Helpers/security';
import formatDate from '../../../Helpers/formatDate';
import { Button } from '@material-ui/core';

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
    open: false,
    type: '',
    cId: null
  }

  handleConfirmation = (str, id) => {
    let value = this.state.open ? false : true
    this.setState({ open: value, type: str, cId: id })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleAction = (type) => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      campaignId: this.state.cId,
      clientId: user.id
    }

    if (type == "cancel") {
      getData(`${API_URL}/campaign/client-rejection`, data)
        .then((res) => {
          if (res.status === 1) {
            window.location.reload()
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (type == "pause") {
      getData(`${API_URL}/campaign/client-pause-campaign`, data)
        .then((res) => {
          if (res.status === 1) {
            window.location.reload()
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      client_id: user.id
    };

    getData(`${API_URL}/campaign/client/ongoing-campaigns`, data)
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
    if (e.target.innerText !== "PAUSE" && e.target.innerText !== "CANCEL") {
      this.setState({
        redirect: true,
        cId: id
      });
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/client/campaign-details/${this.state.cId}`} />;
    }
  }

  render() {
    const { classes } = this.props;
    const { isCampaigns, open, type } = this.state;

    return (
      <Fragment>
        <ConfirmationDialog
          open={open}
          handleClose={this.handleClose}
          handleAction={this.handleAction}
          type={type}
        />
        {this.renderRedirect()}
        <div className={classes.rootTable}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Ongoing Campaigns</Typography>
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
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaignData.map(n => ([
                    <TableRow key={n.id} onClick={(e) => this.setRedirect(e, n.id)}>
                      <TableCell padding="default">{n.campaigns}</TableCell>
                      <TableCell align="left">{n.start_date}</TableCell>
                      <TableCell align="left">{n.end_date}</TableCell>
                      <TableCell align="left">{n.views}</TableCell>
                      <TableCell align="left">
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
                      </TableCell>
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

OngoingCampaigns.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OngoingCampaigns);
