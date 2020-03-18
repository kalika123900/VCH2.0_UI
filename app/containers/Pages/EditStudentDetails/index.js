import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeEducationData } from 'dan-actions/studentProfileActions';
import {
  EditPersonalDetails, EditSkillsInterests,
  EditEducation, EditExperience
}
  from 'dan-components';
import { DateHelper } from '../../../redux/helpers/dateTimeHelper';
import styles from '../../../components/Forms/user-jss';

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele.id != value;
  });
}

class EditStudentDetails extends Component {
  state = {
    tab: 0,
    exField: [0]
  }

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  addEducationField = (e) => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const formObject = {
      id: MapEducationInfo.length,
      institute: '',
      qualification: '',
      eduFrom: DateHelper.format(DateHelper.addDays(new Date(), -1480)),
      eduTo: DateHelper.format(DateHelper.addDays(new Date(), -30)),
      grade: ''
    }
    MapEducationInfo.push(formObject);

    addEducationInfo({ educationInfo: MapEducationInfo });
    console.log(educationInfo)
  }

  removeEducationField = itemId => {
    const { educationInfo, addEducationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const newEducationArr = arrayRemove(MapEducationInfo, itemId);
    addEducationInfo({ educationInfo: newEducationArr });
  }


  removeExperienceField = itemId => {
    const value = this.state.exField.filter(exfield => exfield !== itemId);
    this.setState({ exField: value });
  }


  addExperienceField = (e) => {
    const value = [...this.state.exField, this.state.exField.length++];
    this.setState({ exField: value });
  }

  render() {
    const { classes, educationInfo } = this.props;
    const MapEducationInfo = educationInfo.toJS();

    const { tab, exField } = this.state;

    const EducationJSX = MapEducationInfo.map((item, index) => {
      if (item.id != 0) {
        return <Fragment key={index}>
          <div className={classes.btnArea}>
            <Button variant="text" color="secondary" onClick={e => this.removeEducationField(item.id)}>
              Remove
          </Button>
          </div>
          <EditEducation id={item.id} />
        </Fragment>
      }
      else {
        return <EditEducation id={item.id} key={index} />
      }
    });

    const ExperienceJSX = exField.map((item, index) => {
      if (item != 0) {
        return <Fragment>
          <div className={classes.btnArea}>
            <Button variant="text" color="secondary" onClick={e => this.removeExperienceField(item)}>
              Remove
        </Button>
          </div>
          <EditExperience id={item} key={index} />
        </Fragment>

      } else {
        return <EditExperience id={item} key={index} />
      }
    })

    return (
      <Paper className={classes.fullWrap, classes.petal} >
        <Tabs
          value={tab}
          onChange={this.handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="Personal Details" />
          <Tab label="Skills & Interests" />
          <Tab label="Education" />
          <Tab label="Experience" />
        </Tabs>
        <section className={classes.pageFormWrap}>
          <form>
            {tab === 0 && (
              <EditPersonalDetails />
            )}
            {tab === 1 && (
              <EditSkillsInterests />
            )}
            {tab === 2 && (
              <Fragment>
                {EducationJSX}
                <div className={classes.btnArea}>
                  <Button variant="text" color="primary" onClick={e => this.addEducationField(e)}>
                    Add More
                  </Button>

                </div>
              </Fragment>
            )}
            {tab === 3 && (
              <Fragment>
                {ExperienceJSX}
                <div className={classes.btnArea}>
                  <Button variant="text" color="primary" onClick={e => this.addExperienceField(e)}>
                    Add More
                  </Button>

                </div>
              </Fragment>
            )}
            <div className={classes.btnArea} style={{ marginTop: '35px' }}>
              <Button variant="contained" fullWidth color="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

const reducerStudent = 'studentProfile';

EditStudentDetails.propTypes = {
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

const EditStudentDetailsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudentDetails);

export default withStyles(styles)(EditStudentDetailsMapped);

