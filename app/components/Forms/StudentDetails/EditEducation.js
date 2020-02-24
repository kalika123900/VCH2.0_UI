import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

class EditEducation extends React.Component {
  state = {
    eduFrom: '01/02/2016',
    eduTo: '01/02/2020',
    qualification: '',
    institute: '',
    grade: '',
  };

  handleEduFromChange = date => {
    this.setState({ eduFrom: date });
  };

  handleEduToChange = date => {
    this.setState({ eduTo: date });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,

    } = this.props;

    const { eduFrom, eduTo, qualification, institute, grade } = this.state;

    return (
      <section className={classes.pageFormWrap}>

        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Institute"
              className={classes.textField}
              type="text"
              value={institute}
              name="institute"
              margin="normal"
              variant="outlined"
              validate={[required]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Qualification"
              className={classes.textField}
              type="text"
              value={qualification}
              name="qualification"
              margin="normal"
              variant="outlined"
              validate={[required]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                placeholder="From"
                format="dd/MM/yyyy"
                value={eduFrom}
                name="eduFrom"
                onChange={this.handleEduFromChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                placeholder="To"
                format="dd/MM/yyyy"
                value={eduTo}
                name="eduTo"
                onChange={this.handleEduToChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Grade Achieved"
              className={classes.textField}
              type="text"
              value={grade}
              name="grade"
              margin="normal"
              variant="outlined"
              validate={[required]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>

      </section>
    );
  }
}

EditEducation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditEducation);
