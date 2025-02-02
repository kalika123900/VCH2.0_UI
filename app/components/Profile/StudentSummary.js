import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocalPhone from '@material-ui/icons/LocalPhone';
import DateRange from '@material-ui/icons/DateRange';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PapperBlock from '../PapperBlock/PapperBlock';
import EmailIcon from '@material-ui/icons/Email';
import styles from './profile-jss';
import Switch from '@material-ui/core/Switch';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { makeSecureDecrypt } from '../../Helpers/security';
import formatDate from '../../Helpers/formatDate';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

class StudentSummary extends React.Component {
  state = {
    name: '',
    email: '',
    dob: '',
    phone: '',
    employment_status: false,
    resume: ''
  }

  handleRedirect = () => {
    this.props.history.push(`/student/edit-details`)
  }

  handleToggle = (e) => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const value = e._targetInst.stateNode.checked;

    const data = {
      user_id: user.id,
      employment_status: value
    };

    postData(`${API_URL}/student/set-employment-status`, data)
      .then((res) => {
        if (res.status == 1) {
          this.setState({ employment_status: value });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getProfileData = () => {
    var data = {};
    if (this.props.userType == 'STUDENT') {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );

      data = {
        user_id: user.id
      }
    }
    if (this.props.userType == 'CLIENT' || this.props.userType == 'ADMIN') {
      data = {
        user_id: this.props.user_id
      }
    }

    postData(`${API_URL}/student/get-personal-details`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({
            name: `${res.data.firstname} ${res.data.lastname}`,
            email: res.data.email,
            phone: res.data.phone,
            dob: res.data.dob == null ? 'Not avilable' : formatDate(res.data.dob),
            employment_status: res.data.employment_status,
            resume: res.data.resume ? res.data.resume : ''
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (this.props.userType == 'CLIENT') {
      postData(`${API_URL}/utils/update-student-views`, data)
        .catch((err) => {
          console.log(err);
        });
    }
  }


  showResume = () => {
    window.open(this.state.resume);
  }

  componentDidMount() {
    this.getProfileData();
  }

  render() {
    const { name, email, phone, dob, employment_status } = this.state;
    const { classes, userType } = this.props;

    return (
      <PapperBlock title="Account Summary" icon="ios-contact-outline" whiteBg noMargin desc="">
        {userType == 'STUDENT' &&
          <Grid style={{ textAlign: "right" }}>
            <Button color="primary" onClick={this.handleRedirect}><EditIcon />Edit</Button>
          </Grid>
        }
        <Grid>
          <List dense className={classes.profileList}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Name" secondary={name} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DateRange />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Born" secondary={dob} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalPhone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Phone" secondary={phone} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary={email} />
            </ListItem>
            {userType == 'STUDENT' &&
              <ListItem style={{ paddingLeft: 0 }}>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Employment Status" secondary="Are you open for job opportunities" />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={this.handleToggle}
                    checked={employment_status}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            }
          </List>
        </Grid>
        {(this.state.resume.length > 0 && this.state.resume != null) ?
          <Grid style={{ textAlign: "right" }}>
            <Button color="primary" onClick={this.showResume} variant="contained" color="secondary">Click to view uploaded CV</Button>
          </Grid>
          :
          <Grid style={{ textAlign: "right" }}>
            <Button color="primary" variant="contained" color="secondary">CV not uploaded</Button>
          </Grid>
        }
      </PapperBlock>
    );
  }
}

StudentSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

const reducerA = 'Auth';

const mapStateToProps = state => ({
  userType: state.getIn([reducerA, 'userType'])
});

const StudentSummaryMapped = connect(
  mapStateToProps
)(StudentSummary);

export default withStyles(styles)(withRouter(StudentSummaryMapped));
