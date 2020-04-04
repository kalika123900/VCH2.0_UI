import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import avatarApi from 'dan-api/images/avatars';
import {
  EmailHeader,
  ClientEmailList,
  ClientEmailSidebar,
  ComposeEmail,
  Notification
} from 'dan-components';
import {
  fetchMailAction,
  openMailAction,
  filterAction,
  composeAction,
  discardAction,
  searchAction,
  sendAction,
  moveAction,
  deleteAction,
  toggleStaredAction,
  closeNotifAction
} from 'dan-actions/EmailActions';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';
import styles from 'dan-components/Email/email-jss';

// validation functions
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

class ClientEmail extends React.Component {
  state = {
    to: '',
    subject: '',
    validMail: '',
    mobileOpen: false,
    inbox: [],
    stared: [],
    sent: [],
    campaign: [],
    bulkemail: [],
  };

  showEmail = (category, callback) => {
    const user = JSON.parse(makeSecureDecrypt(localStorage.getItem('user')));
    const apiData = { client_id: user.id }

    if (category == 'inbox') {
      postData(`${API_URL}/client/get-inbox-emails`, apiData) // eslint-disable-line
        .then((res) => {
          if (res.status === 1) {
            if (res.data.length > 0) {
              let inboxEmailsData = res.data.map(item => {
                return {
                  id: item.id,
                  thread: item.thread_id,
                  avatar: avatarApi[6],
                  name: item.sender_name,
                  date: formatDate(new Date(parseInt(item.sent_on))),
                  subject: item.subject,
                  category: '',
                  content: item.body,
                  attachment: [],
                  stared: false,
                }
              })
              callback(inboxEmailsData);
              return true;
            }
          }
        })
        .catch((err) => {
          callback(false, err);
          return false;
        });
    } else if (category == 'sent') {
      postData(`${API_URL}/client/get-sent-emails`, apiData) // eslint-disable-line
        .then((res) => {
          if (res.status === 1) {
            if (res.data.length > 0) {
              let sentEmailsData = res.data.map(item => {
                return {
                  id: item.id,
                  thread: item.thread_id,
                  avatar: avatarApi[6],
                  name: item.receiver_name,
                  date: formatDate(new Date(parseInt(item.sent_on))),
                  subject: item.subject,
                  category: 'sent',
                  content: item.body,
                  attachment: [],
                  stared: false,
                }
              })
              callback(sentEmailsData);
              return true;
            }
          }
        })
        .catch((err) => {
          callback(false, err);
          return false;
        });
    }
    else if (category == 'campaign') {
      callback([]);
    }
    else if (category == 'bulkemail') {
      callback([]);
    }
    else if (category == 'stared') {
      callback([]);
    }
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

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes,
      emailData, openMail,
      goto, currentPage,
      openFrm, discard,
      search, keyword,
      sendEmail, remove,
      moveTo, toggleStar,
      closeNotif, messageNotif
    } = this.props;
    const {
      to,
      subject,
      validMail,
      mobileOpen,
      inbox,
      sent, stared, campaign, bulkemail
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
          <ClientEmailSidebar
            compose={this.handleCompose}
            goto={goto}
            selected={currentPage}
            handleDrawerToggle={this.handleDrawerToggle}
            mobileOpen={mobileOpen}
          />
          <ClientEmailList
            inbox={inbox}
            sent={sent}
            stared={stared}
            campaign={campaign}
            bulkemail={bulkemail}
            showEmail={this.showEmail}
            openMail={openMail}
            filterPage={currentPage}
            keyword={keyword}
            moveTo={moveTo}
            remove={remove}
            toggleStar={toggleStar}
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

ClientEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  emailData: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  openMail: PropTypes.func.isRequired,
  goto: PropTypes.func.isRequired,
  compose: PropTypes.func.isRequired,
  discard: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  moveTo: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleStar: PropTypes.func.isRequired,
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
  initValues: state.getIn([reducer, 'formValues']),
  emailData: state.getIn([reducer, 'inbox']),
  currentPage: state.getIn([reducer, 'currentPage']),
  openFrm: state.getIn([reducer, 'openFrm']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchMailAction, dispatch),
  openMail: bindActionCreators(openMailAction, dispatch),
  goto: bindActionCreators(filterAction, dispatch),
  search: bindActionCreators(searchAction, dispatch),
  moveTo: bindActionCreators(moveAction, dispatch),
  remove: bindActionCreators(deleteAction, dispatch),
  toggleStar: bindActionCreators(toggleStaredAction, dispatch),
  compose: () => dispatch(composeAction),
  discard: () => dispatch(discardAction),
  sendEmail: bindActionCreators(sendAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
});

const ClientEmailMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(ClientEmail);

export default withStyles(styles)(ClientEmailMapped);
