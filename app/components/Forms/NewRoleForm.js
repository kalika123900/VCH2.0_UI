import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import styles from './user-jss';
import { TextFieldRedux } from './ReduxFormMUI';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

const courseList = [
  'B.E',
  'BSc',
  'MBA',
  'MA',
];

const skillList = [
  'React',
  'Angular',
  'JavaScript'
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

class AddRoleForm extends React.Component {
  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  state = {
    rolename: '',
    courses: [],
    skills: [],
    deadline: '01/02/2000',
    link: '',
    customDescriptor: '',
    roleDescriptor: [
      {
        id: 1, status: false, value: '#', label: 'Lorem Ipsum'
      },
      {
        id: 2, status: false, value: '#', label: 'Lorem Ipsum '
      },
      {
        id: 3, status: false, value: '#', label: 'Lorem Ipsum'
      },
    ]
  };

  handleDateChange = date => {
    this.setState({ deadline: date });
  };

  saveData = (e) => {
    e.preventDefault();
    return { name: this.state.rolename, };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckbox = (e, id) => {
    const arr = this.state[e.target.name];
    arr.forEach(item => {
      if (item.id === id) {
        item.status = !item.status;
      }
    });
    this.setState({ [e.target.name]: arr });
  };

  addCustomItem = (e, stateItem) => {
    if (this.state[e.target.offsetParent.name].length > 0) {
      const customItem = this.state[e.target.offsetParent.name];
      const { length } = this.state[e.target.offsetParent.name];
      const newItemObj = {
        id: (length + 1), status: false, value: customItem, label: customItem
      };
      const newItemArr = [...this.state[stateItem], newItemObj];
      this.setState({ [stateItem]: newItemArr, [e.target.offsetParent.name]: '' });
    }
  }

  render() {
    const {
      classes,
      handleSubmit,
      handleClose
    } = this.props;

    const {
      courses, skills, rolename,
      deadline, link, roleDescriptor, customDescriptor
    } = this.state;

    const roleDescriptors = this.state.roleDescriptor.map((item, index) => (
      <FormControlLabel
        control={(
          <Checkbox
            name="roleDescriptor"
            checked={item.status}
            value={item.value}
            onChange={(e) => { this.handleCheckbox(e, item.id); }}
          />
        )}
        label={item.label}
        key={index}
      />
    ));

    return (
      <section className={classes.pageFormWrap}>
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl className={classes.formControl}>
              <Field
                label="Role Name"
                className={classes.textField}
                type="text"
                value={rolename}
                ref={this.saveRef}
                name="role"
                margin="normal"
                variant="outlined"
                validate={[required]}
                component={TextFieldRedux}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-course"
              >
                Course Prefered
              </InputLabel>
              <Select
                multiple
                value={courses}
                name="courses"
                onChange={e => this.handleChange(e)}
                input={<Input id="select-courses" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
                component={Select}
              >
                {courseList.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <Field component="checkbox" checked={courseList.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-skill"
              >
                Skills Required
              </InputLabel>
              <Select
                multiple
                value={skills}
                name="skills"
                onChange={e => this.handleChange(e)}
                input={<Input id="select-skills" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
                component={Select}
              >
                {skillList.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <Field component="checkbox" checked={skillList.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  placeholder="Deadline"
                  format="dd/MM/yyyy"
                  value={deadline}
                  name="deadline"
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </div>
          <div>
            <FormControl component="fieldset" required className={classes.formControl}>
              <Typography variant="h6">Select Role Descriptors</Typography>
              <FormGroup>
                {roleDescriptors}
              </FormGroup>
              <Field
                name="customDescriptor"
                className={classes.textField}
                placeholder="For example : Something"
                value={customDescriptor}
                component={TextFieldRedux}
                margin="normal"
                variant="filled"
                onChange={(e) => this.handleChange(e)}
              />
              <Tooltip title="Add New">
                <Button
                  name="customDescriptor"
                  variant="text"
                  color="secondary"
                  onClick={(e) => this.addCustomItem(e, 'roleDescriptor')}
                >
                  <AddIcon />
                  Add New
                </Button>
              </Tooltip>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <Field
                label="Link to Portal"
                className={classes.textField}
                type="text"
                component={TextFieldRedux}
                value={link}
                name="link"
                margin="normal"
                variant="outlined"
                validate={[required]}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
          </div>
          <Button onClick={(e) => handleClose(e)} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add Role
          </Button>
        </form>
      </section>

    );
  }
}

AddRoleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const AddRoleFormRedux = reduxForm({
  form: 'immutableAddRole',
  enableReinitialize: true,
})(AddRoleForm);

const AddRoleInit = connect(
  state => ({
    initialValues: state.getIn(['role', 'formValues'])
  })
)(AddRoleFormRedux);

export default withStyles(styles)(AddRoleInit);
