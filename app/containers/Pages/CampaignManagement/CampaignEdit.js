import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { List } from 'immutable';
import { convertFromRaw, EditorState, convertFromHTML, ContentState } from 'draft-js';
import { markdownToDraft } from 'markdown-draft-js';
import { storeFollowUps } from 'dan-actions/CampaignActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import brand from 'dan-api/dummy/brand';
import { CreateCampaign } from 'dan-components';
import { removeCampaignInfo, campaignInfoInit } from 'dan-actions/CampaignActions';
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

async function postData(url, data) {
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
  if (string && string.length > 0) {
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
  return [];
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

function alterDeadline(createdAt, initialDeadline, deadline) {
  if (initialDeadline == deadline) {
    if (initialDeadline != null) {
      let timestamp1 = new Date(createdAt);
      let timestamp2 = new Date()
      let diff_in_days = parseInt((timestamp2 - timestamp1) / (1000 * 3600 * 24));

      return DateHelper.format(DateHelper.addDays(new Date(initialDeadline), diff_in_days));
    } else {
      return null;
    }
  } else {
    return deadline;
  }
};

var createdAt = null;
var initialDeadline = null;

const content = {
  blocks: [{
    key: '637gr',
    text: '',
    type: 'unstyled',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {}
  }],
  entityMap: {}
};

class CampaignEdit extends React.Component {
  componentWillMount() {
    const _that = this;
    const data = {
      campaignId: atob(this.props.match.params.campaignId)
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
          const deadline = res.data.info.deadline == null ? null : formatDeadline(res.data.info.deadline);
          const keywords = getIdsItem(res.data.keywords, keywordsData);
          const university = getIdsItem(res.data.university, universityItems);
          const skills = getIdsItem(res.data.skills, skillMenu);
          const workLocation = stringToArray(res.data.info.work_location);
          const languages = stringToArray(res.data.info.languages);
          const qualificationType = stringToArray(res.data.info.qualification_type);
          const experience = boolNumberToString(res.data.info.experience);
          let roleData = [];
          roleData.push(res.data.info.roleData);
          createdAt = res.data.info.created_at;
          initialDeadline = res.data.info.deadline == null ? null : formatDeadline(res.data.info.deadline);

          const campaignData = {
            audience: res.data.info.audience,
            languages,
            qualificationType,
            roleName: roleData[0].role_name,
            roleData: roleData,
            campaignStatus: res.data.info.status,
            name: res.data.info.campaign_name,
            role: res.data.info.role,
            gender,
            university,
            societies,
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
          };
          _that.props.campaignInit(campaignData);
          this.getFollowUps({ deadline, ...data, status: res.data.info.status });
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getFollowUps = (data) => {
    if (data.status != 0) {
      postData(`${API_URL}/campaign/get-schedule-data`, data)
        .then((res) => {
          if (res.status === 1) {
            const { addInfo, } = this.props;
            var newFollowUps = List([]);

            res.data.map((item) => {
              var editorState = EditorState.createEmpty();

              if (item.body && item.body != '') {
                const blocksFromHTML = convertFromHTML(item.body);
                const state = ContentState.createFromBlockArray(
                  blocksFromHTML.contentBlocks,
                  blocksFromHTML.entityMap,
                );

                editorState = EditorState.createWithContent(state);
              }

              newFollowUps = newFollowUps.push({
                type: item.mail_type,
                date: item.date_to_short,
                heading: item.heading,
                body: item.body,
                editorState
              });
            });

            addInfo({ followUps: newFollowUps });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      postData(`${API_URL}/campaign/get-campaign-schedule`, data)
        .then((res) => {
          if (res.status === 1) {
            const { addInfo, } = this.props;
            const contentBlock = convertFromRaw(content);
            const editorState = EditorState.createWithContent(contentBlock);
            var newFollowUps = List([]);

            res.data.map((item) => {
              if (contentBlock) {
                newFollowUps = newFollowUps.push({
                  type: item.type,
                  date: item.date,
                  heading: '',
                  body: '',
                  editorState
                });
              }
            });

            addInfo({ followUps: newFollowUps });
          };
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deadline !== this.props.deadline) {
      this.getFollowUps({
        deadline: this.props.deadline,
        campaignId: atob(this.props.match.params.campaignId),
        status: this.props.campaignStatus
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
      removeInfo,
      deadline,
      languages,
      followUps,
      qualificationType
    } = this.props;

    const MapInterestedSectors = interestedSectors.toJS();
    const MapSubjects = subjects.toJS();
    const MapFollowUps = followUps.toJS();
    const MapGender = gender.toJS();
    const MapWorkLocation = workLocation.toJS();
    const MapDeadline = deadline;

    const MapSkills = getIds(skills.toJS(), skillMenu);
    const MapKeywords = getIds(keywords.toJS(), keywordsData);
    const MapUniversity = getIds(university.toJS(), universityItems);
    const MapLanguages = languages.toJS();
    const MapQualificationType = qualificationType.toJS();

    const data = {
      ...this.props,
      languages: MapLanguages,
      qualificationType: MapQualificationType,
      deadline: MapDeadline,
      workLocation: MapWorkLocation,
      interestedSectors: MapInterestedSectors,
      subjects: MapSubjects,
      university: MapUniversity,
      keywords: MapKeywords,
      skills: MapSkills,
      gender: MapGender,
      followUps: MapFollowUps,
      campaignId: atob(this.props.match.params.campaignId)
    };

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

const mapStateToProps = state => ({
  languages: state.getIn([reducerCampaign, 'languages']),
  qualificationType: state.getIn([reducerCampaign, 'qualificationType']),
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
  audience: state.getIn([reducerCampaign, 'audience']),
  societies: state.getIn([reducerCampaign, 'societies']),
  followUps: state.getIn([reducerCampaign, 'followUps']),
});

const mapDispatchToProps = dispatch => ({
  removeInfo: bindActionCreators(removeCampaignInfo, dispatch),
  campaignInit: bindActionCreators(campaignInfoInit, dispatch),
  addInfo: bindActionCreators(storeFollowUps, dispatch)
});

const CampaignEditMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignEdit);

export default CampaignEditMapped;
