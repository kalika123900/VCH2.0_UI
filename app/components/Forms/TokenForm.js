import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import FlashMessage from 'react-flash-message';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';
import avatarApi from 'dan-api/images/avatars';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

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

const minTextLength = minLength(3);
const maxTextLength = maxLength(20);

const renderField = (props) => {
  const {
    input, label, meta, ...custom
  } = props;
  const { touched, error, warning } = meta;
  return (
    <Fragment>
      <TextFieldRedux
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
    showPassword: false
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  componentDidUpdate() {
    if (this.state.logo != null) {
      this.handleChangeLogo()
    }
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
      cLogo,
      logo
    } = this.props;
    const { showPassword } = this.state;
    return (
      <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Create Client Token
        </Typography>
        <section className={classes.pageFormWrap}>
          <form onSubmit={handleSubmit}>
            <div className={classes.row}>
              <IconButton>
                <Avatar
                  alt="company logo"
                  src={(cLogo == '' || cLogo == null) ? avatarApi[7] : cLogo}
                  className={classes.avatar}
                  style={{
                    width: '103px',
                    display: 'inline-block',
                    height: 'auto',
                  }}
                />
              </IconButton>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <label for="company-logo" className={classes.customFileUpload}>
                  {logo == null ? 'Choose Company Logo' : logo.name}
                </label>
                <input
                  id="company-logo"
                  name="logo"
                  type="file"
                  onChange={this.props.handleFileChange}
                  style={{ display: 'none' }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="cName"
                  component={renderField}
                  placeholder="Company Name"
                  label="Company Name"
                  required
                  className={classes.field}
                  validate={[minTextLength, maxTextLength]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="cPhone"
                  component={renderField}
                  placeholder="Company Phone"
                  label="Company Phone"
                  required
                  className={classes.field}
                  validate={[minTextLength, maxTextLength]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="cEmail"
                  component={renderField}
                  placeholder="Company Email"
                  label="Company Email"
                  required
                  validate={[required, email]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="cHeadquarter"
                  component={renderField}
                  placeholder="Company Headquarter"
                  label="Company Headquarter"
                  required
                  validate={[required]}
                  className={classes.field}
                />
              </FormControl>
            </div>
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
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="phone"
                  component={renderField}
                  placeholder="Client Phone"
                  label="Client Phone"
                  required
                  className={classes.field}
                  validate={[minTextLength, maxTextLength]}
                />
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" fullWidth color="primary" type="submit">
                Create
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
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
