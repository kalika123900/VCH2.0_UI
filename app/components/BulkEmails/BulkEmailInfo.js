import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LocationOn from '@material-ui/icons/LocationOn';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from '../../components/Widget/widget-jss';
import CreateIcon from '@material-ui/icons/Create';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import EuroIcon from '@material-ui/icons/Euro';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import { Avatar, Grid } from '@material-ui/core';

class BulkEmailInfo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <PapperBlock title="BulkEmail Info" icon="ios-information-circle-outline" whiteBg desc="">
        <List dense className={classes.profileList}>
          <ListItem>
            <ListItemAvatar>
              <Fragment>
                <Grid className={classes.inlineBlock}>
                  <Avatar className={classes.blockIcon}><CreateIcon /></Avatar>
                </Grid>
                <Grid className={classes.inlineBlock}>
                  <ListItemText primary="Bulk Email Heading" />
                  <ListItemText secondary="Lorem Ipsum daren" />
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
                  <ListItemText primary="Bulk Email Goal" />
                  <ListItemText secondary="Lorem Ipsum Daren" />
                </Grid>
              </Fragment>
            </ListItemAvatar>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Fragment>
                <Grid className={classes.inlineBlock}>
                  <Avatar className={classes.blockIcon}>
                    <FeaturedPlayListIcon />
                  </Avatar>
                </Grid>
                <Grid className={classes.inlineBlock}>
                  <ListItemText primary="Products or Services" />
                  <ListItemText secondary="Lorem Ipsum daren sit sdcyc dfjwxt" />
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
                  <ListItemText secondary="Chicendo Barcelona, Spain" />
                </Grid>
              </Fragment>
            </ListItemAvatar>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Fragment>
                <Grid className={classes.inlineBlock}>
                  <Avatar className={classes.blockIcon} >
                    <EuroIcon />
                  </Avatar>
                </Grid>
                <Grid className={classes.inlineBlock}>
                  <ListItemText primary="Budget" />
                  <ListItemText secondary="$50 per month" />
                </Grid>
              </Fragment>
            </ListItemAvatar>
          </ListItem>
        </List>
      </PapperBlock>
    )
  }
}

BulkEmailInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulkEmailInfo);
