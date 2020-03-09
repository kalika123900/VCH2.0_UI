import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from '../Forms/user-jss';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const budgetList = [
  '25$',
  '50$',
  '75$'
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

class EditClientForm extends React.Component {
  state = {
    name: 'Jhon Doe',
    email: 'abc@gmail.com',
    company: 'Google Pvt. Ltd.',
    budget: '75$',

  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
    } = this.props;

    const { name, email, company, budget } = this.state;

    return (
      <section className={classes.pageFormWrap}>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Client Name"
              className={classes.textField}
              placeholder="Client Name"
              type="text"
              value={name}
              name="name"
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
              label="Client Email"
              placeholder="Client Email"
              className={classes.textField}
              type="text"
              value={email}
              name="email"
              margin="normal"
              variant="outlined"
              validate={[required, email]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Company Name"
              placeholder="Company Name"
              className={classes.textField}
              type="text"
              value={company}
              name="company"
              margin="normal"
              variant="outlined"
              validate={[required]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="select-budget"
            >
              Budget
            </InputLabel>
            <Select
              placeholder="Budget"
              value={budget}
              name="budget"
              onChange={e => this.handleChange(e)}
              MenuProps={MenuProps}
            >
              {budgetList.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </section>
    );
  }
}

EditClientForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditClientForm);
