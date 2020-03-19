import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeEducationData, storeExperience } from 'dan-actions/studentProfileActions';
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

  handleSkillsInterests = () => {
    const {
      intrestedIndustries,
      skills,
      oldSkills,
      intrestedCompanies
    } = this.props;

    const data = {
      industries: intrestedIndustries,
      companies: intrestedCompanies,
      newSkills: skills,
      oldSkills: oldSkills,
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

    postData(`${API_URL}/student/create-personal-details`, data) // eslint-disable-line
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
      eduFrom: DateHelper.format(DateHelper.addDays(new Date(), -1480)),
      eduTo: DateHelper.format(DateHelper.addDays(new Date(), -30)),
      grade: ''
    }
    MapEducationInfo.push(formObject);

    addEducationInfo({ educationInfo: MapEducationInfo });
    console.log(educationInfo)
  }

  removeEducationField = itemId => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const newEducationArr = arrayRemove(MapEducationInfo, itemId);
    addEducationInfo({ educationInfo: newEducationArr });
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
    console.log(experienceInfo)
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
          <EditEducation id={item.id} />
        </Fragment>
      }
      else {
        return <EditEducation id={item.id} key={index} />
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
  addExperienceInfo: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
  educationInfo: state.getIn([reducerStudent, 'educationInfo']),
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
  oldSkills: state.getIn([reducerStudent, 'oldSkills'])
});

const mapDispatchToProps = dispatch => ({
  addEducationInfo: bindActionCreators(storeEducationData, dispatch),
  addExperienceInfo: bindActionCreators(storeExperience, dispatch)
});

const EditStudentDetailsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudentDetails);

export default withStyles(styles)(EditStudentDetailsMapped);

