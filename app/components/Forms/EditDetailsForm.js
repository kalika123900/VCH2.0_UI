import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import styles from './user-jss';
import TextField from '@material-ui/core/TextField';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);


class EditDetailsForm extends React.Component {
  state = {
    firstName: "Lorem Ipsum",
    lastName: 'Ipsum',
    userEmail: "abc@gmail.com",
    phone: '+918545754965',
    username: 'jhon@123',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {
      classes,
      handleSubmit,
      deco
    } = this.props;
    const { firstName, lastName, userEmail, phone, username } = this.state;
    return (
      <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
        <section className={classes.pageFormWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  label="First Name"
                  className={classes.textField}
                  type="text"
                  name="firstName"
                  margin="normal"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => this.handleChange(e)}
                  validate={[required]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Last Name"
                  className={classes.textField}
                  type="text"
                  name="lastName"
                  margin="normal"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => this.handleChange(e)}
                  validate={[required]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Username"
                  className={classes.textField}
                  type="text"
                  name="username"
                  margin="normal"
                  variant="outlined"
                  value={username}
                  onChange={(e) => this.handleChange(e)}
                  validate={[required]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="userEmail"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  value={userEmail}
                  onChange={(e) => this.handleChange(e)}
                  validate={[required, email]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Phone Number"
                  className={classes.textField}
                  type="phone"
                  autoComplete="phone"
                  name="phone"
                  margin="normal"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => this.handleChange(e)}
                  validate={[required]}
                />
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" fullWidth color="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

EditDetailsForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  deco: PropTypes.bool.isRequired,
};

const EditDetailsFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(EditDetailsForm);

const reducer = 'ui';
const EditDetailsFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(EditDetailsFormReduxed);

export default withStyles(styles)(EditDetailsFormMapped);
