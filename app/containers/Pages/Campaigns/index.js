import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import brand from 'dan-api/dummy/brand';
import { CreateCampaign } from 'dan-components';
import {
  removeCampaignInfo,
  campaignInfoInit,
  campaignRemoveMsg,
  campaignInitMsg,
  restoreCampaignProgress
} from 'dan-actions/CampaignActions';
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

const user = JSON.parse(
  makeSecureDecrypt(localStorage.getItem('user'))
);

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

function boolNumberToString(num) {
  return num === 0 ? 'no' : 'yes';
}

function getIds(arr, data) {
  return arr.map(item => data.indexOf(item));
}

function getIdsItem(arr, data) {
  return arr.map(item => data[item]);
}

function formatDeadline(dateStr) {
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

class Campaigns extends React.Component {
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    if (user.cId == null) {
      this.props.history.push('/client/unauthorized');
    }
    if (user.managerType != 2) {
      if (user.capabilities == 3)
        this.props.history.push('/client/unauthorized');
    }
    if (props.userType == 'CLIENT') {
      if (localStorage.hasOwnProperty('campaignProgress')) {
        this.props.restoreProgress(JSON.parse(localStorage.getItem('campaignProgress')));
      }
    }
  }

  state = {
    isCampaignExist: false
  }

  componentDidMount() {
    const _that = this;
    const campaignId = this.props.match.params.campaignId;

    if (campaignId !== undefined) {
      const data = {
        campaignId: atob(campaignId)
      };
      postJSON(`${API_URL}/campaign/get-campaign-info`, data) // eslint-disable-line
        .then((res) => {
          if (res.status === 1) {
            const subjects = stringToArray(res.data.info.subjects);
            const gender = stringToArray(res.data.info.gender);
            const selectedYear = stringToArray(res.data.info.selected_year);
            const interestedSectors = stringToArray(res.data.info.interested_sectors);
            const minGrade = stringToArray(res.data.info.min_grade);
            const societies = stringToArray(res.data.info.societies);
            const deadline = formatDeadline(res.data.info.deadline);
            const keywords = getIdsItem(res.data.keywords, keywordsData);
            const university = getIdsItem(res.data.university, universityItems);
            const skills = getIdsItem(res.data.skills, skillMenu);
            const languages = stringToArray(res.data.info.languages);
            const qualificationType = stringToArray(res.data.info.qualification_type);
            const workLocation = stringToArray(res.data.info.work_location);
            const experience = boolNumberToString(res.data.info.experience);
            const roleData = [];
            roleData.push(res.data.info.roleData);
            const roleDeadline = formatDeadline(roleData[0].role_deadline);

            const campaignData = {
              audience: res.data.info.audience,
              languages,
              qualificationType,
              roleDeadline,
              roleName: roleData[0].role_name,
              name: res.data.info.campaign_name,
              role: res.data.info.role,
              roleData,
              campaignStatus: res.data.info.status,
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
              societies,
              heading: res.data.info.heading,
              body: res.data.info.body,
              choosedDeadline: res.data.info.deadline_choice,
            };
            _that.props.campaignInit(campaignData);
            this.setState({ isCampaignExist: true });
          } else {
            console.log('something not good ');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
      addMsg,
      removeInfo,
      deadline,
      choosedDeadline,
      languages,
      qualificationType,
    } = this.props;

    const MapWorkLocation = workLocation.toJS();
    const MapInterestedSectors = interestedSectors.toJS();
    const MapSubjects = subjects.toJS();
    const MapGender = gender.toJS();
    const MapLanguages = languages.toJS();
    const MapQualificationType = qualificationType.toJS();

    const MapSkills = getIds(skills.toJS(), skillMenu);
    const MapKeywords = getIds(keywords.toJS(), keywordsData);
    const MapUniversity = getIds(university.toJS(), universityItems);

    let customDeadline = '';
    if (choosedDeadline == '5') {
      customDeadline = null;
    } else {
      customDeadline = deadline;
    }

    if (this.state.isCampaignExist) {
      const data = {
        ...this.props,
        languages: MapLanguages,
        qualificationType: MapQualificationType,
        deadline: customDeadline,
        workLocation: MapWorkLocation,
        interestedSectors: MapInterestedSectors,
        subjects: MapSubjects,
        university: MapUniversity,
        keywords: MapKeywords,
        skills: MapSkills,
        gender: MapGender,
        company_id: user.cId,
        campaignId: atob(this.props.match.params.campaignId)
      };

      postJSON(`${API_URL}/campaign/client/update-campaign`, data) // eslint-disable-line
        .then((res) => {
          if (res.status === 1) {
            removeInfo();
            addMsg({ warnMsg: 'Campaign updated Successfully' });
            history.push('/client/campaign-management');
          } else {
            console.log('something not good ');
          }
        })
        .catch((err) => {
          console.log(err);
        }); ''
    } else {
      const data = {
        ...this.props,
        languages: MapLanguages,
        qualificationType: MapQualificationType,
        deadline: customDeadline,
        workLocation: MapWorkLocation,
        interestedSectors: MapInterestedSectors,
        subjects: MapSubjects,
        university: MapUniversity,
        keywords: MapKeywords,
        skills: MapSkills,
        gender: MapGender,
        company_id: user.cId
      };

      postJSON(`${API_URL}/campaign/create-campaign`, data) // eslint-disable-line
        .then((res) => {
          if (res.status === 1) {
            removeInfo();
            localStorage.removeItem('campaignProgress');
            addMsg({ warnMsg: 'Campaign created Successfully' });
            history.push('/client/campaign-management');
          } else {
            console.log('something not good ');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname != prevProps.location.pathname) {
      this.props.removeInfo();
    }
  }

  render() {
    const title = brand.name + ' - Campaigns';
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
        <CreateCampaign onSubmit={() => this.submitForm()} />
      </div>
    );
  }
}

Campaigns.propTypes = {
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
  campaignInit: PropTypes.func.isRequired,
  removeInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';
const reducerA = 'Auth';

const mapStateToProps = state => ({
  userType: state.getIn([reducerA, 'userType']),
  languages: state.getIn([reducerCampaign, 'languages']),
  qualificationType: state.getIn([reducerCampaign, 'qualificationType']),
  name: state.getIn([reducerCampaign, 'name']),
  role: state.getIn([reducerCampaign, 'role']),
  roleDeadline: state.getIn([reducerCampaign, 'roleDeadline']),
  gender: state.getIn([reducerCampaign, 'gender']),
  university: state.getIn([reducerCampaign, 'university']),
  keywords: state.getIn([reducerCampaign, 'keywords']),
  deadline: state.getIn([reducerCampaign, 'deadline']),
  choosedDeadline: state.getIn([reducerCampaign, 'choosedDeadline']),
  selectedYear: state.getIn([reducerCampaign, 'selectedYear']),
  ethnicity: state.getIn([reducerCampaign, 'ethnicity']),
  interestedSectors: state.getIn([reducerCampaign, 'interestedSectors']),
  workLocation: state.getIn([reducerCampaign, 'workLocation']),
  experience: state.getIn([reducerCampaign, 'experience']),
  minGrade: state.getIn([reducerCampaign, 'minGrade']),
  subjects: state.getIn([reducerCampaign, 'subjects']),
  skills: state.getIn([reducerCampaign, 'skills']),
  heading: state.getIn([reducerCampaign, 'heading']),
  body: state.getIn([reducerCampaign, 'body']),
  societies: state.getIn([reducerCampaign, 'societies']),
  audience: state.getIn([reducerCampaign, 'audience']),
});

const mapDispatchToProps = dispatch => ({
  removeInfo: bindActionCreators(removeCampaignInfo, dispatch),
  campaignInit: bindActionCreators(campaignInfoInit, dispatch),
  addMsg: bindActionCreators(campaignInitMsg, dispatch),
  removeMsg: bindActionCreators(campaignRemoveMsg, dispatch),
  restoreProgress: bindActionCreators(restoreCampaignProgress, dispatch),
});

const CampaignMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Campaigns);

export default CampaignMapped;
