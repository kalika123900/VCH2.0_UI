import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LocalPhone from '@material-ui/icons/LocalPhone';
import DateRange from '@material-ui/icons/DateRange';
import LocationOn from '@material-ui/icons/LocationOn';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import EmailIcon from '@material-ui/icons/Email';
import ExploreIcon from '@material-ui/icons/Explore';
import SchoolIcon from '@material-ui/icons/School';
import BusinessIcon from '@material-ui/icons/Business';
import bgCover from 'dan-images/petal_bg.svg';
import dummy from 'dan-api/dummy/dummyContents';
import Typography from '@material-ui/core/Typography';
import StudentClientCover from '../SocialMedia/StudentClientCover';
import styles from './profile-jss';
import PapperBlock from '../PapperBlock/PapperBlock';

class StudentClientView extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <StudentClientCover
          coverImg={bgCover}
          avatar={dummy.user.avatar}
          name={dummy.user.name}
          desc="Lorem Ipsum dolar Consectetur adipiscing elit."
        />
        <Grid>
          {/* Personal Details */}
          <PapperBlock title="Personal Details" icon="ios-contact-outline" whiteBg noMargin desc="">
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
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary="abc@gmail.com" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ExploreIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Nationality" secondary="United Kingdom" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOn />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Address" secondary="Chicendo Street no.105 Block A Barcelona, Spain" />
              </ListItem>
            </List>
          </PapperBlock>
          <Divider className={classes.divider} />
          {/* ----------------------------------------------------------------------*/}
          {/* My Skills */}
          <PapperBlock title="Skills" icon="ios-aperture-outline" whiteBg desc="">
            <Grid container className={classes.colList}>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                      G
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Goloang" />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                      F
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Flutter" />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                      A
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Android" />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>
                      J
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="JavaScript" />
                </ListItem>
              </Grid>
            </Grid>
            <Button variant="text" color="primary">See All</Button>
          </PapperBlock>
          {/* --------------------------------------------------------------------- */}
          <PapperBlock title="Qualifications" icon="ios-aperture-outline" whiteBg desc="">
            <Grid container className={classes.colList}>
              <Grid>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar)}>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Grid>
                    <Typography variant="h6" display="inline">MBA</Typography>
                    <Typography variant="body2" display="inline" style={{ marginLeft: '5px' }}>SAIT, Indore</Typography>
                    <Grid>
                      <Typography variant="body1" display="inline">Year :</Typography>
                      <Typography variant="body2" display="inline" style={{ marginLeft: '5px' }}>2016-2020</Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="body1" display="inline">Grade :</Typography>
                      <Typography variant="body2" display="inline" style={{ marginLeft: '5px' }}>A+</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar)}>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Grid>
                    <Typography variant="h6" display="inline">Higher Secondry</Typography>
                    <Typography variant="body2" display="inline" style={{ marginLeft: '5px' }}>SAIT, Indore</Typography>
                    <Grid>
                      <Typography variant="body1" display="inline">Year :</Typography>
                      <Typography variant="body2" display="inline" style={{ marginLeft: '5px' }}>2012-2014</Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="body1" display="inline">Grade :</Typography>
                      <Typography variant="body2" display="inline" style={{ marginLeft: '5px' }}>A+</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar)}>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Grid>
                    <Typography variant="h6" display="inline">High School</Typography>
                    <Typography variant="body2" display="inline" style={{ marginLeft: '5px' }}>SAIT, Indore</Typography>
                    <Grid>
                      <Typography variant="body1" display="inline">Year :</Typography>
                      <Typography variant="body2" display="inline" style={{ marginLeft: '5px' }}>2010-2012</Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="body1" display="inline">Grade :</Typography>
                      <Typography variant="body2" display="inline" style={{ marginLeft: '5px' }}>A+</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>
            </Grid>
          </PapperBlock>
          {/* --------------------------------------------------------------------- */}
          {/* Experience */}
          <PapperBlock title="Experience" icon="ios-aperture-outline" whiteBg desc="">
            <Grid container className={classes.colList}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classNames(classes.avatar)}>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <Grid>
                  <ListItemText primary="Google" />
                  <Grid>
                    <ListItemText primary="Software Engineer" secondary="Lorem Ipsum dolar sit amend hsopd." />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classNames(classes.avatar)}>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <Grid>
                  <ListItemText primary="Facebook" />
                  <Grid>
                    <ListItemText primary="Software Engineer" secondary="Lorem Ipsum dolar sit amend hsopd." />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classNames(classes.avatar)}>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <Grid>
                  <ListItemText primary="Twitter" />
                  <Grid>
                    <ListItemText primary="Software Engineer" secondary="Lorem Ipsum dolar sit amend hsopd." />
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </PapperBlock>
          {/* ----------------------------------------------------------------------*/}
          {/* My Interested Companies */}
          <PapperBlock title="Interested Companies" icon="ios-aperture-outline" whiteBg desc="">
            <Grid container className={classes.colList}>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                      G
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Google" secondary="Lorem Ipsum dolar sit." />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                      F
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Facebook" secondary="Lorem Ipsum dolar sit." />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                      T
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Twitter" secondary="Lorem Ipsum dolar sit." />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>
                      U
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Udemy" secondary="Lorem Ipsum dolar sit." />
                </ListItem>
              </Grid>
            </Grid>
            <Button variant="text" color="primary">See All</Button>
          </PapperBlock>
          {/* My Interested Industries */}
          <PapperBlock title="Interested Industries" icon="ios-aperture-outline" whiteBg desc="">
            <Grid container className={classes.colList}>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                      I
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="IT" secondary="Lorem Ipsum dolar sit." />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                      R
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Robotics" secondary="Lorem Ipsum dolar sit." />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                      O
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Online Learning" secondary="Lorem Ipsum dolar sit." />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>
                      C
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Crypto" secondary="Lorem Ipsum dolar sit." />
                </ListItem>
              </Grid>
            </Grid>
            <Button variant="text" color="primary">See All</Button>
          </PapperBlock>
        </Grid>
      </Fragment>
    );
  }
}

StudentClientView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentClientView);
