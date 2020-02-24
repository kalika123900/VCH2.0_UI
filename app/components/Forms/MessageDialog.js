import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import styles from './user-jss';
import { Editor } from 'react-draft-wysiwyg';
import Paper from '@material-ui/core/Paper';

class MessageDialog extends React.Component {
  state = {
    editorState: ""
  }

  sendMessageByEnter = (event, message) => {
    const { sendMessage } = this.props;
    if (event.key === 'Enter' && event.target.value !== '') {
      sendMessage(message.__html);
      this.resetInput();
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { classes, open, handleClose } = this.props;
    const { editorState } = this.state;

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
    return (
      <div>
        <Grid container justify="center" direction="column" >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            style={{ position: "absolute" }}
          >
            <DialogTitle id="form-dialog-title" >Message</DialogTitle>
            <DialogContent style={{ 'width': '100%' }}  >
              <FormControl style={{ 'width': '100%' }} >

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
                {/* <InlineTextEditor /> */}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
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

};
export default withStyles(styles)(MessageDialog);