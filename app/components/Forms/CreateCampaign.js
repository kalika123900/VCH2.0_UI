import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { removeCampaignInfo } from 'dan-actions/CampaignActions';
import { withRouter } from 'react-router';
import styles from './user-jss';
import { makeSecureDecrypt } from 'dan-helpers/security';
import CreateFollowUps from './CampaignSteps/CreateFollowUps';
import Step2 from './CampaignSteps/Step2';
import Step3 from './CampaignSteps/Step3';
import Step4 from './CampaignSteps/Step4';
import Step5 from './CampaignSteps/Step5';
import Step6 from './CampaignSteps/Step6';

function getSteps() {
  return [
    'Select Role',
    'Choose Audience',
    'Choose campaign content',
    'Set Your Deadline',
    'Review Settings'
  ];
}

function adminGetSteps() {
  return [
    'Select Role',
    'Choose Audience',
    'Choose campaign content',
    'Set Your Deadline',
    'Create follow up emails',
    'Review Settings'
  ];
}

function daysDifference(timestamp) {
  timestamp = Math.round((new Date(timestamp).getTime() / 1000));
  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const currentDate = Math.round((new Date(dateString).getTime() / 1000));
  const timeDiff = timestamp - currentDate;

  return Math.floor(timeDiff / (60 * 60 * 24));
}

