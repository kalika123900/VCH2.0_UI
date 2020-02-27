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
import styles from 'dan-components/Tables/tableStyle-jss';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import formatDate from '../../../Helpers/formatDate';

let id = 0;
function createData(client, campaign, create_date) {
  id += 1;
  return {
    id,
    client,
    campaign,
    create_date,
  };
}

const campaignData = [];

class AwaitingCampaigns extends React.Component {
  state = {
    redirect: false,
    isCampaigns: false
  }

  setRedirect = () => {
    this.setState({
      redirect: true,
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/client/edit-campaign/id-a5z2f4wc' />
    }
  }

  componentDidMount() {
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
            res.data.map(item => {
              let client_name = item.firstname + " " + item.lastname;
              item.campaign_masters.map(campaign => {
                let date = formatDate(campaign.created_at)
                campaignData.push(
                  createData(client_name, campaign.campaign_name, date)
                )
              })
            })
            this.setState({ isCampaigns: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { isCampaigns } = this.state;

    return (
      <Fragment>
        {this.renderRedirect()}
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Recent Awaiting Campaigns</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          {isCampaigns
            ?
            <Table className={classNames(classes.table, classes.hover)}>
              <TableHead>
                <TableRow >
                  <TableCell padding="default">Client Name</TableCell>
                  <TableCell padding="default">Campaign Name</TableCell>
                  <TableCell align="left">Create Date</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaignData.map(n => ([
                  <TableRow key={n.id} onClick={this.setRedirect}>
                    <TableCell padding="default">{n.client}</TableCell>
                    <TableCell padding="default">{n.campaign}</TableCell>
                    <TableCell align="left">{n.create_date}</TableCell>
                    <TableCell align="left">
                      <Button >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ]))}
              </TableBody>
            </Table>
            :
            <Typography color="textSecondary" variant="body1"
              className={classes.warnMsg}
            >
              No Awaiting campaigns !
            </Typography>
          }
        </div >
      </Fragment>
    );
  }
}

AwaitingCampaigns.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AwaitingCampaigns);
