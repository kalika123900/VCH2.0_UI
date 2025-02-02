import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
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
import css from 'dan-styles/Form.scss';
import { TextField } from '@material-ui/core';

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


class MessageDialog extends React.Component {
  constructor(props) {
    super(props);
    const contentBlock = convertFromRaw(content);
    if (contentBlock) {
      const editorState = EditorState.createWithContent(contentBlock);
      this.state = {
        editorState,
        heading: '',
        emailContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      };
    }
  }

  handleChange = (e) => {
    this.setState({ heading: e.target.value })
  }

  submit = () => {
    const { sendMessage, handleClose } = this.props;
    const { emailContent, heading } = this.state;

    if (emailContent != '') {
      sendMessage(heading, emailContent);
    }

    const contentBlock = convertFromRaw(content);
    if (contentBlock) {
      let editorState = EditorState.createWithContent(contentBlock);
      this.setState({ editorState, heading: '', emailContent: '' });
    }
    handleClose();
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
      emailContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };

  render() {
    const { classes, open, handleClose } = this.props;
    const { editorState, heading } = this.state;

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
            <DialogContent style={{ width: '100%' }} className={css.bodyForm}>
              <FormControl style={{ width: '100%' }}>
                <TextField
                  variant="outlined"
                  placeholder="Heading"
                  name="heading"
                  value={heading}
                  onChange={(e) => this.handleChange(e)}
                />
                <div>
                  <Editor
                    editorState={editorState}
                    editorClassName={classes.textEditor}
                    toolbarClassName={classes.toolbarEditor}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                      options: ['inline', 'fontSize', 'fontFamily', 'colorPicker', 'image', 'emoji', 'list', 'textAlign', 'link'],
                      inline: { inDropdown: true },
                      color: true,
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                    }}
                  />
                </div>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={(event) => this.submit()} color="primary" disabled={this.state.heading == '' ? true : false}>
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
