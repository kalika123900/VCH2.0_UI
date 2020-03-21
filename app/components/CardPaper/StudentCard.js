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
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { CombineStyles } from 'dan-helpers';
import Ionicon from 'react-ionicons';
import styles from './cardStyle-jss';
import MessageDialog from '../Forms/MessageDialog';
import StudentProfileDialog from '../Profile/StudentProfileDialog';

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

const combinedStyles = CombineStyles(customStyles, styles);

class StudentCard extends React.Component {
  state = {
    open: false,
    profile: false
  };

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

  render() {
    const {
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
        <MessageDialog open={this.state.open} handleClose={this.handleClose} />
        <StudentProfileDialog open={this.state.profile} handleClose={this.handleProfileClose} />
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
            <Typography className={classes.subheading} gutterBottom>
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
              <BottomNavigationAction className={classes.customBottomNavLabel} label="Add to Shortlist" icon={<PlaylistAddIcon className={classes.customMargin} />} />
              <BottomNavigationAction className={classes.customBottomNavLabel} label="Add to Contacts" icon={<ContactsIcon className={classes.customMargin} />} />
            </BottomNavigation>
          </CardActions>
        </Card>
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
