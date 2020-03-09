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
import estyles from 'dan-components/Email/email-jss';
import { CombineStyles } from 'dan-helpers';
import styles from './step-jss';
const showdown = require('showdown');
const converter = new showdown.Converter();

const combinedStyles = CombineStyles(styles, estyles);

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
      // university,
      // gender,
      // keywords
    } = this.props;
    // const MapUniversity = university.toJS();
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
          </Grid>
        </Grid>
        {/* section 2 */}
        <Grid container spacing={3} style={{ marginBottom: '10px' }} className={(classes.root, classes.sec_2_root)}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6">
              Estimated performance
            </Typography>
            <Typography variant="subtitle1">
              <RemoveRedEye />
              43,544 - 72,640 candidates targeted initially
            </Typography>
            <Typography variant="subtitle1">
              <Reply />
              1,115 - 1,860 expected total click-throughs
            </Typography>
          </Grid>
        </Grid>
        {/* section 3 */}
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={12} xs={12}>
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
          <Grid item md={12} xs={12}>
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
    );
  }
}

Step6.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  // gender: PropTypes.number.isRequired,
  // role: PropTypes.number.isRequired,
  // university: PropTypes.object.isRequired,
  // keywords: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';


const mapStateToProps = state => ({
  name: state.getIn([reducerCampaign, 'name']),
  gender: state.getIn([reducerCampaign, 'gender']),
  choosedDeadline: state.getIn([reducerCampaign, 'choosedDeadline']),
  deadline: state.getIn([reducerCampaign, 'deadline']),
  university: state.getIn([reducerCampaign, 'university']),
  role: state.getIn([reducerCampaign, 'role']),
  keywords: state.getIn([reducerCampaign, 'keywords']),
  heading: state.getIn([reducerCampaign, 'heading']),
  body: state.getIn([reducerCampaign, 'body']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep6Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step6);

export default withStyles(combinedStyles)(StepMapped);
