import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.png';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Grid } from '@material-ui/core';
import FlashMessage from 'react-flash-message';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import styles from './user-jss';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class StudentSigninForm extends React.Component {
  state = {
    showPassword: false
  }

  Message = () => {
    const { handleFlash } = this.props;
    const { errorMessage } = this.props;
    setTimeout(() => {
      handleFlash();
    }, 4000);
    return (
      <FlashMessage duration={4000}>
        <Typography variant="subtitle1" color="error">
          {errorMessage}
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
      deco,
      flash
    } = this.props;
    const { showPassword } = this.state;
    return (
      <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img style={{ width: '70px' }} src={logo} alt={brand.name} />
          </NavLink>
          <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/student-signup">
            <Icon className={classes.icon}>arrow_forward</Icon>
            Create new account
          </Button>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Sign In
        </Typography>
        <section className={classes.pageFormWrap}>
          {flash && this.Message()}
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="username"
                  component={TextFieldRedux}
                  placeholder="Email or Username"
                  label="Email or Username"
                  required
                  validate={[required]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type={showPassword ? 'text' : 'password'}
                  label="Your Password"
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
                  required
                  validate={required}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div className={classes.optArea}>
              <FormControlLabel className={classes.label} control={<Field name="checkbox" component={CheckboxRedux} />} label="Remember" />
              <Button size="small" component={LinkBtn} to="/reset-password" className={classes.buttonLink}>Forgot Password</Button>
            </div>
            <div className={(classes.btnArea, classes.customMargin)}>
              <Button variant="contained" fullWidth color="primary" size="large" type="submit">
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
            <Button
              variant="contained"
              fullWidth
              size="small"
              style={{
                background: '#2d72b0',
                color: ' white',
              }}
            >
              <LinkedInIcon style={{ marginRight: '10px' }} />
              Continue with LinkedIn
            </Button>
          </div>
          <div className={classes.btnArea}>
            <Button
              variant="contained"
              fullWidth
              size="small"
              style={{
                background: '#4267b2',
                color: ' white'
              }}
            >
              <FacebookIcon style={{ marginRight: '10px' }} />
              Continue with Facebook
            </Button>
          </div>
        </Grid>
      </Paper>
    );
  }
}

StudentSigninForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  flash: PropTypes.bool.isRequired,
  handleFlash: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const StudentSigninFormReduxed = reduxForm({
  form: 'student-signin',
  enableReinitialize: true,
})(StudentSigninForm);

const reducerUi = 'ui';
const FormInit = connect(
  state => ({
    force: state,
    deco: state.getIn([reducerUi, 'decoration'])
  }),
)(StudentSigninFormReduxed);

export default withStyles(styles)(FormInit);