import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Icon from '@material-ui/core/Icon';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.png';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';
import FlashMessage from 'react-flash-message';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import OpenAuth from './Openauth';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);
const name = value => (
  value && !/^[a-z ,.' -]+$/i.test(value)
    ? 'Invalid name'
    : undefined
)
const text = value => (
  value && !/^[A-Za-z]+$/i.test(value)
    ? 'Must be a Alphabet'
    : undefined
);

const minPasswordLength = minLength(8);
const maxPasswordLength = maxLength(15);
const minTextLength = minLength(3);
const maxTextLength = maxLength(30);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

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

// eslint-disable-next-line
class StudentSignupForm extends React.Component {
  state = {
    showPassword: false,
  };

  Message = () => {
    setTimeout(() => {
      this.props.handleFlash();
    }, 4000)
    return (
      <FlashMessage duration={4000}>
        <Typography variant="subtitle1" color="error">
          {this.props.errorMessage}
        </Typography>
      </FlashMessage>
    )
  }

  handleSuccess = async (data) => {
    if (data.provider == 'facebook') {
      this.props.handleOauth(data)
    }
  }

  handleFailure = (data) => {
    console.log(data);
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
      <Paper className={classNames(classes.fullWrap, deco && classes.petal, classes.customWrap)} >
        <div className={classNames(classes.customTopBar, classes.topBar)}>
          <NavLink to="/" className={classes.brand}>
            <img style={{ width: "70px" }} src={logo} alt={brand.name} />
          </NavLink>
          <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/student-signin">
            <Icon className={classes.icon}>arrow_forward</Icon>
            Already have account ?
          </Button>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Register
        </Typography>
        <section className={classes.pageFormWrap} style={{ padding: 24 }}>
          {this.props.flash && this.Message()}
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="firstname"
                  component={renderField}
                  placeholder="First Name"
                  label="First Name"
                  required
                  validate={[required, name]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="lastname"
                  component={renderField}
                  placeholder="Last Name"
                  label="Last Name"
                  required
                  validate={[required, name]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="email"
                  component={renderField}
                  placeholder="Your Email"
                  label="Your Email"
                  required
                  validate={[required, email]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={renderField}
                  type={showPassword ? 'text' : 'password'}
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
            </div>
            <div style={{ textAlign: 'justify', padding: 10 }}>
              <FormControlLabel
                control={(
                  <Field
                    name="agree"
                    component={CheckboxRedux}
                    required
                    className={classes.agree}
                  />
                )}
                label="Accept Our T&Cs"
              />
              <Typography variant="body2" color="textSecondary">I agree to Varsity Careers Hub's Terms of Use and particularly to VCH's Privacy Policy</Typography>
              <Link onClick={e => window.open("https://res.cloudinary.com/dp21wbaku/image/upload/v1590394789/VCH2.0/terms-and-conditions_eeiju9.pdf")} className={classes.link}>Terms &amp; Conditions</Link>
            </div>
            <div style={{ textAlign: 'justify', padding: 10 }}>
              <FormControlLabel
                control={(
                  <Field
                    name="isEmployersContact"
                    component={CheckboxRedux}
                    required
                    className={classes.agree}
                  />
                )}
                label="Allow Employers to contact you and to view your CV and Personal data"
              />
              <Typography variant="body2" color="textSecondary">I consent to my personal information and CV being used and shared by Varsity Careers Hub to match me with career opportunities and to be contacted either by Varsity Careers Hub or potential employers, please find full details in the Terms of Use.</Typography>
            </div>
            <div style={{ textAlign: 'justify', padding: 10 }}>
              <FormControlLabel
                control={(
                  <Field
                    name="isVCHContact"
                    component={CheckboxRedux}
                    required
                    className={classes.agree}
                  />
                )}
                label="Allow Varsity Careers Hub to contact you"
              />
              <Typography variant="body2" color="textSecondary">I consent to receive event invites, employers news , Varsity Careers Hub updates and handy hints to help me along my career journey</Typography>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" fullWidth color="primary" type="submit">
                Continue
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
              </Button>
            </div>
          </form>
        </section>
        <div className={classes.lineCont}>
          <span className={classes.circleArea}> OR </span>
        </div>
        <Grid>
          <div className={classes.btnArea}>
            <OpenAuth type="linkedin" />
          </div>
          <div className={classes.btnArea}>
            <OpenAuth
              handleSuccess={this.handleSuccess}
              handleFailure={this.handleFailure}
              type="facebook"
            />
          </div>
        </Grid>
      </Paper>
    );
  }
}

StudentSignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired
};

const StudentSignupFormReduxed = reduxForm({
  form: 'studentSignup',
  enableReinitialize: true
})(StudentSignupForm);

const reducerUi = 'ui';
const StudentSignupFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducerUi, 'decoration'])
  }),
)(StudentSignupFormReduxed);

export default withStyles(styles)(StudentSignupFormMapped);
