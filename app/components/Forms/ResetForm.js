import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.png';
import CircularProgress from '../Loading/CircularProgress';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

class ResetForm extends React.Component {
  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
      success,
      isProgress
    } = this.props;
    return (
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} style={{ width: 80 }} />
          </NavLink>
        </div>
        {success == false
          ?
          <Fragment>
            <Typography variant="h4" className={classes.title} gutterBottom>
              Reset Password
            </Typography>
            <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
              Send reset password link to Your email
            </Typography>
            <section className={classes.formWrap}>
              <form onSubmit={handleSubmit}>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="email"
                      component={TextFieldRedux}
                      placeholder="Your Email"
                      label="Your Email"
                      required
                      validate={[required, email]}
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                {!isProgress ?
                  <div className={classes.btnArea}>
                    <Button variant="contained" color="primary" type="submit">
                      Send Reset Link
                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                    </Button>
                  </div>
                  :
                  <div>
                    <CircularProgress />
                  </div>
                }
              </form>
            </section>
          </Fragment>
          :
          <Fragment>
            <Typography color="secondary" variant="h6" style={{ padding: '25px 25px 25px 25px' }}>
              Please! Check your email we send you an email if user exist with this email
          </Typography>
            <NavLink to="/" className={classes.brand}>
              <Button variant="contained" color="primary">
                Go Back
                {/* <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} /> */}
              </Button>
            </NavLink>
          </Fragment>
        }
      </Paper>
    );
  }
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const ResetFormReduxed = reduxForm({
  form: 'immutableEResetFrm',
  enableReinitialize: true,
})(ResetForm);

const reducer = 'ui';
const RegisterFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(ResetFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
