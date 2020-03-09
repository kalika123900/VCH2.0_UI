import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio, RadioGroup, Typography } from '@material-ui/core';

class CampaignFilter extends PureComponent {
  state = {
    campaignAuth: 'pending',
    campaignStatus: 'Active'
  };

  handleReset = () => {
    this.setState({
      campaignAuth: "pending",
      campaignStatus: 'Active'
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const { classes } = this.props;
    const { campaignAuth, campaignStatus } = this.state;
    return (
      <PapperBlock whiteBg noMargin title="Apply Filter" icon="ios-search-outline" desc="">
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl component="fieldset" required className={classes.formControl}>
              <Typography variant="subtitle1" color="primary" >Campaign Authorization Status</Typography>
              <RadioGroup
                aria-label="campaign-authorization"
                name="campaignAuth"
                className={classes.group}
                value={campaignAuth}
                onChange={this.handleChange}
              >
                <FormControlLabel value="approved" control={<Radio />} label="Approved" />
                <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                <FormControlLabel value="both" control={<Radio />} label="Both" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl component="fieldset" required className={classes.formControl}>
              <Typography variant="subtitle1" color="primary" >Campaign Status</Typography>
              <RadioGroup
                aria-label="campaign-status"
                name="campaignStatus"
                className={classes.group}
                value={campaignStatus}
                onChange={this.handleChange}
              >
                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                <FormControlLabel value="both" control={<Radio />} label="Both" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.textRight}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={(e) => { this.handleReset() }}
          >
            Reset
          </Button>
          <Button color="secondary" variant="contained" className={classes.button}>
            Filter Results
          </Button>
        </div>
      </PapperBlock>
    );
  }
}

CampaignFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignFilter);
