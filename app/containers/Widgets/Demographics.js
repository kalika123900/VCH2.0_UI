import React, { PureComponent, useReducer } from 'react';
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

import { makeSecureDecrypt } from 'dan-helpers/security';

const colors = [red[300], blue[300], cyan[300], lime[300]];

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}


class ChartInfographic extends PureComponent {
  state = {
    students: 0,
    impressions: 0,
    targeted: 0,
    visits: 0
  }

  getStudents = () => {
    getData(`${API_URL}/client/get-platform-students`) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({ students: res.data[0].students })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getImpressions = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );


    const data = {
      company_id: user.cId
    }

    postData(`${API_URL}/client/get-client-impressions`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ impressions: res.data[0].impressions })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getVisits = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );


    const data = {
      company_id: user.cId
    }

    postData(`${API_URL}/client/get-client-visits`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ visits: res.data[0].visits })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getTargeted = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );


    const data = {
      company_id: user.cId
    }

    postData(`${API_URL}/client/get-targeted-students`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ targeted: res.data[0].targeted })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.getStudents();
    this.getImpressions();
    this.getTargeted();
    this.getVisits();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootCounter}>
        <Grid container spacing={2}>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[6]}
              start={0}
              end={this.state.impressions}
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
              end={this.state.visits}
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
              end={this.state.targeted}
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
              end={this.state.students}
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
