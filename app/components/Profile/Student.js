import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import StudentTimeline from '../SocialMedia/StudentTimeline';
import styles from './profile-jss';
import TopCompanies from './TopCompanies';
import SuitableCompanies from './SuitableCompanies';
import ProfileProgress from './ProfileProgress';
import StudentSummary from './StudentSummary';
import ContactedGraph from './ContactedGraph';

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
          <Divider className={classes.divider} />
          <ProfileProgress />

          {/* Student Me */}
          <Divider className={classes.divider} />
          <StudentSummary />

          {/* My Suitable Companies */}
          <Divider className={classes.divider} />
          <SuitableCompanies />

          {/* My Top Companies */}
          <Divider className={classes.divider} />
          <TopCompanies />

          {/* Contacted Graph */}
          <Divider className={classes.divider} />
          <ContactedGraph />
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
