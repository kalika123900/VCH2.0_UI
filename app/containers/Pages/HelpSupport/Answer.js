import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import styles from './helpSupport-jss';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Divider } from '@material-ui/core';

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

    return (
      <PapperBlock title="Answer" icon="ios-help-circle-outline" whiteBg desc="" >
        {answer == 0 &&
          <Fragment>
            <div className={classes.answer}>
              <Typography className={classes.heading, classes.questionAnswer} >{questions[answer]}</Typography>
              <Divider />
              <Typography variant="body1" className={classes.customMargin}>
                VCH can be used to recruit for all different divisions of a business at no extra cost. You can create sub-accounts for other people in your firm. These accounts have different access levels for recruiters with different needs.
                  </Typography>
              <Typography className={classes.customMargin}>
                <b> Tier 1:</b>&nbsp; This is full access to the platform and all its features, with no more limitations that the master account has. Tier 1 users are not able to create seats for other accounts however, only the master account can do that.
                  </Typography>
              <Typography className={classes.customMargin}>
                <b> Tier 2:</b>&nbsp; This is similar to full access, the only limitation is that campaign and bulk emails are limited to a maximum contact count of 100 people. Share this with recruiters who are recruiting for less broad roles.
                  </Typography>
              <Typography className={classes.customMargin}>
                <b> Tier 3:</b>&nbsp; This is exclusively access to the all candidates feature, so the seat can email candidates individually and access their details but they are not able to run campaigns or send bulk emails.
                  </Typography>
              <Typography className={classes.customMargin}>
                <b>To create a seat for another recruiter you will need 3 things:</b>
              </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;1. Their full name
                  </Typography>
              <div className={classes.customMargin}>
                <img src="/images/help/answer1a.png" alt="seat-creation" />
              </div>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;2. Their email address
                  </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;3. Their phone number (or extension)
                  </Typography>
              <Typography className={classes.customMargin}>
                <b>Here is how you do it:</b>
              </Typography>
              <Typography className={classes.customMargin}>
                <b> Step 1:</b>&nbsp; Navigate to My Account &rarr; Seat Management
                  </Typography>
              <Typography className={classes.customMargin}>
                <b> Step 2:</b>&nbsp; Input the details that you gather above.
                  </Typography>
              <Typography className={classes.customMargin}>
                <b> Step 3:</b>&nbsp; The person that you create a seat for will be sent an email with instructions on how to access the platform and login.
                  </Typography>
            </div>
          </Fragment>
        }
        {answer == 1 &&
          <Fragment>
            <div className={classes.answer}>
              <Typography className={classes.heading, classes.questionAnswer} >{questions[answer]}</Typography>
              <Divider />
              <Typography variant="body1" className={classes.customMargin}>
                One of the things we are most proud of at VCH is our engagement rate. We make sure that as large a proportion of students as possible positively to the opportunities that we promote and therefore you are rarely able to contact all students on the database.
                </Typography>
              <Typography variant="body1" className={classes.customMargin}>
                Usually it is the case that around 10-20% of the database will have the relevant qualification for any given role, however for more targeted roles, this number can be significantly smaller, sometimes as little as 1% for the hardest to reach candidates.
                </Typography>
              <Typography variant="body1" className={classes.customMargin}>
                There are no rigid restrictions, however if there is a suspiciously large number of students being contacted from one account the access may be restricted in case somebody has gained access to your account.
                </Typography>
            </div>
          </Fragment>
        }
        {answer == 2 &&
          <Fragment>
            <div className={classes.answer}>
              <Typography className={classes.heading, classes.questionAnswer} >{questions[answer]}</Typography>
              <Divider />
              <Typography variant="body1" className={classes.customMargin}>
                When you create a campaign, it will not be launched immediately but will be personally reviewed by a VCH team member for SPAG errors. The admin reviewing your campaign will also write a series of other emails/ promotions to accompany the initial one.
                </Typography>
              <Typography variant="body1" className={classes.customMargin}>
                Following this, the campaign will be submitted – generally a campaign will go something like this:
                </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;1. Campaign submitted by admin
                </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;2. All candidates that are initially relevant are contacted
                </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;3. Candidates that express an interest will be chased at least once in the form of reminders and alerts.
                </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;4. New candidates that join the database while your campaign is running, who are also relevant will also be targeted on an ongoing basis
                </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;5. Your company profile will be boosted on the student interface and your company will also be featured on VCH’s social media channels.
                </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;6. All data from the campaign will be tracked and used to determine who to contact further, and who to remove from the list.
                </Typography>
              <Typography variant="body1" className={classes.customMargin}>
                You can see the status of your campaign on the My Campaigns tab.
                </Typography>
              <div className={classes.customMargin}>
                <img src="/images/help/answer3a.png" alt="" />
              </div>
            </div>
          </Fragment>
        }
        {answer == 3 &&
          <Fragment>
            <div className={classes.answer}>
              <Typography className={classes.heading, classes.questionAnswer} >{questions[answer]}</Typography>
              <Divider />
              <Typography variant="body1" className={classes.customMargin}>
                When you submit a bulk email, it will not be submitted immediately. We will check the audience and also check the email to ensure it complies with our guidelines and also to ensure there are no niggling mistakes.
                </Typography>
              <Typography className={classes.customMargin}>
                Following this, the email will be queued and sent to the candidates over the next few days at the times that have the highest engagement. This is based off when other emails are sent to students (students will never be sent too many emails to maintain engagement rates) and also off our research into the best times for students.
                </Typography>
            </div>
          </Fragment>
        }
        {answer == 4 &&
          <Fragment>
            <div className={classes.answer}>
              <Typography className={classes.heading, classes.questionAnswer} >{questions[answer]}</Typography>
              <Divider />
              <Typography variant="body1" className={classes.customMargin}>
                Individual messages to students are not reviewed by admin, these will be sent instantly on submission.
                </Typography>
            </div>
          </Fragment>
        }

        {answer == 5 &&
          <Fragment>
            <div className={classes.answer}>
              <Typography className={classes.heading, classes.questionAnswer} >{questions[answer]}</Typography>
              <Divider />
              <Typography variant="body1" className={classes.customMargin}>
                We know that the way your company looks to students and graduates is one of the most important parts of the platform. We have designed the application to help students with their application for your company so that they are more encouraged to apply.
                </Typography>
              <Typography className={classes.customMargin}>
                Below is an example of VCH as an employer, this feature is being review very frequently and is likely to change as we get more student feedback.
                </Typography>
              <div className={classes.customMargin}>
                <img src="/images/help/answer6a.png" alt="" />
              </div>
            </div>
          </Fragment>
        }
        {answer == 6 &&
          <Fragment>
            <div className={classes.answer}>
              <Typography className={classes.heading, classes.questionAnswer} >{questions[answer]}</Typography>
              <Divider />
              <Typography variant="body1" className={classes.customMargin}>
                To sign out of your account, you can just click My Account &rarr; Sign Out. See below:
                  </Typography>
              <div className={classes.customMargin}>
                <img src="/images/help/answer7a.png" alt="" />
              </div>
            </div>
          </Fragment>
        }
        {answer == 7 &&
          <Fragment>
            <div className={classes.answer}>
              <Typography className={classes.heading, classes.questionAnswer} >{questions[answer]}</Typography>
              <Divider />
              <Typography variant="body1" className={classes.customMargin}>
                To see the progress of your campaign:
                </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;1. Navigate to Campaigns &rarr; My Campaigns
                </Typography>
              <div className={classes.customMargin}>
                <img src="/images/help/answer8a.png" alt="" />
              </div>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;2. Click on the campaign that you would like to view
                </Typography>
              <div className={classes.customMargin}>
                <img src="/images/help/answer3a.png" alt="" />
              </div>
              <Typography className={classes.customMargin}>
                There are several different things that you can look out such as:
                </Typography>
              <Typography className={classes.customMargin}>
                &nbsp;&nbsp;&nbsp;&nbsp;Course, Gender and University Balance
                </Typography>
              <div className={classes.customMargin}>
                <img src="/images/help/answer8b.png" alt="" />
              </div>
            </div>
          </Fragment>
        }
        {answer == 8 &&
          <Fragment>
            <div className={classes.answer}>
              <Typography className={classes.heading, classes.questionAnswer} >{questions[answer]}</Typography>
              <Divider />
              <Typography variant="body1" className={classes.customMargin}>
                To see your shortlist or contact details, navigate to See All Candidates and click on the ‘Contacts’ button. This will take you to your contacts and allow you to reach out to them individually.
                  </Typography>
              <div className={classes.customMargin}>
                <img src="/images/help/answer9a.png" alt="" />
              </div>
            </div>
          </Fragment>
        }
      </PapperBlock>
    );
  }
}

Qna.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Qna);
