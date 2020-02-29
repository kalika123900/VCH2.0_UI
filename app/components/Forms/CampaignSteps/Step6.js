import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Reply from '@material-ui/icons/Reply';
import brand from 'dan-api/dummy/brand';
import { storeStep6Info } from 'dan-actions/CampaignActions';
import styles from './step-jss';

class Step6 extends React.Component {
  handleChange = (e) => {
    const { addInfo } = this.props;
    addInfo(e.target.value);
  };

  render() {
    const {
      classes,
      name,
      deadline,
      heading,
      body,
      goal,
      // university,
      // gender,
      // keywords
    } = this.props;
    const MapGoal = goal.toJS();
    // const MapUniversity = university.toJS();
    // const MapGender = gender.toJS();
    // const MapKeywords = keywords.toJS();

    const title = brand.name + ' - Review Campaign Settings';
    const description = brand.desc;
    return (
      <Grid>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        {/* section 1 */}
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" className={classes.sec_1_heading}>
              Campaign name
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
          </Grid>
        </Grid>
        {/* section 2 */}
        <Grid container spacing={3} style={{ marginBottom: '10px' }} className={(classes.root, classes.sec_2_root)}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6">
              Estimated performance ?
            </Typography>
            <Typography variant="subtitle1">
              <RemoveRedEye />
              43,544 - 72,640 impressions per month
            </Typography>
            <Typography variant="subtitle1">
              <Reply />
              1,115 - 1,860 clicks per month
            </Typography>
          </Grid>
        </Grid>
        {/* section 3 */}
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={6} xs={12}>
            <Grid className={classes.sec_3_grid1}>
              <Typography variant="h6">
                Campaign goal
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {MapGoal.value}
              </Typography>
            </Grid>
            <Grid className={classes.sec_3_grid2}>
              <Typography variant="h6">
                Campaign Deadline
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {deadline}
              </Typography>
            </Grid>
            <Grid className={classes.sec_3_grid3}>
              <Typography variant="h6">
                Promoting Role
              </Typography>
              <Typography variant="body1" color="textSecondary">
                AI Engineer
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Grid className={classes.sec_3_grid4} style={{ marginTop: 0 }}>
              <Typography variant="h6">
                Precise Demographics
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Men, WOMEN
              </Typography>
            </Grid>
            <Grid className={classes.sec_3_grid4}>
              <Typography variant="h6">
                Specified Universities
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Oxford, RGPV
              </Typography>
            </Grid>
            <Grid className={classes.sec_3_grid4}>
              <Typography variant="h6">
                Keywords to promote
              </Typography>
              <Typography variant="body1" color="textSecondary">
                New Job, Entry Level
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
            <Typography variant="h5" className={classes.textCapitalize} style={{ color: '#3889de' }}>
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
            <Typography variant="body2" style={{ lineHeight: '2.3rem', color: '#38ae00' }}>
              Ad www.varsitycareershub.co.uk
            </Typography>
            <Typography variant="subtitle2">
              {body.length <= 0
                ? (
                  <Typography
                    color="error"
                    variant="body1"
                  >
                    Oops! Campaign body is empty
                  </Typography>
                )
                : body
              }
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Step6.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  goal: PropTypes.object.isRequired,
  deadline: PropTypes.string.isRequired,
  // gender: PropTypes.object.isRequired,
  // university: PropTypes.object.isRequired,
  // role: PropTypes.number.isRequired,
  // keywords: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  name: state.getIn([reducerCampaign, 'name']),
  goal: state.getIn([reducerCampaign, 'goal']),
  gender: state.getIn([reducerCampaign, 'gender']),
  deadline: state.getIn([reducerCampaign, 'deadline']),
  university: state.getIn([reducerCampaign, 'university']),
  role: state.getIn([reducerCampaign, 'role']),
  keywords: state.getIn([reducerCampaign, 'keywords']),
  heading: state.getIn([reducerCampaign, 'heading']),
  body: state.getIn([reducerCampaign, 'body'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep6Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step6);

export default withStyles(styles)(StepMapped);
