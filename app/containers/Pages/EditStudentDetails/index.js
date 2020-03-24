import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeEducationData, storeExperience, studentProfileInit, storeSkillInterestsInit, storeEducationDataInit, storeExperienceInit } from 'dan-actions/studentProfileActions';
import { skillMenu } from 'dan-api/apps/profileOption';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';
import {
  EditPersonalDetails, EditSkillsInterests,
  EditEducation, EditExperience
}
  from 'dan-components';
import { DateHelper } from '../../../redux/helpers/dateTimeHelper';
import styles from '../../../components/Forms/user-jss';

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele.id != value;
  });
}
function getIds(arr, data) {
  return arr.map(item => {
    return data.indexOf(item);
  })
}
function stringToArray(string) {
  const splitArray = string.split(',');
  const data = [];
  splitArray.map(item => {
    if (isNaN(item)) {
      data.push(item);
    }
    else if (item > 1000) {
      data.push(item);
    }
    else if (typeof item == 'string' && item.length > 0) {
      data.push(item);
    }
  });
  return data;
}
function getIdsItem(arr, data) {
  return arr.map(item => {
    return data[item];
  })
}
async function postJSON(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}
function formatDeadline(dateStr) {
  const d = new Date(dateStr)
  const year = d.getFullYear()
  let month = d.getMonth() + 1;
  let date = d.getDate();
  if (month < 10) {
    month = `0` + month;
  }
  if (date < 10) {
    date = `0` + date;
  }
  return (year + '-' + month + '-' + date);
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });
  return await response.json();
}
const user = JSON.parse(
  makeSecureDecrypt(localStorage.getItem('user'))
);

