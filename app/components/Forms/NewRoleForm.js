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

const DateHelper = {
  addDays(aDate, numberOfDays) {
    aDate.setDate(aDate.getDate() + numberOfDays);
    return aDate;
  },
  format: function format(date) {
    return [
      ('0' + date.getDate()).slice(-2),
      ('0' + (date.getMonth() + 1)).slice(-2),
      date.getFullYear()
    ].join('/');
  }
};

class NewRoleForm extends React.Component {
  state = {
    rolename: '',
    courses: [],
    skills: [],
    deadline: DateHelper.format(DateHelper.addDays(new Date(), 5)),
    link: '',
    customDescriptor: '',
    skillList: [
      {
        id: 1, status: false, value: 'React.js', label: 'React.js'
      },
      {
        id: 2, status: false, value: 'Angular', label: 'Angular'
      },
      {
        id: 3, status: false, value: 'Node.js', label: 'Node.js'
      },
    ],
    courseList: [
      {
        id: 1, status: false, value: 'B.E', label: 'B.E'
      },
      {
        id: 2, status: false, value: 'B.Sc', label: 'B.Sc'
      },
      {
        id: 3, status: false, value: 'MBA', label: 'MBA'
      },
    ],
    roleDescriptor: [
      {
        id: 1, status: false, value: 'Microsoft Excel', label: 'Microsoft Excel'
      },
      {
        id: 2, status: false, value: 'Work Culture', label: 'Work Culture'
      },
      {
        id: 3, status: false, value: 'Team Work', label: 'Team Work'
      },
    ]
  };

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
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
      courses, skills, rolename, courseList, skillList,
      deadline, link, roleDescriptor, customDescriptor
    } = this.state;

    const roleDescriptors = roleDescriptor.map((item, index) => (
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
                  <MenuItem key={index} value={item.label}>
                    <Field
                      name="courseList"
                      component={Checkbox}
                      checked={item.status}
                      onChange={(e) => { this.handleCheckbox(e, item.id); }}
                    />
                    <ListItemText primary={item.label} />
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
                    <Field name="skill-checkbox" component={Checkbox} checked={skillList.indexOf(item) > -1} />
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
                  placeholder="Deadline for role"
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

NewRoleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const NewRoleFormRedux = reduxForm({
  form: 'immutableAddRole',
  enableReinitialize: true,
})(NewRoleForm);

const NewRoleInit = connect(
  state => ({
    initialValues: state.getIn(['role', 'formValues'])
  })
)(NewRoleFormRedux);

export default withStyles(styles)(NewRoleInit);
