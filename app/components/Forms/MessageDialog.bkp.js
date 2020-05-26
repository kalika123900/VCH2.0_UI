import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import styles from './user-jss';
import { TextField } from '@material-ui/core';

class MessageDialog extends React.Component {
  state = {
    heading: '',
    editorState: ''
  }

  sendMessageByEnter = (event, message) => {
    const { sendMessage } = this.props;
    if (event.key === 'Enter' && event.target.value !== '') {
      sendMessage(message.__html);
      this.resetInput();
    }
  }

  handleChange = (e) => {
    this.setState({ heading: e.target.value })
  }

  submit = (message) => {
    const { sendMessage, handleClose } = this.props;
    const { editorState, heading } = this.state;

    sendMessage(heading, draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
    this.setState({ editorState: '', heading: '' });
    handleClose();
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { classes, open, handleClose, sendMessage } = this.props;
    const { editorState, heading } = this.state;

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
    };
    return (
      <div>
        <Grid container justify="center" direction="column">
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            style={{ position: 'absolute' }}
          >
            <DialogTitle id="form-dialog-title">Message</DialogTitle>
            <DialogContent style={{ width: '100%' }}>
              <FormControl style={{ width: '100%' }}>
                <TextField
                  variant="outlined"
                  placeholder="Heading"
                  name="heading"
                  value={heading}
                  onChange={(e) => this.handleChange(e)}
                  style={{ margin: 10, width: '100%' }}
                />
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
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={(event) => this.submit(editorState)} color="primary">
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}
MessageDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired

};
export default withStyles(styles)(MessageDialog);
