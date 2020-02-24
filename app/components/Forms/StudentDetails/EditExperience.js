import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

class EditExperience extends React.Component {
  state = {
    skills: [],
    customSkill: '',
    company: '',
    role: '',
    roleDescription: '',
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
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,

    } = this.props;

    const { skills, customSkill, company, role, roleDescription, } = this.state;

    const skillItems = skills.length > 0 ? skills.map((item, index) => {
      return (
        <Typography variant="subtitle1" className={classes.choosenTerms, classes.skillItems} key={index}>
          {item}
        </Typography>
      )
    }) : null

    return (
      <section className={classes.pageFormWrap}>

        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Company"
              className={classes.textField}
              type="text"
              value={company}
              name="company"
              margin="normal"
              variant="outlined"
              validate={[required]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Role"
              className={classes.textField}
              type="text"
              value={role}
              name="role"
              margin="normal"
              variant="outlined"
              validate={[required]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              multiline
              label="Role Description"
              className={classes.textField}
              type="text"
              value={roleDescription}
              name="roleDescription"
              margin="normal"
              variant="filled"
              validate={[required]}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
        </div>
        <Grid className={classes.customGrid}>
          {skillItems !== null && skillItems}
        </Grid>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              placeholder="Skills"
              autoCapitalize="true"
              value={customSkill}
              className={classes.textField}
              name='customSkill'
              margin="normal"
              variant="filled"
              onChange={(e) => this.handleChange(e)}
              type="text"
            />
            <Grid>
              <Tooltip title="Add New">
                <Button variant="text" color="secondary" onClick={e => this.addSkill(e)} >
                  <AddIcon />
                  Add Skill
                    </Button>
              </Tooltip>
            </Grid>
          </FormControl>
        </div>

      </section>
    );
  }
}

EditExperience.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(EditExperience);
