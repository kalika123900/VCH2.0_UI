import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { fromJS } from 'immutable';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Delete from '@material-ui/icons/Delete';
import Flag from '@material-ui/icons/Flag';
import People from '@material-ui/icons/People';
import FileIcon from '@material-ui/icons/Description';
import Download from '@material-ui/icons/CloudDownload';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import isImage from '../Forms/helpers/helpers.js';
import styles from './email-jss';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return response;
}

class EmailList extends React.Component {
  state = {
    JSX: null,
    openStyle: false,
    messageType: 'error',
    notifyMessage: ''
  };

  handleCloseStyle = () => {
    this.setState({ openStyle: false })
  }


  openThread = (mail) => {
    if (mail.get('type') === 'campaign') {
      const url = `${API_URL}/utils/track-campaign?user_id=${mail.get('receiver_id')}&campaign_id=${mail.get('ref_id')}`;
      console.log(url)
      getData(url)
        .then(() => {
          console.log('tracked')
        })
        .catch(e => {
          console.log(e);
        })
    }
    const MapMail = mail.toJS();
    if (MapMail.thread != -1) {
      this.props.history.push(`/student/messages/${btoa(MapMail.thread)}`)
    } else {
      this.props.history.push(`/student/messages/${btoa(MapMail.id)}`)
    }
  };

