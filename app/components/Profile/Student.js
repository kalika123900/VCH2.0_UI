import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocalPhone from '@material-ui/icons/LocalPhone';
import DateRange from '@material-ui/icons/DateRange';
import LocationOn from '@material-ui/icons/LocationOn';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Check from '@material-ui/icons/Check';
import Type from 'dan-styles/Typography.scss';
import StudentTimeline from '../SocialMedia/StudentTimeline';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './profile-jss';

class Student extends React.Component {
  render() {
    const { classes, data } = this.props;
    return (
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={3}
      >
        <Grid item md={7} xs={12}>
          <div>
            <StudentTimeline dataTimeline={data} />
          </div>
        </Grid>
        <Grid item md={5} xs={12}>
          {/* Profile Progress */}
          <div className={classes.progressRoot}>
            <Paper className={classes.styledPaper} elevation={4}>
              <Typography className={classes.title} variant="h5" component="h3">
                <span className={Type.light}>Profile Strength: </span>
                <span className={Type.bold}>Intermediate</span>
              </Typography>
              <Grid container justify="center">
                <Chip
                  avatar={(
                    <Avatar>
                      <Check />
                    </Avatar>
                  )}
                  label="60% Progress"
                  className={classes.chip}
                  color="primary"
                />
              </Grid>
              <LinearProgress variant="determinate" className={classes.progress} value={60} />
            </Paper>
          </div>
          {/* Student Me */}
          <PapperBlock title="Account Summary" icon="ios-contact-outline" whiteBg noMargin desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed urna in justo euismod condimentum.">
            <Divider className={classes.divider} />
            <List dense className={classes.profileList}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DateRange />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Born" secondary="Jan 9, 1994" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPhone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Phone" secondary="(+62)8765432190" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOn />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Address" secondary="Chicendo Street no.105 Block A, Barcelona, Spain" />
              </ListItem>
            </List>
          </PapperBlock>
          <Divider className={classes.divider} />
          {/* My Suitable Companies */}
          <PapperBlock title="Suitable Companies" icon="ios-contacts-outline" whiteBg desc="">
            <List dense className={classes.profileList}>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>H</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>J</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>V</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>K</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>L</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
            </List>
            <Divider className={classes.divider} />
            <Grid container justify="center">
              <Button color="secondary" className={classes.button}>
                See All
              </Button>
            </Grid>
          </PapperBlock>
          <Divider className={classes.divider} />
          {/* My Top Companies */}
          <PapperBlock title="Top Companies" icon="ios-contacts-outline" whiteBg desc="">
            <List dense className={classes.profileList}>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>H</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>J</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>V</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>K</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
              <ListItem button>
                <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>L</Avatar>
                <ListItemText primary="Lorem Ipsum dolar" />
              </ListItem>
            </List>
            <Divider className={classes.divider} />
            <Grid container justify="center">
              <Button color="secondary" className={classes.button}>
                See All
              </Button>
            </Grid>
          </PapperBlock>
        </Grid>
      </Grid>
    );
  }
}

Student.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(Student);
