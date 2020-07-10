import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import draftToMarkdown from 'draftjs-to-markdown';
import { markdownToDraft } from 'markdown-draft-js';
import { storeFollowUps } from 'dan-actions/CampaignActions';
import { withStyles } from '@material-ui/core/styles';
import { convertFromRaw, EditorState, convertToRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Reply from '@material-ui/icons/Reply';
import ReplyAll from '@material-ui/icons/ReplyAll';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import 'dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import styles from 'dan-components/Email/email-jss';
import avatarApi from 'dan-api/images/avatars';


const showdown = require('showdown');
const converter = new showdown.Converter();

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

function getHumanDate(unix_timestamp) {
  var dateObject = new Date(unix_timestamp * 1000);
  const month = dateObject.getMonth();
  let day = dateObject.getDate();
  const year = dateObject.getFullYear();

  const monthString = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (day < 10) {
    day = `0${day}`;
  }

  return (`${day} ${monthString[month]} ${year}`);
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

class Wysiwyg extends PureComponent {
  state = {
    cname: '',
    email: '',
    logo: avatarApi[0]
  }

  componentDidMount() {
    const data = {
      deadline: this.props.deadline,
      campaignId: this.props.campaignId
    };

    const clientData = {
      campaignId: this.props.campaignId
    };

    postData(`${API_URL}/admin/client-info`, clientData)
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

    if (this.props.campaignStatus != 0) {
      postData(`${API_URL}/campaign/get-schedule-data`, data)
        .then((res) => {
          if (res.status === 1) {
            const { addInfo, } = this.props;
            var newFollowUps = List([]);

            res.data.map((item) => {
              var editorState = EditorState.createEmpty();

              if (item.body && item.body != '') {
                const rawData = markdownToDraft(item.body);
                const content = convertFromRaw(rawData);

                if (content) {
                  editorState = EditorState.createWithContent(content);
                }
              }

              newFollowUps = newFollowUps.push({
                type: item.mail_type,
                date: item.date_to_short,
                heading: item.heading,
                body: item.body,
                editorState
              });

            });

            addInfo({ followUps: newFollowUps });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      postData(`${API_URL}/campaign/get-campaign-schedule`, data)
        .then((res) => {
          if (res.status === 1) {
            const { addInfo, } = this.props;
            const contentBlock = convertFromRaw(content);
            const editorState = EditorState.createWithContent(contentBlock);
            var newFollowUps = List([]);

            res.data.map((item) => {
              if (contentBlock) {
                newFollowUps = newFollowUps.push({
                  type: item.type,
                  date: item.date,
                  heading: '',
                  body: '',
                  editorState
                });
              }
            });

            addInfo({ followUps: newFollowUps });
          };
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  onHeadingChange = (event, id) => {
    const { followUps, addInfo, } = this.props;
    let newFollowUps = followUps.set(id, {
      ...followUps.get(id),
      heading: event.target.value
    });
    addInfo({ followUps: newFollowUps });
  }

  render() {
    const { cname, email, logo } = this.state;
    const { classes, followUps, addInfo } = this.props;

    const followUpBlocks = followUps.map((item, index) => {
      const { heading, editorState } = followUps.get(index);
      return <Fragment key={index.toString()}>
        <Typography variant="h6" color="secondary">{item.type == 'follow_up' ? `Follow Up ${index + 1}` : 'Deadline Email'} </Typography>
        <Typography variant="body1" color="textSecondary">Expected Date to be sent {getHumanDate(item.date)}</Typography>
        <Grid
          container
          alignItems="flex-start"
          justify="space-around"
          direction="row"
          spacing={3}
          style={{ marginBottom: '30px', marginTop: '20px' }}
        >
          <Grid item md={6} xs={12}>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                placeholder="Heading"
                name="heading"
                margin="normal"
                variant="filled"
                value={heading}
                onChange={(e) => this.onHeadingChange(e, index)}
                style={{ width: '100%', marginTop: '0' }}
              />
            </Grid>
            <Editor
              editorState={editorState}
              editorClassName={classes.textEditor}
              toolbarClassName={classes.toolbarEditor}
              toolbarCustomButtons={[<CustomOption />]}
              onEditorStateChange={(state) => {
                let newFollowUps = followUps.set(index, {
                  ...followUps.get(index),
                  body: draftToMarkdown(convertToRaw(state.getCurrentContent())),
                  editorState: state
                });
                addInfo({ followUps: newFollowUps });
              }}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12} >
            <Grid>
              <textarea
                disabled
                placeholder="Heading"
                value={heading}
                style={{
                  width: '100%',
                  marginTop: 8,
                  maxHeight: 40,
                  border: 'none',
                  background: 'white'
                }}
              />
            </Grid>
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
            <Grid className={classes.textPreview} dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())), }} />
            <Grid>
              <Typography variant="caption">
                @ 2020 Varsity Careers Hub
            </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    })

    return (
      followUpBlocks
    );
  }
}

Wysiwyg.propTypes = {
  classes: PropTypes.object.isRequired,
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  followUps: state.getIn([reducerCampaign, 'followUps']),
  deadline: state.getIn([reducerCampaign, 'deadline']),
  campaignStatus: state.getIn([reducerCampaign, 'campaignStatus'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeFollowUps, dispatch)
});

const WysiwygMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wysiwyg);

export default withStyles(styles)(WysiwygMapped);