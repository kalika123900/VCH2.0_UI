import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CircularProgress from '../../Loading/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import CardHeader from '@material-ui/core/CardHeader';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Avatar from '@material-ui/core/Avatar';
import Reply from '@material-ui/icons/Reply';
import brand from 'dan-api/dummy/brand';
import { storeStep6Info, campaignRemoveMsg, campaignInitMsg } from 'dan-actions/CampaignActions';
import estyles from 'dan-components/Email/email-jss';
import { CombineStyles } from 'dan-helpers';
import styles from './step-jss';
import { universityItems, keywordsData, skillMenu, genderItems } from 'dan-api/apps/profileOption';
import avatarApi from 'dan-api/images/avatars';
import { makeSecureDecrypt } from '../../../Helpers/security';

const showdown = require('showdown');
const converter = new showdown.Converter();

const combinedStyles = CombineStyles(styles, estyles);

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

function getIds(arr, data) {
  return arr.map(item => data.indexOf(item));
}

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

class Step6 extends React.Component {
  state = {
    email: '',
    cname: '',
    user: null,
    usedName: [],
    impressionCount: 0,
    clickThrough60: 0,
    clickThrough90: 0,
    logo: avatarApi[0],
    loading: false
  }

  getCampaignImpression() {
    this.setState({ loading: true })
    const MapSkills = getIds(this.props.skills.toJS(), skillMenu);
    const MapUniversity = getIds(this.props.university.toJS(), universityItems);

    const data = {
      university_ids: MapUniversity,
      skill_ids: MapSkills,
      ethnicity: this.props.ethnicity,
      dataSize: this.props.audience,
      genders: this.props.gender,
      subjects: this.props.subjects,
      sectors: this.props.interestedSectors,
      selected_year: this.props.selectedYear,
      languages: this.props.languages,
      qualification_type: this.props.qualificationType,
      experience: this.props.experience
    };

    postJSON(`${API_URL}/campaign/get-impression`, data)
      .then((res) => {
        if (res.status === 1) {
          const { count } = res.data;
          let clickThrough60 = Math.floor((count * 60) / 100);
          let clickThrough90 = Math.floor((count * 90) / 100);
          if (clickThrough60 < 10) {
            clickThrough60 = `0${clickThrough60}`
          }
          if (clickThrough90 < 10) {
            clickThrough90 = `0${clickThrough90}`
          }
          this.setState({ impressionCount: count, clickThrough60, clickThrough90, loading: false });
          this.props.handleCreateCampaign(count);
        }
      })
      .catch((err) => {
        this.setState({ loading: false })
        console.error(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.audience != this.props.audience) {
      this.getCampaignImpression()
    }
  }

  componentDidMount() {
    const { userType } = this.props;
    if (userType == 'CLIENT') {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );

      const data = {
        company_id: user.cId
      };

      postData(`${API_URL}/client/client-info`, data)
        .then((res) => {
          if (res.status === 1) {
            const { data } = res;
            const { email, logo } = data;
            const cname = `${data.name}`;
            this.setState({ email, cname, logo });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      postData(`${API_URL}/client/fetch-campaign-name`, data)
        .then((res) => {
          if (res.status === 1) {
            this.setState({ usedName: res.data });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (userType == 'ADMIN') {
      const data = {
        campaignId: this.props.campaignId
      };

      postData(`${API_URL}/admin/client-info`, data)
        .then((res) => {
          if (res.status === 1) {
            const { data } = res;
            const { email } = data;
            const cname = `${data.name}`;
            this.setState({ email, cname });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    this.getCampaignImpression()
  }

  handleChange = (e) => {
    const { usedName } = this.state;
    const { addInfo, addMsg, removeMsg } = this.props;

    if (usedName.indexOf((e.target.value).toLowerCase()) === -1) {
      addInfo({ ...this.props, name: e.target.value });
      removeMsg();
    } else {
      addMsg({ warnMsg: 'Campaign Name already in use' });
      addInfo({ ...this.props, name: e.target.value });
    }
  };

  handleSliderChange = (e, newValue) => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, audience: newValue });
  };

  render() {
    const {
      classes,
      name,
      roleDeadline,
      deadline,
      heading,
      body,
      university,
      gender,
      warnMsg,
      choosedDeadline,
      roleName,
      audience
    } = this.props;

    const Mapgender = gender.toJS();
    const { email, cname, logo } = this.state;
    const MapUniversity = university.toJS();

    let selectedGender = '';
    Mapgender.map(item => {
      selectedGender = `${selectedGender}${genderItems[item]},  `;
    });
    let selectedUniversity = '';
    MapUniversity.map(item => {
      selectedUniversity = `${selectedUniversity}${universityItems[item]},  `;
    });

    const customDeadline = choosedDeadline == 5 ? 'No deadline' : deadline;
    const title = brand.name + ' - Review Campaign Settings';
    const description = brand.desc;
    return (
      <Fragment>
        <Grid style={{ maxWidth: 780 }}>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
          </Helmet>
          {/* section 1 */}
          <Grid container spacing={3} className={classes.root} >
            <Grid item md={12} xs={12}>
              <Typography variant="h6" className={classes.sec_1_heading}>
                Give this campaign a name
            </Typography>
              <TextField
                className={(classes.textField, classes.sec_1_textField)}
                name="name"
                value={name}
                placeholder="United Kingdom Job Agencies"
                margin="normal"
                variant="filled"
                onChange={(e) => this.handleChange(e)}
              />
              <Typography variant="caption" className={classes.sec_1_heading}>
                (This is just for you and won’t be displayed to candidates)
            </Typography>
              <Grid>
                <Typography variant="caption" className={classes.sec_1_heading} color="error">
                  {warnMsg}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* section 2 */}
          <Grid container spacing={3} style={{ marginBottom: '10px' }} className={(classes.root, classes.sec_2_root)}>
            <Grid item md={12} xs={12}>
              <Typography variant="h6" >Choose audience size of your campaign</Typography>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="Pretto slider"
                value={audience}
                min={1}
                step={1}
                max={25}
                onChange={(e, value) => this.handleSliderChange(e, value)}
              />
              <Typography variant="caption">(slider value represents x% count of total audience)</Typography>
            </Grid>
            {this.state.loading ?
              <Grid item md={12} xs={12}>
                <CircularProgress />
              </Grid>
              :
              <Grid item md={12} xs={12}>
                <Typography variant="h6">
                  Estimated performance
                </Typography>
                <Typography variant="subtitle1">
                  <RemoveRedEye style={{ marginRight: 10 }} />
                  {this.state.impressionCount} candidates targeted initially
                </Typography>
                <Typography variant="subtitle1">
                  <Reply style={{ marginRight: 10 }} />
                  {`${this.state.clickThrough60} - ${this.state.clickThrough90}`} expected total click-throughs
                </Typography>
              </Grid>
            }
          </Grid >
          {/* section 3 */}
          <Grid container spacing={3} className={classes.root}>
            <Grid item md={12} xs={12}>
              <Grid className={classes.sec_3_grid2}>
                <Typography variant="h6">
                  Campaign Deadline
              </Typography>
                <Typography variant="body1" color="textSecondary">
                  {customDeadline}
                </Typography>
              </Grid>
              <Grid className={classes.sec_3_grid3}>
                <Typography variant="h6">
                  Promoting Role
              </Typography>
                <Typography variant="body1" color="textSecondary">
                  {roleName}
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={12} xs={12}>
              <Grid className={classes.sec_3_grid4} style={{ marginTop: 0 }}>
                <Typography variant="h6">
                  Precise Genders
              </Typography>
                <Typography variant="body1" color="textSecondary">
                  {Mapgender.join(', ')}
                </Typography>
              </Grid>
              <Grid className={classes.sec_3_grid4}>
                <Typography variant="h6">
                  Specified Universities
              </Typography>
                <Typography variant="body1" color="textSecondary">
                  {MapUniversity.join(', ')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* section 4 */}
          <Grid className={classes.sec_4_grid}>
            <Typography variant="h6">
              Your ad
          </Typography>
            <Grid>
              <Typography
                variant="h5"
                className={classes.textCapitalize}
                style={{
                  color: '#3889de',
                  textAlign: 'left',
                  paddingBottom: 10,
                  paddingLeft: 10
                }}
              >
                {heading.length <= 0
                  ? (
                    <Typography
                      color="error"
                      variant="body1"
                    >
                      Oops! Campaign heading is empty
                    </Typography>
                  )
                  : heading
                }
              </Typography>
              <Grid>
                <CardHeader
                  avatar={
                    <Avatar src={(logo != null && logo != '') ? logo : avatarApi[0]} />
                  }
                  title={cname}
                  subheader={email}
                  style={{
                    padding: '0',
                    paddingBottom: ' 2%',
                    textAlign: 'left'
                  }}
                />
              </Grid>
              <Grid>
                {body.length <= 0
                  ? (
                    <Typography
                      color="error"
                      variant="body1"
                    >
                      Oops! Campaign body is empty
                    </Typography>
                  )
                  : (
                    <Grid
                      className={classes.textPreview}
                      dangerouslySetInnerHTML={{
                        __html: converter.makeHtml(body)
                      }}
                    />
                  )
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Step6.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  gender: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired,
  warnMsg: PropTypes.string.isRequired,
  removeMsg: PropTypes.func.isRequired,
  addMsg: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';
const reducerA = 'Auth';

const mapStateToProps = state => ({
  warnMsg: state.getIn([reducerCampaign, 'warnMsg']),
  audience: state.getIn([reducerCampaign, 'audience']),
  roleName: state.getIn([reducerCampaign, 'roleName']),
  campaignStatus: state.getIn([reducerCampaign, 'campaignStatus']),
  name: state.getIn([reducerCampaign, 'name']),
  gender: state.getIn([reducerCampaign, 'gender']),
  choosedDeadline: state.getIn([reducerCampaign, 'choosedDeadline']),
  roleDeadline: state.getIn([reducerCampaign, 'roleDeadline']),
  deadline: state.getIn([reducerCampaign, 'deadline']),
  university: state.getIn([reducerCampaign, 'university']),
  role: state.getIn([reducerCampaign, 'role']),
  keywords: state.getIn([reducerCampaign, 'keywords']),
  heading: state.getIn([reducerCampaign, 'heading']),
  body: state.getIn([reducerCampaign, 'body']),
  ethnicity: state.getIn([reducerCampaign, 'ethnicity']),
  skills: state.getIn([reducerCampaign, 'skills']),
  userType: state.getIn([reducerA, 'userType']),
  genders: state.getIn([reducerCampaign, 'genders']),
  subjects: state.getIn([reducerCampaign, 'subjects']),
  interestedSectors: state.getIn([reducerCampaign, 'interestedSectors']),
  selectedYear: state.getIn([reducerCampaign, 'selectedYear']),
  languages: state.getIn([reducerCampaign, 'languages']),
  qualificationType: state.getIn([reducerCampaign, 'qualificationType']),
  experience: state.getIn([reducerCampaign, 'experience']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep6Info, dispatch),
  removeMsg: bindActionCreators(campaignRemoveMsg, dispatch),
  addMsg: bindActionCreators(campaignInitMsg, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step6);

export default withStyles(combinedStyles)(StepMapped);
