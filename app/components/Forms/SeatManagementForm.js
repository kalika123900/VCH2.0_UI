import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import { TextFieldRedux } from './ReduxFormMUI';
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
class SeatManagementForm extends React.Component {
  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco
    } = this.props;
    return (
      <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Create Seat Token
        </Typography>
        <section className={classes.pageFormWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="firstname"
                  component={renderField}
                  placeholder="First Name"
                  label="First Name"
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
                  placeholder="Last Name"
                  label="Last Name"
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
                  placeholder="Username"
                  label="Username"
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
                  placeholder="Email"
                  label="Email"
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
                  placeholder="Phone"
                  label="Phone"
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

SeatManagementForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const SeatManagementFormReduxed = reduxForm({
  form: 'SeatManagementForm',
  enableReinitialize: true,
})(SeatManagementForm);

const reducer = 'ui';
const SeatManagementFormMapped = connect(
  state => ({
    deco: state.getIn([reducer, 'decoration'])
  }),
)(SeatManagementFormReduxed);

export default withStyles(styles)(SeatManagementFormMapped);
