import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { CreateBulkEmail } from 'dan-components';
import { emailInfoRemove, emailInfoInit } from 'dan-actions/BulkEmailActions';
import { universityItems, keywordsData, skillMenu } from 'dan-api/apps/profileOption';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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

function boolNumberToString(num) {
  return num === 0 ? 'no' : 'yes';
}

function getIds(arr, data) {
  return arr.map(item => {
    return data.indexOf(item);
  })
}

function getIdsItem(arr, data) {
  return arr.map(item => {
    return data[item];
  })
}

function getStudentIds(studentList) {
  return studentList.map(item => {
    return item.id
  })
}

var createdAt = null;

class BulkEmailEdit extends React.Component {
  state = {
    errorMessage: '',
    flash: false,
    openStyle: false,
    messageType: 'error',
    notifyMessage: ''
  }

  handleCloseStyle = () => {
    this.setState({ openStyle: false });
  }

  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  }


  componentWillMount() {
    const _that = this;
    const data = {
      bulkEmailId: atob(this.props.match.params.bulkEmailId)
    };

    postJSON(`${API_URL}/bulkemail/get-bulkemail-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const subjects = stringToArray(res.data.info.subjects);
          const gender = stringToArray(res.data.info.gender);
          const selectedYear = stringToArray(res.data.info.selected_year);
          const interestedSectors = stringToArray(res.data.info.sectors);
          const minGrade = stringToArray(res.data.info.min_grade);
          const keywords = getIdsItem(JSON.parse(res.data.info.keywords), keywordsData);
          const university = getIdsItem(JSON.parse(res.data.info.university), universityItems);
          const skills = getIdsItem(JSON.parse(res.data.info.skills), skillMenu);
          const workLocation = stringToArray(res.data.info.location);
          const experience = boolNumberToString(res.data.info.experience);
          const blackList = JSON.parse(res.data.info.black_list);
          const languages = stringToArray(res.data.info.languages);
          const qualificationType = stringToArray(res.data.info.qualification_type);

          let roleData = [];
          roleData.push(res.data.info.roleData);
          createdAt = res.data.info.created_at;

          const bulkEmailData = {
            ...this.props,
            audience: res.data.info.audience,
            languages,
            qualificationType,
            roleName: roleData[0].role_name,
            roleData: roleData,
            name: res.data.info.name,
            role: res.data.info.role,
            gender,
            university,
            keywords,
            selectedYear,
            ethnicity: res.data.info.ethnicity,
            interestedSectors,
            workLocation,
            experience,
            minGrade,
            subjects,
            skills,
            heading: res.data.info.heading,
            body: res.data.info.body,
            blackList
          };
          _that.props.bulkEmailInit(bulkEmailData);
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitForm = () => {
    const {
      workLocation,
      interestedSectors,
      university,
      subjects,
      skills,
      keywords,
      gender,
      history,
      removeInfo,
      studentList,
      blackList,
      languages,
      qualificationType
    } = this.props;

    const MapWorkLocation = workLocation.toJS();
    const MapInterestedSectors = interestedSectors.toJS();
    const MapSubjects = subjects.toJS();
    const MapGender = gender.toJS();
    const MapSkills = getIds(skills.toJS(), skillMenu);
    const MapKeywords = getIds(keywords.toJS(), keywordsData);
    const MapUniversity = getIds(university.toJS(), universityItems);
    const MapStudentList = getStudentIds(studentList.toJS());
    const MapBlackList = blackList.toJS();
    const MapLanguages = languages.toJS();
    const MapQualificationType = qualificationType.toJS();


    const data = {
      ...this.props,
      languages: MapLanguages,
      qualificationType: MapQualificationType,
      workLocation: MapWorkLocation,
      interestedSectors: MapInterestedSectors,
      subjects: MapSubjects,
      university: JSON.stringify(MapUniversity),
      keywords: JSON.stringify(MapKeywords),
      skills: JSON.stringify(MapSkills),
      gender: MapGender,
      studentList: JSON.stringify(MapStudentList),
      blackList: JSON.stringify(MapBlackList),
      bulkEmailId: atob(this.props.match.params.bulkEmailId)
    };

    if (this.props.body.split('<p>').length >= 4) {

      postJSON(`${API_URL}/bulkemail/update-approve-bulkemail`, data) // eslint-disable-line
        .then((res) => {
          if (res.status === 1) {
            removeInfo();
            history.push('/admin');
          } else {
            console.log('something not good ');
          }
        })
        .catch((err) => {
          console.log(err);
        });

    } else {
      this.setState({ notifyMessage: 'Mail Body is not good, Please use editor to write email', messageType: 'error', openStyle: true })
    }
  };

  render() {
    const title = brand.name + ' - Bulk Email';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <CreateBulkEmail onSubmit={() => this.submitForm()} />
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
      </div>
    );
  }
}

BulkEmailEdit.propTypes = {
  history: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired,
  gender: PropTypes.object.isRequired,
  university: PropTypes.object.isRequired,
  keywords: PropTypes.object.isRequired,
  selectedYear: PropTypes.object.isRequired,
  ethnicity: PropTypes.string.isRequired,
  interestedSectors: PropTypes.object.isRequired,
  workLocation: PropTypes.object.isRequired,
  experience: PropTypes.string.isRequired,
  minGrade: PropTypes.object.isRequired,
  subjects: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  studentList: PropTypes.object.isRequired,
  blackList: PropTypes.object.isRequired,
  removeInfo: PropTypes.func.isRequired
};

const reducerBulkEmail = 'bulkEmail';

const mapStateToProps = state => ({
  languages: state.getIn([reducerBulkEmail, 'languages']),
  qualificationType: state.getIn([reducerBulkEmail, 'qualificationType']),
  name: state.getIn([reducerBulkEmail, 'name']),
  role: state.getIn([reducerBulkEmail, 'role']),
  gender: state.getIn([reducerBulkEmail, 'gender']),
  university: state.getIn([reducerBulkEmail, 'university']),
  keywords: state.getIn([reducerBulkEmail, 'keywords']),
  selectedYear: state.getIn([reducerBulkEmail, 'selectedYear']),
  ethnicity: state.getIn([reducerBulkEmail, 'ethnicity']),
  interestedSectors: state.getIn([reducerBulkEmail, 'interestedSectors']),
  workLocation: state.getIn([reducerBulkEmail, 'workLocation']),
  experience: state.getIn([reducerBulkEmail, 'experience']),
  minGrade: state.getIn([reducerBulkEmail, 'minGrade']),
  subjects: state.getIn([reducerBulkEmail, 'subjects']),
  skills: state.getIn([reducerBulkEmail, 'skills']),
  heading: state.getIn([reducerBulkEmail, 'heading']),
  body: state.getIn([reducerBulkEmail, 'body']),
  studentList: state.getIn([reducerBulkEmail, 'studentList']),
  blackList: state.getIn([reducerBulkEmail, 'blackList']),
  audience: state.getIn([reducerBulkEmail, 'audience']),
});

const mapDispatchToProps = dispatch => ({
  removeInfo: bindActionCreators(emailInfoRemove, dispatch),
  bulkEmailInit: bindActionCreators(emailInfoInit, dispatch)
});

const BulkEmailEditMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkEmailEdit);

export default withStyles(messageStyles)(BulkEmailEditMapped);
