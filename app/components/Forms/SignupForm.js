import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Icon from '@material-ui/core/Icon';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.png';
import FlashMessage from 'react-flash-message';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);
const text = value => (
  value && !/^[A-Za-z]+$/i.test(value)
    ? 'Must be a Alphabet'
    : undefined
);
const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

const minPasswordLength = minLength(8);
const maxPasswordLength = maxLength(15);
const minTextLength = minLength(3);
const maxTextLength = maxLength(20);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

const renderField = (props) => {
  const {
    input, label, meta, ...custom
  } = props;
  const { touched, error, warning } = meta;
  return (
    <Fragment>
      <TextFieldRedux
        margin="normal"
        {...props}
      />
      {
        touched
        && ((error && <span>{error}</span>)
          || (warning && <span>{warning}</span>))
      }
    </Fragment>
  );
};

// eslint-disable-next-line
class SignupForm extends React.Component {
  state = {
    showPassword: false,
  };

  Message = () => {
    setTimeout(() => {
      this.props.handleFlash();
    }, 4000);
    return (
      <FlashMessage duration={4000}>
        <Typography variant="subtitle1" color="error">
          {this.props.errorMessage}
        </Typography>
      </FlashMessage>
    );
  }

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
      deco
    } = this.props;
    const { showPassword } = this.state;
    return (
      <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
        {/* <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img style={{ width: '70px' }} src={logo} alt={brand.name} />
          </NavLink>
          <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/signin">
            <Icon className={classes.icon}>arrow_forward</Icon>
            Already have account ?
          </Button>
        </div> */}
        <Typography variant="h4" className={classes.title} gutterBottom>
          Create Client Token
        </Typography>
        <section className={classes.pageFormWrap}>
          {this.props.flash && this.Message()}
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="firstname"
                  component={renderField}
                  placeholder="Client First Name"
                  label="Client First Name"
                  required
                  className={classes.field}
                  validate={[minTextLength, maxTextLength, text]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="lastname"
                  component={renderField}
                  placeholder="Client Last Name"
                  label="Client Last Name"
                  required
                  className={classes.field}
                  validate={[minTextLength, maxTextLength, text]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="username"
                  component={renderField}
                  placeholder="Client Username"
                  label="Client Username"
                  required
                  className={classes.field}
                  validate={[minTextLength, maxTextLength]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="email"
                  component={renderField}
                  placeholder="Client Email"
                  label="Client Email"
                  required
                  validate={[required, email]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            {/* <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={renderField}
                  type="password"
                  label="Your Password"
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
            </div> */}
            {/* <div>
              <FormControlLabel
                control={(
                  <Field name="checkbox" component={CheckboxRedux} required className={classes.agree} />
                )}
                label="Agree with"
              />
              <a href="#" className={classes.link}>Terms &amp; Condition</a>
            </div> */}
            <div className={classes.btnArea}>
              <Button variant="contained" fullWidth color="primary" type="submit">
                Create
                {/* <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} /> */}
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const SignupFormReduxed = reduxForm({
  form: 'clientSignupForm',
  enableReinitialize: true,
})(SignupForm);

const reducer = 'ui';
const SignupFormMapped = connect(
  state => ({
    deco: state.getIn([reducer, 'decoration'])
  }),
)(SignupFormReduxed);

export default withStyles(styles)(SignupFormMapped);
