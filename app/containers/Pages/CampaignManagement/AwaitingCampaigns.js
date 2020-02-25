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

const campaignData = [
  // createData('Jhone Doe', 'Campaign 1', '01-January-2020'),
  // createData('Jhone Doe', 'Campaign 2', '02-January-2020'),
  // createData('Jhone Doe', 'Campaign 3', '04-January-2020'),
  // createData('Jhone Doe', 'Campaign 4', '05-January-2020'),
  // createData('Jhone Doe', 'Campaign 5', '01-February-2020'),
  // createData('Jhone Doe', 'Campaign 6', '05-February-2020'),
  // createData('Jhone Doe', 'Campaign 7', '14-February-2020'),
];

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

    getData(`${API_URL}/campaign/client/pending-campaigns`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let campaignResData = res.data.map(item => {
              item.views = "21k"
              if (item.status == 0) {
                item.status = "Pending"
              }
              return (
                createData(item.client_name, item.campaign_name, item.created_at)
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
