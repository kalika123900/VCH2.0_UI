import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

const industryList = [
  'IT',
  'AutoMobile',
  'Robotics'
]

const companyList = [
  'Google',
  'Facebook',
  'Twitter'
]

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


class EditSkillsInterests extends React.Component {
  state = {
    industries: [],
    companies: [],
    skills: [],
    customSkill: '',
  };

  addSkill = () => {
    if (this.state.customSkill.length > 0) {
      let customSkill = '+ ' + this.state.customSkill
      let newSkillArr = [...this.state.skills, customSkill]
      this.setState({ skills: newSkillArr, customSkill: '' })
    }
  };

  handleSuggestedProduct = (e) => {
    let customSkill = e.target.outerText
    let newSkillArr = [...this.state.skills, customSkill]
    this.setState({ skills: newSkillArr })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
    } = this.props;

    const { skills, industries, companies, customSkill } = this.state;

    const skillItems = skills.length > 0 ? skills.map((item, index) => {
      return (
        <Typography variant="subtitle1" className={classes.choosenTerms, classes.skillItems} key={index}>
          {item}
        </Typography>
      )
    }) : null

    return (
      <section className={classes.pageFormWrap} >
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="select-industries"
            >
              Interested Industries
                  </InputLabel>
            <Select
              multiple
              value={industries}
              name="industries"
              onChange={e => this.handleChange(e)}
              input={<Input id="select-industries" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {industryList.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <Checkbox checked={industryList.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="select-companies"
            >
              Interested Companies
                </InputLabel>
            <Select
              multiple
              value={companies}
              name="companies"
              onChange={e => this.handleChange(e)}
              input={<Input id="select-companies" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {companyList.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <Checkbox checked={companyList.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Grid className={classes.customGrid}>
          {skillItems !== null && skillItems}
        </Grid>
        <Grid >
          <TextField
            placeholder="Skills"
            autoCapitalize="true"
            value={customSkill}
            className={classes.textField}
            name='customSkill'
            margin="normal"
            variant="filled"
            onChange={(e) => this.handleChange(e)}
            style={{ width: "100%" }}
          />
          <Grid>
            <Tooltip title="Add New">
              <Button variant="text" color="secondary" onClick={e => this.addSkill(e)} >
                <AddIcon />
                Add New Skill
                </Button>
            </Tooltip>
          </Grid>
          <Grid >
            <Typography variant="h6" style={{ textAlign: "left", marginBottom: "5px", marginTop: '10px' }}>
              Suggested skills
            </Typography>
            <Grid container>
              <Button variant="outlined" color="secondary"
                onClick={(e) => this.handleSuggestedProduct(e)}
                className={classes.btnMargin}
              >
                + JavaScript
                    </Button>&nbsp;&nbsp;
                    <Button variant="outlined" color="secondary"
                className={classes.btnMargin}
                onClick={(e) => this.handleSuggestedProduct(e)}
              >
                + React
                    </Button>&nbsp;
                    <Button variant="outlined" color="secondary"
                className={classes.btnMargin}
                onClick={(e) => this.handleSuggestedProduct(e)}
              >
                + Angular
                    </Button>&nbsp;
                    <Button variant="outlined" color="secondary"
                className={classes.btnMargin}
                onClick={(e) => this.handleSuggestedProduct(e)}
              >
                + Java
                    </Button>&nbsp;
                    <Button variant="outlined" color="secondary"
                className={classes.btnMargin}
                onClick={(e) => this.handleSuggestedProduct(e)}
              >
                + Webpack
                    </Button>&nbsp;
                    <Button variant="outlined" color="secondary"
                className={classes.btnMargin}
                onClick={(e) => this.handleSuggestedProduct(e)}
              >
                + NodeJs
                    </Button>&nbsp;
                  </Grid>
          </Grid>
        </Grid>
      </section >
    );
  }
}

EditSkillsInterests.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditSkillsInterests);
