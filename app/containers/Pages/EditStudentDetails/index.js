import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  storeEducation,
  storeExperience
} from 'dan-actions/studentProfileActions';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';
import {
  EditPersonalDetails,
  EditSkillsInterests,
  EditEducation,
  EditExperience
}
  from 'dan-components';
import styles from '../../../components/Forms/user-jss';

function arrayRemove(arr, index) {
  let temp = [];
  arr.map((item, pos) => {
    if (pos != index) {
      temp.push(item);
    }
  });

  return temp;
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

class EditStudentDetails extends Component {
  state = {
    tab: 0
  }

  educationHandler = (data) => {
    postData(`${API_URL}/student/get-education`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          let educationInfo = [{
            university_qualification: '',
            from: '',
            to: '',
            score: '',
            subject: '',
            type: '',
            id: null
          }];
          let oldEducationInfo = [];

          if (res.data.length == 0) {
            const studentEducationData = {
              educationInfo,
              oldEducationInfo,
            };

            this.props.addEducationInfo(studentEducationData);
          }
          else {
            educationInfo = res.data.map((item, index) => {
              return {
                university_qualification: item.university_qualification,
                from: item.education_from,
                to: item.education_to,
                score: item.score,
                subject: item.subject,
                type: item.type,
                id: item.id
              }
            });

            oldEducationInfo = res.data.map((item, index) => {
              return {
                university_qualification: item.university_qualification,
                from: item.education_from,
                to: item.education_to,
                score: item.score,
                subject: item.subject,
                type: item.type,
                id: item.id
              }
            });

            const studentEducationData = {
              educationInfo,
              oldEducationInfo,
            };

            this.props.addEducationInfo(studentEducationData);
          }
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }
  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const data = { user_id: user.id };
    this.setState({ data: data });

    this.educationHandler(data);

    postData(`${API_URL}/student/get-experience`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          let experienceInfo = [{
            company: '',
            role: '',
            roleDescription: ''
          }];
          let oldExperienceInfo = [];

          if (res.data.length == 0) {
            const studentExperienceData = {
              experienceInfo,
              oldExperienceInfo,
            };

            this.props.addExperienceInfo(studentExperienceData);
          } else {
            experienceInfo = res.data.map((item, index) => {
              return {
                company: item.company,
                role: item.role,
                roleDescription: item.role_description
              }
            });

            oldExperienceInfo = res.data.map((item, index) => {
              return {
                company: item.company,
                role: item.role,
                roleDescription: item.role_description
              }
            });

            const studentExperienceData = {
              experienceInfo,
              oldExperienceInfo,
            };

            this.props.addExperienceInfo(studentExperienceData);
          }
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

  handleEducation = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const { educationInfo, oldEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    var MapOldEducationInfo = [];
    if (typeof oldEducationInfo == 'undefined') {
      MapOldEducationInfo = [];
    }
    else {
      MapOldEducationInfo = oldEducationInfo.toJS();
    }


    const data = {
      educationNew: MapEducationInfo,
      educationOld: MapOldEducationInfo,
      user_id: user.id,
    };
    var _that = this;
    postJSON(`${API_URL}/student/create-education`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const data = {
            user_id: user.id
          };
          _that.educationHandler(_that.state.data);
        } else {
          _that.educationHandler(_that.state.data);
        }
      })
      .catch((err) => {
        _that.educationHandler(_that.state.data);
      });
  }

  handleExperience = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const { experienceInfo, oldExperienceInfo } = this.props;
    const MapExperienceInfo = experienceInfo.toJS();
    const MapOldExperienceInfo = oldExperienceInfo.toJS();

    const data = {
      experienceNew: MapExperienceInfo,
      experienceOld: MapOldExperienceInfo,
      user_id: user.id,
    };

    console.log(data)

    postJSON(`${API_URL}/student/create-experience`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          console.log("sucessfull data updated")
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addEducationField = (e) => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const formObject = {
      type: '',
      university_qualification: '',
      subject: '',
      from: '',
      to: '',
      score: ''
    }

    MapEducationInfo.push(formObject);
    addEducationInfo({ ...this.props, educationInfo: MapEducationInfo });
  }

  removeEducationField = (index) => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();
    const newEducationArr = arrayRemove(MapEducationInfo, index);
    addEducationInfo({ ...this.props, educationInfo: newEducationArr });
  }

  addExperienceField = (e) => {
    const { experienceInfo, addExperienceInfo } = this.props;
    const MapExperienceInfo = experienceInfo.toJS();

    const formObject = {
      company: '',
      role: '',
      roleDescription: ''
    }

    MapExperienceInfo.push(formObject);
    addExperienceInfo({ ...this.props, experienceInfo: MapExperienceInfo });
  }

  removeExperienceField = (index) => {
    const { experienceInfo, addExperienceInfo } = this.props;
    const MapExperienceInfo = experienceInfo.toJS();
    const newExperienceArr = arrayRemove(MapExperienceInfo, index);
    addExperienceInfo({ ...this.props, experienceInfo: newExperienceArr });
  }

  render() {
    const { classes, educationInfo, experienceInfo } = this.props;
    const { tab } = this.state;

    const MapEducationInfo = educationInfo.toJS();
    const MapExperienceInfo = experienceInfo.toJS();

    const EducationJSX = MapEducationInfo.map((item, index) => {
      if (index != 0) {
        return <Fragment key={index.toString()}>
          <div className={classes.btnArea}>
            <Button variant="text" color="secondary" onClick={e => this.removeEducationField(index)}>
              Remove
            </Button>
          </div>
          <EditEducation id={index} />
        </Fragment>
      }
      else {
        return <EditEducation id={index} key={index.toString()} />
      }
    });

    const ExperienceJSX = MapExperienceInfo.map((item, index) => {
      if (index != 0) {
        return <Fragment key={index}>
          <div className={classes.btnArea}>
            <Button variant="text" color="secondary" onClick={e => this.removeExperienceField(index)}>
              Remove
            </Button>
          </div>
          <EditExperience id={index} />
        </Fragment>
      } else {
        return <EditExperience id={index} key={index} />
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
            <EditPersonalDetails />
          )}
          {tab === 1 && (
            <EditSkillsInterests />
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
              <div className={classes.btnArea} style={{ marginTop: '35px' }}>
                <Button variant="contained" fullWidth color="primary" onClick={() => this.handleExperience()}>
                  Save Changes
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
  oldEducationInfo: PropTypes.object.isRequired,
  experienceInfo: PropTypes.object.isRequired,
  oldExperienceInfo: PropTypes.object.isRequired,
  addEducationInfo: PropTypes.func.isRequired,
  addExperienceInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  educationInfo: state.getIn([reducerStudent, 'educationInfo']),
  oldEducationInfo: state.getIn([reducerStudent, 'oldEducationInfo']),
  experienceInfo: state.getIn([reducerStudent, 'experienceInfo']),
  oldExperienceInfo: state.getIn([reducerStudent, 'oldExperienceInfo'])
});

const mapDispatchToProps = dispatch => ({
  addEducationInfo: bindActionCreators(storeEducation, dispatch),
  addExperienceInfo: bindActionCreators(storeExperience, dispatch)
});

const EditStudentDetailsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudentDetails);

export default withStyles(styles)(EditStudentDetailsMapped);
