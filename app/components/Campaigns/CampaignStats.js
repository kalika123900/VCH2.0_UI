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

class CampaignStats extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <PapperBlock title="Campaign Stats" icon="md-stats" whiteBg desc="">
        <div className={classes.rootCounterFull}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <CounterWidget
                color={colorfull[0]}
                start={0}
                end={207}
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
                end={300}
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
                end={67}
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
                end={67}
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