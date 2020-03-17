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
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox'
import { storeEducation } from 'dan-actions/studentProfileActions';
import ListItemText from '@material-ui/core/ListItemText';
import { degreeGradesItems, courstStartYearItems, graduationYearItems } from 'dan-api/apps/profileOption';

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

  handleEduFromChange = date => {
    const { addInfo } = this.props;


    addInfo({ ...this.props, eduFrom: date });
  };

  handleEduToChange = date => {
    const { addInfo } = this.props;


    addInfo({ ...this.props, eduTo: date });
  };

  handleChange = (event, id) => {
    const { addInfo } = this.props;
    educationStore.id.addInfo({ ...this.props, [event.educationStore.name]: event.educationStore.value })
    // addInfo({ educationStore });
  };

  render() {
    const {
      classes,
      // eduFrom,
      // eduTo,
      // qualification,
      // institute,
      // grade,
      educationStore
    } = this.props;



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
              onChange={e => this.handleChange(e, this.props.id)}
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
              onChange={e => this.handleChange(e, this.props.id)}
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
                value={eduFrom}
                name="eduFrom"
                onChange={e => this.handleChange(e, this.props.id)}
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
                value={eduTo}
                name="eduTo"
                onChange={e => this.handleChange(e, this.props.id)}
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
              onChange={e => this.handleChange(e, this.props.id)}
              MenuProps={MenuProps}
            >
              {degreeGradesItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
            {/* <Select
              value={grade}
              name="grade"
              onChange={e => this.handleChange(e)}
              input={<Input id="select-grade" />}
              renderValue={selected => {
                var gradeName = '';
                degreeGradesItems.map((value, index) => {
                  if (selected.includes(value)) {
                    gradeName = value;
                  }
                });
                return gradeName;
              }}
              MenuProps={MenuProps}
            >
              {degreeGradesItems.map((item, index) => (
                (item != '') &&
                <MenuItem key={index} value={item}>
                  <Checkbox checked={grade.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </div>

      </section>
    );
  }
}

const reducerCampaign = 'studentProfile';

EditEducation.propTypes = {
  classes: PropTypes.object.isRequired,
  // institute: PropTypes.string.isRequired,
  // qualification: PropTypes.string.isRequired,
  // eduFrom: PropTypes.string.isRequired,
  // eduTo: PropTypes.string.isRequired,
  // grade: PropTypes.string.isRequired,
  educationStore: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // institute: state.getIn([reducerCampaign, 'institute']),
  // qualification: state.getIn([reducerCampaign, 'qualification']),
  // eduFrom: state.getIn([reducerCampaign, 'eduFrom']),
  // eduTo: state.getIn([reducerCampaign, 'eduTo']),
  // grade: state.getIn([reducerCampaign, 'grade']),
  educationStore: state.getIn([reducerCampaign, 'educationStore'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeEducation, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEducation);



export default withStyles(styles)(StepMapped);
