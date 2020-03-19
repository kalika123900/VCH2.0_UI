import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import brand from 'dan-api/dummy/brand';
import { CreateCampaign } from 'dan-components';
import { removeCampaignInfo, campaignInfoInit } from 'dan-actions/CampaignActions';
import { DateHelper } from '../../../redux/helpers/dateTimeHelper';
import {
  keywordsData
} from '../../../components/Forms/CampaignSteps/constantData';

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
    if (parseInt(item) !== NaN) {
      data.push(parseInt(item));
    }
  });

  return data;
}

function stringToArrayObj(string) {
  const splitArray = string.split(',');
  const data = [];
  splitArray.map(item => {
    if (item !== '') {
      data.push({
        id: null,
        value: item
      });
    }
  });

  return data;
}

function boolNumberToString(num) {
  return num === 0 ? 'no' : 'yes';
}
function mapToKeyWords(ids) {
  const keywords = [];
  ids.map((value, index) => {
    const sKeyword = keywordsData.filter((item) => {
      if (item.id == value.value) {
        return item;
      }
    });
    if (sKeyword.length > 0) {
      keywords.push(sKeyword[0]);
    }
  });
  return keywords;
}
function arrayToObject(arr) {
  const data = [];
  arr.map(item => {
    if (item !== '') {
      data.push({
        id: null,
        value: item
      });
    }
  });

  return data;
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

function alterDeadline(campaignTime) {
  let timestamp1 = new Date(campaignTime);
  let timestamp2 = new Date()
  let diff_in_days = parseInt((timestamp2 - timestamp1) / (1000 * 3600 * 24));

  return DateHelper.format(DateHelper.addDays(new Date(campaignTime), diff_in_days));
}

var createdAt = null;

class CampaignEdit extends React.Component {
  componentWillMount() {
    const _that = this;
    const data = {
      campaignId: this.props.match.params.campaignId
    };
    postJSON(`${API_URL}/campaign/get-campaign-info`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const subjects = stringToArray(res.data.info.subjects);
          const keywords = mapToKeyWords(arrayToObject(res.data.keywords));
          const interestedSectors = stringToArrayObj(res.data.info.interested_sectors);
          const workLocation = stringToArrayObj(res.data.info.work_location);
          const experience = boolNumberToString(res.data.info.experience);
          const gender = stringToArray(res.data.info.gender);
          const deadline = formatDeadline(res.data.info.deadline);
          let roleData = [];
          roleData.push(res.data.info.roleData);
          createdAt = res.data.info.created_at;

          const campaignData = {
            roleData: roleData,
            campaignStatus: res.data.info.status,
            name: res.data.info.campaign_name,
            role: res.data.info.role,
            gender,
            university: res.data.university,
            keywords,
            deadline,
            selectedYear: res.data.info.selected_year,
            ethnicity: res.data.info.ethnicity,
            interestedSectors,
            workLocation,
            experience,
            minGrade: res.data.info.min_grade,
            subjects,
            skills: res.data.skills,
            heading: res.data.info.heading,
            body: res.data.info.body,
            choosedDeadline: res.data.info.deadline_choice,
          };
          _that.props.campaignInit(campaignData);
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
      removeInfo
    } = this.props;

    const MapWorkLocation = workLocation.toJS();
    const MapInterestedSectors = interestedSectors.toJS();
    const MapUniversity = university.toJS();
    const MapSubjects = subjects.toJS();
    const MapKeywords = keywords.toJS();
    const MapSkills = skills.toJS();
    const MapGender = gender.toJS();
    const MapDeadline = alterDeadline(createdAt);

    const data = {
      ...this.props,
      deadline: MapDeadline,
      workLocation: MapWorkLocation,
      interestedSectors: MapInterestedSectors,
      subjects: MapSubjects,
      university: MapUniversity,
      keywords: MapKeywords,
      skills: MapSkills,
      gender: MapGender,
      campaignId: this.props.match.params.campaignId
    };

    console.log(data);

    postJSON(`${API_URL}/campaign/update-approve-campaign`, data) // eslint-disable-line
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

CampaignEdit.propTypes = {
  history: PropTypes.object.isRequired,
  campaignStatus: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired,
  gender: PropTypes.object.isRequired,
  university: PropTypes.object.isRequired,
  keywords: PropTypes.object.isRequired,
  deadline: PropTypes.string.isRequired,
  choosedDeadline: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  ethnicity: PropTypes.string.isRequired,
  interestedSectors: PropTypes.object.isRequired,
  workLocation: PropTypes.object.isRequired,
  experience: PropTypes.string.isRequired,
  minGrade: PropTypes.number.isRequired,
  subjects: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  campaignInit: PropTypes.func.isRequired,
  removeInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  campaignStatus: state.getIn([reducerCampaign, 'campaignStatus']),
  name: state.getIn([reducerCampaign, 'name']),
  role: state.getIn([reducerCampaign, 'role']),
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
});

const mapDispatchToProps = dispatch => ({
  removeInfo: bindActionCreators(removeCampaignInfo, dispatch),
  campaignInit: bindActionCreators(campaignInfoInit, dispatch)
});

const CampaignEditMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignEdit);

export default CampaignEditMapped;
