import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import styles from 'dan-components/Email/email-jss';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Reply from '@material-ui/icons/Reply';
import ReplyAll from '@material-ui/icons/ReplyAll';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { bindActionCreators } from 'redux';
import { Map as iMap } from 'immutable';
import { storeStep4Info } from 'dan-actions/CampaignActions';
import cmStyles from './step-jss';

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

class Step4 extends PureComponent {
  constructor(props) {
    super(props);
    content.blocks[0].text = this.props.body;
    const contentBlock = convertFromRaw(content);
    if (contentBlock) {
      const editorState = EditorState.createWithContent(contentBlock);
      this.state = {
        editorState,
        headingEditor: this.props.heading
      };
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    this.props.addInfo({ body: draftToMarkdown(convertToRaw(editorState.getCurrentContent())), heading: this.state.headingEditor });
  };

  onHeadingChange = (headingEditor) => {
    this.setState({
      headingEditor,
    });
    this.props.addInfo({ body: this.state.editorState, heading: headingEditor });
  };

  render() {
    const { editorState } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="subtitle2">
          Highlight the products and services you offer, and what makes your bussiness unique
        </Typography>
        <Grid container spacing={3} style={{ marginBottom: '30px', marginTop: '20px' }}>
          <Grid item md={6} xs={12} style={{ background: 'whitesmoke' }}>
            <Typography variant="body1" style={{ float: 'left' }}>
              Write Your Ad
            </Typography>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                placeholder="Heading"
                margin="normal"
                variant="filled"
                value={this.props.heading}
                onChange={(e) => this.onHeadingChange(e.target.value)}
                style={{ width: '100%', marginTop: '0' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Editor
                editorState={editorState}
                editorClassName={classes.textEditor}
                toolbarClassName={classes.toolbarEditor}
                onEditorStateChange={this.onEditorStateChange}
              />
            </Grid>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Grid>
              <Typography variant="body1" style={{ float: 'left' }}>
                Your Ad Preview
              </Typography>
              <Grid>
                <textarea
                  disabled
                  value={this.state.headingEditor}
                  style={{
                    width: '100%',
                    marginTop: '0',
                    border: 'none',
                    background: 'white'
                  }}
                />
              </Grid>
              <Grid>
                <CardHeader
                  avatar={
                    <Avatar src="/images/pp_girl.svg" />
                  }
                  action={(
                    <Fragment>
                      <IconButton>
                        <Reply />
                      </IconButton>
                      <IconButton>
                        <ReplyAll />
                      </IconButton>
                      <IconButton>
                        <ArrowForward />
                      </IconButton>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Fragment>
                  )}
                  title="Aliquam nec ex aliquet"
                  subheader="<lili@varsitycareershub.co.uk>"
                  style={{
                    padding: '0',
                    paddingBottom: ' 2%',
                    textAlign: 'left'
                  }}
                />
              </Grid>
              <Grid>
                <textarea
                  className={classes.textPreview}
                  disabled
                  value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
                  style={{
                    border: 'none',
                    background: 'white'
                  }}
                />
              </Grid>
              <Grid>
                <Typography variant="caption">
                  @ 2020 Varsity Careers Hub
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Step4.propTypes = {
  classes: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  heading: state.getIn([reducerCampaign, 'heading']),
  body: state.getIn([reducerCampaign, 'body'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep4Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step4);

export default withStyles(styles, cmStyles)(StepMapped);
