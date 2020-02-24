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
import PapperBlock from '../PapperBlock/PapperBlock';
import { data1 } from './sampleData';
import styles from '../../containers/Charts/demos/fluidChart-jss';

function CampaignGraph(props) {
  const { classes } = props;
  return (
    <PapperBlock title="Progress Graph" icon="ios-stats" whiteBg desc="">
      <div className={classes.chartFluid}>
        <ResponsiveContainer>
          <LineChart
            width={800}
            height={450}
            data={data1}
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
            <Line type="monotone" dataKey="Emails" strokeWidth={5} stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Opened" strokeWidth={5} stroke="#82ca9d" />
            <Line type="monotone" dataKey="Clicks" strokeWidth={5} stroke="#3a8fe1" />
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