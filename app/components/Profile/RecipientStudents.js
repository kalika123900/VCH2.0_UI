import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import datas from 'dan-api/apps/connectionData';
import RecipientStudentCard from '../CardPaper/RecipientStudentCard';
import styles from './profile-jss';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { Button } from '@material-ui/core';
import { CombineStyles } from 'dan-helpers';
import Ionicon from 'react-ionicons';
import StudentProfileDialog from '../Profile/StudentProfileDialog';

const customStyles = {
  customBottomNavLabel: {
    fontSize: '0.60rem',
    '& span': {
      fontSize: '0.60rem'
    }
  },
  absIconGrid: {
    position: 'absolute',
    top: '-20px'
  }
};

const combinedStyles = CombineStyles(customStyles, styles);

class RecipientStudents extends React.Component {
  state = {
    studentList: datas
  }

  handleRemove = (index) => {
    let newStudentList = this.state.studentList.filter(data => {
      return index !== data.id
    });
    this.setState({ studentList: newStudentList })
  }

  render() {
    const { classes } = this.props;
    const { studentList } = this.state;
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
          studentList.map((data, index) => (
            <Grid className={classes.posRelative} item md={3} sm={6} xs={12} key={index.toString()} >
              <RecipientStudentCard
                cover={data.cover}
                avatar={data.avatar}
                name={data.name}
                title={data.title}
                isVerified={data.verified}
                btnText="See Profile"
                university={data.university}
              >
              </RecipientStudentCard>
              <Button className={classes.removePos} onClick={(e) => this.handleRemove(data.id)}> <RemoveCircle /></Button>
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

RecipientStudents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipientStudents);
