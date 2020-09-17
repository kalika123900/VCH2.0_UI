import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import {
  sectorsData,
  skillMenu,
  keywordsData,
  locationData,
  courses,
  years,
  degreeGradesItems,
  genderItems,
  universityItems,
  qualificationOption,
  languageOption,
  society
} from 'dan-api/apps/profileOption';
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

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

class Step3 extends React.Component {
  handleReduxChange = event => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, [event.target.name]: event.target.value });
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
      minGrade,
      qualificationType,
      languages,
      societies
    } = this.props;

    const genderCheckboxes = genderItems.map((item, index) => (
      <FormControlLabel
        control={(
          <Checkbox
            name="genderMenu"
            checked={gender.includes(item)}
            value={item}
            onChange={() => this.handleGender(item)}
          />
        )}
        label={item}
        key={index.toString()}
      />
    ));

    return (
      <div className={(classes.root, classes.step3Root)} style={{ maxWidth: 716 }}>
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
                  onChange={e => this.handleReduxChange(e)}
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
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={(classes.customWidth, classes.formControl)}>
                <Typography variant="h6">
                  Select the ideal qualifications that candidates will have acquired
                </Typography>
                <Select
                  multiple
                  value={qualificationType.toJS()}
                  name="qualificationType"
                  input={<Input />}
                  renderValue={selected => {
                    const qualificationTypeName = [];
                    qualificationOption.map((value, index) => {
                      if (selected.includes(value)) {
                        qualificationTypeName.push(value);
                      }
                    });
                    return qualificationTypeName.join(', ');
                  }
                  }
                  MenuProps={MenuProps}
                  component={Select}
                  onChange={e => this.handleReduxChange(e)}
                  style={{ whiteSpace: 'normal' }}
                >
                  {qualificationOption.map((item, index) => (
                    (item.length > 0) &&
                    <MenuItem key={index.toString()} value={item}>
                      <TextField
                        name="qualificationType-checkbox"
                        component={Checkbox}
                        checked={qualificationType.indexOf(item) > -1}
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
              <FormControl component="fieldset" required className={(classes.customWidth, classes.formControl)}>
                <Typography variant="h6">
                  Select which languages are candidates required to speak
                </Typography>
                <Select
                  multiple
                  value={languages.toJS()}
                  name="languages"
                  input={<Input />}
                  renderValue={selected => {
                    const languagesName = [];
                    languageOption.map((value, index) => {
                      if (selected.includes(value)) {
                        languagesName.push(value);
                      }
                    });
                    return languagesName.join(', ');
                  }
                  }
                  MenuProps={MenuProps}
                  component={Select}
                  onChange={e => this.handleReduxChange(e)}
                  style={{ whiteSpace: 'normal' }}
                >
                  {languageOption.map((item, index) => (
                    (item.length > 0) &&
                    <MenuItem key={index.toString()} value={item}>
                      <TextField
                        name="languageOption-checkbox"
                        component={Checkbox}
                        checked={languages.indexOf(item) > -1}
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
              <FormControl component="fieldset" required className={(classes.customWidth, classes.formControl)}>
                <Typography variant="h6">
                  Select which Societies are candidates required to relate
                </Typography>
                <Select
                  multiple
                  value={societies.toJS()}
                  name="societies"
                  input={<Input />}
                  renderValue={selected => {
                    const societiesName = [];
                    society.map((value, index) => {
                      if (selected.includes(value)) {
                        societiesName.push(value);
                      }
                    });
                    return societiesName.join(', ');
                  }
                  }
                  MenuProps={MenuProps}
                  component={Select}
                  onChange={e => this.handleReduxChange(e)}
                  style={{ whiteSpace: 'normal' }}
                >
                  {society.map((item, index) => (
                    <MenuItem key={index.toString()} value={item}>
                      <TextField
                        name="society-checkbox"
                        component={Checkbox}
                        checked={societies.indexOf(item) > -1}
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
                  Courses that the role targets
                </Typography>
                <Autocomplete
                  style={{ width: '100%' }}
                  multiple
                  value={subjects.toJS()}
                  onChange={(e, option) => {
                    const data = {
                      target: {
                        name: 'subjects',
                        value: option
                      }
                    }
                    this.handleReduxChange(data)
                  }}
                  options={arrayRemove(courses, '')}
                  getOptionLabel={option => option}
                  renderOption={option => option}
                  freeSolo={false}
                  disableCloseOnSelect={true}
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
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={(classes.customWidth, classes.formControl)}>
                <Typography variant="h6">
                  Skills that the role targets
                </Typography>
                <Autocomplete
                  style={{ width: '100%' }}
                  multiple
                  value={skills.toJS()}
                  onChange={(e, option) => {
                    const data = {
                      target: {
                        name: 'skills',
                        value: option
                      }
                    }
                    this.handleReduxChange(data)
                  }}
                  options={arrayRemove(skillMenu, '')}
                  getOptionLabel={option => option}
                  renderOption={option => option}
                  freeSolo={false}
                  disableCloseOnSelect={true}
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
                  multiple
                  value={selectedYear.toJS()}
                  input={<Input />}
                  name="selectedYear"
                  MenuProps={MenuProps}
                  component={Select}
                  renderValue={selected => {
                    const yearName = [];
                    years.map((value, index) => {
                      if (selected.includes(value)) {
                        yearName.push(value);
                      }
                    });
                    return yearName.join(', ');
                  }
                  }
                  onChange={e => this.handleReduxChange(e)}
                >
                  {years.map((item, index) => (
                    <MenuItem key={index.toString()} value={item}>
                      <TextField
                        name="selectedYear"
                        component={Checkbox}
                        checked={selectedYear.indexOf(item) > -1}
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
                  Student that achieve these grades will be particularly targeted:
                </Typography>
                <Select
                  multiple
                  value={minGrade.toJS()}
                  input={<Input />}
                  name="minGrade"
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
                  onChange={e => this.handleReduxChange(e)}
                >
                  {degreeGradesItems.map((item, index) => (
                    <MenuItem key={index.toString()} value={item}>
                      <TextField
                        name="minGrade"
                        component={Checkbox}
                        checked={minGrade.indexOf(item) > -1}
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
              <FormControl component="fieldset" required className={classes.formControl}>
                <Typography variant="h6">Which groups would you like to target?</Typography>
                <RadioGroup
                  aria-label="ethnicity"
                  name="ethnicity"
                  className={classes.group}
                  value={ethnicity}
                  onChange={(e) => this.handleReduxChange(e)}
                >
                  <FormControlLabel value="BAME" control={<Radio />} label="BAME" />
                  <FormControlLabel value="No preference" control={<Radio />} label="No preference" />
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
              Which sector is this role in ?
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
              Select keywords associated with the role to target students from
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
  selectedYear: PropTypes.object.isRequired,
  ethnicity: PropTypes.string.isRequired,
  interestedSectors: PropTypes.object.isRequired,
  workLocation: PropTypes.object.isRequired,
  experience: PropTypes.string.isRequired,
  minGrade: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  university: state.getIn([reducerCampaign, 'university']),
  languages: state.getIn([reducerCampaign, 'languages']),
  qualificationType: state.getIn([reducerCampaign, 'qualificationType']),
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
  societies: state.getIn([reducerCampaign, 'societies']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep3Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3);

export default withStyles(styles)(StepMapped);
