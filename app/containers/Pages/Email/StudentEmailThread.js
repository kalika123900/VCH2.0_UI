import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import avatarApi from 'dan-api/images/avatars';
import Grid from '@material-ui/core/Grid';
import qs from 'qs';
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

const compare = (item1, item2) => {
  if (item1.sent_on > item2.sent_on) return 1
  else return -1
}

function formatDate(unixtimestamp) {
  var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var date = new Date(unixtimestamp * 1000);
  var year = date.getFullYear();
  var month = months_arr[date.getMonth()];
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  return (month + ', ' + day + ' ' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });
  return await response.json();
}

class StudentEmailThread extends React.Component {
  state = {
    to: '',
    subject: '',
    validMail: '',
    mobileOpen: false,
    thread_id: null,
    sender_id: null,
    sender_type: null,
    receiver_id: null,
    receiver_type: null,
    mail_type: null,
    openStyle: false,
    messageType: 'error',
    notifyMessage: '',
    mailData: []
  }

  getThreadEmails = () => {
    const data = {
      thread_id: this.props.match.params.thread
    };

    postData(`${API_URL}/student/get-thread-emails`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let threadEmailsData = res.data.map(item => {
              return {
                ...item,
                id: item.id,
                thread: item.thread_id,
                avatar: avatarApi[6],
                name: item.sender_type == 'client' ? item.sender_name : item.receiver_name,
                date: formatDate(new Date(parseInt(item.sent_on))),
                subject: item.subject,
                category: '',
                content: item.body,
                attachment: [],
                stared: item.sender_type == 'user' ? item.sender_stared : item.receiver_stared,
              }
            })
            this.setState({ mailData: threadEmailsData.sort(compare) });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (event, name) => {
    if (name === 'to') {
      this.setState({ validMail: email(event.target.value) });
    }
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = (to, subject, emailContent, files) => {
    const actionSendEmail = this.props.sendEmail;
    const data = {
      to,
      subject,
      body: emailContent,
      type: this.state.mail_type,
      thread_id: this.state.thread_id,
      sender_id: this.state.sender_id,
      sender_type: this.state.sender_type,
      receiver_id: this.state.receiver_id,
      receiver_type: this.state.receiver_type
    }

    postData(`${API_URL}/utils/send-email-reply`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          actionSendEmail()
          this.getThreadEmails()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  handleReply = (mail) => {
    const { compose } = this.props;
    const MappedMail = mail.toJS();

    if (MappedMail.sender_type == 'client') {
      this.setState({
        to: MappedMail.sender_email,
        subject: MappedMail.thread_id == -1 ? 'Reply: ' + mail.get('subject') : mail.get('subject'),
        thread_id: MappedMail.thread_id == -1 ? MappedMail.id : MappedMail.thread_id,
        mail_type: MappedMail.type,
        sender_id: MappedMail.receiver_id,
        sender_type: MappedMail.receiver_type,
        receiver_id: MappedMail.sender_id,
        receiver_type: MappedMail.sender_type
      });
    }
    else {
      this.setState({
        to: MappedMail.receiver_email,
        subject: MappedMail.thread_id == -1 ? 'Reply: ' + mail.get('subject') : mail.get('subject'),
        thread_id: MappedMail.thread_id == -1 ? MappedMail.id : MappedMail.thread_id,
        mail_type: MappedMail.type,
        sender_id: MappedMail.sender_id,
        sender_type: MappedMail.sender_type,
        receiver_id: MappedMail.sender_id,
        receiver_type: MappedMail.sender_type
      });
    }

    compose();
  };

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

  componentDidMount() {
    this.getThreadEmails()
  }

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
            mailData={this.state.mailData}
            getThreadEmails={this.getThreadEmails}
          />
        </div>
        <ComposeEmail
          to={to}
          subject={subject}
          compose={this.handleCompose}
          validMail={validMail}
          sendClientEmail={this.sendEmail}
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