import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import styles from './user-jss';
import { TextFieldRedux } from './ReduxFormMUI';
import { storeRoleInfo } from 'dan-actions/RoleActions';
import {
  courseMenu,
  skillMenu
} from '../Forms/CampaignSteps/constantData';
import SelectAdd from '../../components/SelectAdd/SelectAdd';

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

class NewRoleForm extends React.Component {
  handleMultiSelect = (event) => {
    const { value } = event.target;
    const { addInfo } = this.props;

    if (event.target.name == 'skills') {
      addInfo({ ...this.props, skills: value });
    }
  };


  render() {
    const {
      classes,
      handleSubmit,
      handleClose,
      skills,
      courses
    } = this.props;

    return (
      <section className={classes.pageFormWrap}>
        <form >
          {/* <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="Role Name"
                className={classes.textField}
                type="text"
                value={roleName}
                name="role"
                margin="normal"
                variant="outlined"
                validate={[required]}
                component={TextFieldRedux}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
          </div> */}
          <div>
            <FormControl className={classes.formControl}>
              <Typography variant="h6" style={{ textAlign: 'left' }}>
                Which course are relevant?
              </Typography>
              <SelectAdd
                classes={this.props.classes}
                dataList={courseMenu}
                label="courses"
                type="courses"
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-skill"
              >
                Which skills are relevant?
              </InputLabel>
              <Select
                multiple
                value={skills.toJS()}
                input={<Input />}
                name="skills"
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const skillName = [];
                  skillMenu.map((value, index) => {
                    if (selected.includes(value.id)) {
                      skillName.push(value.value);
                    }
                  });
                  return skillName.join(', ');
                }
                }
                onChange={e => this.handleMultiSelect(e)}
              >
                {skillMenu.map((item, index) => (
                  <MenuItem key={index.toString()} value={item.id}>
                    <TextField
                      name="skill-checkbox"
                      component={Checkbox}
                      checked={skills.indexOf(item.id) > -1}
                    />
                    <ListItemText primary={item.value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* <div>
            <FormControl className={classes.formControl}>
              <Typography variant="h6">What is the role’s application deadline?</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  placeholder="What is the role’s application deadline?"
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
          </div> */}
          {/* <div>
            <FormControl component="fieldset" required className={classes.formControl}>
              <Typography variant="h6">Tell us some role descriptors to help:</Typography>
              <Typography variant="caption">(a member of the team will manually check your role description against the target audience)</Typography>
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
          </div> */}
          {/* <div>
            <FormControl className={classes.formControl}>
              <Typography variant="h6">What is the role page link?</Typography>
              <Field
                label="https://xyz.com/jobs/123"
                className={classes.textField}
                type="text"
                component={TextFieldRedux}
                // value={link}
                name="link"
                margin="normal"
                variant="outlined"
                validate={[required]}
              // onChange={e => this.handleChange(e)}
              />
              <Typography variant="caption">(Make sure it is the link to the actual page so that we can scan the page for key information)</Typography>
            </FormControl>
          </div> */}
          <Button onClick={(e) => handleClose(e)} color="primary">
            Cancel
          </Button>
          <Button type="button" color="primary" onClick={handleSubmit}>
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
  roleName: PropTypes.string.isRequired,
  courses: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  roleDeadline: PropTypes.string.isRequired,
  roleDescriptors: PropTypes.object.isRequired,
  roleLink: PropTypes.string.isRequired
};

const reducerRole = 'role';

const mapStateToProps = state => ({
  roleName: state.getIn([reducerRole, 'roleName']),
  courses: state.getIn([reducerRole, 'courses']),
  skills: state.getIn([reducerRole, 'skills']),
  roleDeadline: state.getIn([reducerRole, 'roleDeadline']),
  roleDescriptors: state.getIn([reducerRole, 'roleDescriptors']),
  roleLink: state.getIn([reducerRole, 'roleLink']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeRoleInfo, dispatch)
});

const NewRoleFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRoleForm);

export default withStyles(styles)(NewRoleFormMapped);