  toggleStar = (mail) => {
    const MappedMail = mail.toJS();
    const type = MappedMail.sender_type == 'user' ? 'sender' : 'receiver';
    const data = {
      messageId: MappedMail.id,
      type
    }

    postData(`${API_URL}/student/toggle-star`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.showClientEmail(this.props.filterPage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  remove = (mail) => {
    const MappedMail = mail.toJS();
    const type = MappedMail.sender_type == 'user' ? 'sender' : 'receiver';
    const data = {
      messageId: MappedMail.id,
      type
    }

    postData(`${API_URL}/student/remove-email`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.showClientEmail(this.props.filterPage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.showClientEmail(this.props.filterPage);
  };
  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.filterPage != this.props.filterPage) {
      this.showClientEmail(this.props.filterPage);
    }
  };

  getEmailRender = async (type) => {
    const { openMail, classes, reply } = this.props;
    var JSX = [];
    var MappedData = '';
    var rawData = '';
    var _that = this;
    const asyncRender = async () => {
      try {
        await new Promise((resolve, reject) => {
          _that.props.showEmail(type, function (response) {
            if (response === false) {
              rawData = false;
              reject(new Error('Promise rejected'));
            }
            else if (response.length > 0) {
              rawData = response;
              MappedData = fromJS(rawData);
              JSX = MappedData.map(mail => {
                const renderHTML = { __html: mail.get('content') };
                if (mail.get('subject').toLowerCase().indexOf(_that.props.keyword) === -1) {
                  return false;
                }
                return (
                  type == 'inbox' ?
                    <Grid className={classes.emailList} key={mail.get('id')}>
                      <Divider />
                      <div className={classes.fromHeading} style={{ margin: 5 }}>
                        <Tooltip id="tooltip-mark" title="Stared">
                          <IconButton onClick={() => _that.toggleStar(mail)} className={classes.starBtn}>{mail.get('stared') ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
                        </Tooltip>
                        <Avatar alt="avatar" src={mail.get('avatar')} className={classes.avatar} />
                        <div className={classes.item} onClick={() => _that.openThread(mail)}>
                          <div>
                            <Typography className={classes.heading} display="block" >
                              {mail.get('name')}
                              <Typography variant="caption" display="block">{mail.get('date')}</Typography>
                            </Typography>
                          </div>
                          <div className={classes.column}>
                            <Typography className={classes.secondaryHeading} noWrap>{mail.get('subject')}</Typography>
                            {_that.getCategory(mail.get('category'))}
                          </div>
                        </div>
                        <div className={classes.topAction}>
                          <div className={classes.opt}>
                            <Tooltip id="tooltip-mark" title="Remove mail">
                              <IconButton className={classes.button} aria-label="Delete" onClick={() => _that.remove(mail)}><Delete /></IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    :
                    < ExpansionPanel className={classes.emailList} key={mail.get('id')} onChange={() => openMail(mail)}>
                      <ExpansionPanelSummary className={classes.emailSummary} expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.fromHeading}>
                          <Tooltip id="tooltip-mark" title="Stared">
                            <IconButton onClick={() => _that.toggleStar(mail)} className={classes.starBtn}>{mail.get('stared') ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
                          </Tooltip>
                          <Avatar alt="avatar" src={mail.get('avatar')} className={classes.avatar} />
                          <div className={classes.item}>
                            <div>
                              <Typography className={classes.heading} display="block">
                                {mail.get('category') === 'sent' && ('To ')}
                                {mail.get('name')}
                                <Typography variant="caption" display="block">{mail.get('date')}</Typography>
                              </Typography>
                            </div>
                            <div className={classes.column}>
                              <Typography className={classes.secondaryHeading} noWrap>{mail.get('subject')}</Typography>
                              {_that.getCategory(mail.get('category'))}
                            </div>
                          </div>
                        </div>
                        <div className={classes.topAction}>
                          <div className={classes.opt}>
                            <Tooltip id="tooltip-mark" title="Remove mail">
                              <IconButton className={classes.button} aria-label="Delete" onClick={() => _that.remove(mail)}><Delete /></IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.details}>
                        <section>
                          <div className={classes.emailContent}>
                            <Typography variant="h6" gutterBottom>{mail.get('subject')}</Typography>
                            <article dangerouslySetInnerHTML={renderHTML} />
                          </div>
                          <div className={classes.preview}>
                            {_that.attachmentPreview(mail.get('attachment'))}
                          </div>
                        </section>
                      </ExpansionPanelDetails>
                      <Divider />
                      {
                        (mail.get('category') !== 'sent' && mail.get('sender_type') !== 'user') &&
                        <ExpansionPanelActions>
                          <div className={classes.action}>
                            <Button size="small" color="secondary" onClick={() => reply(mail)}>Reply</Button>
                          </div>
                        </ExpansionPanelActions>
                      }
                    </ExpansionPanel >
                );
              });
              _that.setState({ JSX: JSX });
              resolve(rawData);
            } else {
              const JSX =
                <div style={{ textAlign: "center", marginTop: 50, padding: 5 }}>
                  <Typography variant="body2">It looks like you haven't been sent any messages yet</Typography>
                </div>
              _that.setState({ JSX });
              resolve(response)
            }
          });
        });
      }
      catch (err) {
        throw new Error(`Failter to fetch the data ! Err:${err.message}`);
      }
    }
    asyncRender();
  };

  getCategory = (cat) => {
    const { classes } = this.props;

    switch (cat) {
      case 'campaign':
        return (
          <span className={classNames(classes.iconOrange, classes.category)}>
            <Flag />
            &nbsp;Campaign Responses
          </span>
        );
      case 'bulkemail':
        return (
          <span className={classNames(classes.iconRed, classes.category)}>
            <People />
            &nbsp;Bulk Email Queries
          </span>
        );
      default:
        return false;
    }
  };

  attachmentPreview = filesArray => filesArray.map((file, index) => {
    const base64File = URL.createObjectURL(file);
    var classes = this.props.classes;
    if (isImage(file)) {
      return (
        <div key={index.toString()} className={classes.item}>
          <div className="imageContainer col fileIconImg">
            <div className="downloadBtn">
              <IconButton color="secondary" component="a" href={base64File} target="_blank">
                <Download />
              </IconButton>
            </div>
            <figure className="imgWrap"><img className="smallPreviewImg" src={base64File} alt="preview" /></figure>
          </div>
          <Typography noWrap>{file.name}</Typography>
        </div>
      );
    }
    return (
      <div key={index.toString()} className={classes.item}>
        <div className="imageContainer col fileIconImg">
          <div className="fileWrap">
            <div className="downloadBtn">
              <IconButton color="secondary" href={base64File} target="_blank">
                <Download />
              </IconButton>
            </div>
            <FileIcon className="smallPreviewImg" alt="preview" />
          </div>
        </div>
        <Typography noWrap>{file.name}</Typography>
      </div>
    );
  });

  showClientEmail = category => {
    var response = '';
    switch (category) {
      case 'inbox':
        response = this.getEmailRender('inbox');
        break;
      case 'stared':
        response = this.getEmailRender('stared');
        break;
      case 'sent':
        response = this.getEmailRender('sent');
        break;
      default:
        response = this.getEmailRender('inbox');
    }
    return response;
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment >
        <main className={classes.content} >
          {(this.state.JSX != null)
            &&
            this.state.JSX}
        </main >
        <Grid style={{ zIndex: 50 }}>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.openStyle}
            autoHideDuration={6000}
            onClose={this.handleCloseStyle}
          >
            <SnackbarContent
              className={this.state.messageType == 'error' ? messageStyles.bgError : messageStyles.bgSuccess}
              aria-describedby="client-snackbar"
              message={(
                <span id="client-snackbar" className={classes.message}>
                  {
                    (this.state.messageType == 'error') && <ErrorIcon className="success" />
                  }
                  {
                    (this.state.messageType == 'success') && <CheckCircleIcon className="success" />
                  }

                  &nbsp;
                  {this.state.notifyMessage}
                </span>
              )}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.noticeClose}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
            />
          </Snackbar>
        </Grid>

      </Fragment >
    );
  }
}

EmailList.propTypes = {
  classes: PropTypes.object.isRequired,
  openMail: PropTypes.func.isRequired,
  filterPage: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default withStyles(styles)(withRouter(EmailList));