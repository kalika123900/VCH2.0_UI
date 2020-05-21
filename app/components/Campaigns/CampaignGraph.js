import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import qs from 'qs';
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
import styles from '../../containers/Charts/demos/fluidChart-jss';

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
      buildWeekData[week].Clicks = buildWeekData[week].Clicks + parseInt(i.clicks);
      buildWeekData[week].Views = buildWeekData[week].Views + parseInt(i.views);
      buildWeekData[week].minDate = (new Date(buildWeekData[week].minDate) <= new Date(i.date)) ? buildWeekData[week].minDate : i.date;
      buildWeekData[week].maxDate = (new Date(buildWeekData[week].minDate) >= new Date(i.date)) ? buildWeekData[week].minDate : i.date;
      if (buildWeekData[week].minDate == buildWeekData[week].maxDate)
        buildWeekData[week].name = `${toHumanDate(buildWeekData[week].minDate)}`;
      else
        buildWeekData[week].name = `${toHumanDate(buildWeekData[week].minDate)} To ${toHumanDate(buildWeekData[week].maxDate)}`;
    }
    else {
      buildWeekData[week] = {
        Clicks: parseInt(i.clicks),
        Views: parseInt(i.views),
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

function buildEmailWeeks(data) {
  let buildWeekData = [];

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()) / 7);
  }

  for (let i of data) {
    let date = new Date(i.created_date);
    let week = date.getWeek();
    if (buildWeekData[week]) {
      buildWeekData[week].Emailed = buildWeekData[week].Emailed + parseInt(i.users);
      buildWeekData[week].minDate = (new Date(buildWeekData[week].minDate) <= new Date(i.created_date)) ? buildWeekData[week].minDate : i.created_date;
      buildWeekData[week].maxDate = (new Date(buildWeekData[week].minDate) >= new Date(i.created_date)) ? buildWeekData[week].minDate : i.created_date;
      if (buildWeekData[week].minDate == buildWeekData[week].maxDate)
        buildWeekData[week].name = `${toHumanDate(buildWeekData[week].minDate)}`;
      else
        buildWeekData[week].name = `${toHumanDate(buildWeekData[week].minDate)} To ${toHumanDate(buildWeekData[week].maxDate)}`;
    }
    else {
      buildWeekData[week] = {
        Emailed: parseInt(i.users),
        minDate: i.created_date,
        maxDate: i.created_date,
        name: `${toHumanDate(i.created_date)}`
      };
    }
  }

  return buildWeekData.filter(item => {
    if (item) return true;
    return false
  })
}

function buildOpenedWeeks(data) {
  let buildWeekData = [];

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()) / 7);
  }

  for (let i of data) {
    let date = new Date(i.created_at);
    let week = date.getWeek();
    if (buildWeekData[week]) {
      buildWeekData[week].Opened = buildWeekData[week].Opened + parseInt(i.users);
      buildWeekData[week].minDate = (new Date(buildWeekData[week].minDate) <= new Date(i.created_at)) ? buildWeekData[week].minDate : i.created_at;
      buildWeekData[week].maxDate = (new Date(buildWeekData[week].minDate) >= new Date(i.created_at)) ? buildWeekData[week].minDate : i.created_at;
      if (buildWeekData[week].minDate == buildWeekData[week].maxDate)
        buildWeekData[week].name = `${toHumanDate(buildWeekData[week].minDate)}`;
      else
        buildWeekData[week].name = `${toHumanDate(buildWeekData[week].minDate)} To ${toHumanDate(buildWeekData[week].maxDate)}`;
    }
    else {
      buildWeekData[week] = {
        Opened: parseInt(i.users),
        minDate: i.created_at,
        maxDate: i.created_at,
        name: `${toHumanDate(i.created_at)}`
      };
    }
  }

  return buildWeekData.filter(item => {
    if (item) return true;
    return false
  })
}

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

class CampaignGraph extends React.Component {
  state = {
    tab: 0,
    clicksViewsData: [],
    emailedData: [],
    openedData: []
  }

  componentDidMount() {
    const data = {
      campaignId: this.props.campaignId
    }

    postData(`${API_URL}/campaign/campaign-clicks-views-stats`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ clicksViewsData: buildWeeks(res.data) })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    postData(`${API_URL}/campaign/campaign-emailed-stats`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ emailedData: buildEmailWeeks(res.data) })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    postData(`${API_URL}/campaign/campaign-opened-stats`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ openedData: buildOpenedWeeks(res.data) })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { classes } = this.props;
    const { tab, clicksViewsData, emailedData, openedData } = this.state;
    return (
      <PapperBlock title="Progress Graph" icon="ios-stats" whiteBg desc="" style={{ height: '100%' }}>
        <Tabs
          value={tab}
          onChange={this.handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}

        >
          <Tab label="Emailed" />
          <Tab label="Opened" />
          <Tab label="Clicks" />
          <Tab label="Views" />
        </Tabs>

        <div className={classes.chartFluid}>
          {tab == 0 &&
            <ResponsiveContainer>
              <LineChart
                width={800}
                height={450}
                data={emailedData}
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
                <Line type="monotone" dataKey="Emailed" strokeWidth={1} stroke="#ec407a" />
              </LineChart>
            </ResponsiveContainer>
          }
          {tab == 1 &&
            <ResponsiveContainer>
              <LineChart
                width={800}
                height={450}
                data={openedData}
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
                <Line type="monotone" dataKey="Opened" strokeWidth={1} stroke="#9c27b0" />
              </LineChart>
            </ResponsiveContainer>
          }
          {tab == 2 &&
            <ResponsiveContainer>
              <LineChart
                width={800}
                height={450}
                data={clicksViewsData}
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
                <Line type="monotone" dataKey="Clicks" strokeWidth={1} stroke="#03a9f4" />
              </LineChart>
            </ResponsiveContainer>
          }
          {tab == 3 &&
            <ResponsiveContainer>
              <LineChart
                width={800}
                height={450}
                data={clicksViewsData}
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
                <Line type="monotone" dataKey="Views" strokeWidth={1} stroke="#009688" />
              </LineChart>
            </ResponsiveContainer>
          }
        </div>
      </PapperBlock >
    );
  }
}


CampaignGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignGraph);