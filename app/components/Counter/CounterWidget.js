import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CountUp from 'react-countup';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    height: 190,
    marginBottom: 6,
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      height: 126,
      marginBottom: -1,
      alignItems: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    '& > *': {
      padding: '0 5px'
    }
  },
  title: {
    color: theme.palette.common.white,
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
    fontWeight: 400
  },
  counter: {
    color: theme.palette.common.white,
    fontSize: 28,
    fontWeight: 500
  },
  customContent: {
    textAlign: 'right'
  }
});

class CounterWidget extends PureComponent {
  handleCounter = () => {
    if (this.props.education) {
      window.open(this.props.sheet);
    } else {
      this.props.history.push(`/student/edit-details?tab=${btoa(3)}`)
    }
  }

  render() {
    const {
      classes,
      color,
      start,
      end,
      duration,
      title,
      children,
      unitBefore,
      unitAfter,
      type,
      sheet,
      education
    } = this.props;
    return (
      <Paper className={classes.root} style={{ backgroundColor: color }}>
        {type == undefined
          ?
          <div>
            <Typography className={classes.counter}>
              {unitBefore}
              <CountUp start={start} end={end} duration={duration} useEasing />
              {unitAfter}
            </Typography>
            <Typography className={classes.title} variant="subtitle1">{title}</Typography>
          </div>
          :
          <div>
            <Button variant="contained" onClick={() => this.handleCounter()}
            >
              {education ? "Download" : "Fill Education"}
            </Button>
            <Typography className={classes.counter}>
              {education ?
                <Typography variant="subtitle1">Download the 100 Top Firms Still Hiring List</Typography>
                :
                <Typography variant="subtitle1" style={{ fontSize: 14 }}>Add education to access the 100 Top Firms Still Hiring List</Typography>
              }
            </Typography>
          </div>
        }
        <div className={classes.customContent}>
          {children}
        </div>
      </Paper>
    );
  }
}

CounterWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  unitBefore: PropTypes.string,
  unitAfter: PropTypes.string,
};

CounterWidget.defaultProps = {
  unitBefore: '',
  unitAfter: '',
};

export default withRouter(withStyles(styles)(CounterWidget));
