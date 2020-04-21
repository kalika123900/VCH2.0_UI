import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Flag from '@material-ui/icons/Flag';
import People from '@material-ui/icons/People';
import Star from '@material-ui/icons/Star';
import styles from './email-jss';
import Download from '@material-ui/icons/CloudDownload';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FileIcon from '@material-ui/icons/Description';
import Delete from '@material-ui/icons/Delete';
import isImage from '../Forms/helpers/helpers.js';
import { fromJS } from 'immutable';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Avatar from '@material-ui/core/Avatar';

class ClientEmailThreadList extends React.Component {
  render() {
    const { classes, openMail, keyword, reply, mailData } = this.props;

    const getCategory = cat => {
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

    const attachmentPreview = filesArray => filesArray.map((file, index) => {
      const base64File = URL.createObjectURL(file);
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

    const getEmail = dataArray => dataArray.map(mail => {
      var _that = this;
      const renderHTML = { __html: mail.get('content') };
      if (mail.get('subject').toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
      return (
        <ExpansionPanel className={classes.emailList} key={mail.get('id')} onChange={() => openMail(mail)}>
          <ExpansionPanelSummary className={classes.emailSummary} expandIcon={<ExpandMoreIcon />}>
            <div className={classes.fromHeading}>
              <Avatar alt="avatar" src={mail.get('avatar')} className={classes.avatar} style={{ marginRight: 20 }} />
              <div className={classes.item}>
                <div>
                  <Typography className={classes.heading} display="block">
                    {mail.get('sender_type') != 'user' && ('me, ')}
                    {mail.get('name')}
                    <Typography variant="caption" display="block">{mail.get('date')}</Typography>
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading} noWrap>{mail.get('subject')}</Typography>
                  {getCategory(mail.get('category'))}
                </div>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <section>
              {mail.get('thread') == -1 ? null :
                <div className={classes.topAction}>
                  <Typography className={classes.headMail}>
                    {mail.get('sender_type') == 'user' &&
                      <Fragment>
                        From&nbsp;
                      {mail.get('name')}
                      &nbsp;to me
                    </Fragment>
                    }
                    {mail.get('sender_type') != 'user' &&
                      <Fragment>
                        From&nbsp;
                        me&nbsp;
                        to&nbsp;
                        {mail.get('name')}
                      </Fragment>
                    }
                  </Typography>
                </div>
              }
              <div className={classes.emailContent}>
                <Typography variant="h6" gutterBottom>{mail.get('subject')}</Typography>
                <article dangerouslySetInnerHTML={renderHTML} />
              </div>
              <div className={classes.preview}>
                {attachmentPreview(mail.get('attachment'))}
              </div>
            </section>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            {mail.get('sender_type') !== 'client' &&
              <div className={classes.action}>
                <Button size="small" color="secondary" onClick={() => reply(mail)} >Reply</Button>
              </div>
            }
          </ExpansionPanelActions>
        </ExpansionPanel>
      );
    });

    return (
      <Fragment>
        <Typography></Typography>
        <main className={classes.threadContent}>
          {getEmail(fromJS(mailData))}
        </main>
      </Fragment >
    );
  }
}

export default withStyles(styles)(ClientEmailThreadList);
