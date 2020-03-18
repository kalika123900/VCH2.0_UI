import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { storeEducationData } from 'dan-actions/studentProfileActions';
import ListItemText from '@material-ui/core/ListItemText';
import { degreeGradesItems } from 'dan-api/apps/profileOption';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

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
class EditEducation extends React.Component {
  constructor(props) {
    super(props)
  }

  handleEduFromChange = (date, id) => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const newEducationArr = MapEducationInfo.map(item => {
      if (item.id === id) {
        return {
          ...item,
          eduFrom: date
        };
      };
      return item;
    })

    addEducationInfo({ educationInfo: newEducationArr });
  };

  handleEduToChange = (date, id) => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const newEducationArr = MapEducationInfo.map(item => {
      if (item.id === id) {
        return {
          ...item,
          eduTo: date
        };
      };
      return item;
    })

    addEducationInfo({ educationInfo: newEducationArr });
  };

  handleChange = (event, id) => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const newEducationArr = MapEducationInfo.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [event.target.name]: event.target.value
        };
      };
      return item;
    })

    addEducationInfo({ educationInfo: newEducationArr });
  };

  render() {
    const { classes, id, educationInfo } = this.props;

    const MapEducationInfo = educationInfo.toJS();
    const { institute, qualification, grade, eduFrom, eduTo } = MapEducationInfo[id];

    return (
      <section className={classes.pageFormWrap}>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              label="Institute"
              className={classes.textField}
              type="text"
              value={institute}
              name="institute"
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
              label="Qualification"
              className={classes.textField}
              type="text"
              value={qualification}
              name="qualification"
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
              <KeyboardDatePicker
                margin="normal"
                placeholder="From"
                format="dd/MM/yyyy"
                value={new Date(eduFrom)}
                name="eduFrom"
                onChange={(date) => this.handleEduFromChange(date, id)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                placeholder="To"
                format="dd/MM/yyyy"
                value={new Date(eduTo)}
                name="eduTo"
                onChange={e => this.handleEduToChange(e, id)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="select-grade"
            >
              Grade Achieved
            </InputLabel>
            <Select
              placeholder="Grade Achieved"
              value={grade}
              name="grade"
              onChange={e => this.handleChange(e, id)}
              MenuProps={MenuProps}
            >
              {degreeGradesItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </section>
    );
  }
}

const reducerStudent = 'studentProfile';

EditEducation.propTypes = {
  classes: PropTypes.object.isRequired,
  educationInfo: PropTypes.object.isRequired,
  addEducationInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  educationInfo: state.getIn([reducerStudent, 'educationInfo'])
});

const mapDispatchToProps = dispatch => ({
  addEducationInfo: bindActionCreators(storeEducationData, dispatch)
});

const EditEducationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEducation);

export default withStyles(styles)(EditEducationMapped);
