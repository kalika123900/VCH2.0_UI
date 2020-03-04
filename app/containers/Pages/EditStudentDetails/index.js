import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import styles from '../../../components/Forms/user-jss';
import Button from '@material-ui/core/Button';
import {
  EditPersonalDetails, EditSkillsInterests,
  EditEducation, EditExperience
}
  from 'dan-components'

class EditStudentDetails extends Component {
  state = {
    tab: 0,
    eduField: [null],
    exField: [null]
  }
  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  addEducationField = (e) => {
    let value = [...this.state.eduField, null]
    this.setState({ eduField: value })
  }

  addExperienceField = (e) => {
    let value = [...this.state.exField, null]
    this.setState({ exField: value })
  }

  render() {
    const { classes } = this.props;

    const { tab, eduField, exField } = this.state;

    const EducationJSX = eduField.map((item, index) => {
      return (<EditEducation key={index} />)
    })

    const ExperienceJSX = exField.map((item, index) => {
      return <EditExperience key={index} />
    })

    return (
      <Paper className={classes.fullWrap, classes.petal}>
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
                <div className={classes.btnArea} >
                  <Button variant="text" color="primary" onClick={e => this.addEducationField(e)}>
                    Add More
            </Button>
                </div>
              </Fragment>
            )}
            {tab === 3 && (
              <Fragment>
                {ExperienceJSX}
                <div className={classes.btnArea} >
                  <Button variant="text" color="primary" onClick={e => this.addExperienceField(e)}>
                    Add More
            </Button>
                </div>
              </Fragment>
            )}
            <div className={classes.btnArea} style={{ marginTop: "35px" }}>
              <Button variant="contained" fullWidth color="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    )
  }
}


EditStudentDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditStudentDetails);
