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
import Autocomplete from '@material-ui/lab/Autocomplete';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './widget-jss';
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

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function today() {
  let dateObj = new Date();
  const dateString = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  return Math.round((new Date(dateString).getTime() / 1000));
}

function firstDayOfNthWeek(date, n) {
  let firstDay = date.getDate() - (date.getDay() - 1) + 6 - 13 * n;
  let dateObj = new Date(date.setDate(firstDay));
  const dateString = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  return Math.round((new Date(dateString).getTime() / 1000));
}

function firstDayOfLastMonth() {
  let dateObj = new Date();
  const dateString = `${dateObj.getFullYear()}-${dateObj.getMonth()}-01`;
  return Math.round((new Date(dateString).getTime() / 1000));
}

class ExploreFilter extends PureComponent {
  render() {
    const {
      classes, skill, location, role, university, keyword,
      course, grade, experience, interests, activity, name,
      handleChange, handleSubmit, handleReset
    } = this.props;

    return (
      <PapperBlock whiteBg noMargin title="Apply Filter" icon="ios-search-outline" desc="">
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
                onChange={e => handleChange(e)}
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
                onChange={e => handleChange(e)}
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
                onChange={e => handleChange(e)}
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
              <InputLabel htmlFor="location-simple">Student Name</InputLabel>
              <Input
                id="name-simple"
                value={name}
                name="name"

                onChange={e => handleChange(e)}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'name',
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="skill-simple">Experience</InputLabel>
              <Select
                name="experience"
                value={experience}
                placeholder="Experience"
                onChange={e => handleChange(e)}
                inputProps={{
                  name: 'experience',
                  id: 'experience-simple',
                }}
              >
                <MenuItem value={365 * 5}>5+ Years</MenuItem>
                <MenuItem value={365 * 4}>4 Years</MenuItem>
                <MenuItem value={365 * 3}>3 Years</MenuItem>
                <MenuItem value={365}>Atleast 1 Years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="activity-simple">Activity</InputLabel>
              <Select
                value={activity}
                onChange={e => handleChange(e)}
                placeholder="Activity"
                inputProps={{
                  name: 'activity',
                  id: 'activity-simple',
                }}
              >
                <MenuItem value={today()}>Active Today</MenuItem>
                <MenuItem value={firstDayOfNthWeek(new Date(), 1)}>Active in the last Week</MenuItem>
                <MenuItem value={firstDayOfNthWeek(new Date(), 2)}>Active in the last 2 Weeks</MenuItem>
                <MenuItem value={firstDayOfLastMonth()}>Active in the last Month</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.customFormControl}>
              <Autocomplete
                style={{ width: '100%' }}
                multiple
                value={skill}
                onChange={(e, option) => {
                  const data = {
                    target: {
                      name: 'skill',
                      value: option
                    }
                  }
                  handleChange(data)
                }}
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
          </Grid>
          <Grid item sm={6} xs={6} >
            <FormControl className={classes.customFormControl}>
              <Autocomplete
                style={{ width: '100%' }}
                multiple
                value={course}
                onChange={(e, option) => {
                  const data = {
                    target: {
                      name: 'course',
                      value: option
                    }
                  }
                  handleChange(data)
                }}
                options={arrayRemove(courses, '')}
                getOptionLabel={option => option}
                renderOption={option => option}
                freeSolo
                renderInput={params => (
                  <TextField
                    style={{ width: '100%' }}
                    {...params}
                    label={'Courses'}
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid>
          <FormControl className={classes.formControlTrade}>
            <InputLabel htmlFor="location-simple">Search Keyword</InputLabel>
            <Input
              id="name-simple"
              value={keyword}
              name="keyword"
              onChange={e => handleChange(e)}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                'aria-label': 'keyword',
              }}
            />
          </FormControl>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.textRight}>
          <Button color="secondary" variant="contained" className={classes.button} onClick={(e) => handleReset()}>
            Reset
          </Button>
          <Button color="secondary" variant="contained" className={classes.button}
            onClick={e => handleSubmit()}
          >
            Filter Results
          </Button>
        </div>
      </PapperBlock >
    );
  }
}

ExploreFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExploreFilter);
