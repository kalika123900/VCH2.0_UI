import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
  EditPersonalDetails, EditSkillsInterests,
  EditEducation, EditExperience
}
  from 'dan-components';
import styles from '../../../components/Forms/user-jss';

class EditStudentDetails extends Component {
  state = {
    tab: 0,
    eduField: [0],
    exField: [0]
  }

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };
  removeEducationField = itemId => {


    const value = this.state.eduField.filter(edufield => edufield !== itemId);

    this.setState({ eduField: value });
  }

  addEducationField = (e) => {
    const value = [...this.state.eduField, this.state.eduField.length++];
    this.setState({ eduField: value });
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
    const { classes } = this.props;

    const { tab, eduField, exField } = this.state;

    const EducationJSX = eduField.map((item, index) => {
      if (item != 0) {
        return <Fragment>
          <div className={classes.btnArea}>
            <Button variant="text" color="secondary" onClick={e => this.removeEducationField(item)}>
              Remove
          </Button>
          </div>
          <EditEducation key={index} />
        </Fragment>
      }
      else {
        return <EditEducation key={index} />
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
          <EditExperience key={index} />
        </Fragment>

      } else {
        return <EditExperience key={index} />
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


EditStudentDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditStudentDetails);
