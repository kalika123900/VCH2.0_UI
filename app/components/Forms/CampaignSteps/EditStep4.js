import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import brand from 'dan-api/dummy/brand';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PapperBlock from '../../../components/PapperBlock/PapperBlock';
import PricingCard from '../../../components/CardPaper/PricingCard';
import styles from '../../../containers/Pages/HelpSupport/helpSupport-jss';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class Step5 extends React.Component {
  state = {
    expanded: null,
    checkedA: false,
    selectedDate: '12/01/2020'
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { expanded, checkedA, selectedDate } = this.state;
    const title = brand.name + ' - Pricing';
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
        <Grid container spacing={3} style={{ marginTop: "10px" }}>
          <Grid item md={4} sm={6} xs={12}>
            <PricingCard
              title=""
              price="1 Month"
              tier="free"
              feature={['* 1000 - 2000 Click-throughs', '2 emails + follow ups', '* Off-platform profile boosting', '* High priority on student interface ']}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <PricingCard
              title=''
              price="2 Month"
              tier="cheap"
              feature={['* 2000 - 4000 click-throughs', '4 emails + follow ups', '* off-platform profile boosting', '* Increasing priority on student interface']}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <PricingCard
              title=''
              price="3 Month"
              tier="expensive"
              feature={['* 5000 - 8000 click-throughs', '6 emails + follow ups', '* off-platform profile boosting', '* Increasing priority on student interface']}
            />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        <Grid container spacing={3} className={classes.root}>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Set Your Own Budget" icon="ios-time-outline" whiteBg desc="You can choose your suitable timeline"  >
              <div style={{ textAlign: 'left' }}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkedA}
                      onChange={this.handleCheckbox('checkedA')}
                      value="checkedA"
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
                      value={selectedDate}
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
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
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
              <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
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
              <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
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
              <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
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
              <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Quisque ut metus sit amet?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    enean sit amet magna vel magna fringilla fermentum. Donec sit amet nulla sed arcu pulvinar ultricies commodo id ligula.
              </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
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
};

export default withStyles(styles)(Step5);
