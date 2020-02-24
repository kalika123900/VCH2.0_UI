import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import dummyContents from 'dan-api/dummy/dummyContents';
import Type from 'dan-styles/Typography.scss';
import { EditorState } from 'draft-js';
import ChatHeader from './ChatHeader';
import styles from './chatStyle-jss';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import draftToMarkdown from 'draftjs-to-markdown';
import ReactMarkdown from 'react-markdown/with-html';

const hashConfig = {
  trigger: '#',
  separator: ' ',
}
const markMapping = {
  blockTypesMapping: {
    'unordered-list-item': '* ',
    'underline': '__'
  }
}

const content = {
  blocks: [{
    key: '637gr',
    text: '',
    type: 'unstyled',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {}
  }],
  entityMap: {}
};

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    const contentBlock = convertFromRaw(content);
    if (contentBlock) {
      const editorState = EditorState.createWithContent(contentBlock);
      this.state = {
        editorState: editorState,
        message: ''
      };
    }
  }

  // handleWrite = (editorState) => {
  //   this.setState({ message: draftToMarkdown(convertToRaw(editorState.getCurrentContent()), hashConfig, {}, markMapping) });
  // };

  resetInput = () => {
    const ctn = document.getElementById('roomContainer');
    this.setState({ message: '' });
    this._field.setState({ value: '' });
    setTimeout(() => {
      ctn.scrollTo(0, ctn.scrollHeight);
    }, 300);
  }

  sendMessageByEnter = (event, message) => {
    const { sendMessage } = this.props;
    if (event.key === 'Enter' && event.target.value !== '') {
      sendMessage(message.__html);
      this.resetInput();
    }
  }

  sendMessage = message => {
    const { sendMessage } = this.props;
    if (typeof message == 'object') {
      sendMessage(message.__html);
    }
    else {
      sendMessage(message);
    }
    this.resetInput();
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { message } = this.state;
    const html = { __html: message };
    const {
      classes,
      dataChat,
      chatSelected,
      dataContact,
      showMobileDetail,
      remove,
      hideDetail
    } = this.props;

    const editorToolbar = {
      options: ['inline', 'blockType', 'list', 'emoji'],
      inline: {
        options: ['bold', 'italic', 'underline'],
      },
      blockType: {
        inDropdown: false,
        options: ['Normal', 'Code'],
      },
      list: {
        inDropdown: false,
        options: ['ordered', 'unordered', 'indent'],
      },
      emoji: {
        popupClassName: classes.emojiPopup,
      }

    }
    const getChat = dataArray => dataArray.map(data => {
      const renderHTML = { __html: data.get('message') };
      return (
        <li className={data.get('from') === 'contact' ? classes.from : classes.to} key={data.get('id')}>
          <time dateTime={data.get('date') + ' ' + data.get('time')}>{data.get('date') + ' ' + data.get('time')}</time>
          {data.get('from') === 'contact' ? (
            <Avatar alt="avatar" src={dataContact.getIn([chatSelected, 'avatar'])} className={classes.avatar} />
          ) : (
              <Avatar alt="avatar" src={dummyContents.user.avatar} className={classes.avatar} />
            )}
          <div className={classes.talk}>
            <p><ReactMarkdown source={renderHTML.__html} /></p>
          </div>
        </li>
      );
    });
    const { editorState } = this.state;
    return (
      <div className={classNames(classes.root, classes.content, showMobileDetail ? classes.detailPopup : '')}>
        <ChatHeader
          dataContact={dataContact}
          chatSelected={chatSelected}
          remove={remove}
          showMobileDetail={showMobileDetail}
          hideDetail={hideDetail}
        />
        <ul className={classes.chatList} id="roomContainer">
          {dataChat.size > 0 ? getChat(dataChat) : (<Typography display="block" variant="caption" className={Type.textCenter}>{'You haven\'t made any conversation yet'}</Typography>)}
        </ul>
        <Paper className={classes.messageBlock}>
          <Editor
            editorState={editorState}
            editorClassName={classes.textEditor}
            toolbarClassName={classes.toolbarEditor}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={editorToolbar}
            onKeyPress={(event) => this.sendMessageByEnter(event, editorState)}
          />
        </Paper>
      </div>
    );
  }
}

ChatRoom.propTypes = {
  classes: PropTypes.object.isRequired,
  dataChat: PropTypes.object.isRequired,
  showMobileDetail: PropTypes.bool.isRequired,
  chatSelected: PropTypes.number.isRequired,
  dataContact: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  hideDetail: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChatRoom);
