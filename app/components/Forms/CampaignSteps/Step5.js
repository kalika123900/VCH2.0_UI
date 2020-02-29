import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import brand from 'dan-api/dummy/brand';
import { storeStep5Info } from 'dan-actions/CampaignActions';
import PapperBlock from '../../PapperBlock/PapperBlock';
import styles from '../../../containers/Pages/HelpSupport/helpSupport-jss';

class Step5 extends React.Component {
  state = {
    expanded: null,
    roleDeadline: false
  };

  handleQA = panel => (expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleDateChange = currentDate => {
    const { addInfo } = this.props;
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

    const dateMonthYear = date + '/' + (month) + '/' + year;
    addInfo({ deadline: dateMonthYear });
  };

  render() {
    const { classes, deadline } = this.props;
    const { expanded, roleDeadline } = this.state;
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
                <FormControlLabel
                  control={(
                    <Checkbox
                      name="roleDeadline"
                      checked={roleDeadline}
                      onChange={e => this.handleCheckbox(e)}
                    />
                  )}
                  label="Set role deadline as campaign deadline"
                />
              </div>
              <br />
              <div style={{ textAlign: 'left' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      margin="normal"
                      format="dd/MM/yyyy"
                      placeholder="Choose Date"
                      value={deadline}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
            </PapperBlock>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <PapperBlock title="Question and Answer" icon="ios-help-circle-outline" whiteBg desc="Sed imperdiet enim ligula, vitae viverra justo porta vel.">
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleQA('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Pellentesque ac bibendum tortor?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                    maximus est, id dignissim quam.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleQA('panel2')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Vivamus sit amet interdum elit?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                    diam eros in elit. Pellentesque convallis laoreet laoreet.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleQA('panel3')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Vestibulum nec mi suscipit?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                    eros, vitae egestas augue. Duis vel est augue.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleQA('panel4')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Cras convallis lacus orci?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                    eros, vitae egestas augue. Duis vel est augue.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleQA('panel5')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Quisque ut metus sit amet?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    enean sit amet magna vel magna fringilla fermentum. Donec sit amet nulla sed arcu pulvinar ultricies commodo id ligula.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleQA('panel6')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Nulla vehicula leo ut augue tincidunt?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Curabitur egestas consequat lorem, vel fermentum augue porta id. Aliquam lobortis magna neque, gravida consequat velit venenatis at.
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
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  deadline: state.getIn([reducerCampaign, 'deadline'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep5Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step5);

export default withStyles(styles)(StepMapped);
