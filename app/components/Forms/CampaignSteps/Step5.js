import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import brand from 'dan-api/dummy/brand';
import { storeStep5Info } from 'dan-actions/CampaignActions';
import PapperBlock from '../../PapperBlock/PapperBlock';
import styles from '../../../containers/Pages/HelpSupport/helpSupport-jss';
import { parseDateHelper } from '../../../redux/helpers/dateTimeHelper';

class Step5 extends React.Component {
  state = {
    expanded: null
  };

  handleQA = panel => (expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleReduxChange = (value) => {
    const { addInfo } = this.props;
    const deadline = parseDateHelper.format(parseDateHelper.addDays(new Date(), value));
    addInfo({ deadline, choosedDeadline: value });
  };

  handleDateChange = currentDate => {
    const { addInfo, choosedDeadline } = this.props;
    const year = currentDate.getFullYear();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();

    if (date < 10) {
      date = '0' + date;
    }
    if (month < 9) {
      month = '0' + (month + 1);
    } else {
      month += 1;
    }

    const dateMonthYear = year + '-' + (month) + '-' + date;
    addInfo({ deadline: dateMonthYear, choosedDeadline });
  };

  render() {
    const { classes, deadline, choosedDeadline } = this.props;
    const { expanded } = this.state;
    const title = brand.name + ' - Deadline';
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
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Set Your Own Deadline" icon="ios-time-outline" whiteBg desc="You can choose your suitable timeline">
              <div style={{ textAlign: 'left' }}>
                <RadioGroup
                  name="deadline"
                  className={classes.group}
                  value={choosedDeadline}
                  onChange={(e) => this.handleReduxChange(e.target.value)}
                >
                  <FormControlLabel value="28" control={<Radio />} label="1 Month" />
                  <FormControlLabel value="56" control={<Radio />} label="2 Month" />
                  <FormControlLabel value="84" control={<Radio />} label="3 Month" />
                  <FormControlLabel value="5" control={<Radio />} label="Role deadline as campaign deadline" />
                  <FormControlLabel value="0" control={<Radio />} label="Custom Deadline" />
                </RadioGroup>
              </div>
              <br />
              {choosedDeadline === '0' && (
                <div style={{ textAlign: 'left' }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        format="dd/MM/yyyy"
                        placeholder="Choose Date"
                        value={new Date(deadline)}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
              )}
            </PapperBlock>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <PapperBlock title="FAQs about campaigns" icon="ios-help-circle-outline" whiteBg desc="Have a look at some typical issues.">
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleQA('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography align="left" className={classes.heading}>How many emails will be sent about my campaign?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography align="left">
                    The number of emails that are sent depends on the length of the campaign but we strictly regulate emails to ensure students are not sent too many!
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleQA('panel2')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography align="left" className={classes.heading}>How else do we get your message to future hires?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography align="left">
                    Your company profile is also boosted on the VCH campaign, as well as promoted through all of our social media campaigns.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleQA('panel3')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography align="left" className={classes.heading}>What happens when I submit my campaign?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography align="left">
                    A member of the VCH team will review it and create all the relevant communication necessary to ensure it all runs smoothly and effectively.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleQA('panel4')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography align="left" className={classes.heading}>Can I create more than one campaign for the same role?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography align="left">
                    You can’t run more than one campaign for the same role concurrently however, if you have other roles you are hiring for then you can run campaigns for them.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleQA('panel5')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography align="left" className={classes.heading}>How many students will be targeted by this campaign?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography align="left">
                    Click next below to see how many students are being targeted initially, this number will usually grow by around 15% per month for any given campaign.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </PapperBlock>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Step5.propTypes = {
  classes: PropTypes.object.isRequired,
  deadline: PropTypes.string.isRequired,
  choosedDeadline: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  deadline: state.getIn([reducerCampaign, 'deadline']),
  choosedDeadline: state.getIn([reducerCampaign, 'choosedDeadline'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep5Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step5);

export default withStyles(styles)(StepMapped);
