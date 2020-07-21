import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import PapperBlock from '../../components/PapperBlock/PapperBlock';
import styles from '../Charts/demos/fluidChart-jss';

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


function buildGraph(data) {
  let buildData = [];

  for (let i of data) {
    buildData.push({
      Students: parseInt(i.users),
      name: `${toHumanDate(i.date)}`
    });

  }

  return buildData;
}

class StudentSignupStats extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    getData(`${API_URL}/admin/get-student-signup-day-stats`)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ data: buildGraph(res.data) })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <PapperBlock title="Student Signups (Last 30 Days)" icon="ios-stats" whiteBg desc="">
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

StudentSignupStats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentSignupStats);