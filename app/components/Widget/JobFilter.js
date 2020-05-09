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
import Place from '@material-ui/icons/Place';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import {
  sectorsData,
  skillMenu,
  jobType,
} from 'dan-api/apps/profileOption';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class ClientFilter extends PureComponent {
  render() {
    const
      {
        skill, location, interests, handleChange, handleReset, handleSubmit, classes, workType
      } = this.props;

    return (
      <PapperBlock whiteBg noMargin title="Apply Filter" icon="ios-search-outline" desc="">
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="skill-simple">Skill</InputLabel>
              <Select
                multiple
                value={skill}
                input={<Input />}
                name="skill"
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const skillName = [];
                  skillMenu.map((value, index) => {
                    if (selected.includes(value)) {
                      skillName.push(value);
                    }
                  });
                  return skillName.join(', ');
                }
                }
                onChange={e => handleChange(e)}
              >
                {skillMenu.map((item, index) => (
                  (item.length > 0) &&
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="skill-checkbox"
                      component={Checkbox}
                      checked={skill.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="location-simple">Location</InputLabel>
              <Input
                id="location-simple"
                value={location}
                name='location'
                onChange={e => handleChange(e)}
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
            <Grid>
              <FormControl className={classes.formControlTrade}>
                <InputLabel htmlFor="sector-simple">Industry</InputLabel>
                <Select
                  id="sector-simple"
                  multiple
                  value={interests}
                  input={<Input />}
                  name="interests"
                  MenuProps={MenuProps}
                  component={Select}
                  renderValue={selected => {
                    const interestsName = [];
                    sectorsData.map((value, index) => {
                      if (selected.includes(value)) {
                        interestsName.push(value);
                      }
                    });
                    return interestsName.join(', ');
                  }
                  }
                  onChange={e => handleChange(e)}
                >
                  {sectorsData.map((item, index) => (
                    item != "I'm flexible / Open to all roles" &&
                    <MenuItem key={index.toString()} value={item}>
                      <TextField
                        name="interests"
                        component={Checkbox}
                        checked={interests.indexOf(item) > -1}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="work-type">Work Type</InputLabel>
              <Select
                multiple
                value={workType}
                input={<Input />}
                name="workType"
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const workName = [];
                  jobType.map((value, index) => {
                    if (selected.includes(value)) {
                      workName.push(value);
                    }
                  });
                  return workName.join(', ');
                }
                }
                onChange={e => handleChange(e)}
              >
                {jobType.map((item, index) => (
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="work-checkbox"
                      component={Checkbox}
                      checked={workType.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.textRight}>
          <Button color="secondary" variant="contained" className={classes.button} onClick={(e) => handleReset()}>
            Reset
          </Button>
          <Button color="secondary" variant="contained" className={classes.button} onClick={(e) => handleSubmit()} >
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
