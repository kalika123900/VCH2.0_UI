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
import { storeSkillInterests, } from 'dan-actions/studentProfileActions';
import { companyList, skillMenu } from 'dan-api/apps/profileOption';

const industryList = [
  'IT',
  'AutoMobile',
  'Robotics'
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
      oldSkills,
      intrestedCompanies,
      handleSubmit
    } = this.props;


    return (
      <section className={classes.pageFormWrap} >
        <form>
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
                  skillMenu.map((value, index) => {
                    if (selected.includes(value)) {
                      skillName.push(value);
                    }
                  });
                  return skillName.join(', ');
                }
                }
                onChange={e => this.handleChange(e)}
              >
                {skillMenu.map((item, index) => (
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

            </FormControl>
          </div>
          <div className={classes.btnArea} style={{ marginTop: '35px' }}>
            <Button variant="contained" fullWidth color="primary" onClick={() => handleSubmit()}>
              Save Changes
              </Button>
          </div>
        </form>

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
  addInfo: PropTypes.func.isRequired,
  oldSkills: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  intrestedIndustries: state.getIn([reducerCampaign, 'intrestedIndustries']),
  intrestedCompanies: state.getIn([reducerCampaign, 'intrestedCompanies']),
  skills: state.getIn([reducerCampaign, 'skills']),
  oldSkills: state.getIn([reducerCampaign, 'oldSkills']),
});
const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeSkillInterests, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSkillsInterests);


export default withStyles(styles)(StepMapped);
