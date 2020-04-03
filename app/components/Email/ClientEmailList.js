import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import AES from 'crypto-js/aes'
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
  }

  openThread = (mail) => {
    const MapMail = mail.toJS();
    // var ciphertext = encodeURI(AES.encrypt(String(MapMail.thread), '123456').toString());
    this.props.history.push(`/client/messages/${MapMail.thread}`)
  }

  closeThread = () => {
    this.setState({ openThread: false, thread: -2 })
  }

  render() {
    const {
      classes,
      emailData,
      openMail,
      filterPage,
      keyword,
      remove,
      toggleStar,
      reply
    } = this.props;
    const { anchorElOpt, itemToMove } = this.state;
    /* Basic Filter */
    const inbox = emailData.filter(item => item.get('category') !== 'sent');
    const stared = emailData.filter(item => item.get('stared'));
    const sent = emailData.filter(item => item.get('category') === 'sent');
    /* Category Filter */
    const campaign = emailData.filter(item => item.get('category') === 'campaign');
    const bulkemail = emailData.filter(item => item.get('category') === 'bulkemail');
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

    const getEmail = dataArray => dataArray.map(mail => {
      const renderHTML = { __html: mail.get('content') };
      if (mail.get('subject').toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
      return (
        <Grid className={classes.emailList} key={mail.get('id')}>
          <div className={classes.fromHeading}>
            <Tooltip id="tooltip-mark" title="Stared">
              <IconButton onClick={() => toggleStar(mail)} className={classes.starBtn}>{mail.get('stared') ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
            </Tooltip>
            <Avatar alt="avatar" src={mail.get('avatar')} className={classes.avatar} />
            <div className={classes.item} onClick={() => this.openThread(mail)}>
              <Typography className={classes.heading} display="block" >
                {mail.get('category') === 'sent' && ('To ')}
                {mail.get('name')}
                <Typography variant="caption" display="block">{mail.get('date')}</Typography>
              </Typography>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading} noWrap>{mail.get('subject')}</Typography>
                {getCategory(mail.get('category'))}
              </div>
            </div>
          </div>
        </Grid>
      );
    });
    const showEmail = category => {
      switch (category) {
        case 'inbox':
          return getEmail(inbox);
        case 'stared':
          return getEmail(stared);
        case 'sent':
          return getEmail(sent);
        case 'campaign':
          return getEmail(campaign);
        case 'bulkemail':
          return getEmail(bulkemail);
        default:
          return getEmail(inbox);
      }
    };
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
        {showEmail(filterPage)}
      </main >
    );
  }
}

EmailList.propTypes = {
  classes: PropTypes.object.isRequired,
  emailData: PropTypes.object.isRequired,
  openMail: PropTypes.func.isRequired,
  moveTo: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleStar: PropTypes.func.isRequired,
  reply: PropTypes.func.isRequired,
  filterPage: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default withStyles(styles)(withRouter(EmailList));
