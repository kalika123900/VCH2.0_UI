import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
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
import styles from './user-jss';
import Step2 from './CampaignSteps/Step2';
import Step3 from './CampaignSteps/Step3';
import Step4 from './CampaignSteps/Step4';
import Step5 from './CampaignSteps/Step5';
import Step6 from './CampaignSteps/Step6';

function getSteps() {
  return [
    'Business & Audience',
    'Define Product or Service',
    'Your Ad',
    'Set Your Budget',
    'Review Settings'
  ];
}

class CreateCampaign extends React.Component {
  state = {
    activeStep: 0,
  };

  handleBack = () => {
    this.setState((prevState) => ({ activeStep: prevState.activeStep - 1 }));
  }

  handleNext = () => {
    this.setState((prevState) => ({ activeStep: prevState.activeStep + 1 }));
  }

  render() {
    const {
      classes,
      pristine,
      handleSubmit,
      submitting,
      deco
    } = this.props;
    const { activeStep } = this.state;
    const steps = getSteps();

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
                  Select which role you are trying to promote
                </Typography>
              </Grid>
              <section className={classes.pageFormWrap}>
                <Grid>
                  <FormControl style={{ width: '100%' }} className={(classes.formControl, classes.wrapInput)}>
                    <Step2 />
                  </FormControl>
                </Grid>
                <Grid className={classes.btnArea}>
                  <Button variant="contained" fullWidth color="primary" onClick={() => this.handleNext()}>
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
                Let&apos;s write your ad
              </Typography>
              <Grid>
                <FormControl className={(classes.formControl, classes.wrapInput)}>
                  <Step4 />
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
          {activeStep === 3 && (
            <section>
              <Typography variant="h4" className={classes.title} gutterBottom>
                Set Your Budget
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
                <Button variant="contained" fullWidth color="primary" onClick={() => this.handleNext()}>
                  Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
            </section>
          )}
          {activeStep === 4 && (
            <section>
              <Typography variant="h4" className={classes.title} gutterBottom>
                Review your campaign settings
              </Typography>
              <Grid>
                <FormControl className={(classes.formControl, classes.wrapInput)}>
                  <Step6 />
                </FormControl>
              </Grid>
              <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                <Button variant="contained" fullWidth onClick={() => this.handleBack()}>
                  Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
              <Grid className={(classes.btnArea, classes.pageFormWrap)}>
                <Button variant="contained" fullWidth color="primary" type="submit">
                  Create Campaign
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                </Button>
              </Grid>
            </section>
          )}
        </form>
      </Paper>
    );
  }
}

CreateCampaign.propTypes = {
  classes: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const CreateCampaignReduxed = reduxForm({
  form: 'createCampaignForm',
  enableReinitialize: true,
})(CreateCampaign);

const reducer = 'ui';
const CreateCampaignMapped = connect(
  state => ({
    deco: state.getIn([reducer, 'decoration'])
  }),
)(CreateCampaignReduxed);

export default withStyles(styles)(CreateCampaignMapped);