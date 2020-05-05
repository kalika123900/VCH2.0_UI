import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { NewStudentsFeed } from 'dan-components';
import styles from './dashboard-jss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeSecureDecrypt } from 'dan-helpers/security';
import { Typography } from '@material-ui/core';
import {
  MiniCampaignTable, MiniBulkEmailTable, Demographics, MiniSeatTable
} from '../pageListAsync';

class ClientDashboard extends PureComponent {
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    if (user.cId == null) {
      this.state = {
        open: true
      }
    } else {
      this.state = {
        open: false
      }
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

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
        <div >
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle >
              Message
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description" >
                {/* Welcome to the VCH platform, */}
                <Typography >
                  It looks like you are not associated with any company, So you have limited access on the VCH platform.
              </Typography>
                <Typography style={{ margin: '10px 0 10px 0' }}>
                  If you have any questions please reach out on team@varsitycareershub.co.uk or +44 800 975 9359.
              </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions >
              <Button onClick={() => this.handleClose()} color="primary">
                close
            </Button>
            </DialogActions>
          </Dialog>
        </div>
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
