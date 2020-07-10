import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { storeEducation } from 'dan-actions/studentProfileActions';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import {
  degreeGradesItems,
  qualificationOption,
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


function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

class EditEducation extends React.Component {
  state = {
    key: ''
  }

  handleChange = (event, id, scoreIndex) => {
    this.props.handleIsChanges('education')
    const { educationInfo, addInfo, } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const newEducationArr = MapEducationInfo.map((item, index) => {
      if (index == id) {
        if (event.target.name == 'type') {
          if (event.target.value == 'Secondary School') {
            return {
              ...item,
              subject: [],
              score: [],
              [event.target.name]: event.target.value
            };
          }
          return {
            ...item,
            subject: '',
            [event.target.name]: event.target.value
          };
        } else if (event.target.name == 'qualification_type' && item.type != 'University') {
          if (event.target.value == 'Other') {
            return {
              ...item,
              subject: '',
              score: [],
              [event.target.name]: event.target.value
            }
          }
          return {
            ...item,
            subject: [],
            score: [],
            [event.target.name]: event.target.value
          }
        } else if (event.target.name == 'subject') {
          return {
            ...item,
            score: [],
            [event.target.name]: event.target.value
          }
        } else if (event.target.name == 'score' && item.type == 'Secondary School') {
          let newScoreArr = item.score;
          newScoreArr[scoreIndex] = event.target.value;

          return {
            ...item,
            score: newScoreArr
          }
        }
        return {
          ...item,
          [event.target.name]: event.target.value
        };
      }
      return {
        ...item
      };
    });

    addInfo({ ...this.props, educationInfo: newEducationArr });
  };

  search = (e) => {
    this.setState({ key: e.target.value })
  }

  render() {
    const { classes, id, educationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const {
      type,
      qualification_type,
      university_name,
      institute_name,
      subject,
      from,
      to,
      score
    } = MapEducationInfo[id];


    let qualificationTypeItems = [];
    let subjectData = [];
    let scoreData = [];
    let subjectScoreJSX = [];

    if (type == 'University') {
      qualificationTypeItems = qualificationOption;
      subjectData = courses;
      scoreData = degreeGradesItems;
    }
    else if (type == 'Secondary School') {
      qualificationTypeItems = schoolQualificationTypeItems;
      if (qualification_type == 'A-level') {
        subjectData = aLevelScotishSubjectItems
        scoreData = aLevelGradesItems
      } else if (qualification_type == 'International Baccalaureate') {
        subjectData = ibSubjectsItems
        scoreData = ibScoreItems
      } else if (qualification_type == 'Scottish Highers/Advanced Highers') {
        subjectData = aLevelScotishSubjectItems
        scoreData = scottishGradesItems
      }

      var subjectArr = subject;
      if (qualification_type == 'Other') {
        let subjectString = subject.replace(/\s*,\s*/g, ",").trim();
        if (subjectString.length > 0) {
          subjectArr = subjectString.split(',');
        } else {
          subjectArr = []
        }
      }

      subjectScoreJSX = subjectArr.map((item, index) => {
        return (
          <div key={index.toString()}>
            <FormControl className={classes.formControl} >
              <Grid container spacing={2} >
                <Grid item md={8} xs={12} >
                  <TextField
                    label="Subject Name"
                    className={classes.textField}
                    value={item}
                    variant="outlined"
                    margin="normal"
                    readOnly
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  {scoreData.length == 0 ?
                    <div>
                      <FormControl className={classes.formControl}>
                        <TextField
                          label="Score Achieved"
                          className={classes.textField}
                          type="text"
                          margin="normal"
                          value={(score[index] == undefined || score[index] == null) ? '' : score[index]}
                          name="score"
                          variant="outlined"
                          onChange={e => this.handleChange(e, id, index)}
                        />
                      </FormControl>
                    </div>
                    :
                    <div>
                      <FormControl className={classes.formControl} style={{ marginBottom: 0 }}>
                        <InputLabel
                          htmlFor="Score Achieved"
                        >
                          Score Achieved
                          </InputLabel>
                        <Select
                          placeholder="Score Achieved"
                          value={(score[index] == undefined || score[index] == null) ? '' : score[index]}
                          name="score"
                          onChange={e => this.handleChange(e, id, index)}
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
                </Grid>
              </Grid>
            </FormControl>
          </div>
        )
      });
    }

    return (
      <section className={classes.pageFormWrap}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="Institution Type"
            >
              Institution Type
            </InputLabel>
            <Select
              placeholder="Institution Type"
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
              htmlFor="Qualification Type"
            >
              Qualification Type
            </InputLabel>
            <Select
              placeholder="Qualification Type"
              value={qualification_type}
              name='qualification_type'
              onChange={e => this.handleChange(e, id)}
              MenuProps={MenuProps}
            >
              {qualificationTypeItems.map((item, index) => (
                item.length > 0 &&
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {type == 'University' &&
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="University Name"
              >
                University Name
              </InputLabel>
              <Select
                placeholder="University Name"
                value={university_name}
                name="university_name"
                onChange={e => this.handleChange(e, id)}
                MenuProps={MenuProps}
              >
                {universityItems.map((item, index) => (
                  item.length > 0 &&
                  <MenuItem key={index} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        }
        {type == 'Secondary School' &&
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                label="Institution Name"
                className={classes.textField}
                type="text"
                value={institute_name}
                name="institute_name"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChange(e, id)}
              />
            </FormControl>
          </div>
        }
        {(type != 'University' && qualification_type == 'Other') ?
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
              <Typography variant="caption" >(Mention all your subjects here and seperate them by comma)</Typography>
            </FormControl>
            {subjectScoreJSX}
          </div>
          :
          type == 'University'
            ?
            <div>
              <FormControl className={classes.formControl} >
                <Autocomplete
                  options={subjectData}
                  value={subject}
                  autoHighlight
                  onChange={e => {
                    const data = {
                      target: {
                        name: 'subject',
                        value: e.target.textContent
                      }
                    }
                    this.handleChange(data, id)
                  }}
                  getOptionLabel={(option) => option}
                  renderOption={(option) => (
                    <React.Fragment>
                      {option}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: '100%', marginTop: 20 }}
                      {...params}
                      label="Subject"
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </FormControl>
            </div>
            :
            <Fragment>
              <div style={{ marginTop: 10 }}>
                <FormControl className={classes.customFormControl}>
                  <Autocomplete
                    style={{ width: '100%' }}
                    multiple
                    value={subject}
                    onChange={(e, option) => {
                      const data = {
                        target: {
                          name: 'subject',
                          value: option
                        }
                      }
                      this.handleChange(data, id)
                    }}
                    options={arrayRemove(subjectData, '')}
                    getOptionLabel={option => option}
                    renderOption={option => option}
                    freeSolo={false}
                    disableCloseOnSelect={true}
                    renderInput={params => (
                      <TextField
                        style={{ width: '100%' }}
                        {...params}
                        label={'Subjects'}
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </div>
              {subjectScoreJSX}
              {(qualification_type == 'International Baccalaureate' && subject.length > 0) &&
                <div>
                  <FormControl className={classes.formControl}>
                    <Grid container spacing={2} >
                      <Grid item md={8} xs={12} >
                        <TextField
                          label="Total IB Score"
                          className={classes.textField}
                          value={'Total IB Score'}
                          margin="normal"
                          variant="outlined"
                          readOnly
                          style={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <div>
                          <FormControl className={classes.formControl}>
                            <TextField
                              label="Score Achieved"
                              className={classes.textField}
                              type="text"
                              value={score[subject.length] == undefined || score[subject.length] == null ? '' : score[subject.length]}
                              name="score"
                              margin="normal"
                              variant="outlined"
                              onChange={e => this.handleChange(e, id, subject.length)}
                            />
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </FormControl>
                </div>
              }
            </Fragment>
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
        {type == 'University' &&
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
