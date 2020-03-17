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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { storeExperience } from 'dan-actions/studentProfileActions';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

class EditExperience extends React.Component {
  // state = {
  //   skills: [],
  //   customSkill: '',
  //   company: '',
  //   role: '',
  //   roleDescription: '',
  // };

  // addSkill = () => {
  //   if (this.state.customSkill.length > 0) {
  //     let customSkill = '+ ' + this.state.customSkill
  //     let newSkillArr = [...this.state.skills, customSkill]
  //     this.setState({ skills: newSkillArr, customSkill: '' })
  //   }
  // };

  // handleSuggestedProduct = (e) => {
  //   let customSkill = e.target.outerText
  //   let newSkillArr = [...this.state.skills, customSkill]
  //   this.setState({ skills: newSkillArr })
  // };

  handleChange = event => {
    const { addInfo } = this.props;


    addInfo({ ...this.props, [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
      company,
      role,
      roleDescription
    } = this.props;

    // const skillItems = skills.length > 0 ? skills.map((item, index) => {
    //   return (
    //     <Typography variant="subtitle1" className={classes.choosenTerms, classes.skillItems} key={index}>
    //       {item}
    //     </Typography>
    //   )
    // }) : null

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
        {/*  <Grid className={classes.customGrid}>
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
        </div>*/}

      </section >
    );
  }
}

const reducerCampaign = 'studentProfile';

EditExperience.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.string.isRequired,
  role: PropTypes.string.role,
  roleDescription: PropTypes.string.isRequired,
  //experienceskills: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  company: state.getIn([reducerCampaign, 'company']),
  role: state.getIn([reducerCampaign, 'role']),
  roleDescription: state.getIn([reducerCampaign, 'roleDescription']),
  // experienceskills: state.getIn([reducerCampaign, 'experienceskills']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeExperience, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExperience);



export default withStyles(styles)(StepMapped);
