import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { NewStudentsFeed } from 'dan-components';
import styles from './dashboard-jss';
import { MiniCampaignTable, MiniBulkEmailTable, Demographics, MiniSeatTable } from '../pageListAsync';

class ClientDashboard extends PureComponent {
  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes } = this.props;
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
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={12} xs={12}>
            <Demographics />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={6} xs={12}>
            <MiniCampaignTable />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <MiniBulkEmailTable />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={6} xs={12}>
            <Divider className={classes.divider} />
            <NewStudentsFeed />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <MiniSeatTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}

ClientDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientDashboard);
