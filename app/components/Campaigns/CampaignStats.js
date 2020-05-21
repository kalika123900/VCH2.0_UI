import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import colorfull from 'dan-api/palette/colorfull';
import CounterWidget from '../Counter/CounterWidget';
import styles from '../../components/Widget/widget-jss';
import Email from '@material-ui/icons/Email';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import PapperBlock from '../PapperBlock/PapperBlock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import qs from 'qs';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });

  return response.json();
}

class CampaignStats extends React.Component {
  state = {
    emailed: 0,
    opened: 0,
    clicks: 0,
    views: 0
  }

  componentDidMount() {
    const data = {
      campaignId: this.props.campaignId
    };

    postData(`${API_URL}/campaign/emailed-count`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ emailed: res.data[0].count });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    postData(`${API_URL}/campaign/opened-count`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ opened: res.data[0].count });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    postData(`${API_URL}/campaign/views-count`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ views: res.data[0].sum });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    postData(`${API_URL}/campaign/clicks-count`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ clicks: res.data[0].sum });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { emailed, clicks, views, opened } = this.state;

    return (
      <PapperBlock title="Campaign Stats" icon="md-stats" whiteBg desc="">
        <div className={classes.rootCounterFull}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <CounterWidget
                color={colorfull[0]}
                start={0}
                end={parseInt(emailed)}
                duration={3}
                title="Emailed"
              >
                <Email className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
            <Grid item xs={6} md={6}>
              <CounterWidget
                color={colorfull[1]}
                start={0}
                end={parseInt(opened)}
                duration={3}
                title="Opened"
              >
                <OpenInBrowser className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
            <Grid item xs={6} md={6}>
              <CounterWidget
                color={colorfull[2]}
                start={0}
                end={parseInt(clicks)}
                duration={3}
                title="Clicked"
              >
                <TouchAppIcon className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
            <Grid item xs={6} md={6}>
              <CounterWidget
                color={colorfull[3]}
                start={0}
                end={parseInt(views)}
                duration={3}
                title="Views"
              >
                <VisibilityIcon className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
    );
  }
}

CampaignStats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignStats);