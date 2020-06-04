import React, { useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import Check from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import Type from 'dan-styles/Typography.scss';
import styles from './profile-jss';

import { makeSecureDecrypt } from '../../Helpers/security';

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

class ProfileProgress extends React.Component {
  state = {
    strength: 0,
    strengthString: ''
  }

  handleRedirect = () => {
    this.props.history.push('/student/edit-details')
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    }
    postData(`${API_URL}/student/get-strength`, data)
      .then((res) => {
        if (res.status === 1) {
          let percent = Math.round((res.data / 14) * 100);
          let str = 'Basic'
          if (percent > 59) {
            str = 'Intermediate'
          }
          if (percent > 75) {
            str = 'Pro'
          }
          this.setState({ strength: percent, strengthString: str });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.progressRoot}>
        <Paper className={classes.styledPaper} elevation={4}>
          <Typography className={classes.title} variant="h5" component="h3">
            <span className={Type.light}>Profile Completeness: </span>
            <span className={Type.bold}>{`${this.state.strength}%`}</span>
          </Typography>
          {this.state.strength != 100 &&
            <Typography className={classes.title} component="h3" style={{ marginTop: 10 }}>
              Your profile is incomplete. Employers are 5x more likely to contact you if your profile is complete!
            </Typography>
          }
          <Grid container justify="center" onClick={this.handleRedirect} >
            <Chip
              avatar={(
                <Avatar>
                  <Check />
                </Avatar>
              )}
              label={this.state.strength != 100 ? `Complete your profile` : 'Profile completed'}
              className={classes.chip}
              color="primary"
              style={{ cursor: 'pointer' }}
            />
          </Grid>
          <LinearProgress variant="determinate" className={classes.progress} value={this.state.strength} />
        </Paper>
      </div>
    );
  }
}

ProfileProgress.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(ProfileProgress));
