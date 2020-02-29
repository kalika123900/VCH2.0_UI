import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import brand from 'dan-api/dummy/brand';
import { CreateCampaign } from 'dan-components';
import { removeCampaignInfo } from 'dan-actions/CampaignActions';

class Campaigns extends React.Component {
  submitForm = () => {
    const {
      name,
      role,
      budget,
      language,
      removeInfo,
      deadline,
      goal,
      university,
      keywords,
      gender,
      history
    } = this.props;

    const MapGoal = goal.toJS();
    const MapUniversity = university.toJS();
    const MapKeywords = keywords.toJS();
    const dateArr = deadline.split('/');
    const formatedDeadline = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;

    async function postJSON(url, data) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      await response.json();
    }

    const data = {
      name,
      goal: MapGoal.value,
      locality: 'Lorem Ipsum',
      skills: [19, 20, 21],
      gender: gender[0],
      role,
      budget,
      formatedDeadline,
      language,
      universitie: MapUniversity,
      keywords: MapKeywords
    };

    postJSON(`${API_URL}/campaign/create-campaign`, data) // eslint-disable-line
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
  goal: PropTypes.object.isRequired,
  role: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  gender: PropTypes.object.isRequired,
  university: PropTypes.object.isRequired,
  keywords: PropTypes.object.isRequired,
  budget: PropTypes.number.isRequired,
  deadline: PropTypes.string.isRequired,
  removeInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  name: state.getIn([reducerCampaign, 'name']),
  goal: state.getIn([reducerCampaign, 'goal']),
  role: state.getIn([reducerCampaign, 'role']),
  language: state.getIn([reducerCampaign, 'language']),
  gender: state.getIn([reducerCampaign, 'gender']),
  university: state.getIn([reducerCampaign, 'university']),
  keywords: state.getIn([reducerCampaign, 'keywords']),
  budget: state.getIn([reducerCampaign, 'budget']),
  deadline: state.getIn([reducerCampaign, 'deadline']),
});

const mapDispatchToProps = dispatch => ({
  removeInfo: bindActionCreators(removeCampaignInfo, dispatch)
});

const CampaignsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Campaigns);

export default CampaignsMapped;
