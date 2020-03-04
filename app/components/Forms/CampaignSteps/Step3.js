import React, { Fragment } from 'react';
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
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import AddIcon from '@material-ui/icons/Add';
import { storeStep3Info } from 'dan-actions/CampaignActions';
import SelectAdd from '../../SelectAdd/SelectAdd';
import {
  subjectMenu,
  years,
  grade,
  skillMenu,
  locationData,
  sectorsData
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
    dataValue: null,
    open: false,
    dialogValue: { id: '', value: '' },
    customKeyword: '',
    sector: '',
    suggestedKeywords: [
      { id: 15, status: false, value: 'Job' },
      { id: 16, status: false, value: 'Fresher' },
      { id: 18, status: false, value: 'Entry Level' },
      { id: 19, status: false, value: 'Experienced' }
    ],
    universityMenu: [
      { id: 15, status: false, value: 'Oxford' },
      { id: 16, status: false, value: 'RGPV' },
      { id: 17, status: false, value: 'IIST University' },
      { id: 18, status: false, value: 'Oriental University' },
    ],
    genderMenu: [
      { status: false, value: 0, label: 'Prefer not to say' },
      { status: false, value: 1, label: 'Men' },
      { status: false, value: 2, label: 'Women' },
      { status: false, value: 3, label: 'Non-binary' },
    ]
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleReduxChange = event => {
    const {
      university,
      subjects,
      skills,
      keywords,
      gender,
      selectedYear,
      ethnicity,
      interestedSectors,
      workLocation,
      experience,
      minGrade,
      addInfo
    } = this.props;

    if (event.target.name === 'selectedYear') {
      addInfo({
        university,
        subjects,
        skills,
        keywords,
        gender,
        selectedYear: event.target.value,
        ethnicity,
        interestedSectors,
        workLocation,
        experience,
        minGrade
      });
    }
    if (event.target.name === 'minGrade') {
      addInfo({
        university,
        subjects,
        skills,
        keywords,
        gender,
        selectedYear,
        ethnicity,
        interestedSectors,
        workLocation,
        experience,
        minGrade: event.target.value
      });
    }
    if (event.target.name === 'experience') {
      addInfo({
        university,
        subjects,
        skills,
        keywords,
        gender,
        selectedYear,
        ethnicity,
        interestedSectors,
        workLocation,
        experience: event.target.value,
        minGrade
      });
    }
    if (event.target.name === 'ethnicity') {
      addInfo({
        university,
        subjects,
        skills,
        keywords,
        gender,
        selectedYear,
        ethnicity: event.target.value,
        interestedSectors,
        workLocation,
        experience,
        minGrade
      });
    }
  };

  handleMultiSelect = (event) => {
    const { value } = event.target;

    const {
      university,
      subjects,
      skills,
      keywords,
      gender,
      selectedYear,
      ethnicity,
      interestedSectors,
      workLocation,
      experience,
      minGrade,
      addInfo
    } = this.props;
    if (event.target.name == 'university') {
      addInfo({
        university: value,
        subjects,
        skills,
        keywords,
        gender,
        selectedYear,
        ethnicity,
        interestedSectors,
        workLocation,
        experience,
        minGrade
      });
    }
    if (event.target.name == 'subjects') {
      addInfo({
        university,
        subjects: value,
        skills,
        keywords,
        gender,
        selectedYear,
        ethnicity,
        interestedSectors,
        workLocation,
        experience,
        minGrade
      });
    }
    if (event.target.name == 'skills') {
      addInfo({
        university,
        subjects,
        skills: value,
        keywords,
        gender,
        selectedYear,
        ethnicity,
        interestedSectors,
        workLocation,
        experience,
        minGrade
      });
    }
  };

  handleGender = (value) => {
    const {
      university,
      subjects,
      skills,
      keywords,
      gender,
      selectedYear,
      ethnicity,
      interestedSectors,
      workLocation,
      experience,
      minGrade,
      addInfo
    } = this.props;

    const MapGender = gender.toJS();
    if (MapGender.indexOf(value) === -1) {
      MapGender.push(value);
    } else {
      const index = MapGender.indexOf(value);
      if (index > -1) {
        MapGender.splice(index, 1);
      }
    }

    addInfo({
      university,
      subjects,
      skills,
      keywords,
      gender: MapGender,
      selectedYear,
      ethnicity,
      interestedSectors,
      workLocation,
      experience,
      minGrade
    });
  };

  handleCustomKeyword = () => {

  };

  handleSuggestedKeyword = (id) => {
    const { suggestedKeywords } = this.state;
    const {
      university,
      subjects,
      skills,
      keywords,
      gender,
      selectedYear,
      ethnicity,
      interestedSectors,
      workLocation,
      experience,
      minGrade,
      addInfo
    } = this.props;

    const newSuggestedKeywords = suggestedKeywords.map((item) => {
      if (item.id === id) {
        return {
          id,
          status: !item.status,
          value: item.value
        };
      }
      return item;
    });

    this.setState({ suggestedKeywords: newSuggestedKeywords });

    const MapKeywords = keywords.toJS();
    if (MapKeywords.indexOf(id) === -1) {
      MapKeywords.push(id);
    }

    addInfo({
      university,
      subjects,
      skills,
      keywords: MapKeywords,
      gender,
      selectedYear,
      ethnicity,
      interestedSectors,
      workLocation,
      experience,
      minGrade
    });
  }

  render() {
    const {
      classes,
      keywords,
      gender,
      university,
      subjects,
      skills,
      selectedYear,
      ethnicity,
      experience,
      minGrade,
      workLocation
    } = this.props;

    const {
      customKeyword,
      suggestedKeywords,
      genderMenu,
      universityMenu,
      sector
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

    const selectedKeywords = suggestedKeywords.map((item, index) => {
      if (item.status === true || keywords.includes(item.id)) {
        return (
          <Typography
            variant="subtitle1"
            className={classes.choosenTerms}
            key={index.toString()}
          >
            {item.value}
          </Typography>
        );
      }
      return false;
    });

    const selectedSectors = null;

    const keywordList = suggestedKeywords.map((item, index) => {
      if (item.status === false && !keywords.includes(item.id)) {
        return (
          <Fragment key={index.toString()}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => this.handleSuggestedKeyword(item.id)}
            >
              +
              {' '}
              {item.value}
            </Button>
          </Fragment>
        );
      }
      return false;
    });

    return (
      <div className={(classes.root, classes.step3Root)}>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={(classes.customWidth, classes.formControl)}>
                <Typography variant="h6">
                  Specify Universities for algorithm to prefer
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
                <Typography variant="h6">Specify precise gender for the algorithm to give preference to</Typography>
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
                  Specify subjects for algorithm to prefer
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
                  Specify Skills for algorithm to prefer
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
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl className={classes.formControl}>
                <Typography variant="h6">
                  Specify Years for algorithm to prefer
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
                  Specify Minimum Grade required for algorithm to prefer
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
                <Typography variant="h6">Select Ethnicity</Typography>
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
                <Typography variant="h6">Experience Required</Typography>
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
                Locations they are willing to work
              </Typography>
              <SelectAdd classes={this.props.classes} dataList={locationData} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" style={{ textAlign: 'left' }}>
              Interested Sectors to specify
            </Typography>
            <SelectAdd classes={this.props.classes} dataList={sectorsData} />
          </Grid>
          {/* <Grid className={classes.customGrid}>
            {selectedSectors !== null && selectedSectors}
          </Grid>
          <Grid style={{ width: '100%' }}>
            <TextField
              name="sector"
              placeholder="For example : IT"
              value={sector}
              className={classes.textField}
              margin="normal"
              variant="filled"
              onChange={(e) => this.handleChange(e)}
              style={{ width: '100%' }}
            />
            <Grid>
              <Tooltip title="Add New">
                <Button
                  variant="text"
                  color="secondary"
                  style={{ textAlign: 'left' }}
                >
                  <AddIcon />
                  Add New
                </Button>
              </Tooltip>
            </Grid>
          </Grid> */}
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid>
            <Typography variant="h6" style={{ textAlign: 'left' }}>
              Specify key words for the algorithm to prefer
            </Typography>
          </Grid>
          <Grid className={classes.customGrid}>
            {selectedKeywords !== null && selectedKeywords}
          </Grid>
          <Grid style={{ width: '100%' }}>
            <TextField
              name="customKeyword"
              placeholder="For example : Something"
              value={customKeyword}
              className={classes.textField}
              margin="normal"
              variant="filled"
              onChange={(e) => this.handleChange(e)}
              style={{ width: '100%' }}
            />
            <Grid>
              <Tooltip title="Add New">
                <Button
                  variant="text"
                  color="secondary"
                  style={{ textAlign: 'left' }}
                >
                  <AddIcon />
                  Add New
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid>
            <Typography variant="h6" style={{ textAlign: 'left', marginBottom: '5px' }}>
              Suggested Keywords for you
            </Typography>
            <Grid container>
              {keywordList}
            </Grid>
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
  interestedSectors: PropTypes.string.isRequired,
  workLocation: PropTypes.string.isRequired,
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
