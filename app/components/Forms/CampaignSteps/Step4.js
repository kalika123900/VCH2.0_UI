import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor } from 'react-draft-wysiwyg';
import { draftToMarkdown } from 'markdown-draft-js';

import {
  EditorState, convertToRaw, ContentState, convertFromHTML, Modifier
} from 'draft-js';
import Button from '@material-ui/core/Button';
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
import { storeStep4Info } from 'dan-actions/CampaignActions';
import 'dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import styles from 'dan-components/Email/email-jss';
import draftToHtml from 'draftjs-to-html';
import cmStyles from './step-jss';
import { makeSecureDecrypt } from '../../../Helpers/security';
import avatarApi from 'dan-api/images/avatars';

const showdown = require('showdown');
const converter = new showdown.Converter();

const content = {
  blocks: [],
  entityMap: {}
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceAll(str, term, replacement) {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
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
      { key: 'email', value: '{{email}}', text: 'Email' },
      { key: 'university', value: '{{university}}', text: 'University' },
      { key: 'course', value: '{{course}}', text: 'Course' },
      { key: 'graduation-year', value: '{{graduation-year}}', text: 'Graduation Year' }
    ];
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

class Step4 extends PureComponent {


  closeNotif = () => {
    this.setState({ message: '' })
  }

  handleDialog = () => {
    this.setState({ dialog: !this.state.dialog })
  }

  constructor(props) {
    super(props);
    const { body, heading } = this.props;

    if (body == '') {
      const editorState = EditorState.createEmpty();
      this.state = {
        editorState,
        headingEditor: heading,
        cname: '',
        email: '',
        logo: avatarApi[0],
        message: '',
        variant: 'success',
        dialog: false,
        sendText: 'Send to me',
        user: JSON.parse(
          makeSecureDecrypt(localStorage.getItem('user'))
        )
      };
    }
    else {
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
          headingEditor: heading,
          cname: '',
          email: '',
          logo: avatarApi[0],
          message: '',
          variant: 'success',
          dialog: false,
          sendText: 'Send to me',
          user: JSON.parse(
            makeSecureDecrypt(localStorage.getItem('user'))
          )
        };
      }
    }
  }

  sendPreview = () => {
    this.setState({ sendText: '...sending' })
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      heading: this.props.heading,
      body: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      email: user.email,
      company_id: user.cId
    };

    postData(`${API_URL}/client/get-email-preview`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ sendText: 'Sent' })
          this.setState({ message: 'Email preview sent', variant: 'success' })
        }
        else {
          this.setState({ sendText: 'Try again' })
          this.setState({ message: 'Something went wrong', variant: 'error' })
        }
      })
      .catch((err) => {
        this.setState({ message: 'Something went wrong', variant: 'error' })
        console.error(err);
      });
  }

  handlePreview = () => {
    window.open(`https://backend.varsitycareershub.co.uk/utils/email-preview?heading=${this.props.heading}&body=${replaceAll(this.props.body, '\n', '%0A')}&company_id=${this.state.user.cId}`)

  }


  componentDidMount() {
    const { userType } = this.props;
    if (userType == 'CLIENT') {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );

      const data = {
        company_id: user.cId
      };

      postData(`${API_URL}/client/client-info`, data)
        .then((res) => {
          if (res.status === 1) {
            let { data } = res;
            let email = data.email;
            let cname = `${data.name}`;
            let logo = data.logo;
            this.setState({ email, cname, logo });
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
            let { data } = res;
            let email = data.email;
            let cname = `${data.name}`;
            let logo = data.logo;
            this.setState({ email, cname, logo });
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
    addInfo({ body: draftToHtml(convertToRaw(editorState.getCurrentContent())), heading: headingEditor });
  };

  onHeadingChange = (headingEditor) => {
    const { addInfo } = this.props;
    const { editorState } = this.state;
    this.setState({
      headingEditor,
    });
    addInfo({ ...this.props, heading: headingEditor });
  };

  render() {
    var __that = this;
    const { editorState, headingEditor, cname, email, logo } = __that.state;
    const { classes, heading } = this.props;
    return (
      <Fragment>
        <Typography variant="subtitle2">
          We will use this email to help create the rest of our emails for our campaign. Try to make your email unique and attractive to your future hires.
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
                style={{ maxHeight: 220 }}
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
                    <Avatar src={(logo != null && logo != '') ? logo : avatarApi[0]} />
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
              {this.props.userType == 'CLIENT' &&
                <Grid style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: 'initial' }}
                    onClick={this.handlePreview}
                  >
                    Preview
                </Button>
                  {/* <Link onClick={e =>  >Test</Link> */}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: 'initial' }}
                    onClick={this.sendPreview}
                  >
                    {__that.state.sendText}
                  </Button>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
        {/* <SnackNotification close={this.closeNotif} message={this.state.message} variant={this.state.variant} /> */}
      </Fragment>
    );
  }
}

Step4.propTypes = {
  classes: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  // body: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';
const reducerA = 'Auth';

const mapStateToProps = state => ({
  heading: state.getIn([reducerCampaign, 'heading']),
  body: state.getIn([reducerCampaign, 'body']),
  userType: state.getIn([reducerA, 'userType']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep4Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step4);

export default withStyles(styles, cmStyles)(StepMapped);
