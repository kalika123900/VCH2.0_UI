import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import Slider from '@material-ui/core/Slider';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Avatar from '@material-ui/core/Avatar';
import Reply from '@material-ui/icons/Reply';
import brand from 'dan-api/dummy/brand';
import {
  emailStep6Info,
  emailRemoveMsg,
  emailInitMsg
} from 'dan-actions/BulkEmailActions';
import estyles from 'dan-components/Email/email-jss';
import { CombineStyles } from 'dan-helpers';
import { genderItems, universityItems } from 'dan-api/apps/profileOption';
import styles from '../CampaignSteps/step-jss';
import { makeSecureDecrypt } from '../../../Helpers/security';
import avatarApi from 'dan-api/images/avatars';

const showdown = require('showdown');
const converter = new showdown.Converter();
const combinedStyles = CombineStyles(styles, estyles);

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

class Step6 extends React.Component {
  state = {
    email: '',
    cname: '',
    user: null,
    usedName: [],
    logo: avatarApi[0],
    impressionCount: 0,
    clickThrough60: 0,
    clickThrough90: 0,
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
        bulkEmailId: this.props.bulkEmailId
      };

      postData(`${API_URL}/admin/bulkemail/client-info`, data)
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
  }

  handleSliderChange = (e, newValue) => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, audience: newValue });
  };

  handleChange = (e) => {
    const { usedName } = this.state;
    const { addInfo, addMsg, removeMsg } = this.props;

    if (usedName.indexOf((e.target.value).toLowerCase()) === -1) {
      addInfo({ ...this.props, name: e.target.value });
      removeMsg();
    } else {
      addMsg({ warnMsg: 'Bulk Email Name already in use' });
      addInfo({ ...this.props, name: e.target.value });
    }
  };

  render() {
    const {
      classes,
      name,
      heading,
      body,
      university,
      gender,
      warnMsg,
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
    const title = brand.name + ' - Review Bulk Email Settings';
    const description = brand.desc;
    return (
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
        <Grid container spacing={3} className={classes.root} style={{ boxShadow: 'none' }}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" className={classes.sec_1_heading}>
              Give this Bulk Email a name
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
        {/* <Grid container spacing={3} style={{ marginBottom: '10px' }} className={(classes.root, classes.sec_2_root)}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" >Choose audience size of your bulk email</Typography>
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
        </Grid> */}
        {/* section 3 */}
        <Grid container spacing={3} className={classes.root} style={{ boxShadow: 'none' }}>
          <Grid item md={12} xs={12}>
            {/* <Grid className={classes.sec_3_grid2}>
              <Typography variant="h6">
                Bulk Email Deadline
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {customDeadline}
              </Typography>
            </Grid> */}
            <Grid className={classes.sec_3_grid3}>
              <Typography variant="h6">
                Promoting Role
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {roleName}
              </Typography>
            </Grid>
            <Grid className={classes.sec_3_grid4} >
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
            Your Email
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
                    Oops! Bulk Email heading is empty
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
                    Oops! Bulk Email body is empty
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
    );
  }
}

Step6.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired,
  warnMsg: PropTypes.string.isRequired,
  removeMsg: PropTypes.func.isRequired,
  addMsg: PropTypes.func.isRequired
};

const reducerBulkEmail = 'bulkEmail';
const reducerA = 'Auth';

const mapStateToProps = state => ({
  audience: state.getIn([reducerBulkEmail, 'audience']),
  warnMsg: state.getIn([reducerBulkEmail, 'warnMsg']),
  roleName: state.getIn([reducerBulkEmail, 'roleName']),
  campaignStatus: state.getIn([reducerBulkEmail, 'campaignStatus']),
  name: state.getIn([reducerBulkEmail, 'name']),
  gender: state.getIn([reducerBulkEmail, 'gender']),
  university: state.getIn([reducerBulkEmail, 'university']),
  role: state.getIn([reducerBulkEmail, 'role']),
  keywords: state.getIn([reducerBulkEmail, 'keywords']),
  heading: state.getIn([reducerBulkEmail, 'heading']),
  body: state.getIn([reducerBulkEmail, 'body']),
  userType: state.getIn([reducerA, 'userType']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(emailStep6Info, dispatch),
  removeMsg: bindActionCreators(emailRemoveMsg, dispatch),
  addMsg: bindActionCreators(emailInitMsg, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step6);

export default withStyles(combinedStyles)(StepMapped);
