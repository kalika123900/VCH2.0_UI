// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
// import { connect } from 'react-redux';
// import { reduxForm } from 'redux-form/immutable';
// import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
// import Typography from '@material-ui/core/Typography';
// import ArrowForward from '@material-ui/icons/ArrowForward';
// import ArrowBack from '@material-ui/icons/ArrowBack';
// import Grid from '@material-ui/core/Grid'
// import styles from './user-jss';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Divider from '@material-ui/core/Divider';
// import Step2 from './CampaignSteps/Step2';
// import Step3 from './BulkEmailSteps/Step3';
// import Step4 from './BulkEmailSteps/Step4';
// import Step5 from './CampaignSteps/Step5';
// import Step6 from './BulkEmailSteps/Step6';
// import Step7 from './BulkEmailSteps/Step7';
// import AddRole from './AddRole';

// function getSteps() {
//   return [
//     'Business & Audience',
//     'Define Product or Service',
//     'Your Email',
//     'Set Your Budget',
//     'View Recipients',
//     'Review & Submit'
//   ];
// }

// class BulkEmailForm extends React.Component {
//   state = {
//     activeStep: 0,
//     open: false,
//   };

//   handleClickOpen = (e) => {
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   handleBack = (e) => {
//     let value = this.state.activeStep - 1;
//     this.setState({ activeStep: value });
//   }

//   handleNext = (e) => {
//     let value = this.state.activeStep + 1;
//     this.setState({ activeStep: value });
//   }

//   render() {
//     const {
//       classes,
//       handleSubmit,
//     } = this.props;
//     const { activeStep } = this.state;
//     const steps = getSteps();
//     return (
//       <div>
//         <AddRole open={this.state.open} handleClose={this.handleClose} />
//         <Stepper activeStep={activeStep} alternativeLabel={true}>
//           {steps.map((label) => {
//             return (
//               <Step key={label} >
//                 <StepLabel >{label}</StepLabel>
//               </Step>
//             );
//           })}
//         </Stepper>
//         {activeStep === 0 && (
//           <section className={classes.pageFormWrap}>
//             <Typography variant="h4" className={classes.title} gutterBottom>
//               What bussiness do you want to advertise?
//             </Typography>
//             <form >
//               <Grid >
//                 <FormControl className={classes.formControl, classes.wrapInput}>
//                   <Step2 />
//                 </FormControl>
//               </Grid>
//               <Divider />
//               <Button color="secondary" onClick={(e) => this.handleClickOpen(e)} >Create New Role</Button>
//               <Grid className={classes.btnArea, classes.customMargin}>
//                 <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleNext(e)}>
//                   Next
//                   <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//             </form>
//           </section>
//         )}
//         {activeStep === 1 && (
//           <section >
//             <Typography variant="h4" className={classes.title} gutterBottom>
//               Define your product or service
//             </Typography>
//             <form>
//               <Grid>
//                 <FormControl className={classes.formControl, classes.wrapInput}>
//                   <Step3 />
//                 </FormControl>
//               </Grid>
//               <Grid className={classes.btnArea, classes.customMargin, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth onClick={(e) => this.handleBack(escape)}>
//                   Back
//                   <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//               <Grid className={classes.btnArea, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleNext(e)}>
//                   Next
//                   <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//             </form>
//           </section>
//         )}
//         {activeStep === 2 && (
//           <section >
//             <Typography variant="h4" className={classes.title} gutterBottom>
//               Let's write your e-mail
//             </Typography>
//             <form >
//               <Grid>
//                 <FormControl className={classes.formControl, classes.wrapInput}>
//                   <Step4 />
//                 </FormControl>
//               </Grid>
//               <Grid className={classes.btnArea, classes.customMargin, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth onClick={(e) => this.handleBack(e)}>
//                   Back
//                   <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//               <Grid className={classes.btnArea, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleNext(e)}>
//                   Next
//                   <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//             </form>
//           </section>
//         )}
//         {activeStep === 3 && (
//           <section >
//             <Typography variant="h4" className={classes.title} gutterBottom>
//               Set Your Budget
//             </Typography>
//             <form>
//               <Grid>
//                 <FormControl className={classes.formControl, classes.wrapInput}>
//                   <Step5 />
//                 </FormControl>
//               </Grid>
//               <Grid className={classes.btnArea, classes.customMargin, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth onClick={(e) => this.handleBack(e)}>
//                   Back
//                   <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//               <Grid className={classes.btnArea, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleNext(e)}>
//                   Next
//                   <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//             </form>
//           </section>
//         )}
//         {activeStep === 4 && (
//           <section>
//             <Typography variant="h4" className={classes.title} gutterBottom>
//               View Recipients
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid>
//                 <FormControl className={classes.formControl, classes.wrapInput}>
//                   <Step6 />
//                 </FormControl>
//               </Grid>
//               <Grid className={classes.btnArea, classes.customMargin, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth onClick={(e) => this.handleBack(e)}>
//                   Back
//                   <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//               <Grid className={classes.btnArea, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleNext(e)}>
//                   Next
//                   <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//             </form>
//           </section>
//         )}
//         {activeStep === 5 && (
//           <section>
//             <Typography variant="h4" className={classes.title} gutterBottom>
//               Review & Submit
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid>
//                 <FormControl className={classes.formControl, classes.wrapInput}>
//                   <Step7 />
//                 </FormControl>
//               </Grid>
//               <Grid className={classes.btnArea, classes.customMargin, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth onClick={(e) => this.handleBack(e)}>
//                   Back
//                   <ArrowBack className={classNames(classes.rightIcon, classes.iconSmall)} />
//                 </Button>
//               </Grid>
//               <Grid className={classes.btnArea, classes.pageFormWrap}>
//                 <Button variant="contained" fullWidth color="primary">
//                   Create Bulk Email
//                 </Button>
//               </Grid>
//             </form>
//           </section>
//         )}
//       </div>
//     );
//   }
// }

// BulkEmailForm.propTypes = {
//   classes: PropTypes.object.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   pristine: PropTypes.bool.isRequired,
//   submitting: PropTypes.bool.isRequired,
//   deco: PropTypes.bool.isRequired,
// };

// const BulkEmailFormReduxed = reduxForm({
//   form: 'immutableExample',
//   enableReinitialize: true,
// })(BulkEmailForm);

// const reducer = 'ui';
// const BulkEmailFormMapped = connect(
//   state => ({
//     force: state,
//     deco: state.getIn([reducer, 'decoration'])
//   }),
// )(BulkEmailFormReduxed);

// export default withStyles(styles)(BulkEmailFormMapped);
