import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LocationOn from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from '../../components/Widget/widget-jss';
import CreateIcon from '@material-ui/icons/Create';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import { Avatar, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

async function postJSON(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

function formatDeadline(dateStr) {
  const d = new Date(dateStr)
  const year = d.getFullYear()
  let month = d.getMonth() + 1;
  let date = d.getDate();
  if (month < 10) {
    month = `0` + month;
  }
  if (date < 10) {
    date = `0` + date;
  }
  return (year + '-' + month + '-' + date);
}

class CampaignInfo extends React.Component {
  state = {
    workLocation: '',
    createdAt: '',
    deadline: '',
    name: '',
    role: ''
  }

  componentDidMount() {
    const data = {
      campaignId: this.props.campaignId
    };

    postJSON(`${API_URL}/campaign/get-campaign-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const workLocation = res.data.info.work_location;
          const createdAt = formatDeadline(res.data.info.created_at);
          const deadline = formatDeadline(res.data.info.deadline);
          const name = res.data.info.campaign_name;
          let roleData = [];

          roleData.push(res.data.info.roleData);
          const role = roleData[0].role_name;

          this.setState({ workLocation, createdAt, deadline, name, role });
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { workLocation, createdAt, deadline, name, role } = this.state;

    return (
      <Fragment>
        <PapperBlock title="Campaign Details" icon="ios-information-circle-outline" whiteBg desc="">
          <List dense className={classes.profileList}>
            <ListItem>
              <ListItemAvatar>
                <Fragment>
                  <Grid className={classes.inlineBlock}>
                    <Avatar className={classes.blockIcon}><CreateIcon /></Avatar>
                  </Grid>
                  <Grid className={classes.inlineBlock}>
                    <ListItemText primary="Campaign Name" />
                    <ListItemText secondary={name} />
                  </Grid>
                </Fragment>
              </ListItemAvatar>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Fragment>
                  <Grid className={classes.inlineBlock}>
                    <Avatar className={classes.blockIcon}><TrackChangesIcon /></Avatar>
                  </Grid>
                  <Grid className={classes.inlineBlock}>
                    <ListItemText primary="Campaign Role" />
                    <ListItemText secondary={role} />
                  </Grid>
                </Fragment>
              </ListItemAvatar>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Fragment>
                  <Grid className={classes.inlineBlock}>
                    <Avatar className={classes.blockIcon}>
                      <EventIcon />
                    </Avatar>
                  </Grid>
                  <Grid className={classes.inlineBlock}>
                    <ListItemText primary="Create Date" />
                    <ListItemText secondary={createdAt} />
                  </Grid>
                </Fragment>
              </ListItemAvatar>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Fragment>
                  <Grid className={classes.inlineBlock}>
                    <Avatar className={classes.blockIcon}>
                      <LocationOn />
                    </Avatar>
                  </Grid>
                  <Grid className={classes.inlineBlock}>
                    <ListItemText primary="Locations" />
                    <ListItemText secondary={workLocation} />
                  </Grid>
                </Fragment>
              </ListItemAvatar>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Fragment>
                  <Grid className={classes.inlineBlock}>
                    <Avatar className={classes.blockIcon}>
                      <ScheduleIcon />
                    </Avatar>
                  </Grid>
                  <Grid className={classes.inlineBlock}>
                    <ListItemText primary="Deadline of Campaign" />
                    <ListItemText secondary={deadline} />
                  </Grid>
                </Fragment>
              </ListItemAvatar>
            </ListItem>
          </List>
          <Grid style={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary">Export Campaign Details</Button>
          </Grid>
        </PapperBlock>
      </Fragment>
    )
  }
}

CampaignInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignInfo);
