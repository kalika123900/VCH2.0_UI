import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { storeStep3Info } from 'dan-actions/CampaignActions';
import SelectAdd from '../../SelectAdd/SelectAdd';
import { sectorsData, skillMenu } from 'dan-api/apps/profileOption';
import {
  subjectMenu,
  years,
  grade,
  locationData,
  keywordsData
} from './constantData';
import styles from './step-jss';

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

class Step3 extends React.Component {
  state = {
    universityMenu: [
      { id: 1, status: false, value: 'University of Oxford' },
      { id: 2, status: false, value: 'Durham University' },
      { id: 3, status: false, value: 'University of Cambridge' },
      { id: 4, status: false, value: 'London School of Economics' },
      { id: 5, status: false, value: 'University College London' },
      { id: 6, status: false, value: 'Imperial College London' },
      { id: 7, status: false, value: 'University of Edinburgh' },
      { id: 8, status: false, value: 'University of Warwick' },
    ],
    genderMenu: [
      { status: false, value: 0, label: 'Prefer not to say' },
      { status: false, value: 1, label: 'Men' },
      { status: false, value: 2, label: 'Women' },
      { status: false, value: 3, label: 'Non-binary' },
    ]
  };

  handleReduxChange = event => {
    const { addInfo } = this.props;

    if (event.target.name === 'selectedYear') {
      addInfo({ ...this.props, selectedYear: event.target.value });
    }
    if (event.target.name === 'minGrade') {
      addInfo({ ...this.props, minGrade: event.target.value });
    }
    if (event.target.name === 'experience') {
      addInfo({ ...this.props, experience: event.target.value });
    }
    if (event.target.name === 'ethnicity') {
      addInfo({ ...this.props, ethnicity: event.target.value });
    }
  };

  handleMultiSelect = (event) => {
    const { value } = event.target;

    const { addInfo } = this.props;
    if (event.target.name == 'university') {
      addInfo({ ...this.props, university: value });
    }
    if (event.target.name == 'subjects') {
      addInfo({ ...this.props, subjects: value });
    }
    if (event.target.name == 'skills') {
      addInfo({ ...this.props, skills: value });
    }
  };

  handleGender = (value) => {
    const { gender, addInfo } = this.props;

    const MapGender = gender.toJS();
    if (MapGender.indexOf(value) === -1) {
      MapGender.push(value);
    } else {
      const index = MapGender.indexOf(value);
      if (index > -1) {
        MapGender.splice(index, 1);
      }
    }

    addInfo({ ...this.props, gender: MapGender });
  };