async function postJSON(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

class CreateCampaign extends React.Component {
  state = {
    activeStep: 0,
    isCreateCampaign: true
  };

  handleCreateCampaign = (count) => {
    if (count > 100) {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );

      if (user.managerType != 2) {
        if (user.capabilities == 2)
          this.setState({ isCreateCampaign: false });
      }
    }
  }

  handleBack = () => {
    this.setState((prevState) => ({ activeStep: prevState.activeStep - 1 }));
  }

  handleNext = () => {
    this.setState((prevState) => ({ activeStep: prevState.activeStep + 1 }));
  }

  handleReject = () => {
    const { removeInfo } = this.props;
    const data = {
      campaignId: atob(this.props.match.params.campaignId)
    };

    postJSON(`${API_URL}/campaign/reject-campaign`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          removeInfo();
          this.props.history.push('/admin/campaign-management');
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      classes,
      pristine,
      handleSubmit,
      submitting,
      deco,
      userType,
      role,
      heading,
      body,
      name,
      warnMsg,
      deadline,
      campaignStatus
    } = this.props;

    const { activeStep } = this.state;
    const steps = userType == 'ADMIN' ? adminGetSteps() : getSteps();

    let isDisable = true;
    let isCampaignName = true;
    let isCreateDisable = true;
    if (heading.length > 0) {
      if (body.length > 0) {
        isDisable = false;
      }
    }
    if (name.length > 0) {
      isCampaignName = false;
    }
    if (name.length > 0) {
      if (this.state.isCreateCampaign) {
        isCreateDisable = false;
      }
    }

    return (
      <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {activeStep === 0 && (
            <Grid>
              <Grid>
                <Typography variant="h4" className={classes.title} gutterBottom>
                  Select the role you would like to promote in this campaign
                </Typography>
              </Grid>
              <section className={classes.pageFormWrap}>
                <Grid>
                  <FormControl style={{ width: '100%' }} className={(classes.formControl, classes.wrapInput)}>
                    <Step2 />
                  </FormControl>
                </Grid>
                <Grid className={classes.btnArea}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={() => this.handleNext()}
                    disabled={(role == -1)}
                  >
                    Next
                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </Grid>
              </section>
            </Grid>
          )}
          {activeStep === 1 && (
            <section>
              <Typography variant="h4" className={classes.title} gutterBottom>
                Define your product or service
              </Typography>
              <Grid>
                <FormControl className={(classes.formControl, classes.wrapInput)}>
                  <Step3 />
                </FormControl>
              </Grid>
              <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                <Button variant="contained" fullWidth onClick={() => this.handleBack()}>
                  Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
              <Grid className={(classes.btnArea, classes.pageFormWrap)}>
                <Button variant="contained" fullWidth color="primary" onClick={() => this.handleNext()}>
                  Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
            </section>
          )}
          {activeStep === 2 && (
            <section>
              <Typography variant="h4" className={classes.title} gutterBottom>
                Let’s write your first email communication
              </Typography>
              <Grid>
                <FormControl className={(classes.formControl, classes.wrapInput)}>
                  {userType == 'ADMIN' ?
                    <Step4 campaignId={atob(this.props.match.params.campaignId)} />
                    : <Step4 />
                  }
                </FormControl>
              </Grid>
              <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                <Button variant="contained" fullWidth onClick={() => this.handleBack()}>
                  Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
              <Grid className={(classes.btnArea, classes.pageFormWrap)}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => this.handleNext()}
                  disabled={isDisable}
                >
                  Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
            </section>
          )}
          {activeStep === 3 && (
            <section>
              <Typography variant="h4" className={classes.title} gutterBottom>
                Set Your Deadline
              </Typography>
              <Grid>
                <FormControl className={(classes.formControl, classes.wrapInput)}>
                  <Step5 />
                </FormControl>
              </Grid>
              <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                <Button variant="contained" fullWidth onClick={() => this.handleBack()}>
                  Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
              <Grid className={(classes.btnArea, classes.pageFormWrap)}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={(daysDifference(deadline) < 7) ? true : false}
                  color="primary"
                  onClick={() => {
                    userType == 'ADMIN' ? this.setState((prevState) => ({ activeStep: prevState.activeStep + 1 }))
                      : this.setState((prevState) => ({ activeStep: prevState.activeStep + 2 }))
                  }}
                >
                  Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
            </section>
          )}
          {(activeStep === 4 && userType == 'ADMIN') && (
            <section>
              <Typography variant="h4" className={classes.title} gutterBottom>
                Let’s write Follow Up emails for this campaign
              </Typography>
              <Grid>
                <FormControl className={(classes.formControl, classes.wrapInput)}>
                  <CreateFollowUps campaignId={atob(this.props.match.params.campaignId)} />
                </FormControl>
              </Grid>
              <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                <Button variant="contained" fullWidth onClick={() => this.handleBack()}>
                  Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
              <Grid className={(classes.btnArea, classes.pageFormWrap)}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => this.handleNext()}
                  disabled={isDisable}
                >
                  Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
            </section>
          )}
          {activeStep === 5 && (
            <section>
              <Typography variant="h4" className={classes.title} gutterBottom>
                Review your campaign settings
              </Typography>
              <Grid>
                <FormControl className={(classes.formControl, classes.wrapInput)}>
                  {userType == 'ADMIN' ?
                    <Step6 campaignId={atob(this.props.match.params.campaignId)} handleCreateCampaign={this.handleCreateCampaign} />
                    :
                    <Step6 handleCreateCampaign={this.handleCreateCampaign} />
                  }
                </FormControl>
              </Grid>
              <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                <Button variant="contained" fullWidth
                  onClick={() => {
                    userType == 'ADMIN' ? this.setState((prevState) => ({ activeStep: prevState.activeStep - 1 }))
                      : this.setState((prevState) => ({ activeStep: prevState.activeStep - 2 }))
                  }}
                >
                  Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
              <Grid className={(classes.btnArea, classes.pageFormWrap)}>
                {
                  (userType == 'ADMIN' && campaignStatus == 1)
                    ? (
                      <Fragment>
                        <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                          <Button variant="contained" fullWidth color="secondary" onClick={() => this.handleReject()}>
                            Reject Campaign
                            <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                          </Button>
                        </Grid>
                      </Fragment>
                    )
                    : (userType == 'ADMIN' && campaignStatus == 0)
                      ? (
                        <Fragment>
                          <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                            <Button variant="contained" fullWidth color="primary" type="submit">
                              Approve Campaign
                              <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                            </Button>
                          </Grid>
                          <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                            <Button variant="contained" fullWidth color="secondary" onClick={() => this.handleReject()}>
                              Reject Campaign
                              <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                            </Button>
                          </Grid>
                        </Fragment>
                      )
                      : (userType == 'ADMIN' && campaignStatus == 10)
                      && (
                        <Fragment>
                          <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                            <Button variant="contained" fullWidth color="secondary" onClick={() => this.handleReject()}>
                              Reject Campaign
                              <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                            </Button>
                          </Grid>
                        </Fragment>
                      )
                }
                {
                  (userType == 'CLIENT' && campaignStatus == -3)
                    ? (
                      <Fragment>
                        <Button
                          variant="contained"
                          fullWidth
                          color="primary"
                          type="submit"
                          disabled={isCreateDisable}
                        >
                          Create Campaign
                        <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                        </Button>
                        {this.state.isCreateCampaign != true
                          &&
                          <Typography variant="caption" color="error">
                            (You can't create campaign because it effects more than 100 students)
                        </Typography>
                        }
                      </Fragment>
                    )
                    : (userType == 'CLIENT' && campaignStatus == 0)
                    && (
                      <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        type="submit"
                        disabled={isCampaignName}
                      >
                        Update Campaign
                        <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                      </Button>
                    )
                }
              </Grid>
            </section>
          )}
        </form>
      </Paper >
    );
  }
}

CreateCampaign.propTypes = {
  classes: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  campaignStatus: PropTypes.number.isRequired,
  removeInfo: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  role: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const CreateCampaignReduxed = reduxForm({
  form: 'createCampaignForm',
  enableReinitialize: true,
})(CreateCampaign);

const reducer = 'ui';
const reducerA = 'Auth';
const reducerCampaign = 'campaign';

const mapDispatchToProps = dispatch => ({
  removeInfo: bindActionCreators(removeCampaignInfo, dispatch)
});

const CreateCampaignMapped = connect(
  state => ({
    deco: state.getIn([reducer, 'decoration']),
    userType: state.getIn([reducerA, 'userType']),
    warnMsg: state.getIn([reducerCampaign, 'warnMsg']),
    role: state.getIn([reducerCampaign, 'role']),
    name: state.getIn([reducerCampaign, 'name']),
    heading: state.getIn([reducerCampaign, 'heading']),
    body: state.getIn([reducerCampaign, 'body']),
    deadline: state.getIn([reducerCampaign, 'deadline']),
    campaignStatus: state.getIn([reducerCampaign, 'campaignStatus']),
  }),
  mapDispatchToProps
)(CreateCampaignReduxed);

export default withRouter(withStyles(styles)(CreateCampaignMapped));
