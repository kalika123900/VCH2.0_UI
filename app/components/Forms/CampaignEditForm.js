import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid'
import styles from './user-jss';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import EditStep1 from './CampaignSteps/EditStep1';
import EditStep2 from './CampaignSteps/EditStep2';
import EditStep3 from './CampaignSteps/EditStep3';
import EditStep4 from './CampaignSteps/EditStep4';
import EditStep5 from './CampaignSteps/EditStep5';
import AddRole from './AddRole';
import Divider from '@material-ui/core/Divider';

function getSteps() {
  return [
    'Business & Audience',
    'Define Product or Service',
    'Change Your Ad',
    'Set Your Budget',
    'Save Changes'
  ];
}

class CampaignForm extends React.Component {
  state = {
    activeStep: 0,
    open: false,
  };

  handleBack = (e) => {
    let value = this.state.activeStep - 1;
    this.setState({ activeStep: value });
  }

  handleNext = (e) => {
    let value = this.state.activeStep + 1;
    this.setState({ activeStep: value });
  }

  handleClickOpen = (e) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const {
      classes,
      handleSubmit,
      deco
    } = this.props;
    const { activeStep } = this.state;
    const steps = getSteps();
    return (
      <div>
        <AddRole open={this.state.open} handleClose={this.handleClose} />
        <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
          <Stepper activeStep={activeStep} alternativeLabel={true}>
            {steps.map((label) => {
              return (
                <Step key={label} >
                  <StepLabel >{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <section className={classes.pageFormWrap}>
              <Typography variant="h4" className={classes.title} gutterBottom>
                What bussiness do you want to advertise?
            </Typography>
              <form >
                <Grid >
                  <FormControl className={classes.formControl, classes.wrapInput}>
                    <EditStep1 />
                  </FormControl>
                </Grid>
                <Divider />
                <Button color="secondary" onClick={(e) => this.handleClickOpen(e)} >Create New Role</Button>
                <Grid className={classes.btnArea, classes.customMargin}>
                  <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleNext(e)}>
                    Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </Grid>
              </form>
            </section>
          )}
          {activeStep === 1 && (
            <section >
              <Typography variant="h4" className={classes.title} gutterBottom>
                Define your product or service
            </Typography>
              <form>
                <Grid>
                  <FormControl className={classes.formControl, classes.wrapInput}>
                    <EditStep2 />
                  </FormControl>
                </Grid>
                <Grid className={classes.btnArea, classes.customMargin, classes.pageFormWrap}>
                  <Button variant="contained" fullWidth onClick={(e) => this.handleBack(escape)}>
                    Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </Grid>
                <Grid className={classes.btnArea, classes.pageFormWrap}>
                  <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleNext(e)}>
                    Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </Grid>
              </form>
            </section>
          )}
          {activeStep === 2 && (
            <section >
              <Typography variant="h4" className={classes.title} gutterBottom>
                Let's write your ad
            </Typography>
              <form >
                <Grid>
                  <FormControl className={classes.formControl, classes.wrapInput}>
                    <EditStep3 />
                  </FormControl>
                </Grid>
                <Grid className={classes.btnArea, classes.customMargin, classes.pageFormWrap}>
                  <Button variant="contained" fullWidth onClick={(e) => this.handleBack(e)}>
                    Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </Grid>
                <Grid className={classes.btnArea, classes.pageFormWrap}>
                  <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleNext(e)}>
                    Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </Grid>
              </form>
            </section>
          )}
          {activeStep === 3 && (
            <section >
              <Typography variant="h4" className={classes.title} gutterBottom>
                Set Your Budget
            </Typography>
              <form>
                <Grid>
                  <FormControl className={classes.formControl, classes.wrapInput}>
                    <EditStep4 />
                  </FormControl>
                </Grid>
                <Grid className={classes.btnArea, classes.customMargin, classes.pageFormWrap}>
                  <Button variant="contained" fullWidth onClick={(e) => this.handleBack(e)}>
                    Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </Grid>
                <Grid className={classes.btnArea, classes.pageFormWrap}>
                  <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleNext(e)}>
                    Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </Grid>
              </form>
            </section>
          )}
          {activeStep === 4 && (
            <section>
              <Typography variant="h4" className={classes.title} gutterBottom>
                Review your campaign settings
            </Typography>
              <form onSubmit={handleSubmit}>
                <Grid>
                  <FormControl className={classes.formControl, classes.wrapInput}>
                    <EditStep5 />
                  </FormControl>
                </Grid>
                <Grid className={classes.btnArea, classes.customMargin, classes.pageFormWrap}>
                  <Button variant="contained" fullWidth onClick={(e) => this.handleBack(e)}>
                    Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </Grid>
                <Grid className={classes.btnArea, classes.pageFormWrap}>
                  <Button variant="contained" fullWidth color="primary" >
                    Save Changes & Submit
                </Button>
                </Grid>
              </form>
            </section>
          )}
        </Paper>
      </div>
    );
  }
}

CampaignForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  deco: PropTypes.bool.isRequired,
};

const CampaignFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(CampaignForm);

const reducer = 'ui';
const CampaignFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(CampaignFormReduxed);

export default withStyles(styles)(CampaignFormMapped);