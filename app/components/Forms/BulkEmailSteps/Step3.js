import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor } from 'react-draft-wysiwyg';
import { draftToMarkdown } from 'markdown-draft-js';
import qs from 'qs';
import {
  EditorState, convertToRaw, ContentState, convertFromHTML, Modifier
} from 'draft-js';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Reply from '@material-ui/icons/Reply';
import ReplyAll from '@material-ui/icons/ReplyAll';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { emailStep3Info } from 'dan-actions/BulkEmailActions';
import 'dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import styles from 'dan-components/Email/email-jss';
import draftToHtml from 'draftjs-to-html';
import cmStyles from '../CampaignSteps/step-jss';
import { makeSecureDecrypt } from '../../../Helpers/security';
const showdown = require('showdown');
const converter = new showdown.Converter();

const content = {
  blocks: [],
  entityMap: {}
};

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

class CustomOption extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.placeholderOptions = [
      { key: 'firstName', value: '{{firstName}}', text: 'First Name' },
      { key: 'lastName', value: '{{lastName}}', text: 'Last name' },
      { key: 'email', value: '{{email}}', text: 'Email' },];
  }

  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  }

  componentDidMount() {
    const listItem = this.placeholderOptions.map(item => (
      <li
        onClick={this.addStar.bind(this, item.value)}
        key={item.key}

        className="rdw-dropdownoption-default"
      >
        {item.text}
      </li>
    ));

    this.setState({ listItem });
  }

  addStar = (placeholder) => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      placeholder,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  openPlaceholderDropdown = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <div onClick={this.openPlaceholderDropdown} className="rdw-block-wrapper" aria-label="rdw-block-control">
        <div className="rdw-dropdown-wrapper rdw-block-dropdown" aria-label="rdw-dropdown">
          <div className="rdw-dropdown-selectedtext" title="Placeholders">
            <span>First Name</span>
            <div className={`rdw-dropdown-caretto${this.state.open ? 'close' : 'open'}`} />
          </div>
          <ul className="rdw-dropdown-optionwrapper " style={{ display: `${this.state.open ? 'block' : 'none'}` }}>
            {this.state.listItem}
          </ul>
        </div>
      </div>
    );
  }
}

class Step3 extends PureComponent {
  state = {
    cname: '',
    email: ''
  }

  constructor(props) {
    super(props);
    const { body, heading } = this.props;

    if (body == '') {
      const editorState = EditorState.createEmpty();
      this.state = {
        editorState,
        headingEditor: heading
      };
    } else {
      const bHTML = converter.makeHtml(body);
      const blocksFromHTML = convertFromHTML(bHTML);
      const iState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );

      if (content) {
        const editorState = EditorState.createWithContent(iState);
        this.state = {
          editorState,
          headingEditor: heading
        };
      }
    }
  }

  componentDidMount() {
    const { userType } = this.props;
    if (userType == 'CLIENT') {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );

      const data = {
        client_id: user.id
      };

      postData(`${API_URL}/client/client-info`, data)
        .then((res) => {
          if (res.status === 1) {
            const { data } = res;
            const { email } = data;
            const cname = `${data.firstname} ${data.lastname}`;
            this.setState({ email, cname });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (userType == 'ADMIN') {
      const data = {
        campaignId: this.props.campaignId
      };

      postData(`${API_URL}/admin/client-info`, data)
        .then((res) => {
          if (res.status === 1) {
            const { data } = res;
            const { email } = data;
            const cname = `${data.firstname} ${data.lastname}`;
            this.setState({ email, cname });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  onEditorStateChange = editorState => {
    const { addInfo } = this.props;
    const { headingEditor } = this.state;
    this.setState({
      editorState,
    });
    addInfo({ body: draftToMarkdown(convertToRaw(editorState.getCurrentContent())), heading: headingEditor });
  };

  onHeadingChange = (headingEditor) => {
    const { addInfo } = this.props;
    const { editorState } = this.state;
    this.setState({
      headingEditor,
    });
    addInfo({ body: editorState, heading: headingEditor });
  };

  render() {
    const {
      editorState, headingEditor, cname, email
    } = this.state;
    const { classes, heading } = this.props;
    return (
      <Fragment>
        <Typography variant="subtitle2">
          We will use this email to help create the rest of our emails for our Bulk Email. Try to make your email unique and attractive to your future hires.
        </Typography>
        <Grid container spacing={3} style={{ marginBottom: '30px', marginTop: '20px' }}>
          <Grid item md={6} xs={12} style={{ background: 'whitesmoke' }}>
            <Typography variant="body1" style={{ float: 'left' }}>
              Write Your Email
            </Typography>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                placeholder="Heading"
                margin="normal"
                variant="filled"
                value={heading}
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
                toolbarCustomButtons={[<CustomOption />]}
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
                  value={headingEditor}
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
                  title={cname}
                  subheader={email}
                  style={{
                    padding: '0',
                    paddingBottom: ' 2%',
                    textAlign: 'left'
                  }}
                />
              </Grid>
              <Grid className={classes.textPreview} dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())), }} />
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

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerBulkEmail = 'bulkEmail';
const reducerA = 'Auth';

const mapStateToProps = state => ({
  heading: state.getIn([reducerBulkEmail, 'heading']),
  body: state.getIn([reducerBulkEmail, 'body']),
  userType: state.getIn([reducerA, 'userType']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(emailStep3Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3);

export default withStyles(styles, cmStyles)(StepMapped);
