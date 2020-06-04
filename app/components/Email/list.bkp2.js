import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import avatarApi from 'dan-api/images/avatars';
import { fromJS, List as immutableList } from 'immutable';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Bookmark from '@material-ui/icons/Bookmark';
import AES from 'crypto-js/aes'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Delete from '@material-ui/icons/Delete';
import { CryptoJS } from "crypto-js";
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

import { makeSecureDecrypt } from 'dan-helpers/security';

const ITEM_HEIGHT = 80;

class EmailList extends React.Component {
  state = {
    anchorElOpt: null,
    itemToMove: null,
    openThread: false,
    thread: -2,
  };

  handleClickOpt = (event, item) => {
    this.setState({
      anchorElOpt: event.currentTarget,
      itemToMove: item
    });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  handleMoveTo = (item, category) => {
    const { moveTo } = this.props;
    moveTo(item, category);
    this.setState({ anchorElOpt: null });
  };

  openThread = (mail, category) => {
    const MapMail = mail.toJS();
    if (category != "sent") {
      // var ciphertext = encodeURI(AES.encrypt(String(MapMail.thread), '123456').toString());
      this.props.history.push(`/client/messages/${MapMail.thread}`)
    } else {
      this.props.history.push(`/client/messages/${MapMail.id}`)
    }
  };

  render() {
    const {
      classes,
      emailData,
      openMail,
      filterPage,
      keyword,
      remove,
      toggleStar,
      reply,
      inbox,
      stared,
      sent,
      campaign,
      bulkemail,
      showEmail
    } = this.props;
    const { anchorElOpt, itemToMove } = this.state;
    /* Basic Filter */
    // const inbox = emailData.filter(item => item.get('category') !== 'sent');
    // const stared = emailData.filter(item => item.get('stared'));
    // const sent = emailData.filter(item => item.get('category') === 'sent');
    // /* Category Filter */
    // const campaign = emailData.filter(item => item.get('category') === 'campaign');
    // const bulkemail = emailData.filter(item => item.get('category') === 'bulkemail');

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

    const getEmail = async (type) => {
      const { showEmail } = this.props;
      let JSX = [];
      JSX = fromJS(JSX);
      const test = async () => {
        await new Promise((resolve, reject) => {
          showEmail(type, (data, err) => {
            if (data == false) {
              reject(err);
            }
            else {
              resolve(data)
            }
          });
        }).then((value) => {
          let MappedData = fromJS(value)
          JSX = MappedData.map(mail => {
            const renderHTML = { __html: mail.get('content') };
            if (mail.get('subject').toLowerCase().indexOf(keyword) === -1) {
              return false;
            }
            return (
              type == 'inbox' ?
                <Grid className={classes.emailList} key={mail.get('id')}>
                  <div className={classes.fromHeading} style={{ background: '#f3f4fa', margin: 10 }}>
                    <Tooltip id="tooltip-mark" title="Stared">
                      <IconButton onClick={() => toggleStar(mail)} className={classes.starBtn}>{mail.get('stared') ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
                    </Tooltip>
                    <Avatar alt="avatar" src={mail.get('avatar')} className={classes.avatar} />
                    <div className={classes.item} onClick={() => this.openThread(mail, mail.get('category'))}>
                      <div>
                        <Typography className={classes.heading} display="block" >
                          {mail.get('name')}
                          <Typography variant="caption" display="block">{mail.get('date')}</Typography>
                        </Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography className={classes.secondaryHeading} noWrap>{mail.get('subject')}</Typography>
                        {getCategory(mail.get('category'))}
                      </div>
                    </div>
                    <div className={classes.topAction}>
                      <div className={classes.opt}>
                        <Tooltip id="tooltip-mark" title="Remove mail">
                          <IconButton className={classes.button} aria-label="Delete" onClick={() => remove(mail)}><Delete /></IconButton>
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
                        <IconButton onClick={() => toggleStar(mail)} className={classes.starBtn}>{mail.get('stared') ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
                      </Tooltip>
                      <Avatar alt="avatar" src={mail.get('avatar')} className={classes.avatar} style={{ marginRight: 20 }} />
                      <Typography className={classes.heading} display="block">
                        {mail.get('category') === 'sent' && ('To ')}
                        {mail.get('name')}
                        <Typography variant="caption" display="block">{mail.get('date')}</Typography>
                      </Typography>
                    </div>
                    <div className={classes.column}>
                      <Typography className={classes.secondaryHeading} noWrap>{mail.get('subject')}</Typography>
                      {getCategory(mail.get('category'))}
                    </div>
                    <div className={classes.topAction}>
                      <div className={classes.opt}>
                        <Tooltip id="tooltip-mark" title="Remove mail">
                          <IconButton className={classes.button} aria-label="Delete" onClick={() => remove(mail)}><Delete /></IconButton>
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
                        {attachmentPreview(mail.get('attachment'))}
                      </div>
                    </section>
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    <div className={classes.action}>
                      <Button size="small" color="secondary" onClick={() => reply(mail)}>Reply</Button>
                    </div>
                  </ExpansionPanelActions>
                </ExpansionPanel >
            );
          });
        })
      }
      await test();
      return JSX;
    };

    const showClientEmail = category => {
      switch (category) {
        case 'inbox':
          return getEmail('inbox');
          break;
        case 'stared':
          return getEmail('stared');
          break;
        case 'sent':
          return getEmail('sent');
          break;
        case 'campaign':
          return getEmail('campaign');
          break;
        case 'bulkemail':
          return getEmail('bulkemail');
          break;
        default:
          return getEmail('inbox');
      }
    };

    let JSX = showClientEmail(filterPage);
    return (
      <main className={classes.content} >
        <Menu
          id="long-menu"
          anchorEl={anchorElOpt}
          open={Boolean(anchorElOpt)}
          onClose={this.handleCloseOpt}
          className={classes.markMenu}
          PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: 200 } }}
        >
          <List
            component="nav"
            subheader={<ListSubheader component="div">Mark to... </ListSubheader>}
          />
          <MenuItem selected onClick={() => this.handleMoveTo(itemToMove, 'campaign')}>
            <Flag className={classes.iconOrange} />
            &nbsp;Campaign Responses
          </MenuItem>
          <MenuItem onClick={() => this.handleMoveTo(itemToMove, 'bulkemail')}>
            <People className={classes.iconRed} />
            &nbsp;Bulk Email Queries
          </MenuItem>
        </Menu>
        {typeof JSX != 'promise' && JSX}
      </main >
    );
  }
}

EmailList.propTypes = {
  classes: PropTypes.object.isRequired,
  openMail: PropTypes.func.isRequired,
  moveTo: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleStar: PropTypes.func.isRequired,
  reply: PropTypes.func.isRequired,
  filterPage: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default withStyles(styles)(withRouter(EmailList));
