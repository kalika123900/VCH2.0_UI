import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowForward from '@material-ui/icons/ArrowForward';
import BulkEmailForm from './BulkEmailForm';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import styles from './user-jss';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Step1 from './BulkEmailSteps/Step1';
import Step2 from './BulkEmailSteps/Step2';
import Step3 from './BulkEmailSteps/Step3';
import Step4 from './BulkEmailSteps/Step4';
import Step5 from './BulkEmailSteps/Step5';
import Step6 from './BulkEmailSteps/Step6';


function getSteps() {
  return [
    'Select Role',
    'Define Your Needs',
    'Your Email',
    'Set Your Deadline',
    'View Recipients',
    'Review & Submit'
  ];
}

class CreateBulkEmail extends React.Component {
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
      deco,
      userType,
      role,
      heading,
      body,
      name,
      warnMsg,
      campaignStatus
    } = this.props;
    // const { tab } = this.state;

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
                  Select the role you would like to promote in this Bulk Email
                </Typography>
              </Grid>
              <section className={classes.pageFormWrap}>
                <Grid>
                  <FormControl style={{ width: '100%' }} className={(classes.formControl, classes.wrapInput)}>
                    <Step1 />
                  </FormControl>
                </Grid>
                <Grid className={classes.btnArea}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={() => this.handleNext()}
                    disabled={(role == -1 ? true : false)}
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
                  <Step2 />
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
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => this.handleNext()}
                // disabled={isDisable}
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
                Set Your Budget
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
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => this.handleNext()}
                >
                  Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
            </section>
          )}
          {activeStep === 4 && (
            <section>
              <Typography variant="h4" className={classes.title} gutterBottom>
                Review your Bulk Email settings
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
                  color="primary"
                  onClick={() => this.handleNext()}
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
                Review your Bulk Email settings
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
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                // type="submit"
                // disabled={isCampaignName}
                >
                  Create Bulk Email
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

CreateBulkEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const CreateBulkEmailReduxed = reduxForm({
  form: 'createBulkEmailForm',
  enableReinitialize: true,
})(CreateBulkEmail);

const reducer = 'ui';
const CreateBulkEmailMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(CreateBulkEmailReduxed);

export default withStyles(styles)(CreateBulkEmailMapped);
