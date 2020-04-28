import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
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
import qs from 'qs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import EmailIcon from '@material-ui/icons/Email';
import datas from 'dan-api/apps/ClientData';
import ClientCard from '../CardPaper/ClientCard';
import { Button, Typography, Divider } from '@material-ui/core';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });
  return await response.json();
}

class ClientJobProfile extends React.Component {
  state = {
    tab: 0,
    name: '',
    phone: '',
    headquarter: '',
    logo: '',
    email: '',
    role_name: '',
    role_link: '',
    role_deadline: '',
    skills: []
  }

  componentDidMount() {
    const { data } = this.props

    postData(`${API_URL}/student/get-company-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ name: res.data[0].name })
            this.setState({ phone: res.data[0].phone })
            this.setState({ email: res.data[0].email })
            this.setState({ headquarter: res.data[0].headquarter })
            this.setState({ logo: res.data[0].logo })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    postData(`${API_URL}/student/get-job-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            const role_deadline = res.data[0].role_deadline.split('T')
            this.setState({ skills: res.data[0].skills.split(',') })
            this.setState({ role_name: res.data[0].role_name })
            this.setState({ role_link: res.data[0].role_link })
            this.setState({ role_deadline: role_deadline[0] })
            this.setState({ role_description: res.data[0].role_description })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { tab, name, phone, email, headquarter, role_name, role_link, role_deadline, logo, role_description, skills } = this.state;
    const { classes } = this.props;

    const skillsJSX = skills.map((item, index) => {
      return <Typography variant="subtitle2" key={index.toString()}>{item}</Typography>
    });

    return (
      <Fragment>
        <Grid container spacing={3} >
          <Grid item md={4} xs={12}>
            <PapperBlock title="Company Info" icon="ios-contact-outline" whiteBg noMargin desc="">
              <Grid className={classes.companyTitle}>
                <Avatar alt="avatar" src={(logo == '' || logo == null) ? avatarApi[0] : logo} className={classes.avatarBig}
                  className={classes.customAvatar}
                />
                <Typography variant="h6" color="secondary">{name}</Typography>
              </Grid>
              <List dense className={classes.profileList}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalPhone />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Contact" secondary={phone} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Company Email" secondary={email} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocationOn />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Headquarter" secondary={headquarter} />
                </ListItem>
              </List>
              {/* <Grid>
                <Button variant="text" color="primary">
                  <Link to="/student/company-profiles">See All Jobs</Link></Button>
              </Grid> */}
            </PapperBlock>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Tabs
              value={tab}
              onChange={this.handleChangeTab}
              indicatorColor="secondary"
              textColor="secondary"
              centered
              className={classes.tab}
            >
              <Tab label="About this job" />
              <Tab label="Cover letter" />
              <Tab label="CV tips" />
              <Tab label="Others like this" />
            </Tabs>
            {tab === 0 && (
              <PapperBlock title="Job Info" icon="ios-aperture-outline" whiteBg desc="">
                <Grid className={classes.makeFlex}>
                  {/* <Grid className={classes.makeFlex}>
                    <WatchLaterOutlinedIcon style={{ marginRight: "10px" }} />
                    <Typography variant="subtitle2" color="textSecondary" >Posted 4 days ago</Typography>
                  </Grid> */}
                </Grid>
                <Grid className={classes.jobTitle}>
                  <Typography variant="h4" color="secondary">
                    {role_name}
                  </Typography>
                </Grid>
                <Divider />
                <Typography variant="h6" color="primary" className={classes.subHeading}>About {name}:</Typography>
                <Grid className={classes.content}>
                  <Grid className={classes.makeFlex}>
                    <Typography variant="subtitle2" color="textSecondary" className={classes.customMargin} >Job Type:</Typography>
                    <Typography variant="subtitle2">Full Time</Typography>
                  </Grid>
                  <Grid className={classes.makeFlex}>
                    <Typography variant="subtitle2" color="textSecondary" className={classes.customMargin}>Experience level:</Typography>
                    <Typography variant="subtitle2">Mid-Level, Senior</Typography>
                  </Grid>
                  <Grid className={classes.makeFlex}>
                    <Typography variant="subtitle2" color="textSecondary" className={classes.customMargin}>Role:</Typography>
                    <Typography variant="subtitle2">{role_name}</Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" color="primary" className={classes.subHeading}>Skills:</Typography>
                <Grid className={classes.content}>
                  {skillsJSX}
                </Grid>
                <Grid className={classes.subHeading}>
                  <Typography variant="h6" color="primary" className={classes.customMargin}>Location: </Typography>
                  <Grid className={classes.content}>
                    <Typography variant="subtitle2">London</Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" color="primary" className={classes.subHeading}>Job description:</Typography>
                <Grid className={classes.content}>
                  <Typography variant="subtitle2" color="textSecondary" >{role_description}</Typography>
                </Grid>
                <Grid className={classes.subHeading}>
                  <Typography variant="h6" color="primary" className={classes.customMargin}>Last Date: </Typography>
                  <Grid className={classes.content}>
                    <Typography variant="subtitle2">{role_deadline}</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Typography variant="h6" color="primary" className={classes.subHeading}>Apply here:</Typography>
                  <Grid className={classes.content}>
                    <Typography variant="body1" color="secondary">
                      <a href='https://www.google.com'>{role_link}</a>
                    </Typography>
                  </Grid>
                </Grid>
              </PapperBlock>
            )}
            {tab === 1 && (
              <Fragment>
                <Typography variant="body1" style={{ padding: 20 }}>
                  The standard Lorem Ipsum passage, used since the 1500s
                </Typography>
                <Typography variant="caption" style={{ padding: 20 }}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Typography>
                <Typography variant="body1" style={{ padding: 20 }}>
                  The standard Lorem Ipsum passage, used since the 1500s
                </Typography>
                <Typography variant="caption" style={{ padding: 20 }}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Typography>
                <Typography variant="body1" style={{ padding: 20 }}>
                  The standard Lorem Ipsum passage, used since the 1500s
                </Typography>
                <Typography variant="caption" style={{ padding: 20 }}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Typography>
              </Fragment>
            )}
            {tab === 2 && (
              <Fragment >
                <Typography variant="body1" style={{ padding: 20 }}>
                  The standard Lorem Ipsum passage, used since the 1500s
                </Typography>
                <Typography variant="caption" style={{ padding: 20 }}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Typography>
                <Typography variant="body1" style={{ padding: 20 }}>
                  The standard Lorem Ipsum passage, used since the 1500s
                </Typography>
                <Typography variant="caption" style={{ padding: 20 }}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Typography>
                <Typography variant="body1" style={{ padding: 20 }}>
                  The standard Lorem Ipsum passage, used since the 1500s
                </Typography>
                <Typography variant="caption" style={{ padding: 20 }}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Typography>
              </Fragment>
            )}
            {tab === 3 && (
              <Fragment >
                {/* <Grid
                  container
                  alignItems="flex-start"
                  justify="space-between"
                  direction="row"
                  spacing={2}
                  className={classes.root}
                >
                  {
                    datas.map((data, index) => (
                      <Grid item md={4} sm={6} xs={6} key={index.toString()} >
                        <ClientCard
                          id={data.id}
                          cover={data.cover}
                          avatar={data.avatar}
                          name={data.name}
                          role={data.role}
                          roleDesc={data.roleDesc}
                          isVerified={data.verified}
                          btnText="See Details"
                        />
                      </Grid>
                    ))
                  }
                </Grid> */}
              </Fragment>
            )}
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
