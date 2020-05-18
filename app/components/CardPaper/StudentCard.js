import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Type from 'dan-styles/Typography.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ContactsIcon from '@material-ui/icons/Contacts';
import SendIcon from '@material-ui/icons/Send';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SchoolOutlined from '@material-ui/icons/SchoolOutlined';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { CombineStyles } from 'dan-helpers';
import Ionicon from 'react-ionicons';
import styles from './cardStyle-jss';
import qs from 'qs';
import MessageDialog from '../Forms/MessageDialog';
import StudentProfileDialog from '../Profile/StudentProfileDialog';
import { makeSecureDecrypt } from '../../Helpers/security';
import messageStyles from 'dan-styles/Messages.scss';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const customStyles = {
  customBottomNavLabel: {
    fontSize: '0.60rem',
    '& span': {
      fontSize: '0.60rem'
    }
  },
  absIconGrid: {
    position: 'absolute',
    top: '-20px'
  }
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

const combinedStyles = CombineStyles(customStyles, styles);

class StudentCard extends React.Component {
  state = {
    open: false,
    profile: false,
    openStyle: false,
    messageType: 'error',
    notifyMessage: ''
  };

  handleCloseStyle = () => {
    this.setState({ openStyle: false })
  }

  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  }

  handleClickOpen = (e) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleProfileOpen = (e) => {
    this.setState({ profile: true });
  };

  handleProfileClose = () => {
    this.setState({ profile: false });
  };

  handleAddContact = (user_id) => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
      user_id
    }

    postData(`${API_URL}/client/add-contact`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({
            notifyMessage: 'Contact Added in your list',
            messageType: 'success',
            openStyle: true
          })
        } else {
          this.setState({
            notifyMessage: 'Contact already in your list',
            messageType: 'error',
            openStyle: true
          })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleDirectMessage = (subject, body) => {
    const { email, user_id } = this.props;
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      sender_id: user.id,
      sender_type: 'client',
      receiver_id: user_id,
      receiver_type: 'user',
      subject,
      body,
      to: email,
      company_name: user.name
    }

    postData(`${API_URL}/client/direct-message`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({
            notifyMessage: 'Direct Message sent',
            messageType: 'success',
            openStyle: true
          })
        } else {
          this.setState({
            notifyMessage: 'Direct Message not sent',
            messageType: 'error',
            openStyle: true
          })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const {
      user_id,
      classes,
      cover,
      avatar,
      name,
      title,
      isVerified,
      btnText,
      university
    } = this.props;

    return (
      <Fragment>
        <MessageDialog open={this.state.open} handleClose={this.handleClose} sendMessage={this.handleDirectMessage} />
        <StudentProfileDialog user_id={user_id} open={this.state.profile} handleClose={this.handleProfileClose} />
        <Card className={classes.cardSocmed}>
          <CardMedia
            className={classes.mediaProfile}
            image={cover}
            title="cover"
          />
          <CardContent className={classes.contentProfile}>
            <Grid className={classes.absIconGrid}>
              <Grid className={classes.absItem}>
                <Ionicon icon="ios-checkmark" fontSize="40px" color="#fff" style={{ color: '#4bfd00' }} />
              </Grid>
              <Grid className={classes.absItem}>
                <Ionicon icon="ios-list-box" fontSize="40px" color="white" style={{ color: '#fff' }} />
              </Grid>
              <Grid className={classes.absItem}>
                <Ionicon icon="ios-person" fontSize="40px" color="white" style={{ color: '#fff' }} />
              </Grid>
              <Grid className={classes.absItem}>
                <Ionicon icon="ios-ribbon" fontSize="40px" color="white" style={{ color: '#fff' }} />
              </Grid>
            </Grid>
            <Avatar alt="avatar" src={avatar} className={classes.avatarBig} />
            <Typography variant="h6" className={classes.name} gutterBottom>
              {name}
              {isVerified && <VerifiedUser className={classes.verified} />}
            </Typography>
            <Typography className={classes.subheading, classes.customSubheading} gutterBottom>
              <span className={Type.regular}>{title}</span>
            </Typography>
            <Typography variant="subtitle1" className={classes.subheading} gutterBottom>
              <SchoolOutlined />
              {' '}
              {university}
            </Typography>
            <Button
              className={classes.buttonProfile}
              size="small"
              variant="outlined"
              color="primary"
              style={{ margin: '10px' }}
              onClick={(e) => this.handleProfileOpen(e)}
            >
              {btnText}
            </Button>
          </CardContent>
          <Divider />
          <CardActions>
            <BottomNavigation
              showLabels
              className={classes.bottomLink}
            >
              <BottomNavigationAction onClick={(e) => this.handleClickOpen(e)} className={classes.customBottomNavLabel} label="Send Message" className={classes.customBottomNavLabel} icon={<SendIcon className={classes.customMargin} />} />
              {/* <BottomNavigationAction className={classes.customBottomNavLabel} label="Add to Shortlist" icon={<PlaylistAddIcon className={classes.customMargin} />} /> */}
              <BottomNavigationAction onClick={(e) => this.handleAddContact(user_id)} className={classes.customBottomNavLabel} label="Add to Contacts" icon={<ContactsIcon className={classes.customMargin} />} />
            </BottomNavigation>
          </CardActions>
        </Card>
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
      </Fragment>
    );
  }
}

StudentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cover: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  isVerified: PropTypes.bool
};

StudentCard.defaultProps = {
  isVerified: false
};

export default withStyles(combinedStyles)(StudentCard);
