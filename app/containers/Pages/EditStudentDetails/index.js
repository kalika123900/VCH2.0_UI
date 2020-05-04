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
  storeExperience,
  storeLanguage
} from 'dan-actions/studentProfileActions';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';
import {
  EditPersonalDetails,
  EditSkillsInterests,
  EditLanguage,
  EditEducation,
  EditExperience,
  SetNewPassword
}
  from 'dan-components';
import styles from '../../../components/Forms/user-jss';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { DateHelper } from '../../../redux/helpers/dateTimeHelper';

function arrayRemove(arr, index) {
  let temp = [];
  arr.map((item, pos) => {
    if (pos != index) {
      temp.push(item);
    }
  });

  return temp;
}

function stringToArray(string) {
  const splitArray = string.split(',');

  const data = [];
  splitArray.map(item => {
    if (isNaN(item)) {
      data.push(item);
    } else if (item > 1000) {
      data.push(item);
    } else if (typeof item === 'string' && item.length > 0) {
      data.push(item);
    }
  });

  return data;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (date < 10) {
    date = '0' + date;
  }
  return (year + '-' + month + '-' + date);
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
  constructor(props) {
    super(props);
    const searchString = this.props.location.search.split('?tab=')

    if (searchString != "" && atob(searchString[1])) {
      this.state = {
        tab: parseInt(atob(searchString[1])),
        openStyle: false,
        messageType: 'error',
        notifyMessage: ''
      };
    } else {
      this.state = {
        tab: 0,
        openStyle: false,
        messageType: 'error',
        notifyMessage: ''
      };
    }
  }

  submitForm(values) {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const MappedValues = values.toJS();

    const data = {
      user_id: user.id,
      newPassword: MappedValues.password,
      oldPassword: MappedValues.oldPassword,
      type: 'student'
    }

    postData(`${API_URL}/utils/set-new-password`, data)
      .then((res) => {
        if (res.status === 1) {
          this.successMsg()
          this.resetTab();
        } else {
          this.setState({ notifyMessage: 'Old Password is not correct' });
          this.setState({ messageType: 'error' });
          this.setState({ openStyle: true });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  educationHandler = (data) => {
    postData(`${API_URL}/student/get-education`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          let educationInfo = [{
            id: null,
            type: '',
            qualification_type: '',
            university_name: null,
            institute_name: null,
            subject: '',
            from: '',
            to: '',
            score: ''
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
                id: item.id,
                type: item.type,
                qualification_type: item.qualification_type,
                university_name: item.university_name,
                institute_name: item.institute_name,
                subject: (item.type == 'Secondary School' && item.qualification_type != 'Other') ? stringToArray(item.subject) : item.subject,
                from: item.education_from,
                to: item.education_to,
                score: (item.type == 'Secondary School') ? stringToArray(item.score) : item.score,
              }
            });

            oldEducationInfo = res.data.map((item, index) => {
              return {
                id: item.id,
                type: item.type,
                qualification_type: item.qualification_type,
                university_name: item.university_name,
                institute_name: item.institute_name,
                subject: item.subject,
                from: item.education_from,
                to: item.education_to,
                score: item.score,
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

  languageHandler = (data) => {
    postData(`${API_URL}/student/get-language`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          let languageInfo = [{
            language: '',
            competency: '',
            id: null
          }];
          let oldLanguageInfo = [];

          if (res.data.length == 0) {
            const studentLanguageData = {
              languageInfo,
              oldLanguageInfo,
            };

            this.props.addLanguageInfo(studentLanguageData);
          }
          else {
            languageInfo = res.data.map((item, index) => {
              return {
                language: item.language,
                competency: item.competency,
                id: item.id
              }
            });

            oldLanguageInfo = res.data.map((item, index) => {
              return {
                language: item.language,
                competency: item.competency,
                id: item.id
              }
            });

            const studentLanguageData = {
              languageInfo,
              oldLanguageInfo,
            };

            this.props.addLanguageInfo(studentLanguageData);
          }
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  experienceHandler = (data) => {
    postData(`${API_URL}/student/get-experience`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          let experienceInfo = [{
            id: null,
            company: '',
            role: '',
            roleDescription: '',
            from: null,
            to: null
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
                id: item.id,
                company: item.company,
                role: item.role,
                roleDescription: item.role_description,
                from: formatDate(item.from),
                to: formatDate(item.to)
              }
            });

            oldExperienceInfo = res.data.map((item, index) => {
              return {
                id: item.id,
                company: item.company,
                role: item.role,
                roleDescription: item.role_description,
                from: formatDate(item.from),
                to: formatDate(item.to)
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

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const data = { user_id: user.id };
    this.setState({ data: data });

    this.languageHandler(data);
    this.educationHandler(data);
    this.experienceHandler(data);
  }

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  goNextTab = () => {
    this.setState({ tab: this.state.tab + 1 });
  }

  successMsg = () => {
    this.setState({ notifyMessage: 'Information updated' });
    this.setState({ messageType: 'success' });
    this.setState({ openStyle: true });
  }

  errorMsg = () => {
    this.setState({ notifyMessage: 'Information not updated' });
    this.setState({ messageType: 'error' });
    this.setState({ openStyle: true });
  }

  resetTab = () => {
    this.setState({ tab: 0 });
  }

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
      educationNew: MapEducationInfo.map(item => {
        if (item.type == 'Secondary School') {
          let scoreString = item.score.reduce((str1, str2) => {
            if (str1.length > 0) {
              return str1 + `,${str2}`
            }
            else {
              return str1 + `${str2}`
            }
          });
          if (item.qualification_type == 'Other') {
            return {
              ...item,
              score: scoreString,
              subject: item.subject.replace(/\s*,\s*/g, ",").trim()
            }
          } else {
            let subjectString = item.subject.reduce((str1, str2) => {
              if (str1.length > 0) {
                return str1 + `,${str2}`
              }
              else {
                return str1 + `${str2}`
              }
            });
            return {
              ...item,
              score: scoreString,
              subject: subjectString
            }
          }
        }
        return item
      }),
      educationOld: MapOldEducationInfo,
      user_id: user.id,
    };
    var _that = this;

    postJSON(`${API_URL}/student/create-education`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          _that.educationHandler(_that.state.data);
          this.successMsg();
          this.goNextTab();
        } else {
          _that.educationHandler(_that.state.data);
          this.errorMsg();
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
    var MapOldExperienceInfo = [];

    if (typeof oldExperienceInfo == 'undefined') {
      MapOldExperienceInfo = [];
    }
    else {
      MapOldExperienceInfo = oldExperienceInfo.toJS();
    }

    const data = {
      experienceNew: MapExperienceInfo,
      experienceOld: MapOldExperienceInfo,
      user_id: user.id,
    };
    var _that = this;

    postJSON(`${API_URL}/student/create-experience`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          _that.experienceHandler(_that.state.data);
          this.successMsg();
          this.goNextTab();
        } else {
          _that.experienceHandler(_that.state.data);
          this.errorMsg();
        }
      })
      .catch((err) => {
        _that.experienceHandler(_that.state.data);
      });
  }

  handleLanguage = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const { languageInfo, oldLanguageInfo } = this.props;
    const MapLanguageInfo = languageInfo.toJS();
    var MapOldLanguageInfo = [];

    if (typeof oldLanguageInfo == 'undefined') {
      MapOldLanguageInfo = [];
    }
    else {
      MapOldLanguageInfo = oldLanguageInfo.toJS();
    }

    const data = {
      languageNew: MapLanguageInfo,
      languageOld: MapOldLanguageInfo,
      user_id: user.id,
    };
    var _that = this;

    postJSON(`${API_URL}/student/create-language`, data) // eslint-disable-line
      .then((res) => {
        console.log(res)
        if (res.status === 1) {
          _that.languageHandler(_that.state.data);
          this.successMsg();
          this.goNextTab();
        } else {
          _that.languageHandler(_that.state.data);
          this.errorMsg();
        }
      })
      .catch((err) => {
        console.log(err)
        _that.languageHandler(_that.state.data);
      });
  }

  addLanguageField = (e) => {
    const { languageInfo, addLanguageInfo } = this.props;
    const MapLanguageInfo = languageInfo.toJS();

    const formObject = {
      id: null,
      language: '',
      competency: ''
    }

    MapLanguageInfo.push(formObject);
    addLanguageInfo({ ...this.props, languageInfo: MapLanguageInfo });
  }

  removeLanguageField = (index) => {
    const { languageInfo, addLanguageInfo } = this.props;
    const MapLanguageInfo = languageInfo.toJS();
    const newLanguageArr = arrayRemove(MapLanguageInfo, index);
    addLanguageInfo({ ...this.props, languageInfo: newLanguageArr });
  }

  addEducationField = (e) => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const formObject = {
      id: null,
      type: '',
      qualification_type: '',
      university_name: null,
      institute_name: null,
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
      id: null,
      company: '',
      role: '',
      roleDescription: '',
      from: null,
      to: null
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

  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  }

  handleCloseStyle = () => {
    this.setState({ openStyle: false });
  }

  render() {
    const { classes, educationInfo, experienceInfo, languageInfo } = this.props;
    const { tab } = this.state;

    const MapEducationInfo = educationInfo.toJS();
    const MapExperienceInfo = experienceInfo.toJS();
    const MapLanguageInfo = languageInfo.toJS();

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

    const LanguageJSX = MapLanguageInfo.map((item, index) => {
      if (index != 0) {
        return <Fragment key={index.toString()}>
          <div className={classes.btnArea}>
            <Button variant="text" color="secondary" onClick={e => this.removeLanguageField(index)}>
              Remove
            </Button>
          </div>
          <EditLanguage id={index} />
        </Fragment>
      }
      else {
        return <EditLanguage id={index} key={index.toString()} />
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
          <Tab label="Languages" />
          <Tab label="Skills & Interests" />
          <Tab label="Education" />
          <Tab label="Experience" />
          <Tab label="Security" />
        </Tabs>
        <section className={classes.pageFormWrap}>
          {tab === 0 && (
            <EditPersonalDetails goNextTab={this.goNextTab} successMsg={this.successMsg} errorMsg={this.errorMsg} />
          )}
          {tab === 1 && (
            <Fragment>
              {LanguageJSX}
              <div className={classes.btnArea}>
                <Button variant="text" color="primary" onClick={e => this.addLanguageField(e)}>
                  Add More
                </Button>
              </div>
              <div className={classes.btnArea} style={{ marginTop: '35px' }}>
                <Button variant="contained" fullWidth color="primary" onClick={() => this.handleLanguage()}>
                  Save Changes
                </Button>
              </div>
            </Fragment>
          )}
          {tab === 2 && (
            <EditSkillsInterests goNextTab={this.goNextTab} successMsg={this.successMsg} errorMsg={this.errorMsg} />
          )}
          {tab === 3 && (
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
          {tab === 4 && (
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
          {tab === 5 && (
            <SetNewPassword onSubmit={(values) => this.submitForm(values)} />
          )}
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.openStyle}
            autoHideDuration={6000}
            onClose={this.handleCloseStyle}
          >
            <SnackbarContent
              className={this.state.messageType == 'error' ? messageStyles.bgError : messageStyles.bgSuccess}
              aria-describedby="client-snackbar"
              message={(
                <span id="client-snackbar" className={classes.message}>
                  {
                    (this.state.messageType == 'error') && <ErrorIcon className="success" />
                  }
                  {
                    (this.state.messageType == 'success') && <CheckCircleIcon className="success" />
                  }

                  &nbsp;
                  {this.state.notifyMessage}
                </span>
              )}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.noticeClose}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
            />
          </Snackbar>
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
  languageInfo: PropTypes.object.isRequired,
  oldLanguageInfo: PropTypes.object.isRequired,
  experienceInfo: PropTypes.object.isRequired,
  oldExperienceInfo: PropTypes.object.isRequired,
  addEducationInfo: PropTypes.func.isRequired,
  addExperienceInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  educationInfo: state.getIn([reducerStudent, 'educationInfo']),
  oldEducationInfo: state.getIn([reducerStudent, 'oldEducationInfo']),
  experienceInfo: state.getIn([reducerStudent, 'experienceInfo']),
  oldExperienceInfo: state.getIn([reducerStudent, 'oldExperienceInfo']),
  languageInfo: state.getIn([reducerStudent, 'languageInfo']),
  oldLanguageInfo: state.getIn([reducerStudent, 'oldLanguageInfo'])
});

const mapDispatchToProps = dispatch => ({
  addEducationInfo: bindActionCreators(storeEducation, dispatch),
  addExperienceInfo: bindActionCreators(storeExperience, dispatch),
  addLanguageInfo: bindActionCreators(storeLanguage, dispatch)
});

const EditStudentDetailsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudentDetails);

export default withStyles(styles)(EditStudentDetailsMapped);
