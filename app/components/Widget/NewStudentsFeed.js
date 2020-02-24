import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from 'dan-components/SocialMedia/jss/socialMedia-jss.js';

class NewStudentsFeed extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <PapperBlock title="Recent Students" icon="ios-people-outline" whiteBg noMargin desc="">
        <List component="nav" dense className={classes.profileList}>
          <ListItem button className={classes.listPeople}>
            <Avatar className={classNames(classes.avatar, classes.orangeAvatar, classes.customMargin)}>H</Avatar>
            <ListItemText primary="Harry Wells" secondary="2 Mutual Connection" />
            <Button color="secondary" size="small">View Profile</Button>
          </ListItem>
          <ListItem button className={classes.listPeople}>
            <Avatar className={classNames(classes.avatar, classes.purpleAvatar, classes.customMargin)}>J</Avatar>
            <ListItemText primary="John Doe" secondary="8 Mutual Connection" />
            <Button color="secondary" size="small">View Profile</Button>
          </ListItem>
          <ListItem button className={classes.listPeople}>
            <Avatar className={classNames(classes.avatar, classes.pinkAvatar, classes.customMargin)}>V</Avatar>
            <ListItemText primary="Victor Wanggai" secondary="12 Mutual Connection" />
            <Button color="secondary" size="small">View Profile</Button>
          </ListItem>
          <ListItem button className={classes.listPeople}>
            <Avatar className={classNames(classes.avatar, classes.greenAvatar, classes.customMargin)}>H</Avatar>
            <ListItemText primary="Baron Phoenix" secondary="10 Mutual Connection" />
            <Button color="secondary" size="small">View Profile</Button>
          </ListItem>
        </List>
        <Divider className={classes.divider} />
        <Grid container justify="center">
          <Button color="secondary" className={classes.button}>
            See All
            </Button>
        </Grid>
      </PapperBlock>
    );
  }
}

NewStudentsFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewStudentsFeed);
