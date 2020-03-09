import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import styles from './user-jss';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

// eslint-disable-next-line
class SeatManagementForm extends React.Component {
  state = {
    username: '',
    level: [
      { id: 1, status: false, value: 'super', label: 'Super User' },
      { id: 2, status: false, value: 'sub-admin', label: 'Sub User' },
      { id: 3, status: false, value: 'approve', label: 'Normal' },
    ]
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCheckbox = (e, id) => {
    let arr = this.state[e.target.name]
    arr.forEach(item => {
      if (item.id === id) {
        item.status = item.status ? false : true
      }
    });
    this.setState({ [e.target.name]: arr })
  };

  render() {
    const {
      classes,
      handleSubmit,
      deco,
    } = this.props;
    const { username } = this.state

    const checkboxButtons = this.state.level.map((item, index) => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              name="level"
              checked={item.status}
              value={item.value}
              onChange={(e) => { this.handleCheckbox(e, item.id) }}
            />
          }
          label={item.label}
          key={index}
        />
      )
    })

    return (
      <Fragment>
        <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Create Seat
          </Typography>
          <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
            Lorem ipsum dolor sit amet
          </Typography>
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
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
                <Typography variant="h6" >Specify User Type</Typography>
                <div >
                  <FormGroup className={classes.checkboxButtons}>
                    {checkboxButtons}
                  </FormGroup>
                </div>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" size="large" type="submit">
                  Create
                </Button>
              </div>
            </form>
          </section>
        </Paper>
      </Fragment>
    );
  }
}

SeatManagementForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  deco: PropTypes.bool.isRequired,
};

const SeatManagementFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(SeatManagementForm);

const reducerLogin = 'login';
const reducerUi = 'ui';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducerLogin, 'usersLogin']),
    deco: state.getIn([reducerUi, 'decoration'])
  }),
)(SeatManagementFormReduxed);

export default withStyles(styles)(FormInit);
