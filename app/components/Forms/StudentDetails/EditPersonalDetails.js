import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MaterialDropZone from '../../Forms/MaterialDropZone';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const emailValidator = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const ethnicityItems = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class EditPersonalDetails extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    DOB: '01/02/2000',
    nationality: '',
    file: [],
    ethnicity: [],
  };

  handleDateChange = date => {
    this.setState({ DOB: date });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
    } = this.props;

    const { file, ethnicity, firstname, lastname,
      DOB, email, phone, nationality
    } = this.state;

    return (
      <section className={classes.pageFormWrap}>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="First Name"
              className={classes.textField}
              type="text"
              value={firstname}
              name="firstname"
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
              label="Last Name"
              className={classes.textField}
              type="text"
              name="lastname"
              value={lastname}
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
              label="Alternative Email"
              className={classes.textField}
              type="email"
              name="email"
              value={email}
              autoComplete="email"
              margin="normal"
              variant="outlined"
              validate={[required, emailValidator]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Phone Number"
              className={classes.textField}
              type="text"
              value={phone}
              autoComplete="phone"
              name="phone"
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
                placeholder="Date of Birth"
                format="dd/MM/yyyy"
                value={DOB}
                name="DOB"
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="select-ethnicity"
            >
              Ethnicity
                  </InputLabel>
            <Select
              multiple
              value={ethnicity}
              name="ethnicity"
              onChange={e => this.handleChange(e)}
              input={<Input id="select-ethnicity" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {ethnicityItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <Checkbox checked={ethnicityItems.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Nationality"
              className={classes.textField}
              type="text"
              value={nationality}
              name="nationality"
              margin="normal"
              variant="outlined"
              validate={[required]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>
        <div>
          <MaterialDropZone
            files={file}
            showPreviews
            maxSize={5000000}
            filesLimit={1}
            text="Drag and drop file(s) here to upload CV"
          />
        </div>
      </section>

    );
  }
}

EditPersonalDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditPersonalDetails);
