import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import contactData from 'dan-api/apps/contactData';
import chatData from 'dan-api/apps/chatData';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { ContactList, ChatRoom } from 'dan-components';
import { fetchAction, searchAction } from 'dan-actions/ContactActions';
import {
  fetchChatAction,
  showChatAction,
  sendAction,
  hideDetailAction,
  deleteAction
} from 'dan-actions/ChatActions';
import styles from 'dan-components/Contact/contact-jss';

class Chat extends React.Component {
  componentDidMount() {
    const { fetchChatData, fetchContactData } = this.props;
    fetchChatData(chatData);
    fetchContactData(contactData);
  }

  render() {
    const title = brand.name + ' - Chat App';
    const description = brand.desc;
    const {
      classes,
      dataContact,
      showDetail,
      hideDetail,
      keyword,
      search,
      dataChat,
      chatSelected,
      sendMessage,
      remove,
      showMobileDetail
    } = this.props;
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
        <div className={classes.root}>
          <ContactList
            total={dataContact.size}
            itemSelected={chatSelected}
            dataContact={dataContact}
            showDetail={showDetail}
            search={search}
            keyword={keyword}
          />
          <ChatRoom
            showMobileDetail={showMobileDetail}
            dataChat={dataChat}
            chatSelected={chatSelected}
            dataContact={dataContact}
            sendMessage={sendMessage}
            remove={remove}
            hideDetail={hideDetail}
          />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchContactData: PropTypes.func.isRequired,
  fetchChatData: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  hideDetail: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  dataContact: PropTypes.object.isRequired,
  dataChat: PropTypes.object.isRequired,
  chatSelected: PropTypes.number.isRequired,
  showMobileDetail: PropTypes.bool.isRequired,
};

const reducerContact = 'contact';
const reducerChat = 'chat';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataContact: state.getIn([reducerContact, 'contactList']),
  dataChat: state.getIn([reducerChat, 'activeChat']),
  chatSelected: state.getIn([reducerChat, 'chatSelected']),
  showMobileDetail: state.getIn([reducerChat, 'showMobileDetail']),
  keyword: state.getIn([reducerContact, 'keywordValue']),
});

const dispatchToProps = dispatch => ({
  fetchContactData: bindActionCreators(fetchAction, dispatch),
  hideDetail: () => dispatch(hideDetailAction),
  fetchChatData: bindActionCreators(fetchChatAction, dispatch),
  showDetail: bindActionCreators(showChatAction, dispatch),
  search: bindActionCreators(searchAction, dispatch),
  sendMessage: bindActionCreators(sendAction, dispatch),
  remove: () => dispatch(deleteAction),
});

const ChatMapped = connect(
  mapStateToProps,
  dispatchToProps
)(Chat);

export default withStyles(styles)(ChatMapped);
