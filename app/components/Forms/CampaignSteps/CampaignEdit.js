import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import brand from 'dan-api/dummy/brand';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './step-jss';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Reply from '@material-ui/icons/Reply';
import CreditCard from '@material-ui/icons/CreditCard';

class Step6 extends React.Component {
  render() {
    const { classes } = this.props;
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
        <Grid container spacing={3} className={classes.root} >
          <Grid item md={12} xs={12}>
            <Typography variant="h6" className={classes.sec_1_heading} >
              Campaign name
            </Typography>
            <TextField
              className={classes.textField, classes.sec_1_textField}
              placeholder="United Kingdom Job Agencies"
              margin="normal"
              variant="filled"
            />
          </Grid>
        </Grid>
        {/* section 2 */}
        <Grid container spacing={3} style={{ marginBottom: "10px" }} className={classes.root, classes.sec_2_root}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" >
              Estimated performance ?
            </Typography>
            <Typography variant="subtitle1" >
              <RemoveRedEye />
              43,544 - 72,640 impressions per month
            </Typography>
            <Typography variant="subtitle1" >
              <Reply />
              1,115 - 1,860 clicks per month
            </Typography>
          </Grid>
        </Grid>
        {/* section 3 */}
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={6} xs={12}>
            <Grid className={classes.sec_3_grid1}>
              <Typography variant="h6"  >
                Campaign goal
              </Typography>
              <Typography variant="subtitle1" >
                <CreditCard />
                Take an action on your website
              </Typography>
              <Button variant="text" color="secondary" >
                Edit
              </Button>
            </Grid>
            <Grid className={classes.sec_3_grid2}>
              <Typography variant="h6" >
                Locations
              </Typography>
              <Typography variant="subtitle1" >
                Show ad to people interested in your products or services, in United Kingdom.
              </Typography>
              <Button variant="text" color="secondary" >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Grid className={classes.sec_3_grid3}>
              <Typography variant="h6" >
                Product or Service
              </Typography>
              <Typography variant="caption" >
                Your business category:
              </Typography>
              <Typography variant="body1" >
                Entry level jobs
              </Typography>
              <Button variant="text" color="secondary" >
                Edit
              </Button>
            </Grid>
            <Grid className={classes.sec_3_grid4}>
              <Typography variant="h6" >
                Budget
                </Typography>
              <Typography variant="body1" >
                €18.00 daily average
                </Typography>
              <Typography variant="body1" >
                €547.00 monthly maximum
                </Typography>
              <Button variant="text" color="secondary" >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* section 4 */}
        <Grid className={classes.sec_4_grid}>
          <Typography variant="h6" >
            Your ad
          </Typography>
          <Grid>
            <Typography variant="h5" className={classes.textCapitalize} style={{ color: "#3889de" }} >
              United Kingdom Job Agencies | Our Job Is Helping You | Varsity Careers Hub
            </Typography>
            <Typography variant="body2" style={{ lineHeight: '2.3rem', color: "#38ae00" }} >
              Ad www.varsitycareershub.co.uk
            </Typography>
            <Typography variant="subtitle2" >
              Get Experienced Support and Guidance from a Professional Staffing Service. Our Friendly and Knowledgeable Team....
            </Typography>
          </Grid>
          <Button variant="text" color="secondary" >
            Edit
          </Button>
        </Grid>
      </Grid>
    )
  }
}

Step6.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Step6);