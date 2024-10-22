import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocalPhone from '@material-ui/icons/LocalPhone';
import Delete from '@material-ui/icons/Delete';
import Email from '@material-ui/icons/Email';
import Smartphone from '@material-ui/icons/Smartphone';
import LocationOn from '@material-ui/icons/LocationOn';
import Work from '@material-ui/icons/Work';
import Language from '@material-ui/icons/Language';
import Divider from '@material-ui/core/Divider';
import styles from './contact-jss';

import { makeSecureDecrypt } from '../../Helpers/security';

const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

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

const ITEM_HEIGHT = 48;

class ContactDetail extends React.Component {
  state = {
    anchorElOpt: null,
  };

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  deleteContact = (item) => {
    const { remove } = this.props;
    const MappedItem = item.toJS();
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const data = {
      company_id: user.cId,
      user_id: MappedItem.id
    }

    postData(`${API_URL}/client/remove-contact`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          remove(item);
          this.setState({ anchorElOpt: null });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleFavAction = (item) => {
    const { favorite } = this.props;
    const MappedItem = item.toJS();
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const data = {
      company_id: user.cId,
      user_id: MappedItem.id
    }

    postData(`${API_URL}/client/fav-contact`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          favorite(item)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      classes,
      dataContact,
      itemSelected,
      edit,
      favorite,
      showMobileDetail,
      hideDetail
    } = this.props;
    const { anchorElOpt } = this.state;
    return (
      <main className={classNames(classes.content, showMobileDetail ? classes.detailPopup : '')}>
        <section className={classes.cover}>
          <div className={classes.opt}>
            <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => this.handleFavAction(dataContact.get(itemSelected))}>
              {dataContact.getIn([itemSelected, 'favorited']) ? (<Star />) : <StarBorder />}
            </IconButton>
            <IconButton aria-label="Delete" onClick={() => this.deleteContact(dataContact.get(itemSelected))}>
              <Delete />
            </IconButton>
            {/* <IconButton
              aria-label="More"
              aria-owns={anchorElOpt ? 'long-menu' : null}
              aria-haspopup="true"
              className={classes.button}
              onClick={this.handleClickOpt}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorElOpt}
              open={Boolean(anchorElOpt)}
              onClose={this.handleCloseOpt}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              {optionsOpt.map(option => {
                if (option === 'Delete Contact') {
                  return (
                    <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(dataContact.get(itemSelected))}>
                      {option}
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem key={option} selected={option === 'Edit Profile'} onClick={this.handleCloseOpt}>
                    {option}
                  </MenuItem>
                );
              })}
            </Menu> */}
          </div>
          <IconButton
            onClick={hideDetail}
            className={classes.navIconHide}
            aria-label="Back"
          >
            <ArrowBack />
          </IconButton>
          <Hidden xsDown>
            <Avatar alt={dataContact.getIn([itemSelected, 'name'])} src={dataContact.getIn([itemSelected, 'avatar'])} className={classes.avatar} />
            <Typography className={classes.userName} variant="h6">
              {dataContact.getIn([itemSelected, 'name'])}
              <Typography display="block" variant="caption">
                {dataContact.getIn([itemSelected, 'title'])}
              </Typography>
            </Typography>
          </Hidden>
        </section>
        <div>
          <Hidden smUp>
            <div className={classes.avatarTop}>
              <Avatar alt={dataContact.getIn([itemSelected, 'name'])} src={dataContact.getIn([itemSelected, 'avatar'])} className={classes.avatar} />
              <Typography variant="h5">
                {dataContact.getIn([itemSelected, 'name'])}
                <Typography>
                  {dataContact.getIn([itemSelected, 'title'])}
                </Typography>
              </Typography>
            </div>
          </Hidden>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.blueIcon}>
                  <LocalPhone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'phone'])} secondary="Phone" />
            </ListItem>
            {/* <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.amberIcon}>
                  <Smartphone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'secondaryPhone'])} secondary="Secondary Phone" />
            </ListItem> */}
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.tealIcon}>
                  <Email />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'personalEmail'])} secondary="Personal Email" />
            </ListItem>
            {/* <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.brownIcon}>
                  <Work />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'companyEmail'])} secondary="Company Email" />
            </ListItem> */}
            {/* <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.redIcon}>
                  <LocationOn />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'address'])} secondary="Address" />
            </ListItem> */}
            {/* <Divider variant="inset" /> */}
            {/* <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.purpleIcon}>
                  <Language />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'website'])} secondary="Website" />
            </ListItem> */}
          </List>
        </div>
      </main >
    );
  }
}

ContactDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  showMobileDetail: PropTypes.bool.isRequired,
  dataContact: PropTypes.object.isRequired,
  itemSelected: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  hideDetail: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContactDetail);
