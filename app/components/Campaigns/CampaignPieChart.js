import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ThemePallete from 'dan-api/palette/themePalette';
import { withStyles } from '@material-ui/core/styles';
import PapperBlock from '../PapperBlock/PapperBlock';
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer
} from 'recharts';
import qs from 'qs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { data6 } from './sampleData';
import styles from '../Forms/user-jss';
import { Grid } from '@material-ui/core';

const theme = createMuiTheme(ThemePallete.greenTheme);
const color = ({
  primary: theme.palette.primary.main,
  secondary: theme.palette.secondary.main,
});

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + ((outerRadius + 10) * cos);
  const sy = cy + ((outerRadius + 10) * sin);
  const mx = cx + ((outerRadius + 30) * cos);
  const my = cy + ((outerRadius + 30) * sin);
  const ex = mx + ((cos >= 0 ? 1 : -1) * 22);
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + ((cos >= 0 ? 1 : -1) * 12)} y={ey} textAnchor={textAnchor} fill="#333">{`Total ${value}`}</text>
      <text x={ex + ((cos >= 0 ? 1 : -1) * 12)} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

renderActiveShape.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  midAngle: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  fill: PropTypes.string,
  payload: PropTypes.string,
  percent: PropTypes.number,
  value: PropTypes.number,
};

renderActiveShape.defaultProps = {
  cx: 0,
  cy: 0,
  midAngle: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  fill: '#eee',
  payload: '',
  percent: 0,
  value: 0,
};


async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });
  return await response.json();
}

class CampaignPieChart extends React.Component {
  state = {
    activeIndex: 0,
    tab: 0,
    genderData: [],
    universityData: [],
    courseData: []
  };

  componentDidMount() {
    const data = {
      campaignId: this.props.campaignId
    }

    postData(`${API_URL}/campaign/course-balance`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let courseData = res.data.map(item => {
              return {
                name: item.subject,
                value: parseInt(item.count)
              }
            });
            this.setState({ courseData })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    postData(`${API_URL}/campaign/gender-balance`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let genderData = res.data.map(item => {
              return {
                name: item.gender,
                value: parseInt(item.count)
              }
            });
            this.setState({ genderData })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    postData(`${API_URL}/campaign/university-balance`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let universityData = res.data.map(item => {
              return {
                name: item.university_qualification,
                value: parseInt(item.count)
              }
            });
            this.setState({ universityData })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onPieEnter(evt) {
    var data = [];
    if (this.state.tab == 0) {
      data = this.state.genderData;
    }
    else if (this.state.tab == 1) {
      data = this.state.courseData;
    }
    else if (this.state.tab == 2) {
      data = this.state.universityData;
    }

    const index = data.findIndex(p => p.name === evt.name);
    this.setState({
      activeIndex: index,
    });
  }

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { activeIndex, tab, genderData, universityData, courseData } = this.state;
    const { classes } = this.props;

    return (
      <PapperBlock title="Further Campaign Details" icon="ios-pie" whiteBg desc="" style={{ height: '100%' }}>
        <Tabs
          value={tab}
          onChange={this.handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="Gender Balance" />
          <Tab label="Course Balance" />
          <Tab label="University Balance" />
        </Tabs>

        {tab === 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart
              width={800}
              height={400}
              margin={{ top: 5, right: 30, left: 170, bottom: 5 }}
            >
              <Pie
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={genderData}
                cx={150}
                cy={200}
                innerRadius={60}
                outerRadius={100}
                fill={color.secondary}
                fillOpacity="0.8"
                onMouseEnter={(event) => this.onPieEnter(event)}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
        {tab === 1 && (
          <PieChart
            width={800}
            height={400}
            margin={{ top: 5, right: 30, left: 170, bottom: 5 }}
          >
            <Pie
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={courseData}
              cx={150}
              cy={200}
              innerRadius={60}
              outerRadius={100}
              fill={color.secondary}
              fillOpacity="0.8"
              onMouseEnter={(event) => this.onPieEnter(event, courseData)}
            />
          </PieChart>
        )}
        {tab === 2 && (
          <PieChart
            width={800}
            height={400}
            margin={{ top: 5, right: 30, left: 170, bottom: 5 }}
          >
            <Pie
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={universityData}
              cx={150}
              cy={200}
              innerRadius={60}
              outerRadius={100}
              fill={color.secondary}
              fillOpacity="0.8"
              onMouseEnter={(event) => this.onPieEnter(event, universityData)}
            />
          </PieChart>
        )}
      </PapperBlock >
    );
  }
}

export default withStyles(styles)(CampaignPieChart);