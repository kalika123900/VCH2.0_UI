import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';
import Typography from '@material-ui/core/Typography';
import Place from '@material-ui/icons/Place';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class ClientFilter extends PureComponent {
  state = {
    skill: '',
    location: '',
    intern: false,
    fullTime: false,
    partTime: false,
    intern: false,
    allJobs: false,
    remote: false,
    freeIntern: false,
    paidIntern: false,
  };

  handleReset = () => {
    this.setState({
      skill: '',
      location: '',
      intern: false,
      fullTime: false,
      partTime: false,
      intern: false,
      remote: false,
      allJobs: false,
      paidIntern: false,
      freeIntern: false
    })
  }

  handleLocationChange = prop => event => {
    this.setState({ location: event.target.value })
  };

  handleChangeSkill = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const
      {
        skill, location, intern, fullTime,
        partTime, remote, allJobs, freeIntern, paidIntern
      } = this.state;

    return (
      <PapperBlock whiteBg noMargin title="Apply Filter" icon="ios-search-outline" desc="">
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="skill-simple">Skill</InputLabel>
              <Select
                value={skill}
                onChange={this.handleChangeSkill}
                inputProps={{
                  name: 'skill',
                  id: 'skill-simple',
                }}
              >
                <MenuItem value="">
                  <em>--select skill--</em>
                </MenuItem>
                <MenuItem value="node">Node.js</MenuItem>
                <MenuItem value="react">React</MenuItem>
                <MenuItem value="angular">Angular</MenuItem>
                <MenuItem value="c">C/C++</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="android">Android</MenuItem>
                <MenuItem value="ios">ios</MenuItem>
                <MenuItem value="django">Django</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="location-simple">Location</InputLabel>
              <Input
                id="location-simple"
                value={location}

                onChange={this.handleLocationChange('location')}
                endAdornment={<InputAdornment position="end"><Place /></InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'location',
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <Typography variant="button" className={classes.divider}>Work Type</Typography>
            <Grid>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={allJobs}
                    onChange={this.handleCheckbox('allJobs')}
                    value="allJobs"
                  />
                )}
                label="All Jobs"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={intern}
                    onChange={this.handleCheckbox('intern')}
                    value="intern"
                  />
                )}
                label="Intership"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={fullTime}
                    onChange={this.handleCheckbox('fullTime')}
                    value="fullTime"
                  />
                )}
                label="Full Time"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={partTime}
                    onChange={this.handleCheckbox('partTime')}
                    value="partTime"
                  />
                )}
                label="Part Time"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={remote}
                    onChange={this.handleCheckbox('remote')}
                    value="remote"
                  />
                )}
                label="Remote Job"
              />
            </Grid>
          </Grid>
          <Grid item sm={6} xs={6}>
            <Typography variant="button" className={classes.divider}>Intership Type</Typography>
            <Grid>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={freeIntern}
                    onChange={this.handleCheckbox('freeIntern')}
                    value="freeIntern"
                  />
                )}
                label="Free"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={paidIntern}
                    onChange={this.handleCheckbox('paidIntern')}
                    value="paidIntern"
                  />
                )}
                label="Paid"
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.textRight}>
          <Button color="secondary" variant="contained" className={classes.button} onClick={(e) => { this.handleReset() }}>
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

ClientFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientFilter);
