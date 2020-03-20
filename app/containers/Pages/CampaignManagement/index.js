import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PendingCampaigns from './PendingCampaigns'
import OngoingCampaigns from './OngoingCampaigns'
import PausedCampaigns from './PausedCampaigns';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { campaignRemoveMsg } from 'dan-actions/CampaignActions';
import ClientCancelCampaigns from './ClientCancelCampaigns';

const styles = () => ({
  warnMsg: {
    textAlign: 'center',
    color: 'green'
  }
})

class CampaignManagement extends Component {
  componentDidMount() {
    const { removeMsg } = this.props;
    setTimeout(() => {
      removeMsg();
    }, 4000)
  }

  render() {
    const { warnMsg, classes } = this.props;
    return (
      <Fragment>
        <Grid className={classes.warnMsg}>
          {warnMsg}
          {/* ****Hello! Its an warn message**** */}
        </Grid>
        <Grid container spacing={3} >
          <Grid item md={6} xs={12}>
            <PendingCampaigns />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <OngoingCampaigns />
          </Grid>
        </Grid>
        <Grid container spacing={3} >
          <Grid item md={6} xs={12}>
            <PausedCampaigns />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <ClientCancelCampaigns />
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

CampaignManagement.propTypes = {
  warnMsg: PropTypes.string.isRequired,
  removeMsg: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  warnMsg: state.getIn([reducerCampaign, 'warnMsg']),
});

const mapDispatchToProps = dispatch => ({
  removeMsg: bindActionCreators(campaignRemoveMsg, dispatch)
});

const CampaignManagementMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignManagement);

export default withStyles(styles)(CampaignManagementMapped);