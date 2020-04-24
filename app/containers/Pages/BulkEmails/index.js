import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CreateBulkEmail } from 'dan-components';
import { emailInfoRemove } from 'dan-actions/BulkEmailActions';
import { makeSecureDecrypt } from 'dan-helpers/security';
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

function getIds(arr, data) {
  return arr.map(item => data.indexOf(item));
}

function getStudentIds(studentList) {
  return studentList.map(item => {
    return item.id
  })
}

class BulkEmails extends React.Component {
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    if (user.managerType != 2) {
      if (user.capabilities == 3)
        this.props.history.push('/client/unauthorized');
    }
  }

  submitForm = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

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
      roleDeadline,
      deadline,
      studentList,
      blackList,
      choosedDeadline,
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

    let customDeadline = '';
    if (choosedDeadline == '5') {
      customDeadline = null;
    } else {
      customDeadline = deadline;
    }

    const data = {
      ...this.props,
      languages: MapLanguages,
      qualificationType: MapQualificationType,
      deadline: customDeadline,
      workLocation: MapWorkLocation,
      interestedSectors: MapInterestedSectors,
      subjects: MapSubjects,
      university: JSON.stringify(MapUniversity),
      keywords: JSON.stringify(MapKeywords),
      skills: JSON.stringify(MapSkills),
      gender: MapGender,
      studentList: JSON.stringify(MapStudentList),
      blackList: JSON.stringify(MapBlackList),
      company_id: user.cId
    };

    postJSON(`${API_URL}/bulkemail/create-bulkemail`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          removeInfo();
          history.push('/client');
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const title = brand.name + ' - Bulk Emails';
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

BulkEmails.propTypes = {
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
  languages: state.getIn([reducerBulkEmail, 'languages']),
  qualificationType: state.getIn([reducerBulkEmail, 'qualificationType']),
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
  removeInfo: bindActionCreators(emailInfoRemove, dispatch)
});

const BulkEmailsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkEmails);

export default BulkEmailsMapped;
