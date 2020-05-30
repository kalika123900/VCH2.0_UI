import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Editor } from 'react-draft-wysiwyg';
import List from '@material-ui/core/List';
import { BlockPicker } from 'react-color';
import draftToHtml from 'draftjs-to-html';
import { convertFromRaw, EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import qs from 'qs';
import { Notification } from 'dan-components';
import { makeSecureDecrypt } from 'dan-helpers/security';
import styles from './settings-jss';
import { SnackNotification } from "dan-components";
import { TextField, Typography } from '@material-ui/core';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });

  return response.json();
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

class DetailSettings extends React.Component {
  constructor(props) {
    super(props);
    const contentBlock = convertFromRaw(content);
    if (contentBlock) {
      const editorState = EditorState.createWithContent(contentBlock);
      this.state = {
        displayName: '',
        message: '',
        background: '#04003c',
        user: JSON.parse(
          makeSecureDecrypt(localStorage.getItem('user'))
        ),
        coverEditorState: editorState,
        cvEditorState: editorState,
        coverContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        cvContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        message: '',
        variant: 'error',
        isCVChange: false,
        isCoverChange: false
      };
    }
  }

  closeNotif = () => {
    this.setState({ message: '' })
  }

  coverEditorStateChange = editorState => {
    this.setState({ isCoverChange: true })
    this.setState({
      coverEditorState: editorState,
      coverContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };

  cvEditorStateChange = editorState => {
    this.setState({ isCVChange: true })
    this.setState({
      cvEditorState: editorState,
      cvContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };


  getEmailColor = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
    }

    postData(`${API_URL}/client/get-email-color`, data)
      .then((res) => {
        if (res.status == 1) {
          this.setState({ background: res.data[0].email_color })
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateEmailColor = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
      email_color: this.state.background.toString()
    }

    postData(`${API_URL}/client/update-email-color`, data)
      .catch((e) => {
        console.log(e);
      });
  }

  handleClose = () => {
    this.setState({ message: '' })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
      display_name: this.state.displayName
    }

    postData(`${API_URL}/client/change-name`, data)
      .then((res) => {
        if (res.status == 1) {
          this.setState({ message: 'Display Name updated' });
          this.getName();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleToggle = (e) => {
    const { handleIsUpdate } = this.props;
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const value = e._targetInst.stateNode.checked;
    const key = e._targetInst.stateNode.name;

    const data = {
      company_id: user.cId,
      key,
      value: value ? '1' : '0'
    };

    postData(`${API_URL}/client/set-settings`, data)
      .then((res) => {
        if (res.status == 1) {
          handleIsUpdate();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getName = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
    };

    postData(`${API_URL}/client/client-info`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ displayName: `${res.data.display_name}` });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  uploadCoverLetter = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
      content: this.state.coverContent
    };

    postData(`${API_URL}/client/update-cover-letter`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ message: 'Cover letter updated', variant: 'success' });
        } else {
          this.setState({ message: 'Something went wrong', variant: 'error' });
        }
      })
      .catch((err) => {
        this.setState({ message: 'Something went wrong', variant: 'error' });
        console.error(err);
      });
  }

  uploadCVTips = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
      content: this.state.cvContent
    };

    postData(`${API_URL}/client/update-cv-tips`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ message: 'CV tips updated', variant: 'success' });
        } else {
          this.setState({ message: 'Something went wrong', variant: 'error' });
        }
      })
      .catch((err) => {
        this.setState({ message: 'Something went wrong', variant: 'error' });
        console.error(err);
      });
  }

  getCoverLetter = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId
    };

    postData(`${API_URL}/client/get-cover-letter`, data)
      .then((res) => {
        if (res.status === 1) {
          var editorState = EditorState.createEmpty();

          if (res.data.cover_letter && res.data.cover_letter != '') {
            const blocksFromHTML = convertFromHTML(res.data.cover_letter);
            const editorContent = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap,
            );

            if (editorContent) {
              editorState = EditorState.createWithContent(editorContent);
              this.setState({ coverContent: res.data.cover_letter, coverEditorState: editorState })
            }
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCVTips = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
      content: this.state.cvContent
    };

    postData(`${API_URL}/client/get-cv-tips`, data)
      .then((res) => {
        if (res.status === 1) {
          var editorState = EditorState.createEmpty();

          if (res.data.cv_tips && res.data.cv_tips != '') {
            const blocksFromHTML = convertFromHTML(res.data.cv_tips);
            const editorContent = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap,
            );

            if (editorContent) {
              editorState = EditorState.createWithContent(editorContent);
              this.setState({ cvContent: res.data.cv_tips, cvEditorState: editorState })
            }
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.updateEmailColor();
  };

  componentDidMount() {
    this.getName();
    this.getEmailColor();
    this.getCoverLetter();
    this.getCVTips();
  }

  render() {
    const { switchData, classes } = this.props;
    const { displayName } = this.state;

    return (
      <Grid container justify="center">
        <Notification message={this.state.message} close={this.handleClose} />
        <Grid item md={8} xs={12}>
          <List>
            <ListItem>
              <ListItemText
                primary="Bi-weekly Emails"
                secondary="Send me bi-weekly updates about my campaign via email"
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="bi-weekly-emails"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('bi-weekly-emails') !== -1}
                />
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Updates via Text"
                secondary="Send me updates about my campaign via text "
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="updates-via-text"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('updates-via-text') !== -1}
                />
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Share Email Personally"
                secondary="Share my email with candidates that I message individually"
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="share-email-personally"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('share-email-personally') !== -1}
                />
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Email Sharing"
                secondary="Share my email with candidates that I contact through bulk messages and campaigns "
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="email-sharing"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('email-sharing') !== -1}
                />
              </Grid>
            </ListItem>
          </List>
          <Grid style={{ marginTop: 10 }}>
            <List>
              <ListItem className={classes.listItem}>
                <Grid>
                  <ListItemText
                    primary="Display Name"
                    secondary=" Name that displays on student email inbox "
                    style={{ whiteSpace: 'pre-line' }}
                  />
                </Grid>
                <Grid style={{ marginLeft: 5 }} >
                  <TextField
                    name='displayName'
                    value={displayName}
                    placeholder='Display Name'
                    onChange={this.handleChange}
                  />
                  <Button
                    style={{ marginLeft: 10 }}
                    disabled={displayName.length == 0 ? true : false}
                    onClick={this.handleSubmit}
                  >
                    save
                  </Button>
                </Grid>
              </ListItem>
            </List>
          </Grid>
          <Grid style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20
          }}>
            <Grid>
              <ListItemText
                primary="Color of your email"
                secondary="Color that displays on your email banners or buttons"
                style={{ whiteSpace: 'pre-line' }}
              />
            </Grid>
            <Grid>
              <BlockPicker
                color={this.state.background}
                onChangeComplete={this.handleChangeComplete}
              />
            </Grid>
          </Grid>
          {this.state.user.via == 'ADMIN' &&
            <Fragment>
              <Grid
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 30
                }}
              >
                <Grid>
                  <ListItemText
                    primary="Company cover letter"
                    secondary="Company cover letter for student"
                    style={{ whiteSpace: 'pre-line' }}
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.uploadCoverLetter}
                    disabled={!this.state.isCoverChange}
                  >
                    Save
                  </Button>
                </Grid>

              </Grid>
              <Editor
                editorState={this.state.coverEditorState}
                editorClassName={classes.textEditor}
                toolbarClassName={classes.toolbarEditor}
                onEditorStateChange={this.coverEditorStateChange}
              />
              <Grid style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 30
              }}>
                <Grid>
                  <ListItemText
                    primary="Company CV tips"
                    secondary="Company CV tips for student"
                    style={{ whiteSpace: 'pre-line' }}
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.uploadCVTips}
                    disabled={!this.state.isCVChange}
                  >
                    Save
                  </Button>
                </Grid>

              </Grid>
              <Editor
                editorState={this.state.cvEditorState}
                editorClassName={classes.textEditor}
                toolbarClassName={classes.toolbarEditor}
                onEditorStateChange={this.cvEditorStateChange}
              />
            </Fragment>
          }
        </Grid>
        {/* <SnackNotification close={this.closeNotif} message={this.state.message} variant={this.state.variant} /> */}
      </Grid >
    );
  }
}

DetailSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailSettings);
