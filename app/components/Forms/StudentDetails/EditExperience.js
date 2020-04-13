import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { storeExperience } from 'dan-actions/studentProfileActions';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

class EditExperience extends React.Component {
  handleChange = (event, id) => {
    const { experienceInfo, addInfo, } = this.props;
    const MapExperienceInfo = experienceInfo.toJS();
    const newExperienceArr = MapExperienceInfo.map((item, index) => {
      if (index == id) {
        return {
          ...item,
          [event.target.name]: event.target.value
        };
      }
      else {
        return {
          ...item
        }
      }
    })
    addInfo({ ...this.props, experienceInfo: newExperienceArr });
  };


  handleFromDateChange = currentDate => {
    const { addInfo, experienceInfo, id } = this.props;
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

    const dateMonthYear = year + '-' + (month) + '-' + date;
    const MapExperienceInfo = experienceInfo.toJS();
    const newExperienceArr = MapExperienceInfo.map((item, index) => {
      if (index == id) {
        return {
          ...item,
          from: dateMonthYear
        };
      }
      else {
        return {
          ...item
        }
      }
    })
    addInfo({ ...this.props, experienceInfo: newExperienceArr });
  };

  handleToDateChange = currentDate => {
    const { addInfo, experienceInfo, id } = this.props;
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

    const dateMonthYear = year + '-' + (month) + '-' + date;
    const MapExperienceInfo = experienceInfo.toJS();
    const newExperienceArr = MapExperienceInfo.map((item, index) => {
      if (index == id) {
        return {
          ...item,
          to: dateMonthYear
        };
      }
      else {
        return {
          ...item
        }
      }
    })
    addInfo({ ...this.props, experienceInfo: newExperienceArr });
  };

  render() {
    const { classes, id, experienceInfo } = this.props;

    const MapExperienceInfo = experienceInfo.toJS();
    const { company, role, roleDescription, from, to } = MapExperienceInfo[id];

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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  format="dd/MM/yyyy"
                  placeholder="Choose Start Date"
                  value={new Date(from)}
                  onChange={this.handleFromDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{ width: '100%' }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl} >
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <Grid container justify="space-around" >
                <KeyboardDatePicker
                  margin="normal"
                  format="dd/MM/yyyy"
                  placeholder="Choose End Date"
                  value={new Date(to)}
                  onChange={this.handleToDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{ width: '100%' }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
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
  oldExperienceInfo: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  experienceInfo: state.getIn([reducerStudent, 'experienceInfo']),
  oldExperienceInfo: state.getIn([reducerStudent, 'oldExperienceInfo'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeExperience, dispatch)
});

const EditExperienceMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExperience);



export default withStyles(styles)(EditExperienceMapped);