class EditStudentDetails extends Component {
  state = {
    tab: 0
  }
  componentWillMount() {
    const _that = this;
    const data = {
      user_id: user.id
    };
    postData(`${API_URL}/student/get-personal-details`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {

          const firstName = res.data.firstname;
          const lastName = res.data.lastname;
          const alternateEmail = res.data.email;
          const phoneNumber = res.data.phone;
          const dob = formatDeadline(res.data.dob);
          const nationality = stringToArray(res.data.nationality);
          const ethnicity = stringToArray(res.data.ethnicity);
          const gender = stringToArray(res.data.gender);
          const studentProfileData = {
            firstName,
            lastName,
            alternateEmail,
            phoneNumber,
            dob,
            nationality,
            ethnicity,
            gender
          };
          _that.props.studentInit(studentProfileData);
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });

    postData(`${API_URL}/student/get-skills-interests`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const intrestedIndustries = stringToArray(res.data.industries);
          const intrestedCompanies = stringToArray(res.data.companies);
          const skills = getIdsItem(res.data.skills, skillMenu);
          const oldSkills = getIdsItem(res.data.skills, skillMenu);
          const studentEditSkillData = {
            intrestedIndustries,
            intrestedCompanies,
            skills,
            oldSkills
          };
          _that.props.studentSkillInterestsInit(studentEditSkillData);
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    postData(`${API_URL}/student/get-education`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const educationInfo = res.data;
          const oldEducationInfo = res.data;
          const studentEducationData = {
            educationInfo,
            oldEducationInfo,
          };
          _that.props.studentEducationInit(studentEducationData);
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleEducation = () => {
    const { educationInfo, oldEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const MapoldEducationInfo = oldEducationInfo.toJS();

    const data = {
      newEducationInfo: MapEducationInfo,
      oldEducationInfo: MapoldEducationInfo,
      user_id: user.id,
    };
    postJSON(`${API_URL}/student/create-education`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          console.log("sucessfull")
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  handleSkillsInterests = () => {
    const {
      intrestedIndustries,
      skills,
      oldSkills,
      intrestedCompanies
    } = this.props;

    const MapSkills = getIds(skills.toJS(), skillMenu);
    const MapOldSkills = getIds(oldSkills.toJS(), skillMenu)

    const data = {
      industries: intrestedIndustries,
      companies: intrestedCompanies,
      newSkills: MapSkills,
      oldSkills: MapOldSkills,
      user_id: user.id
    };
    postJSON(`${API_URL}/student/create-skills-interests`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          console.log("sucessfull")
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handlePersonalDetails = () => {
    const {
      phoneNumber,
      dob,
      nationality,
      files,
      ethnicity,
      gender
    } = this.props;
    const data = {
      phone: phoneNumber,
      dob: dob,
      gender: gender,
      ethnicity: ethnicity,
      nationality: nationality,
      resume: '',
      user_id: user.id
    };
    postData(`${API_URL} / student / create - personal - details`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          console.log("sucessfull")
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };
  addEducationField = (e) => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const formObject = {
      id: MapEducationInfo.length,
      institute: '',
      qualification: '',
      course: '',
      education_from: '',
      education_to: '',
      grade: ''
    }
    MapEducationInfo.push(formObject);
    addEducationInfo({ educationInfo: MapEducationInfo });

  }
  removeEducationField = itemId => {

    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const newEducationArr = arrayRemove(MapEducationInfo, itemId);
    addEducationInfo({ ...this.props, educationInfo: newEducationArr });
  }
  addExperienceField = (e) => {
    const { experienceInfo, addExperienceInfo } = this.props;
    const MapExperienceInfo = experienceInfo.toJS();
    const fromObject = {
      id: MapExperienceInfo.length,
      company: '',
      role: '',
      roleDescription: ''
    }
    MapExperienceInfo.push(fromObject);
    addExperienceInfo({ experienceInfo: MapExperienceInfo });

  }
  removeExperienceField = itemId => {
    const { experienceInfo, addExperienceInfo } = this.props;
    const MapExperienceInfo = experienceInfo.toJS();
    const newExperienceArr = arrayRemove(MapExperienceInfo, itemId);
    addExperienceInfo({ experienceInfo: newExperienceArr })
  }
  render() {
    const { classes, educationInfo, experienceInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const MapExperienceInfo = experienceInfo.toJS();
    const { tab } = this.state;
    const EducationJSX = MapEducationInfo.map((item, index) => {
      if (item.id != 0) {
        return <Fragment key={index}>
          <div className={classes.btnArea}>
            <Button variant="text" color="secondary" onClick={e => this.removeEducationField(item.id)}>
              Remove
          </Button>
          </div>
          <EditEducation id={index} />

        </Fragment>
      }
      else {
        return <EditEducation id={index} key={index} />
      }
    });


    const ExperienceJSX = MapExperienceInfo.map((item, index) => {
      if (item.id != 0) {
        return <Fragment key={index}>
          <div className={classes.btnArea}>
            <Button variant="text" color="secondary" onClick={e => this.removeExperienceField(item.id)}>
              Remove
        </Button>
          </div>
          <EditExperience id={item.id} />
        </Fragment>

      } else {
        return <EditExperience id={item.id} key={index} />
      }
    })

    return (
      <Paper className={classes.fullWrap, classes.petal} >
        <Tabs
          value={tab}
          onChange={this.handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="Personal Details" />
          <Tab label="Skills & Interests" />
          <Tab label="Education" />
          <Tab label="Experience" />
        </Tabs>
        <section className={classes.pageFormWrap}>

          {tab === 0 && (
            <EditPersonalDetails handleSubmit={this.handlePersonalDetails} />
          )}
          {tab === 1 && (
            <EditSkillsInterests handleSubmit={this.handleSkillsInterests} />
          )}
          {tab === 2 && (
            <Fragment>
              {EducationJSX}
              <div className={classes.btnArea}>
                <Button variant="text" color="primary" onClick={e => this.addEducationField(e)}>
                  Add More
                  </Button>
              </div>
              <div className={classes.btnArea} style={{ marginTop: '35px' }}>
                <Button variant="contained" fullWidth color="primary" onClick={() => this.handleEducation()}>
                  Save Changes
              </Button>
              </div>
            </Fragment>
          )}
          {tab === 3 && (
            <Fragment>
              {ExperienceJSX}
              <div className={classes.btnArea}>
                <Button variant="text" color="primary" onClick={e => this.addExperienceField(e)}>
                  Add More
                  </Button>

              </div>
            </Fragment>
          )}

        </section>
      </Paper >
    );
  }
}

const reducerStudent = 'studentProfile';

EditStudentDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  educationInfo: PropTypes.object.isRequired,
  addEducationInfo: PropTypes.func.isRequired,
  experienceInfo: PropTypes.object.isRequired,
  addExperienceInfo: PropTypes.func.isRequired,
  studentInit: PropTypes.func.isRequired,
  studentSkillInterestsInit: PropTypes.func.isRequired,
  studentEducationInit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  educationInfo: state.getIn([reducerStudent, 'educationInfo']),
  oldEducationInfo: state.getIn([reducerStudent, 'oldEducationInfo']),
  experienceInfo: state.getIn([reducerStudent, 'experienceInfo']),
  firstName: state.getIn([reducerStudent, 'firstName']),
  lastName: state.getIn([reducerStudent, 'lastName']),
  alternateEmail: state.getIn([reducerStudent, 'alternateEmail']),
  phoneNumber: state.getIn([reducerStudent, 'phoneNumber']),
  dob: state.getIn([reducerStudent, 'dob']),
  gender: state.getIn([reducerStudent, 'gender']),
  ethnicity: state.getIn([reducerStudent, 'ethnicity']),
  nationality: state.getIn([reducerStudent, 'nationality']),
  files: state.getIn([reducerStudent, 'files']),
  intrestedIndustries: state.getIn([reducerStudent, 'intrestedIndustries']),
  intrestedCompanies: state.getIn([reducerStudent, 'intrestedCompanies']),
  skills: state.getIn([reducerStudent, 'skills']),
  oldSkills: state.getIn([reducerStudent, 'oldSkills']),

});

const mapDispatchToProps = dispatch => ({
  addEducationInfo: bindActionCreators(storeEducationData, dispatch),
  addExperienceInfo: bindActionCreators(storeExperience, dispatch),
  studentInit: bindActionCreators(studentProfileInit, dispatch),
  studentSkillInterestsInit: bindActionCreators(storeSkillInterestsInit, dispatch),
  studentEducationInit: bindActionCreators(storeEducationDataInit, dispatch),
});

const EditStudentDetailsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudentDetails);

export default withStyles(styles)(EditStudentDetailsMapped);