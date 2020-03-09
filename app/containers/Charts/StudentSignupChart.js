import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import PapperBlock from '../../components/PapperBlock/PapperBlock';
import { data10 } from '../../components/Campaigns/sampleData';
import styles from '../Charts/demos/fluidChart-jss';
import { Typography, Grid } from '@material-ui/core';

function CampaignGraph(props) {
  const { classes } = props;
  return (
    <PapperBlock title="Student Signup Graph" icon="ios-stats" whiteBg desc="">
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Typography variant="h6" color="primary">
            Total Student : 300
        </Typography>
        </Grid>
      </Grid>
      <div className={classes.chartFluid}>
        <ResponsiveContainer>
          <LineChart
            width={800}
            height={450}
            data={data10}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis dataKey="name" tickLine={false} />
            <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <CartesianAxis vertical={false} />
            <Tooltip />
            <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
            <Line type="monotone" dataKey="Signup" strokeWidth={3} stroke="#3a8fe1" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </PapperBlock >
  );
}

CampaignGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignGraph);