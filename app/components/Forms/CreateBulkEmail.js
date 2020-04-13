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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styles from './user-jss';
import { makeSecureDecrypt } from 'dan-helpers/security';
import { bindActionCreators } from 'redux';
import { emailInfoRemove } from 'dan-actions/BulkEmailActions';
import { withRouter } from 'react-router';
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

class CreateBulkEmail extends React.Component {
  state = {
    activeStep: 0,
    isCreateBulkEmail: true
  };

  handleCreateBulkEmail = (count) => {
    if (count > 100) {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );

      if (user.managerType != 2) {
        if (user.capabilities == 2)
          this.setState({ isCreateBulkEmail: false });
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
      bulkEmailId: this.props.match.params.bulkEmailId
    };

    postJSON(`${API_URL}/bulkemail/reject-bulkemail`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          removeInfo();
          this.props.history.push('/admin');
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
      role,
      userType,
      heading,
      body,
      name
    } = this.props;

    const { activeStep } = this.state;
    const steps = getSteps();

    let isDisable = true;
    let isCreateDisable = true;
    if (heading.length > 0) {
      if (body.length > 0) {
        isDisable = false;
      }
    }
    if (name.length > 0) {
      if (this.state.isCreateBulkEmail) {
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
                  <Step3 bulkEmailId={this.props.match.params.bulkEmailId} />
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
                  <Step5 handleCreateBulkEmail={this.handleCreateBulkEmail} />
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
                  <Step6 bulkEmailId={this.props.match.params.bulkEmailId} />
                </FormControl>
              </Grid>
              <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                <Button variant="contained" fullWidth onClick={() => this.handleBack()}>
                  Back
                  <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </Grid>
              <Grid className={(classes.btnArea, classes.pageFormWrap)}>
                {
                  userType == 'ADMIN' &&
                  (
                    <Fragment>
                      <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                        <Button variant="contained" fullWidth color="primary" type="submit">
                          Approve Bulk Email
                          <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                        </Button>
                      </Grid>
                      <Grid className={(classes.btnArea, classes.customMargin, classes.pageFormWrap)}>
                        <Button variant="contained" fullWidth color="secondary" onClick={() => this.handleReject()}>
                          Reject Bulk Email
                          <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                        </Button>
                      </Grid>
                    </Fragment>
                  )
                }
                {
                  userType == 'CLIENT' &&
                  (
                    <Fragment>
                      <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        type="submit"
                        disabled={isCreateDisable}
                      >
                        Create Bulk Email
                        <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                      </Button>
                      {this.state.isCreateBulkEmail != true
                        &&
                        <Typography variant="caption" color="error">
                          (You can't create bulk email because it effects more than 100 students)
                        </Typography>
                      }
                    </Fragment>
                  )
                }
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
  handleSubmit: PropTypes.func.isRequired,
  removeInfo: PropTypes.func.isRequired,
  role: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const CreateBulkEmailReduxed = reduxForm({
  form: 'createBulkEmailForm',
  enableReinitialize: true,
})(CreateBulkEmail);

const reducer = 'ui';
const reducerA = 'Auth';
const reducerBulkEmail = 'bulkEmail';

const mapDispatchToProps = dispatch => ({
  removeInfo: bindActionCreators(emailInfoRemove, dispatch)
});

const CreateBulkEmailMapped = connect(
  state => ({
    deco: state.getIn([reducer, 'decoration']),
    userType: state.getIn([reducerA, 'userType']),
    role: state.getIn([reducerBulkEmail, 'role']),
    name: state.getIn([reducerBulkEmail, 'name']),
    heading: state.getIn([reducerBulkEmail, 'heading']),
    body: state.getIn([reducerBulkEmail, 'body']),
  }),
  mapDispatchToProps
)(CreateBulkEmailReduxed);

export default withRouter(withStyles(styles)(CreateBulkEmailMapped));
