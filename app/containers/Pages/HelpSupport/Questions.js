import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import styles from './helpSupport-jss';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Qna extends React.Component {
  state = {
    questions: [
      'How can I create an account for another recruiter in my firm?',
      'Are there any restrictions on the number of students I can contact?',
      'What happens when I create a campaign?',
      'What happens when I send a bulk email ?',
      'What happens when I send a student an individual message?',
      'What does my company profile look like to students?',
      'How can I sign out of my account?',
      'How can I see the progress of my campaign?',
      'Where can I see my shortlist or contacts?'
    ]
  };

  render() {
    const { classes, answer } = this.props;
    const { questions } = this.state;

    const renderQ = questions.map((item, index) => {
      return (
        <Fragment key={index} >
          <div>
            <Typography onClick={() => this.props.handleChange(index)} className={classes.heading, classes.question}
              style={answer == index ? { color: '#283592' } : null}
            >{item}</Typography>
            <Divider />
          </div>
        </Fragment>
      )
    });

    return (
      <PapperBlock title="Questions" icon="ios-help-circle-outline" whiteBg desc="" style={{ height: '100%' }} >
        {renderQ}
      </PapperBlock>
    );
  }
}

Qna.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Qna);
