import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import brand from 'dan-api/dummy/brand';
import { CreateBulkEmail } from 'dan-components';
import { emailInfoRemove, emailInfoInit } from 'dan-actions/BulkEmailActions';
import { DateHelper } from '../../../redux/helpers/dateTimeHelper';
import { universityItems, keywordsData, skillMenu } from 'dan-api/apps/profileOption';

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

function alterDeadline(campaignTime) {
  let timestamp1 = new Date(campaignTime);
  let timestamp2 = new Date()
  let diff_in_days = parseInt((timestamp2 - timestamp1) / (1000 * 3600 * 24));

  return DateHelper.format(DateHelper.addDays(new Date(campaignTime), diff_in_days));
}

var createdAt = null;

class BulkEmailEdit extends React.Component {
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
          const deadline = formatDeadline(res.data.info.deadline);
          const keywords = getIdsItem(JSON.parse(res.data.info.keywords), keywordsData);
          const university = getIdsItem(JSON.parse(res.data.info.university), universityItems);
          const skills = getIdsItem(JSON.parse(res.data.info.skills), skillMenu);
          const workLocation = stringToArray(res.data.info.location);
          const experience = boolNumberToString(res.data.info.experience);
          const blackList = JSON.parse(res.data.info.black_list);

          let roleData = [];
          roleData.push(res.data.info.roleData);
          createdAt = res.data.info.created_at;

          const roleDeadline = formatDeadline(roleData[0].role_deadline);

          const bulkEmailData = {
            ...this.props,
            roleDeadline,
            roleName: roleData[0].role_name,
            roleData: roleData,
            name: res.data.info.name,
            role: res.data.info.role,
            gender,
            university,
            keywords,
            deadline,
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
            choosedDeadline: res.data.info.deadline_choice,
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
    } = this.props;

    const MapWorkLocation = workLocation.toJS();
    const MapInterestedSectors = interestedSectors.toJS();
    const MapSubjects = subjects.toJS();
    const MapGender = gender.toJS();
    const MapDeadline = alterDeadline(createdAt);
    const MapSkills = getIds(skills.toJS(), skillMenu);
    const MapKeywords = getIds(keywords.toJS(), keywordsData);
    const MapUniversity = getIds(university.toJS(), universityItems);
    const MapStudentList = getStudentIds(studentList.toJS());
    const MapBlackList = blackList.toJS();

    const data = {
      ...this.props,
      deadline: MapDeadline,
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
  };

  render() {
    const title = brand.name + ' - Bulk Email';
    const description = brand.desc;
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
  deadline: PropTypes.string.isRequired,
  choosedDeadline: PropTypes.string.isRequired,
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
  name: state.getIn([reducerBulkEmail, 'name']),
  role: state.getIn([reducerBulkEmail, 'role']),
  roleDeadline: state.getIn([reducerBulkEmail, 'roleDeadline']),
  gender: state.getIn([reducerBulkEmail, 'gender']),
  university: state.getIn([reducerBulkEmail, 'university']),
  keywords: state.getIn([reducerBulkEmail, 'keywords']),
  deadline: state.getIn([reducerBulkEmail, 'deadline']),
  choosedDeadline: state.getIn([reducerBulkEmail, 'choosedDeadline']),
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
  blackList: state.getIn([reducerBulkEmail, 'blackList'])
});

const mapDispatchToProps = dispatch => ({
  removeInfo: bindActionCreators(emailInfoRemove, dispatch),
  bulkEmailInit: bindActionCreators(emailInfoInit, dispatch)
});

const BulkEmailEditMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkEmailEdit);

export default BulkEmailEditMapped;
