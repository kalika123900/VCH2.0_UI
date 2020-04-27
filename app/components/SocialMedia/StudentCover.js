import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import avatarApi from 'dan-api/images/avatars';
import bgCover from 'dan-images/petal_bg.svg';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import { makeSecureDecrypt } from '../../Helpers/security';
import styles from './jss/cover-jss';
import qs from 'qs';

const optionsOpt = [
  'Edit Profile'
];

const ITEM_HEIGHT = 48;

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

class StudentCover extends React.Component {
  state = {
    anchorElOpt: null,
    name: '',
    profile: null,
    gender: 'Male'
  };

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    }
    postData(`${API_URL}/student/get-personal-details`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({
            name: `${res.data.firstname} ${res.data.lastname}`,
            gender: res.data.gender,
            profile: res.data.profile
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  handleRedirect = () => {
    this.props.history.push('/student/edit-details')
  }

  render() {
    const {
      classes, } = this.props;
    const { anchorElOpt, name, profile, gender } = this.state;

    return (
      <div className={classes.cover} style={{ backgroundImage: `url(${bgCover})` }}>
        <div className={classes.opt}>
          <IconButton
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
            {optionsOpt.map(option => (
              <MenuItem key={option} selected={option === 'Edit Profile'} onClick={this.handleRedirect}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className={classes.content}>
          <Avatar alt={name} src={(profile == null || profile == '') ? avatarApi[7] : profile} className={classes.avatar} />
          <Typography variant="h4" className={classes.name} gutterBottom>
            {name}
            {/* <VerifiedUser className={classes.verified} /> */}
          </Typography>
        </div>
      </div>
    );
  }
}

StudentCover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(StudentCover));
