import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import StudentProfileDialog from '../../components/Profile/StudentProfileDialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from 'dan-components/SocialMedia/jss/socialMedia-jss.js';

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
}

class NewStudentsFeed extends React.Component {
  state = {
    students: [],
    open: false,
    user_id: -1
  }

  componentDidMount() {
    getData(`${API_URL}/utils/get-recent-students`) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({ students: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRedirect = () => {
    this.props.history.push('/client/explore')
  }

  handleClose = () => {
    this.setState({ open: !this.state.open })
  }

  handleViewProfile = (user_id) => {
    this.setState({ open: true, user_id })
  }

  render() {
    const { classes } = this.props;
    const { students, open } = this.state;

    const JSX = students.map((item, index) => {
      return <ListItem button className={classes.listPeople} key={index.toString()}>
        <Avatar
          src={(item.profile == null || item.profile == '' ? null : item.profile)}
          className={classNames(classes.avatar, classes.orangeAvatar, classes.customMargin)}
        >
          {item.firstname[0].toUpperCase()}
        </Avatar>
        <ListItemText primary={`${item.firstname} ${item.lastname}`} />
        <Button color="secondary" size="small" onClick={() => this.handleViewProfile(item.id)}>View Profile</Button>
      </ListItem>
    })

    return (
      <Fragment>
        <StudentProfileDialog open={open} handleClose={this.handleClose} user_id={this.state.user_id} />
        <PapperBlock title="Recent Students" icon="ios-people-outline" whiteBg noMargin desc="">
          <List component="nav" dense className={classes.profileList}>
            {JSX}
          </List>
          <Divider className={classes.divider} />
          <Grid container justify="center">
            <Button color="secondary" className={classes.button} onClick={this.handleRedirect}>
              See All
          </Button>
          </Grid>
        </PapperBlock>
      </Fragment>
    );
  }
}

NewStudentsFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(NewStudentsFeed));
