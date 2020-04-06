import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  StudentEmailSidebar,
  StudentEmailThreadList,
  ComposeEmail,
  Notification
} from 'dan-components';
import {
  openMailAction,
  filterAction,
  composeAction,
  discardAction,
  sendAction,
  closeNotifAction
} from 'dan-actions/EmailActions';
import styles from 'dan-components/Email/email-jss';

const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : ''
);

class StudentEmailThread extends React.Component {
  state = {
    to: '',
    subject: '',
    validMail: '',
    mobileOpen: false,
  }

  handleChange = (event, name) => {
    if (name === 'to') {
      this.setState({ validMail: email(event.target.value) });
    }
    this.setState({
      [name]: event.target.value,
    });
  };

  handleReply = (mail) => {
    const { compose } = this.props;
    compose();
    this.setState({
      to: mail.get('name'),
      subject: 'Reply: ' + mail.get('subject'),
    });
  }

  handleCompose = () => {
    const { compose } = this.props;
    compose();
    this.setState({
      to: '  ',
      subject: '  ',
    });
  }

  handleSidebar = () => {
    this.props.history.push('/student/messages');
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes, openMail,
      goto, currentPage,
      openFrm, discard, keyword,
      sendEmail,
      closeNotif, messageNotif
    } = this.props;

    const {
      to,
      subject,
      validMail,
      mobileOpen
    } = this.state;
    const title = brand.name + ' - Email';
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root}>
          <Grid onClick={() => this.handleSidebar()}>
            <StudentEmailSidebar
              compose={this.handleCompose}
              goto={goto}
              selected={currentPage}
              handleDrawerToggle={this.handleDrawerToggle}
              mobileOpen={mobileOpen}
            />
          </Grid>
          <StudentEmailThreadList
            thread={this.props.match.params.thread}
            openMail={openMail}
            keyword={keyword}
            reply={this.handleReply}
          />
        </div>
        <ComposeEmail
          to={to}
          subject={subject}
          compose={this.handleCompose}
          validMail={validMail}
          sendEmail={sendEmail}
          inputChange={this.handleChange}
          open={openFrm}
          closeForm={discard}
        />
      </div>
    );
  }
}

StudentEmailThread.propTypes = {
  classes: PropTypes.object.isRequired,
  openMail: PropTypes.func.isRequired,
  goto: PropTypes.func.isRequired,
  compose: PropTypes.func.isRequired,
  discard: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
  openFrm: PropTypes.bool.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'email';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  keyword: state.getIn([reducer, 'keywordValue']),
  currentPage: state.getIn([reducer, 'currentPage']),
  openFrm: state.getIn([reducer, 'openFrm']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
  openMail: bindActionCreators(openMailAction, dispatch),
  goto: bindActionCreators(filterAction, dispatch),
  compose: () => dispatch(composeAction),
  discard: () => dispatch(discardAction),
  sendEmail: bindActionCreators(sendAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
});

const StudentEmailThreadMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(StudentEmailThread);

export default withStyles(styles)(StudentEmailThreadMapped);