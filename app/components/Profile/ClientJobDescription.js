import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocalPhone from '@material-ui/icons/LocalPhone';
import LocationOn from '@material-ui/icons/LocationOn';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './profile-jss';
import EmailIcon from '@material-ui/icons/Email';
import datas from 'dan-api/apps/ClientData'
import { Button, Typography, Divider } from '@material-ui/core';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';

class ClientJobProfile extends React.Component {
  render() {
    const data = datas[0]

    const { classes } = this.props;
    return (
      <Fragment>
        <Grid container spacing={3} >
          <Grid item md={4} xs={12}>
            <PapperBlock title="Company Info" icon="ios-contact-outline" whiteBg noMargin desc="">
              <Grid className={classes.companyTitle}>
                <Avatar alt="avatar" src={data.avatar} className={classes.avatarBig}
                  className={classes.customAvatar}
                />
                <Grid className={classes.customHeading}>
                  <Typography variant="h6">{data.name}</Typography>
                </Grid>
              </Grid>
              <List dense className={classes.profileList}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalPhone />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Contact" secondary="(+62)8765432190" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Company Email" secondary="abc@gmail.com" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocationOn />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Headquarter" secondary="Barcelona, Spain" />
                </ListItem>
              </List>
              <Grid>
                <Button variant="text" color="primary">
                  <Link to="/student/company-profiles">See All Jobs</Link></Button>
              </Grid>
            </PapperBlock>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <PapperBlock title="Job Info" icon="ios-aperture-outline" whiteBg desc="">
              <Grid className={classes.makeFlex}>
                <Grid className={classes.makeFlex}>
                  <WatchLaterOutlinedIcon style={{ marginRight: "10px" }} />
                  <Typography variant="subtitle2" color="textSecondary" >Posted 4 days ago</Typography>
                </Grid>
              </Grid>
              <Grid className={classes.jobTitle}>
                <Typography variant="h4" color="secondary">
                  Interns for AI
                </Typography>
              </Grid>
              <Divider />
              <Typography variant="h6" color="primary" className={classes.subHeading}>About this Job :</Typography>
              <Grid className={classes.content}>
                <Grid className={classes.makeFlex}>
                  <Typography variant="subtitle2" color="textSecondary" className={classes.customMargin} >Job Type :</Typography>
                  <Typography variant="subtitle2">Full Time</Typography>
                </Grid>
                <Grid className={classes.makeFlex}>
                  <Typography variant="subtitle2" color="textSecondary" className={classes.customMargin}>Experience level :</Typography>
                  <Typography variant="subtitle2">Mid-Level, Senior</Typography>
                </Grid>
                <Grid className={classes.makeFlex}>
                  <Typography variant="subtitle2" color="textSecondary" className={classes.customMargin}>Role :</Typography>
                  <Typography variant="subtitle2">Full Stack Developer</Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" color="primary" className={classes.subHeading}>Technologies :</Typography>
              <Grid className={classes.content}>
                <Typography variant="subtitle2">C/C++</Typography>
                <Typography variant="subtitle2">Oracle Database</Typography>
                <Typography variant="subtitle2">Linux</Typography>
              </Grid>
              <Grid className={classes.subHeading}>
                <Typography variant="h6" color="primary" className={classes.customMargin}>Location : </Typography>
                <Grid className={classes.content}>
                  <Typography variant="subtitle2">Indore, India</Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" color="primary" className={classes.subHeading}>Job description :</Typography>
              <Grid className={classes.content}>
                <Typography variant="subtitle2" color="textSecondary" >Cupidatat fugiat sit esse adipisicing non quis consectetur ut reprehenderit incididunt veniam proident sint excepteur. Amet sit quis ullamco nisi ad id voluptate in ea officia aute tempor dolore. Incididunt deserunt nisi cupidatat deserunt elit in mollit ex qui nisi ad exercitation esse. Adipisicing magna dolor ea deserunt mollit exercitation magna do. Consectetur qui ad adipisicing occaecat culpa non.</Typography>
              </Grid>
              <Grid className={classes.subHeading}>
                <Typography variant="h6" color="primary" className={classes.customMargin}>Last Date : </Typography>
                <Grid className={classes.content}>
                  <Typography variant="subtitle2">20 January 2020</Typography>
                </Grid>
              </Grid>
              <Grid>
                <Typography variant="h6" color="primary" className={classes.subHeading}>Apply here</Typography>
                <Grid className={classes.content}>
                  <Typography variant="body1" color="secondary">
                    <a href='https://www.google.com'>https://www.google.com</a>
                  </Typography>
                </Grid>
              </Grid>
            </PapperBlock>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ClientJobProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientJobProfile);
