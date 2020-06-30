import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './profile-jss';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';

class StudentSummary extends React.Component {
  handleRedirect = () => {
    this.props.history.push(`/student/edit-details?tab=${btoa(2)}`)
  }
  render() {
    const { classes, skills, userType } = this.props;

    const JSX = skills.map((item, index) => {
      if (item) {
        return <Grid item md={6} key={index.toString()}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                {item[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item} style={{ whiteSpace: 'pre-line', padding: 5 }} />
          </ListItem>
        </Grid>
      } else {
        return null;
      }
    });

    return (
      <PapperBlock title="Skills" icon="ios-aperture-outline" whiteBg desc="">
        {userType == 'STUDENT' &&
          <Grid style={{ textAlign: "right" }}>
            <Button color="primary" onClick={this.handleRedirect}><EditIcon />Edit</Button>
          </Grid>
        }
        <Grid container className={classes.colList}>
          {JSX.length > 0
            ? JSX
            : <Typography variant="body1" color="textSecondary">Skills are not mentioned :(</Typography>
          }
        </Grid>
        {/* <Grid style={{ marginTop: '20px' }}>
          <Button variant="text" color="primary">See All</Button>
        </Grid> */}
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
