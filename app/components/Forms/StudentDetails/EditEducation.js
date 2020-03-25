import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { storeEducation } from 'dan-actions/studentProfileActions';
import ListItemText from '@material-ui/core/ListItemText';
import {
  degreeGradesItems,
  institutionTypeItems,
  schoolQualificationTypeItems,
  aLevelScotishSubjectItems,
  aLevelGradesItems,
  scottishGradesItems,
  ibSubjectsItems,
  ibScoreItems,
  universityItems,
  courses,
  courseStartYearItems,
  graduationYearItems
} from 'dan-api/apps/profileOption';

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
  handleChange = (event, id) => {
    const { educationInfo, addInfo, } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const newEducationArr = MapEducationInfo.map((item, index) => {
      if (index == id) {
        return {
          ...item,
          [event.target.name]: event.target.value
        };
      } else {
        return {
          ...item
        };
      }
    });

    addInfo({ ...this.props, educationInfo: newEducationArr });
  };

  render() {
    const { classes, id, educationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const {
      type,
      university_qualification,
      subject,
      from,
      to,
      score
    } = MapEducationInfo[id];

    let universityQualificationData = [];
    let subjectData = [];
    let scoreData = [];

    if (type == 'University') {
      universityQualificationData = universityItems;
      subjectData = courses;
      scoreData = degreeGradesItems;
    }
    else if (type == 'Secondary School') {
      universityQualificationData = schoolQualificationTypeItems;
      if (university_qualification == 'A-level') {
        subjectData = aLevelScotishSubjectItems
        scoreData = aLevelGradesItems
      } else if (university_qualification == 'International Baccalaureate') {
        subjectData = ibSubjectsItems
        scoreData = ibScoreItems
      } else if (university_qualification == 'Scottish Highers/Advanced Highers') {
        subjectData = aLevelScotishSubjectItems
        scoreData = scottishGradesItems
      }
    }

    return (
      <section className={classes.pageFormWrap}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="Qualification Type"
            >
              Qualification Type
            </InputLabel>
            <Select
              placeholder="Qualification Type"
              value={type}
              name="type"
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
              htmlFor="Qualification From"
            >
              Qualification From
            </InputLabel>
            <Select
              placeholder="Qualification From"
              value={university_qualification}
              name="university_qualification"
              onChange={e => this.handleChange(e, id)}
              MenuProps={MenuProps}
            >
              {universityQualificationData.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {subjectData.length == 0 ?
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="Subject"
                className={classes.textField}
                type="text"
                value={subject}
                name="subject"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChange(e, id)}
              />
            </FormControl>
          </div>
          :
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="Subject"
              >
                Subject
            </InputLabel>
              <Select
                placeholder="Subject"
                value={subject}
                name="subject"
                onChange={e => this.handleChange(e, id)}
                MenuProps={MenuProps}
              >
                {subjectData.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        }
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="Start Year"
            >
              Start Year
            </InputLabel>
            <Select
              placeholder="Start Year"
              value={from}
              name="from"
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
              htmlFor="End Year"
            >
              End Year
            </InputLabel>
            <Select
              placeholder="End Year"
              value={to}
              name="to"
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
        {scoreData.length == 0 ?
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="Score Achieved"
                className={classes.textField}
                type="text"
                value={score}
                name="score"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChange(e, id)}
              />
            </FormControl>
          </div>
          :
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="Score Achieved"
              >
                Score Achieved
            </InputLabel>
              <Select
                placeholder="Score Achieved"
                value={score}
                name="score"
                onChange={e => this.handleChange(e, id)}
                MenuProps={MenuProps}
              >
                {scoreData.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        }
      </section>
    );
  }
}

const reducerStudent = 'studentProfile';

EditEducation.propTypes = {
  classes: PropTypes.object.isRequired,
  educationInfo: PropTypes.object.isRequired,
  oldEducationInfo: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  educationInfo: state.getIn([reducerStudent, 'educationInfo']),
  oldEducationInfo: state.getIn([reducerStudent, 'oldEducationInfo']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeEducation, dispatch)
});

const EditEducationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEducation);

export default withStyles(styles)(EditEducationMapped);
