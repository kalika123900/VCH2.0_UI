import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, Bar,
  AreaChart, Area,
  LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts';
import OndemandVideo from '@material-ui/icons/OndemandVideo';
import red from '@material-ui/core/colors/red';
import LanguageIcon from '@material-ui/icons/Language';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';
import { data1, data2 } from 'dan-api/chart/chartMiniData';
import colorfull from 'dan-api/palette/colorfull';
import { CounterWidget } from 'dan-components';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Divider from '@material-ui/core/Divider';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import styles from 'dan-components/Widget/widget-jss';
import TimerIcon from '@material-ui/icons/Timer';

const colors = [red[300], blue[300], cyan[300], lime[300]];

function addZero(number) {
  if (number < 10)
    return `0${number}`;
  else
    return number;
}

class ChartInfographic extends PureComponent {
  state = {
    deadline: new Date("Aug 1, 2020 00:00:00").getTime(),
    timer: '00:00:00:00'
  }

  updateTimer = () => {
    var { deadline } = this.state;
    var _that = this;
    setInterval(function () {
      var now = new Date().getTime();
      var t = deadline - now;
      var days = addZero(Math.floor(t / (1000 * 60 * 60 * 24)));
      var hours = addZero(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      var minutes = addZero(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)));
      var seconds = addZero(Math.floor((t % (1000 * 60)) / 1000));
      _that.setState({ timer: `${days}:${hours}:${minutes}:${seconds}` })
    }, 1000);
  }

  componentDidMount() {
    this.updateTimer();
  }

  render() {
    const { classes } = this.props;
    const { timer } = this.state;

    return (
      <div className={classes.rootCounter} >
        <Grid container spacing={2}>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[6]}
              start={0}
              end={106}
              duration={3}
              title="Opportunities on the platform"
            >
              <TrackChangesIcon className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={4}
              duration={3}
              title="Contacted by an employer"
            >
              <SupervisorAccountIcon className={classes.counterIcon} />

            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[5]}
              start={0}
              end={5}
              duration={3}
              title="Profile View by an employer"
            >
              <VisibilityIcon className={classes.counterIcon} />

            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[4]}
              start={0}
              end={0}
              timer={timer}
              duration={0}
              type='time'
              title="Next VCH Release"
            >
              <TimerIcon className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
        </Grid>
      </div >
    );
  }
}

ChartInfographic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartInfographic);
