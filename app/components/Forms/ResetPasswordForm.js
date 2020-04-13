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
import IconButton from '@material-ui/core/IconButton';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minPasswordLength = minLength(8);
const maxPasswordLength = maxLength(15);
const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

const renderField = (props) => {

  const { input, label, meta, ...custom } = props;
  const { touched, error, warning } = meta;
  return (<Fragment>
    <TextFieldRedux
      {...props}
    />
    {
      touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))
    }
  </Fragment>
  )
}

class ResetForm extends React.Component {
  state = {
    showPassword: false,
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };


  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
      success
    } = this.props;
    const { showPassword } = this.state;
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
              Set New Password
            </Typography>
            <section className={classes.formWrap}>
              <form onSubmit={handleSubmit}>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="password"
                      component={renderField}
                      type={showPassword ? 'text' : 'password'}
                      label="New Password"
                      required
                      validate={[required, passwordsMatch, minPasswordLength, maxPasswordLength]}
                      className={classes.field}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="passwordConfirm"
                      component={renderField}
                      type="password"
                      label="Re-type Password"
                      required
                      validate={[required, passwordsMatch]}
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div className={classes.btnArea}>
                  <Button variant="contained" color="primary" type="submit">
                    Set Password
                   <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                  </Button>
                </div>
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
