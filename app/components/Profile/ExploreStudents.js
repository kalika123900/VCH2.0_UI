import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StudentCard from '../CardPaper/StudentCard';
import styles from './profile-jss';

class ExploreStudents extends React.Component {
  render() {
    const { classes, datas } = this.props;
    return (
      <Grid
        container
        alignItems="flex-start"
        justify="space-between"
        direction="row"
        spacing={2}
        className={classes.root}
      >
        {
          datas.map((data, index) => (
            <Grid item md={3} sm={6} xs={12} key={index.toString()}>
              <StudentCard
                cover={data.cover}
                avatar={data.avatar}
                name={data.name}
                title={data.title}
                isVerified={data.verified}
                btnText="See Profile"
                university={data.university}
              />
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

ExploreStudents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExploreStudents);
