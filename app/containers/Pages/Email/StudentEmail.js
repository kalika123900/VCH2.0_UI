import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import avatarApi from 'dan-api/images/avatars';
import {
  EmailHeader,
  StudentEmailList,
  StudentEmailSidebar,
  ComposeEmail,
  Notification
} from 'dan-components';
import {
  openMailAction,
  filterAction,
  composeAction,
  discardAction,
  searchAction,
  sendAction,
  closeNotifAction
} from 'dan-actions/EmailActions';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';
import styles from 'dan-components/Email/email-jss';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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

const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : ''
);

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

const compare = (item1, item2) => {
  if (item1.sent_on > item2.sent_on) return -1
  else return 1
}

class StudentEmail extends React.Component {
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
    openStyle: false,
    messageType: 'error',
    notifyMessage: ''
  }


  handleCloseStyle = () => {
    this.setState({ openStyle: false })
  }


  sendEmail = (to, subject, emailContent, files) => {
    const actionSendEmail = this.props.sendEmail;
    const data = {
      to,
      subject,
      body: emailContent,
      thread_id: this.state.thread_id,
      sender_id: this.state.sender_id,
      sender_type: this.state.sender_type,
      receiver_id: this.state.receiver_id,
      receiver_type: this.state.receiver_type
    }

    console.log(data);

    postData(`${API_URL}/utils/send-email-reply`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          actionSendEmail()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showEmail = async (category, callback) => {
    const user = JSON.parse(makeSecureDecrypt(localStorage.getItem('user')));
    const apiData = { user_id: user.id }
    var response = '';
    const handlerResponse = async () => {
      try {
        if (category == 'inbox') {
          await new Promise((resolve, reject) => {
            response = fetch(`${API_URL}/student/get-inbox-emails`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: qs.stringify(apiData)
            })
              .then(response => response.json())
              .then((res) => { // eslint-disable-line
                if (res.status === 1) {
                  if (res.data.length > 0) {
                    let inboxEmailsData = res.data.map(item => {
                      return {
                        ...item,
                        id: item.id,
                        thread: item.thread_id,
                        avatar: avatarApi[6],
                        name: item.sender_name,
                        date: formatDate(new Date(parseInt(item.sent_on))),
                        subject: item.subject,
                        category: '',
                        content: item.body,
                        attachment: [],
                        stared: item.sender_type == 'user' ? item.sender_stared : item.receiver_stared,
                      }
                    })
                    response = inboxEmailsData;
                    callback(response.sort(compare));
                  }
                } else {
                  let response = [];
                  callback(response)
                }
              });
          });
        }
        if (category == 'sent') {
          await new Promise((resolve, reject) => {
            response = fetch(`${API_URL}/student/get-sent-emails`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: qs.stringify(apiData)
            })
              .then(response => response.json())
              .then((res) => { // eslint-disable-line
                if (res.status === 1) {
                  if (res.data.length > 0) {
                    let inboxEmailsData = res.data.map(item => {
                      return {
                        ...item,
                        id: item.id,
                        thread: item.thread_id,
                        avatar: avatarApi[6],
                        name: item.receiver_name,
                        date: formatDate(new Date(parseInt(item.sent_on))),
                        subject: item.subject,
                        category: 'sent',
                        content: item.body,
                        attachment: [],
                        stared: item.sender_type == 'user' ? item.sender_stared : item.receiver_stared,
                      }
                    })
                    response = inboxEmailsData;
                    callback(response.sort(compare));
                  } else {
                    let response = [];
                    callback(response)
                  }
                }
              });
          });
        }
        if (category == 'stared') {
          await new Promise((resolve, reject) => {
            response = fetch(`${API_URL}/student/get-stared-emails`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: qs.stringify(apiData)
            })
              .then(response => response.json())
              .then((res) => { // eslint-disable-line
                if (res.status === 1) {
                  if (res.data.length > 0) {
                    let staredEmailsData = res.data.map(item => {
                      return {
                        ...item,
                        id: item.id,
                        thread: item.thread_id,
                        avatar: avatarApi[6],
                        name: item.sender_type == 'user' ? item.receiver_name : item.sender_name,
                        date: formatDate(new Date(parseInt(item.sent_on))),
                        subject: item.subject,
                        category: 'stared',
                        content: item.body,
                        attachment: [],
                        stared: true,
                      }
                    })
                    response = staredEmailsData;
                    callback(response);
                  } else {
                    let response = [];
                    callback(response)
                  }
                }
              });
          });
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    await handlerResponse();
    return response;
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
    const MappedMail = mail.toJS();
    compose();
    this.setState({
      to: MappedMail.sender_type == 'client' ? MappedMail.sender_email : MappedMail.receiver_email,
      subject: 'Reply: ' + mail.get('subject'),
      thread_id: MappedMail.id,
      sender_id: MappedMail.sender_id,
      sender_type: MappedMail.sender_type,
      receiver_id: MappedMail.receiver_id,
      receiver_type: MappedMail.receiver_type
    });
  };

  handleCompose = () => {
    const { compose } = this.props;
    compose();
    this.setState({
      to: '  ',
      subject: '  ',
    });
  };

  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes, openMail,
      goto, currentPage,
      openFrm, discard,
      search, keyword,
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
          <EmailHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />
          <StudentEmailSidebar
            compose={this.handleCompose}
            goto={goto}
            selected={currentPage}
            handleDrawerToggle={this.handleDrawerToggle}
            mobileOpen={mobileOpen}
          />
          <StudentEmailList
            showEmail={this.showEmail}
            openMail={openMail}
            filterPage={currentPage}
            keyword={keyword}
            remove={this.remove}
            reply={this.handleReply}
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.openStyle}
          autoHideDuration={6000}
          onClose={this.handleCloseStyle}
        >
          <SnackbarContent
            className={this.state.messageType == 'error' ? messageStyles.bgError : messageStyles.bgSuccess}
            aria-describedby="client-snackbar"
            message={(
              <span id="client-snackbar" className={classes.message}>
                {
                  (this.state.messageType == 'error') && <ErrorIcon className="success" />
                }
                {
                  (this.state.messageType == 'success') && <CheckCircleIcon className="success" />
                }

                  &nbsp;
                {this.state.notifyMessage}
              </span>
            )}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.noticeClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

StudentEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  openMail: PropTypes.func.isRequired,
  goto: PropTypes.func.isRequired,
  compose: PropTypes.func.isRequired,
  discard: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
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
  search: bindActionCreators(searchAction, dispatch),
  compose: () => dispatch(composeAction),
  discard: () => dispatch(discardAction),
  sendEmail: bindActionCreators(sendAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
});

const StudentEmailMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(StudentEmail);

export default withStyles(styles)(StudentEmailMapped);