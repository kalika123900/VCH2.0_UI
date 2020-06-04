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


function toHumanDate(date) {
  const dateObject = new Date(date);
  const month = dateObject.getMonth();
  let day = dateObject.getDate();
  const year = dateObject.getFullYear();

  const monthString = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  if (day < 10) {
    day = `0${day}`;
  }

  return (`${day} ${monthString[month]} ${year}`);
};

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return response.json();
}


function buildWeeks(data) {
  let buildWeekData = [];

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()) / 7);
  }

  for (let i of data) {
    let date = new Date(i.date);
    let week = date.getWeek();
    if (buildWeekData[week]) {
      buildWeekData[week].Students = buildWeekData[week].Students + parseInt(i.users);
      buildWeekData[week].minDate = (new Date(buildWeekData[week].minDate) <= new Date(i.date)) ? buildWeekData[week].minDate : i.date;
      buildWeekData[week].maxDate = (new Date(buildWeekData[week].minDate) >= new Date(i.date)) ? buildWeekData[week].minDate : i.date;
      if (buildWeekData[week].minDate == buildWeekData[week].maxDate)
        buildWeekData[week].name = `${toHumanDate(buildWeekData[week].minDate)}`;
      else
        buildWeekData[week].name = `${toHumanDate(buildWeekData[week].minDate)} To ${toHumanDate(buildWeekData[week].maxDate)}`;
    }
    else {
      buildWeekData[week] = {
        Students: parseInt(i.users),
        minDate: i.date,
        maxDate: i.date,
        name: `${toHumanDate(i.date)}`
      };
    }
  }

  return buildWeekData.filter(item => {
    if (item) return true;
    return false
  })
}

class CampaignGraph extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    getData(`${API_URL}/admin/get-student-signup-stats`)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ data: buildWeeks(res.data) })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <PapperBlock title="Student Signup Graph" icon="ios-stats" whiteBg desc="">
        <Grid container spacing={2}>
        </Grid>
        <div className={classes.chartFluid}>
          <ResponsiveContainer>
            <LineChart
              width={800}
              height={450}
              data={this.state.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <XAxis dataKey="name" tickLine={false} />
              <YAxis tickSize={3} tickLine={false} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              {/* <CartesianAxis vertical={false} /> */}
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Students" strokeWidth={1} stroke="#3a8fe1" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </PapperBlock >
    )
  }
}

CampaignGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignGraph);