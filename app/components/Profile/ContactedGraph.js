import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import ThemePallete from 'dan-api/palette/themePalette';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Divider from '@material-ui/core/Divider';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from '../../containers/Charts/demos/fluidChart-jss';
import { data1 } from '../../containers/Charts/demos/sampleData';

const theme = createMuiTheme(ThemePallete.magentaTheme);
const color = ({
  primary: theme.palette.primary.main,
  secondary: theme.palette.secondary.main,
});

const CustomizedLabel = props => {
  const {
    x,
    y,
    stroke,
    value
  } = props;
  return (
    <text x={x} y={y} dy={-4} fill={stroke} fillOpacity="0.8" fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

CustomizedLabel.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  value: PropTypes.number,
  stroke: PropTypes.string,
};

CustomizedLabel.defaultProps = {
  x: 0,
  y: 0,
  value: 0,
  stroke: '#000'
};

class ContactedGraph extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <PapperBlock title="Contacted Graph" icon="ios-contact-outline" whiteBg noMargin desc="">
        <Divider className={classes.divider} />
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
              <Legend />
              <Line type="monotone" dataKey="contacted" strokeWidth={3} stroke={color.primary} label={<CustomizedLabel stroke={color.primary} />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </PapperBlock>
    );
  }
}

ContactedGraph.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactedGraph);
