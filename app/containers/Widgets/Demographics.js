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

const colors = [red[300], blue[300], cyan[300], lime[300]];

class ChartInfographic extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootCounter}>
        <Grid container spacing={2}>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[6]}
              start={0}
              end={761}
              duration={3}
              title="Impressions Made"
            >
              <VisibilityIcon className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={459}
              duration={3}
              title="Visits to your Application Portal"
            >
              <LanguageIcon className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[5]}
              start={0}
              end={1039}
              duration={3}
              title="Students Targeted"
            >
              <TrackChangesIcon className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[4]}
              start={0}
              end={4163}
              duration={3}
              title="Students on the Platform"
            >
              <SupervisorAccountIcon className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ChartInfographic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartInfographic);
