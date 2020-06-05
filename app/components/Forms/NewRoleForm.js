import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import styles from './user-jss';
import { storeRoleInfo } from 'dan-actions/RoleActions';
import { skillMenu, courses, experienceType, jobType } from 'dan-api/apps/profileOption';
import {
  descriptorMenu
} from '../Forms/CampaignSteps/constantData';
import SelectAdd from '../../components/SelectAdd/SelectAdd';

// validation functions
const urlValidator = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

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

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

const content = {
  blocks: [{
    key: '637gr',
    text: '',
    type: 'unstyled',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {}
  }],
  entityMap: {}
};

class NewRoleForm extends React.Component {
  constructor(props) {
    super(props);
    const contentBlock = convertFromRaw(content);
    if (contentBlock) {
      const editorState = EditorState.createWithContent(contentBlock);
      this.state = {
        editorState
      };
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });

    this.props.addInfo({ ...this.props, roleDesc: draftToHtml(convertToRaw(editorState.getCurrentContent())) });
  };

  handleMultiSelect = (e, option) => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, skills: option })
  };

  handleReduxChange = event => {
    const { addInfo } = this.props;

    if (event.target.name === 'roleName') {
      addInfo({ ...this.props, roleName: event.target.value });
    }
    if (event.target.name === 'roleLink') {
      addInfo({ ...this.props, roleLink: event.target.value });
    }
    if (event.target.name === 'roleType') {
      addInfo({ ...this.props, roleType: event.target.value });
    }
    if (event.target.name === 'experienceLevel') {
      addInfo({ ...this.props, experienceLevel: event.target.value });
    }
  };

  handleDateChange = currentDate => {
    const { addInfo } = this.props;
    const year = currentDate.getFullYear();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();

    if (date < 10) {
      date = '0' + date;
    }
    if (month < 9) {
      month = '0' + (month + 1);
    } else {
      month += 1;
    }

    const dateMonthYear = year + '-' + (month) + '-' + date;
    addInfo({ ...this.props, roleDeadline: dateMonthYear });
  };

  render() {
    const {
      classes,
      handleSubmit,
      handleClose,
      skills,
      roleDeadline,
      roleName,
      roleLink,
      roleDesc,
      experienceLevel,
      roleType
    } = this.props;

    const MapSkills = skills.toJS();

    return (
      <section className={classes.pageFormWrap}>
        <form >
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-name"
                label="Role Name"
                name="roleName"
                className={classes.textField}
                value={roleName}
                onChange={e => this.handleReduxChange(e)}
                margin="normal"
                variant="outlined"
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} style={{ marginBottom: 20 }}>
              <Typography
                variant="h6" style={{ textAlign: 'left', marginBottom: 10 }}
              >
                Which skills are relevant?
              </Typography>
              <Autocomplete
                style={{ width: '100%' }}
                multiple
                value={MapSkills}
                onChange={(e, option) => this.handleMultiSelect(e, option)}
                options={arrayRemove(skillMenu, '')}
                getOptionLabel={option => option}
                renderOption={option => option}
                freeSolo
                renderInput={params => (
                  <TextField
                    style={{ width: '100%' }}
                    {...params}
                    label={'Skills'}
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} style={{ marginBottom: 20 }}>
              <Typography variant="h6" style={{ textAlign: 'left', marginBottom: 10 }}>
                Which course are relevant?
              </Typography>
              <SelectAdd
                classes={this.props.classes}
                dataList={courses}
                label="Courses"
                type="courses"
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} style={{ marginBottom: 20 }}>
              <InputLabel
                htmlFor="select-role-type"
              >
                What is your Role Type?
              </InputLabel>
              <Select
                placeholder="Role Type"
                value={roleType}
                name="roleType"
                onChange={e => this.handleReduxChange(e)}
                MenuProps={MenuProps}
              >
                {jobType.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} style={{ marginBottom: 20 }}>
              <InputLabel
                htmlFor="select-experience-level"
              >
                Which type of experience required?
              </InputLabel>
              <Select
                placeholder="Experience Level"
                value={experienceLevel}
                name="experienceLevel"
                onChange={e => this.handleReduxChange(e)}
                MenuProps={MenuProps}
              >
                {experienceType.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl component="fieldset" required className={classes.formControl} style={{ marginBottom: 20 }} >
              <Typography variant="h6">Tell us some role descriptors to help:</Typography>
              <Typography variant="caption">(a member of the team will manually check your role description against the target audience)</Typography>
              <SelectAdd
                classes={this.props.classes}
                dataList={descriptorMenu}
                label="Role Descriptors"
                type="roleDescriptors"
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} style={{ marginBottom: 20 }}>
              <Typography variant="h6">What is the role’s application deadline?</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    format="dd/MM/yyyy"
                    placeholder="Choose Date"
                    value={new Date(roleDeadline)}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} style={{ marginBottom: 20 }}>
              <Typography variant="h6">Please provide role description</Typography>
              <Editor
                editorState={this.state.editorState}
                editorClassName={classes.textEditor}
                toolbarClassName={classes.toolbarEditor}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  options: ['inline', 'fontSize', 'fontFamily', 'colorPicker', 'image', 'emoji', 'list', 'textAlign', 'link'],
                  inline: { inDropdown: true },
                  color: true,
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                }}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} >
              <Typography variant="h6">What is the role page link?</Typography>
              <TextField
                id="outlined-link"
                label="Role Link"
                name="roleLink"
                className={classes.textField}
                value={roleLink}
                onChange={e => this.handleReduxChange(e)}
                margin="normal"
                variant="outlined"
              />
              <Typography variant="caption">(Make sure it is the link to the actual page so that we can scan the page for key information)</Typography>
            </FormControl>
          </div>
          <Button onClick={(e) => handleClose(e)} color="primary">
            Cancel
          </Button>
          <Button type="button" color="primary" onClick={handleSubmit} disabled={(this.props.roleName !== '' && this.props.roleLink.match(urlValidator)) ? false : true}>
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
  roleDesc: state.getIn([reducerRole, 'roleDesc']),
  roleType: state.getIn([reducerRole, 'roleType']),
  experienceLevel: state.getIn([reducerRole, 'experienceLevel']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeRoleInfo, dispatch)
});

const NewRoleFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRoleForm);

export default withStyles(styles)(NewRoleFormMapped);
