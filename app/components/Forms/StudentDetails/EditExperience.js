import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { storeExperience } from 'dan-actions/studentProfileActions';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

class EditExperience extends React.Component {
  constructor(props) {
    super(props)
  }
  handleChange = (event, id) => {
    const { experienceInfo, addExperienceInfo } = this.props;
    const MapExperienceInfo = experienceInfo.toJS();

    const newExperienceArr = MapExperienceInfo.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [event.target.name]: event.target.value
        };
      };
      return item;
    })
    addExperienceInfo({ experienceInfo: newExperienceArr })
  };
  render() {
    const { classes, id, experienceInfo } = this.props;

    const MapExperienceInfo = experienceInfo.toJS();
    const { company, role, roleDescription } = MapExperienceInfo[id];
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
              onChange={e => this.handleChange(e, id)}
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
              onChange={e => this.handleChange(e, id)}
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
              onChange={e => this.handleChange(e, id)}
            />
          </FormControl>
        </div>
      </section >
    );
  }
}

const reducerStudent = 'studentProfile';

EditExperience.propTypes = {
  classes: PropTypes.object.isRequired,
  experienceInfo: PropTypes.object.isRequired,
  addExperienceInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  experienceInfo: state.getIn([reducerStudent, 'experienceInfo'])
});

const mapDispatchToProps = dispatch => ({
  addExperienceInfo: bindActionCreators(storeExperience, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExperience);



export default withStyles(styles)(StepMapped);
