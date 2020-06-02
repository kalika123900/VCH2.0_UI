import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeSecureDecrypt } from 'dan-helpers/security';
import Fab from '@material-ui/core/Fab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import LocalPhone from '@material-ui/icons/LocalPhone';
import LocationOn from '@material-ui/icons/LocationOn';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PapperBlock from 'dan-components/PapperBlock/PapperBlock';
import styles from 'dan-components/Profile/profile-jss';
import qs from 'qs';
import ReactHtmlParser from 'react-html-parser';
import renderHTML from 'react-render-html';
import imgApi from 'dan-api/images/photos';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import avatarApi from 'dan-api/images/avatars';
import EmailIcon from '@material-ui/icons/Email';
import { Typography, Divider, Button } from '@material-ui/core';
import { ProductCard } from 'dan-components';
import SimilarJobProfiles from './SimilarJobProfiles';
import formatDate from 'dan-helpers/formatDate';

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
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    if (user.email == '' || user.email == undefined || user.email == null) {
      props.history.push('/student/edit-details');
    }
  }

  state = {
    open: false,
    tab: 0,
    name: '',
    phone: '',
    headquarter: '',
    logo: '',
    email: '',
    label: 'All Jobs',
    jobs: [],
    jobInfoIndex: 0,
    coverLetter: '',
    cvTips: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getJobDescription();
      this.setState({ tab: 0 })
    }
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open })
  }

  getJobDescription = () => {
    const cId = atob(this.props.match.params.id)
    const data = {
      company_id: cId
    }

    postData(`${API_URL}/student/get-company-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ name: res.data[0].name })
            this.setState({ phone: res.data[0].phone })
            this.setState({ email: res.data[0].email })
            this.setState({ headquarter: res.data[0].headquarter })
            this.setState({ logo: res.data[0].logo })
            this.setState({ coverLetter: res.data[0].cover_letter })
            this.setState({ cvTips: res.data[0].cv_tips })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    postData(`${API_URL}/student/company-jobs`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({ jobs: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getJobDescription();
  }

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  openJobDesc = (index) => {
    this.setState({ jobInfoIndex: index, label: 'About this job' });
  }

  openAllJobs = () => {
    this.setState({ jobInfoIndex: 0, label: 'All Jobs' });
  }

  render() {
    const { tab, name, phone, email, headquarter, logo, jobs, jobInfoIndex } = this.state;
    const { classes } = this.props;

    const jobsJSX = jobs.map((item, index) => {
      return <ProductCard
        index={index}
        key={index.toString()}
        role_name={item.role_name}
        role_description={ReactHtmlParser(item.role_description)}
        role_deadline={formatDate(item.role_deadline)}
        openJobDesc={this.openJobDesc}
      />
    })

    return (
      <Fragment>
        <Grid container spacing={3} >
          <Grid item md={4} xs={12}>
            <Button variant="contained" style={{ marginBottom: 10 }} onClick={() => this.props.history.push('/student/opportunities')}>Go Back</Button>
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
            </PapperBlock>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>

            <Tabs
              value={tab}
              onChange={this.handleChangeTab}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              className={classes.tab}
              scrollButtons="on"
            >
              <Tab label={this.state.label} />
              <Tab label="Cover letter" />
              <Tab label="CV tips" />
              <Tab label="Others like this" />
            </Tabs>

            {tab === 0 && (
              this.state.label == 'All Jobs' ?
                <PapperBlock title="All Jobs" icon="ios-aperture-outline" whiteBg desc="">
                  <Grid
                    container
                    alignItems="flex-start"
                    justify="center"
                    direction="row"
                    spacing={2}
                    style={{ width: '100%' }}
                  >
                    {jobsJSX}
                  </Grid>
                </PapperBlock>
                :
                this.state.label == 'About this job' &&
                <PapperBlock title="Job Info" icon="ios-aperture-outline" whiteBg desc="">
                  <Grid style={{ textAlign: 'right', marginTop: -15 }}>
                    <Button variant="contained" onClick={this.openAllJobs}>See all jobs</Button>
                  </Grid>
                  <Grid className={classes.jobTitle}>
                    <Typography variant="h4" color="secondary">
                      {jobs.length > 0 && jobs[jobInfoIndex].role_name}
                    </Typography>
                  </Grid>
                  <Divider />
                  <Typography variant="h6" color="primary" className={classes.subHeading}>About position:</Typography>
                  <Grid className={classes.content}>
                    <Grid className={classes.makeFlex}>
                      <Typography variant="subtitle2" color="textSecondary" className={classes.customMargin} >Job Type:</Typography>
                      <Typography variant="subtitle2">{(jobs.length > 0 && jobs[jobInfoIndex].role_type != null) ? jobs[jobInfoIndex].role_type : 'Not Avilable'}</Typography>
                    </Grid>
                    <Grid className={classes.makeFlex}>
                      <Typography variant="subtitle2" color="textSecondary" className={classes.customMargin}>Experience level:</Typography>
                      <Typography variant="subtitle2">{(jobs.length > 0 && jobs[jobInfoIndex].experience_level != null) ? jobs[jobInfoIndex].experience_level : 'Not Avilable'}</Typography>
                    </Grid>
                    <Grid className={classes.makeFlex}>
                      <Typography variant="subtitle2" color="textSecondary" className={classes.customMargin}>Role:</Typography>
                      <Typography variant="subtitle2">{jobs.length > 0 && jobs[jobInfoIndex].role_name}</Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="h6" color="primary" className={classes.subHeading}>Required Skills:</Typography>
                  <Grid className={classes.content}>
                    {jobs.length > 0 && (jobs[jobInfoIndex].skills.split(',')).map((item, index) => {
                      return <Typography variant="subtitle2" key={index.toString()}>{item}</Typography>
                    })
                    }
                  </Grid>
                  <Grid className={classes.subHeading}>
                    <Typography variant="h6" color="primary" className={classes.customMargin}>Work Location: </Typography>
                    <Grid className={classes.content}>
                      {jobs.length > 0 && (jobs[jobInfoIndex].work_location.split(',')).map((item, index) => {
                        return <Typography variant="subtitle2" key={index.toString()}>{item}</Typography>
                      })
                      }
                    </Grid>
                  </Grid>
                  <Typography variant="h6" color="primary" className={classes.subHeading}>Job description:</Typography>
                  <Grid className={classes.content}>
                    {jobs.length > 0 && ReactHtmlParser(jobs[jobInfoIndex].role_description)}
                  </Grid>
                  <Grid className={classes.subHeading}>
                    <Typography variant="h6" color="primary" className={classes.customMargin}>Last Date: </Typography>
                    <Grid className={classes.content}>
                      <Typography variant="subtitle2">{jobs.length > 0 && formatDate(jobs[jobInfoIndex].role_deadline)}</Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Typography variant="h6" color="primary" className={classes.subHeading}>Apply here:</Typography>
                    <Grid className={classes.content}>
                      <Typography variant="body1" color="secondary">
                        <a href='https://www.google.com'>{jobs.length > 0 && jobs[jobInfoIndex].role_link}</a>
                      </Typography>
                    </Grid>
                  </Grid>
                </PapperBlock>
            )}
            {tab === 1 && (
              <Fragment>
                <Grid style={{ padding: 20, margin: 20 }}>
                  {ReactHtmlParser(this.state.coverLetter)}
                </Grid>
              </Fragment>
            )}
            {tab === 2 && (
              <Fragment >
                <Grid style={{ padding: 20, margin: 20 }}>
                  {ReactHtmlParser(this.state.cvTips)}
                </Grid>
              </Fragment>
            )}
            {tab === 3 && (
              <Fragment >
                <SimilarJobProfiles company_id={atob(this.props.match.params.id)} />
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
