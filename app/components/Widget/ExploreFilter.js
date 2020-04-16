import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Place from '@material-ui/icons/Place';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './widget-jss';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import {
  sectorsData,
  skillMenu,
  courses,
  degreeGradesItems,
  universityItems,
} from 'dan-api/apps/profileOption';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

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


class ExploreFilter extends PureComponent {
  state = {
    name: '',
    skill: [],
    role: '',
    university: [],
    course: [],
    grade: [],
    experience: '',
    interests: [],
    activity: '',
    location: '',
  };

  handleSubmit = () => {

  }

  handleReset = () => {
    this.setState({
      name: '',
      skill: [],
      role: '',
      university: [],
      course: [],
      grade: [],
      experience: '',
      interests: [],
      activity: '',
      location: '',
    });
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLocationChange = prop => event => {
    this.setState({ location: event.target.value });
  };

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const {
      skill, location, role, university,
      course, grade, experience, interests, activity, name
    } = this.state;

    return (
      <PapperBlock whiteBg noMargin title="Apply Filter" icon="ios-search-outline" desc="">
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="skill-simple">Skill</InputLabel>
              <Select
                multiple
                value={skill}
                input={<Input />}
                name="skill"
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const skillName = [];
                  skillMenu.map((value, index) => {
                    if (selected.includes(value)) {
                      skillName.push(value);
                    }
                  });
                  return skillName.join(', ');
                }
                }
                onChange={e => this.handleChangeSelect(e)}
              >
                {skillMenu.map((item, index) => (
                  (item.length > 0) &&
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="skill-checkbox"
                      component={Checkbox}
                      checked={skill.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="role-simple">Role</InputLabel>
              <Select
                value={role}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'role',
                  id: 'role-simple',
                }}
              >
                <MenuItem value="">
                  <em>--select role--</em>
                </MenuItem>
                <MenuItem value="BNB">AI Engineer</MenuItem>
                <MenuItem value="BTC">Technology Analyst</MenuItem>
                <MenuItem value="BKC">Technical Project Manager</MenuItem>
                <MenuItem value="BPC">Business Analyst</MenuItem>
                <MenuItem value="BCN">Software Engineer</MenuItem>
                <MenuItem value="ADA">HR Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="university-simple">University</InputLabel>
              <Select
                multiple
                value={university}
                name="university"
                input={<Input />}
                renderValue={selected => {
                  const universityName = [];
                  universityItems.map((value, index) => {
                    if (selected.includes(value)) {
                      universityName.push(value);
                    }
                  });
                  return universityName.join(', ');
                }
                }
                MenuProps={MenuProps}
                component={Select}
                onChange={e => this.handleChangeSelect(e)}
                style={{ whiteSpace: 'normal' }}
              >
                {universityItems.map((item, index) => (
                  (item.length > 0) &&
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="university-checkbox"
                      component={Checkbox}
                      checked={university.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="degree-simple">Course</InputLabel>
              <Select
                multiple
                value={course}
                name="course"
                input={<Input />}
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const subjectName = [];
                  courses.map((value, index) => {
                    if (selected.includes(value)) {
                      subjectName.push(value);
                    }
                  });
                  return subjectName.join(', ');
                }
                }
                onChange={e => this.handleChangeSelect(e)}
              >
                {courses.map((item, index) => (
                  (item.length > 0) &&
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="subject-checkbox"
                      component={Checkbox}
                      checked={course.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="grade-simple">Grade</InputLabel>
              <Select
                multiple
                value={grade}
                input={<Input />}
                name="grade"
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const gradeName = [];
                  degreeGradesItems.map((value, index) => {
                    if (selected.includes(value)) {
                      gradeName.push(value);
                    }
                  });
                  return gradeName.join(', ');
                }
                }
                onChange={e => this.handleChangeSelect(e)}
              >
                {degreeGradesItems.map((item, index) => (
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="grade"
                      component={Checkbox}
                      checked={grade.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="skill-simple">Experience</InputLabel>
              <Select
                value={experience}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'experience',
                  id: 'experience-simple',
                }}
              >
                <MenuItem value="">
                  <em>--select Experience--</em>
                </MenuItem>
                <MenuItem value="BNB">5+ Years</MenuItem>
                <MenuItem value="BTC">4 Years</MenuItem>
                <MenuItem value="BCN">3 Years</MenuItem>
                <MenuItem value="ADA">Atleast 1 Years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="interests-simple">Interests</InputLabel>
              <Select
                multiple
                value={interests}
                input={<Input />}
                name="interests"
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const interestsName = [];
                  sectorsData.map((value, index) => {
                    if (selected.includes(value)) {
                      interestsName.push(value);
                    }
                  });
                  return interestsName.join(', ');
                }
                }
                onChange={e => this.handleChangeSelect(e)}
              >
                {sectorsData.map((item, index) => (
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="interests"
                      component={Checkbox}
                      checked={interests.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="activity-simple">Activity</InputLabel>
              <Select
                value={activity}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'activity',
                  id: 'activity-simple',
                }}
              >
                <MenuItem value="">
                  <em>--select activity--</em>
                </MenuItem>
                <MenuItem value="BNB">Active Now</MenuItem>
                <MenuItem value="BTC">Active in last 1 Week ago</MenuItem>
                <MenuItem value="BCN">Active in last 2 Week ago</MenuItem>
                <MenuItem value="ADA">Active in last Month ago</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="location-simple">Location</InputLabel>
              <Input
                id="location-simple"
                value={location}

                onChange={this.handleLocationChange('location')}
                endAdornment={<InputAdornment position="end"><Place /></InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'location',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="location-simple">Student Name</InputLabel>
              <Input
                id="name-simple"
                value={name}
                name="name"

                onChange={e => this.handleNameChange(e)}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'name',
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.textRight}>
          <Button color="secondary" variant="contained" className={classes.button} onClick={(e) => { this.handleReset(); }}>
            Reset
          </Button>
          <Button color="secondary" variant="contained" className={classes.button}
            onClick={e => this.handleSubmit()}
          >
            Filter Results
          </Button>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.openStyle}
          autoHideDuration={6000}
          onClose={this.handleCloseStyle}
        >
          <SnackbarContent
            className={this.state.messageType == 'error' ? messageStyles.bgError : messageStyles.bgSuccess}
            aria-describedby="client-snackbar"
            message={(
              <span id="client-snackbar" className={classes.message}>
                {
                  (this.state.messageType == 'error') && <ErrorIcon className="success" />
                }
                {
                  (this.state.messageType == 'success') && <CheckCircleIcon className="success" />
                }

                  &nbsp;
                {this.state.notifyMessage}
              </span>
            )}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.noticeClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </PapperBlock>
    );
  }
}

ExploreFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExploreFilter);
