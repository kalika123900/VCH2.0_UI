import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';
import {
  LineChart,
  Line,
} from 'recharts';
import { data1 } from 'dan-api/chart/chartMiniData';
import colorfull from 'dan-api/palette/colorfull';
import rippleLogo from 'dan-images/crypto/student.png';

import { CounterTrading } from 'dan-components';
import styles from 'dan-components/Widget/widget-jss';

class AdvancedInfographic extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootCounter}>
        <Grid >
          <CounterTrading
            color={colorfull[6]}
            unitBefore=""
            start={0}
            end={45}
            duration={3}
            title="Student Signup"
            logo={rippleLogo}
            position="down"
            value={1.60}
            lowest={0}
            highest={30}
          >
            <LineChart width={240} height={60} data={data1}>
              <Line type="monotone" dataKey="amt" stroke="#FFFFFF" strokeWidth={2} />
            </LineChart>
          </CounterTrading>
        </Grid>
      </div>
    );
  }
}

AdvancedInfographic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(AdvancedInfographic));