  render() {
    const {
      classes,
      gender,
      university,
      subjects,
      skills,
      selectedYear,
      ethnicity,
      experience,
      minGrade
    } = this.props;

    const {
      genderMenu,
      universityMenu
    } = this.state;

    const genderCheckboxes = genderMenu.map((item, index) => (
      <FormControlLabel
        control={(
          <Checkbox
            name="genderMenu"
            checked={gender.includes(item.value)}
            value={item.value}
            onChange={() => this.handleGender(item.value)}
          />
        )}
        label={item.label}
        key={index.toString()}
      />
    ));

    return (
      <div className={(classes.root, classes.step3Root)}>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={(classes.customWidth, classes.formControl)}>
                <Typography variant="h6">
                  Which universities would you like to target?
                </Typography>
                <Select
                  multiple
                  value={university.toJS()}
                  name="university"
                  input={<Input />}
                  renderValue={selected => {
                    const universityName = [];
                    universityMenu.map((value, index) => {
                      if (selected.includes(value.id)) {
                        universityName.push(value.value);
                      }
                    });
                    return universityName.join(', ');
                  }
                  }
                  MenuProps={MenuProps}
                  component={Select}
                  onChange={e => this.handleMultiSelect(e)}
                >
                  {universityMenu.map((item, index) => (
                    <MenuItem key={index.toString()} value={item.id}>
                      <TextField
                        name="university-checkbox"
                        component={Checkbox}
                        checked={university.indexOf(item.id) > -1}
                      />
                      <ListItemText primary={item.value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={classes.formControl}>
                <Typography variant="h6">Which genders would you like to target?</Typography>
                <FormGroup>
                  {genderCheckboxes}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={(classes.customWidth, classes.formControl)}>
                <Typography variant="h6">
                  Student reading these courses will be particularly targeted:
                </Typography>
                <Select
                  multiple
                  value={subjects.toJS()}
                  name="subjects"
                  input={<Input />}
                  MenuProps={MenuProps}
                  component={Select}
                  renderValue={selected => {
                    const subjectName = [];
                    subjectMenu.map((value, index) => {
                      if (selected.includes(value.id)) {
                        subjectName.push(value.value);
                      }
                    });
                    return subjectName.join(', ');
                  }
                  }
                  onChange={e => this.handleMultiSelect(e)}
                >
                  {subjectMenu.map((item, index) => (
                    <MenuItem key={index.toString()} value={item.id}>
                      <TextField
                        name="subject-checkbox"
                        component={Checkbox}
                        checked={subjects.indexOf(item.id) > -1}
                      />
                      <ListItemText primary={item.value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={(classes.customWidth, classes.formControl)}>
                <Typography variant="h6">
                  Students with these skills will be particularly targeted:
                </Typography>
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
                      if (selected.includes(value)) {
                        skillName.push(value);
                      }
                    });
                    return skillName.join(', ');
                  }
                  }
                  onChange={e => this.handleMultiSelect(e)}
                >
                  {skillMenu.map((item, index) => (
                    <MenuItem key={index.toString()} value={item}>
                      <TextField
                        name="skill-checkbox"
                        component={Checkbox}
                        checked={skills.indexOf(item) > -1}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl className={classes.formControl}>
                <Typography variant="h6">
                  This campaign will only target students graduating in these years:
                </Typography>
                <Select
                  placeholder="Select Year"
                  value={selectedYear}
                  name="selectedYear"
                  onChange={(e) => this.handleReduxChange(e)}
                  MenuProps={MenuProps}
                >
                  {years.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl className={classes.formControl}>
                <Typography variant="h6">
                  Student that achieve these grades will be particularly targeted:
                </Typography>
                <Select
                  placeholder="Select Minimum Grade"
                  value={minGrade}
                  name="minGrade"
                  onChange={e => this.handleReduxChange(e)}
                  MenuProps={MenuProps}
                >
                  {grade.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      <ListItemText primary={item.value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={classes.formControl}>
                <Typography variant="h6">Would you like to target any ethnic groups?</Typography>
                <RadioGroup
                  aria-label="ethnicity"
                  name="ethnicity"
                  className={classes.group}
                  value={ethnicity}
                  onChange={(e) => this.handleReduxChange(e)}
                >
                  <FormControlLabel value="Asian or Asian British" control={<Radio />} label="Asian or Asian British" />
                  <FormControlLabel value="Black or Black British" control={<Radio />} label="Black or Black British" />
                  <FormControlLabel value="Mixed" control={<Radio />} label="Mixed" />
                  <FormControlLabel value="Other Ethnic Groups" control={<Radio />} label="Other Ethnic Groups" />
                  <FormControlLabel value="White" control={<Radio />} label="White" />
                  <FormControlLabel value="Prefer not to say" control={<Radio />} label="Prefer not to say" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={classes.formControl}>
                <Typography variant="h6">Do your future hires require experience to succeed in this role?</Typography>
                <RadioGroup
                  aria-label="experience"
                  name="experience"
                  className={classes.group}
                  value={experience}
                  onChange={(e) => this.handleReduxChange(e)}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <Typography variant="h6" style={{ textAlign: 'left' }}>
                This campaign will only target candidates who are willing to work in:
              </Typography>
              <SelectAdd
                classes={this.props.classes}
                dataList={locationData}
                label="Work Location"
                type="location"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" style={{ textAlign: 'left' }}>
              Only students that are specifically interested in these sectors will be targeted:
            </Typography>
            <SelectAdd
              classes={this.props.classes}
              dataList={sectorsData}
              label="Interested Sector"
              type="sectors"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" style={{ textAlign: 'left' }}>
              Students that contain these words will be ranked hire in the campaign:
            </Typography>
            <SelectAdd
              classes={this.props.classes}
              dataList={keywordsData}
              label="Keywords"
              type="keywords"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
  university: PropTypes.object.isRequired,
  subjects: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  keywords: PropTypes.object.isRequired,
  gender: PropTypes.object.isRequired,
  selectedYear: PropTypes.string.isRequired,
  ethnicity: PropTypes.string.isRequired,
  interestedSectors: PropTypes.object.isRequired,
  workLocation: PropTypes.object.isRequired,
  experience: PropTypes.string.isRequired,
  minGrade: PropTypes.number.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  university: state.getIn([reducerCampaign, 'university']),
  subjects: state.getIn([reducerCampaign, 'subjects']),
  skills: state.getIn([reducerCampaign, 'skills']),
  keywords: state.getIn([reducerCampaign, 'keywords']),
  gender: state.getIn([reducerCampaign, 'gender']),
  selectedYear: state.getIn([reducerCampaign, 'selectedYear']),
  ethnicity: state.getIn([reducerCampaign, 'ethnicity']),
  interestedSectors: state.getIn([reducerCampaign, 'interestedSectors']),
  workLocation: state.getIn([reducerCampaign, 'workLocation']),
  experience: state.getIn([reducerCampaign, 'experience']),
  minGrade: state.getIn([reducerCampaign, 'minGrade']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep3Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3);

export default withStyles(styles)(StepMapped);
