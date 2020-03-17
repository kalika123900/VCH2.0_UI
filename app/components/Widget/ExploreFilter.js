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
import Typography from '@material-ui/core/Typography';
import Place from '@material-ui/icons/Place';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Rating from '../Rating/Rating';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './widget-jss';

class ExploreFilter extends PureComponent {
  state = {
    skill: '',
    role: '',
    university: '',
    degree: '',
    grade: '',
    experience: '',
    interests: '',
    activity: '',
    rating: 3,
    location: '',
    checkedA: false,
    sliderValue: 20,
    marks: [
      {
        value: 0,
        label: '$0',
      },
      {
        value: 20,
        label: '$20',
      },
      {
        value: 40,
        label: '$40',
      },
      {
        value: 60,
        label: '$60',
      },
      {
        value: 80,
        label: '$80'
      },
      {
        value: 100,
        label: '$100'
      }
    ]
  };

  valueText = (value) => `$${value}`;

  handleReset = () => {
    this.setState({
      skill: '',
      role: '',
      university: '',
      degree: '',
      grade: '',
      experience: '',
      interests: '',
      activity: '',
      rating: 3,
      location: '',
      checkedA: false,
      sliderValue: 20,
    });
  }

  handleChange = value => {
    this.setState({ rating: value });
  };

  handleLocationChange = prop => event => {
    this.setState({ location: event.target.value });
  };

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const {
      skill, rating, location, checkedA, marks, sliderValue, role, university,
      degree, grade, experience, interests, activity
    } = this.state;
    return (
      <PapperBlock whiteBg noMargin title="Apply Filter" icon="ios-search-outline" desc="">
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="skill-simple">Skill</InputLabel>
              <Select
                value={skill}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'skill',
                  id: 'skill-simple',
                }}
              >
                <MenuItem value="">
                  <em>--select skill--</em>
                </MenuItem>
                <MenuItem value="BNB">React</MenuItem>
                <MenuItem value="BTC">Management</MenuItem>
                <MenuItem value="BCN">Angular</MenuItem>
                <MenuItem value="ADA">Node</MenuItem>
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
                <MenuItem value="BTC">Intern</MenuItem>
                <MenuItem value="BCN">Software Engineer</MenuItem>
                <MenuItem value="ADA">Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="university-simple">University</InputLabel>
              <Select
                value={university}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'university',
                  id: 'university-simple',
                }}
              >
                <MenuItem value="">
                  <em>--select university--</em>
                </MenuItem>
                <MenuItem value="BNB">Oxford</MenuItem>
                <MenuItem value="BTC">MIT</MenuItem>
                <MenuItem value="BCN">RGPV</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="degree-simple">Degree</InputLabel>
              <Select
                value={degree}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'degree',
                  id: 'degree-simple',
                }}
              >
                <MenuItem value="">
                  <em>--select Degree--</em>
                </MenuItem>
                <MenuItem value="BNB">B.TECH</MenuItem>
                <MenuItem value="BTC">MBA</MenuItem>
                <MenuItem value="BCN">MA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="grade-simple">Grade</InputLabel>
              <Select
                value={grade}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'grade',
                  id: 'grade-simple',
                }}
              >
                <MenuItem value="">
                  <em>--select Grade--</em>
                </MenuItem>
                <MenuItem value="BNB">Atleast A+</MenuItem>
                <MenuItem value="BTC">Above B</MenuItem>
                <MenuItem value="BCN">Above C</MenuItem>
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
                value={interests}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'interests',
                  id: 'interests-simple',
                }}
              >
                <MenuItem value="">
                  <em>--select interests--</em>
                </MenuItem>
                <MenuItem value="BNB">Programming</MenuItem>
                <MenuItem value="BTC">Singing</MenuItem>
                <MenuItem value="BCN">Travel</MenuItem>
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
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.textRight}>
          <Button color="secondary" variant="contained" className={classes.button} onClick={(e) => { this.handleReset(); }}>
            Reset
          </Button>
          <Button color="secondary" variant="contained" className={classes.button}>
            Filter Results
          </Button>
        </div>
      </PapperBlock>
    );
  }
}

ExploreFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExploreFilter);
