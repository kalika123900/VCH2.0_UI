import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import { storeSkillInterests } from 'dan-actions/studentProfileActions';

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
const skillsList = [
  'Java',
  'React',
  'PHP',
  'JAVA Script',
  'Node Js'
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
  constructor(props) {
    super(props)
    console.log(this.props);
  }


  handleChange = event => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, [event.target.name]: event.target.value });

  };

  render() {
    const {
      classes,
      intrestedIndustries,
      skills,
      intrestedCompanies
    } = this.props;

    //const { skills, industries, companies, customSkill } = this.state;
    // const skillItems = skills.length > 0 ? skills.map((item, index) => {
    //   return (
    //     <Typography variant="subtitle1" className={classes.choosenTerms, classes.skillItems} key={index}>
    //       {item}
    //     </Typography>
    //   )
    // }) : null

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
              value={intrestedIndustries.toJS()}
              input={<Input />}
              name="intrestedIndustries"
              MenuProps={MenuProps}
              component={Select}
              renderValue={selected => {
                const industrieName = [];
                industryList.map((value, index) => {
                  if (selected.includes(value)) {
                    industrieName.push(value);
                  }
                });
                return industrieName.join(', ');
              }
              }
              onChange={e => this.handleChange(e)}
            >
              {industryList.map((item, index) => (
                <MenuItem key={index.toString()} value={item}>
                  <TextField
                    name="industrie-checkbox"
                    component={Checkbox}
                    checked={intrestedIndustries.indexOf(item) > -1}
                  />
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
              value={intrestedCompanies.toJS()}
              input={<Input />}
              name="intrestedCompanies"
              MenuProps={MenuProps}
              component={Select}
              renderValue={selected => {
                const companieName = [];
                companyList.map((value, index) => {
                  if (selected.includes(value)) {
                    companieName.push(value);
                  }
                });
                return companieName.join(', ');
              }
              }
              onChange={e => this.handleChange(e)}
            >
              {companyList.map((item, index) => (
                <MenuItem key={index.toString()} value={item}>
                  <TextField
                    name="company-checkbox"
                    component={Checkbox}
                    checked={intrestedCompanies.indexOf(item) > -1}
                  />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="select-Skills"
            >
              Interested Skills
                </InputLabel>
            <Select
              multiple
              value={skills.toJS()}
              input={<Input />}
              name="skills"
              MenuProps={MenuProps}
              component={Select}
              renderValue={selected => {
                const skillName = [];
                skillsList.map((value, index) => {
                  if (selected.includes(value)) {
                    skillName.push(value);
                  }
                });
                return skillName.join(', ');
              }
              }
              onChange={e => this.handleChange(e)}
            >
              {skillsList.map((item, index) => (
                <MenuItem key={index.toString()} value={item}>
                  <TextField
                    name="skill-checkbox"
                    component={Checkbox}
                    checked={skills.indexOf(item) > -1}
                  />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
            {/* <Select
              multiple
              value={skills.toJS()}
              name="skills"
              onChange={e => this.handleChange(e)}
              input={<Input id="select-Skills" />}
              renderValue={selected => {
                var skillsName = [];
                skillList.map((value, index) => {
                  if (selected.includes(value)) {
                    skillsName = value;
                  }
                });
                return skillsName;
              }}
              MenuProps={MenuProps}
            >
              {skillList.map((item, index) => (
                (item != '') &&
                <MenuItem key={index} value={item}>
                  <Checkbox checked={skills.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </div>
        {/* <Grid className={classes.customGrid}>

        </Grid>
        <Grid >
          <TextField
            placeholder="Skills"
            autoCapitalize="true"
            value={skills}
            className={classes.textField}
            name='skills'
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
                onClick={(e) => this.handleChange(e)}
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
        </Grid> */}
      </section >
    );
  }
}
const reducerCampaign = 'studentProfile';

EditSkillsInterests.propTypes = {
  classes: PropTypes.object.isRequired,
  intrestedIndustries: PropTypes.object.isRequired,
  intrestedCompanies: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  intrestedIndustries: state.getIn([reducerCampaign, 'intrestedIndustries']),
  intrestedCompanies: state.getIn([reducerCampaign, 'intrestedCompanies']),
  skills: state.getIn([reducerCampaign, 'skills']),
});
const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeSkillInterests, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSkillsInterests);


export default withStyles(styles)(StepMapped);
