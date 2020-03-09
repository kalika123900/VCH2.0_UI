import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import brand from 'dan-api/dummy/brand';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from '../CampaignSteps/step-jss';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Reply from '@material-ui/icons/Reply';
import CreditCard from '@material-ui/icons/CreditCard';
import Email from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';

class Step7 extends React.Component {
  render() {
    const { classes } = this.props;
    const title = brand.name + ' - Review Bulk Email';
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
        <Grid container spacing={3} style={{ marginBottom: "10px" }} className={classes.root, classes.sec_2_root}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" >
              Estimated performance ?
            </Typography>
            <Typography variant="subtitle1" >
              <RemoveRedEye />
              72,640 Recipient students
            </Typography>
            <Typography variant="subtitle1" >
              <Reply />
              1,115 - 1,860 clicks per month
            </Typography>
          </Grid>
        </Grid>
        {/* section 2 */}
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={6} xs={12}>
            <Grid className={classes.sec_3_grid1}>
              <Typography variant="h6"  >
                Bulk Email goal
              </Typography>
              <Typography variant="subtitle1" >
                Get More Applications to a role
              </Typography>
            </Grid>
            <Grid className={classes.sec_3_grid2}>
              <Typography variant="h6" >
                Bulk Email Deadline
                </Typography>
              <Typography variant="body1" >
                60 days
              </Typography>
            </Grid>
            <Grid className={classes.sec_3_grid3}>
              <Typography variant="h6" >
                Promoting Role
              </Typography>
              <Typography variant="body1" >
                AI Engineer
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Grid className={classes.sec_3_grid4} style={{ marginTop: 0 }}>
              <Typography variant="h6"  >
                Precise Demographics
              </Typography>
              <Typography variant="body1" >
                Men, WOMEN
              </Typography>
            </Grid>
            <Grid className={classes.sec_3_grid4}>
              <Typography variant="h6" >
                Specified Universities
              </Typography>
              <Typography variant="body1" >
                Oxford, RGPV
              </Typography>
            </Grid>
            <Grid className={classes.sec_3_grid4}>
              <Typography variant="h6" >
                Keywords to promote
                </Typography>
              <Typography variant="body1" >
                New Job, Entry Level
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* section 3 */}
        <Grid className={classes.sec_4_grid}>
          <Typography variant="h6" >
            Your Email Preview
          </Typography>
          <Grid>
            <Typography variant="h5" className={classes.textCapitalize, classes.spacerEnhancer} style={{ color: "#3889de", textAlign: "left" }} >
              Lorem Ipsum sit dorem.
            </Typography>
            <Typography variant="body2" style={{ lineHeight: '2.3rem', color: "#38ae00", textAlign: "left" }} >
              <AccountCircle className={classes.leftGap} />
              Aliquam nec ex aliquet
            </Typography>
            <Typography variant="body2" style={{ lineHeight: '2.3rem', color: "#38ae00", textAlign: "left" }} >
              <Email className={classes.leftGap} />abc@domain.co.uk
            </Typography>
            <Typography variant="caption" className={classes.paraAlign}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.
            </Typography>
            <Typography variant="body2" className={classes.paddingAlign}>
              @ 2020 Varsity Careers Hub
            </Typography>
          </Grid>
        </Grid>
      </Grid >
    )
  }
}

Step7.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Step7);