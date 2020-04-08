import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
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
    firstname: '',
    lastname: '',
    password: '',
    passwordConfirm: '',
    username: '',
    email: '',
    cName: '',
    cEmail: '',
    cPhone: '',
    cHeadquarter: ''
  };

  componentDidMount() {
    this.setState({
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      username: this.props.username,
      email: this.props.useremail,
      cName: this.props.cName,
      cEmail: this.props.cEmail,
      cPhone: this.props.cPhone,
      cHeadquarter: this.props.cHeadquarter,
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

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

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  }

  render() {
    const {
      classes,
      handleSubmit,
      deco
    } = this.props;
    const { showPassword, firstname, lastname, password, passwordConfirm, username, email, cName, cEmail, cPhone, cHeadquarter } = this.state;
    return (
      <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img style={{ width: '70px' }} src={logo} alt={brand.name} />
          </NavLink>
          <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/signin">
            <Icon className={classes.icon}>arrow_forward</Icon>
            Already have account ?
          </Button>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Create account
        </Typography>
        <section className={classes.pageFormWrap}>
          {this.props.flash && this.Message()}
          <form onSubmit={(e) => this.handleSubmitForm(e)}>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="firstname"
                  value={firstname}
                  // defaultValue={this.props.firstname}
                  placeholder="First Name"
                  label="First Name"
                  required
                  validate={[minTextLength, maxTextLength, text]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="lastname"
                  value={lastname}
                  // defaultValue={this.props.lastname}
                  placeholder="Last Name"
                  label="Last Name"
                  required
                  validate={[minTextLength, maxTextLength, text]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="username"
                  value={username}
                  // defaultValue={this.props.username}
                  placeholder="Username"
                  label="Username"
                  required
                  onChange={(e) => { this.handleChange(e) }}
                  validate={[minTextLength, maxTextLength]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="email"
                  value={email}
                  // defaultValue={this.props.useremail}
                  placeholder="Email"
                  label="Email"
                  required
                  validate={[required, email]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="cName"
                  value={cName}
                  placeholder="Company Name"
                  label="Company Name"
                  required
                  validate={[minTextLength, maxTextLength]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="cPhone"
                  value={cPhone}
                  placeholder="Company Phone"
                  label="Company Phone"
                  required
                  validate={[minTextLength, maxTextLength]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="cEmail"
                  value={cEmail}
                  placeholder="Company Email"
                  label="Company Email"
                  required
                  validate={[required, email]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="cHeadquarter"
                  value={cHeadquarter}
                  placeholder="Company Headquarter"
                  label="Company Headquarter"
                  required
                  validate={[required]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  name="password"
                  value={password}
                  type="password"
                  label="Your Password"
                  required
                  validate={[required, passwordsMatch, minPasswordLength, maxPasswordLength]}
                  onChange={(e) => { this.handleChange(e) }}
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
                <TextField
                  name="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  label="Re-type Password"
                  required
                  validate={[required, passwordsMatch]}
                  onChange={(e) => { this.handleChange(e) }}
                />
              </FormControl>
            </div>
            {/* <div>
              <FormControlLabel
                control={(
                  <TextField name="checkbox" component={CheckboxRedux} required className={classes.agree} />
                )}
                label="Agree with"
              />
              <a href="#" className={classes.link}>Terms &amp; Condition</a>
            </div> */}
            <div className={classes.btnArea}>
              <Button variant="contained" fullWidth color="primary" type="submit">
                Continue
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
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
  deco: PropTypes.bool.isRequired,
};

const reducer = 'ui';
const SignupFormMapped = connect(
  state => ({
    deco: state.getIn([reducer, 'decoration'])
  }),
)(SignupForm);

export default withStyles(styles)(SignupFormMapped);
