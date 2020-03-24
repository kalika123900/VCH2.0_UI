import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { storeEducationData } from 'dan-actions/studentProfileActions';
import ListItemText from '@material-ui/core/ListItemText';
import { degreeGradesItems, institutionTypeItems, schoolQualificationTypeItems, aLevelScotishSubjectItems, aLevelGradesItems, scottishGradesItems, ibSubjectsItems, ibScoreItems, universityItems, courses, courseStartYearItems, graduationYearItems } from 'dan-api/apps/profileOption';

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
class EditEducation extends React.Component {
  constructor(props) {
    super(props)
  }
  handleChange = (event, id) => {
    const { educationInfo, addEducationInfo, } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const newEducationArr = MapEducationInfo.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          [event.target.name]: event.target.value
        };
      };

      return item;
    })

    addEducationInfo({ ...this.props, educationInfo: newEducationArr });
    // if (event.target.value === 'Other') {
    //   addEducationInfo({ ...this.props, course: '' });
    // }
  };

  render() {
    const { classes, id, educationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const { institute, qualification, grade, education_from, education_to, course } = MapEducationInfo[this.props.id];
    var selectedQualification = [];
    var selectedcourses = [];
    var selectedGrade = [];

    if (institute == 'University') {
      selectedQualification = universityItems;
      selectedcourses = courses;
      selectedGrade = degreeGradesItems;
    } else if (institute == 'Secondary School') {
      selectedQualification = schoolQualificationTypeItems
      if (qualification == 'A-level') {
        selectedcourses = aLevelScotishSubjectItems
        selectedGrade = aLevelGradesItems
      } else if (qualification == 'International Baccalaureate') {
        selectedcourses = ibSubjectsItems
        selectedGrade = ibScoreItems
      } else if (qualification == 'Scottish Highers/Advanced Highers') {
        selectedcourses = aLevelScotishSubjectItems
        selectedGrade = scottishGradesItems
      } else if (qualification == 'Other') {
        selectedcourses = null;
        selectedGrade = null;
      }
    }
    return (
      <section className={classes.pageFormWrap}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="Institute Type"
            >
              Institute Type
            </InputLabel>
            <Select
              placeholder="Institute Type"
              value={institute}
              name="institute"
              onChange={e => this.handleChange(e, id)}
              MenuProps={MenuProps}
            >
              {institutionTypeItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="Qualification Type"
            >
              Qualification Type
            </InputLabel>
            <Select
              placeholder="Qualification Type"
              value={qualification}
              name="qualification"
              onChange={e => this.handleChange(e, id)}
              MenuProps={MenuProps}
            >
              {selectedQualification.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {selectedcourses == null ?
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="courses"
                className={classes.textField}
                type="text"
                value={course}
                name="course"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChange(e, id)}
              />
            </FormControl>
          </div> :
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="courses"
              >
                courses
            </InputLabel>
              <Select
                placeholder="course"
                value={course}
                name="course"
                onChange={e => this.handleChange(e, id)}
                MenuProps={MenuProps}
              >
                {selectedcourses.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>}
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="Course Start Year"
            >
              Course Start Year
            </InputLabel>
            <Select
              placeholder="Course Start Year"
              value={education_from}
              name="education_from"
              onChange={e => this.handleChange(e, id)}
              MenuProps={MenuProps}
            >
              {courseStartYearItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="Graduation Year"
            >
              Graduation Year
            </InputLabel>
            <Select
              placeholder="Graduation Year"
              value={education_to}
              name="education_to"
              onChange={e => this.handleChange(e, id)}
              MenuProps={MenuProps}
            >
              {graduationYearItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {selectedGrade == null ?
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="Grade Achieved"
                className={classes.textField}
                type="text"
                value={grade}
                name="grade"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChange(e, id)}
              />
            </FormControl>
          </div> :
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-grade"
              >
                Grade Achieved
            </InputLabel>
              <Select
                placeholder="Grade Achieved"
                value={grade}
                name="grade"
                onChange={e => this.handleChange(e, id)}
                MenuProps={MenuProps}
              >
                {selectedGrade.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>}
      </section>
    );
  }
}

const reducerStudent = 'studentProfile';

EditEducation.propTypes = {
  classes: PropTypes.object.isRequired,
  educationInfo: PropTypes.object.isRequired,
  addEducationInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  educationInfo: state.getIn([reducerStudent, 'educationInfo']),
});

const mapDispatchToProps = dispatch => ({
  addEducationInfo: bindActionCreators(storeEducationData, dispatch)
});

const EditEducationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEducation);

export default withStyles(styles)(EditEducationMapped);
