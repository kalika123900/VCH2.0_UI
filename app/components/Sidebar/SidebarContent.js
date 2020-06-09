import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import brand from 'dan-api/dummy/brand';
import dummy from 'dan-api/dummy/dummyContents';
import logo from 'dan-images/logo.png';
import MainMenu from './MainMenu';
import styles from './sidebar-jss';
import avatarApi from 'dan-api/images/avatars';
import { makeSecureDecrypt } from 'dan-helpers/security';

const users = {
  STUDENT: {
    key: 'student',
    info: 'get-personal-details',
    attribute: 'profile',
    id: 'user_id',
    uid: 'id'
  },
  CLIENT: {
    key: 'client',
    info: 'client-info',
    attribute: 'logo',
    id: 'company_id',
    uid: 'cId'
  },
  ADMIN: {
    key: 'admin',
    info: 'get-account-info',
    attribute: 'profile',
    id: 'id',
    uid: 'id'
  }
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


class SidebarContent extends React.Component {
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    this.state = {
      transform: 0,
      name: user.name,
      profile: ''
    }
  }

  componentDidMount = () => {
    // Scroll content to top
    const mainContent = document.getElementById('sidebar');
    mainContent.addEventListener('scroll', this.handleScroll);
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      [users[this.props.userType].id]: user[users[this.props.userType].uid]
    }

    postData(`${API_URL}/${users[this.props.userType].key}/${users[this.props.userType].info}`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ profile: res.data[users[this.props.userType].attribute] })
        } else {
          this.setState({ profile: '' })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentWillUnmount() {
    const mainContent = document.getElementById('sidebar');
    mainContent.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const scroll = event.target.scrollTop;
    this.setState({
      transform: scroll
    });
  }

  render() {
    const {
      classes,
      drawerPaper,
      toggleDrawerOpen,
      loadTransition,
      dataMenu,
      userType
    } = this.props;
    const { transform, name, profile } = this.state;

    return (
      <div className={classNames(classes.drawerInner, !drawerPaper ? classes.drawerPaperClose : '')}>
        <div className={classes.drawerHeader}>
          <NavLink to={`/${userType.toLowerCase()}`} className={classNames(classes.brand, classes.brandBar)}>
            <img src={logo} alt={brand.name} />
          </NavLink>
          <div
            className={classNames(classes.profile, classes.user)}
            style={{ opacity: 1 - (transform / 100), marginTop: transform * -0.3 }}
          >
            <Avatar
              alt={name}
              src={profile.length == 0 || profile == null ? avatarApi[7] : profile}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <div>
              <h4>{name}</h4>
            </div>
          </div>
        </div>
        <div
          id="sidebar"
          className={
            classNames(
              classes.menuContainer,
              classes.rounded,
              classes.withProfile
            )
          }
        >
          <MainMenu loadTransition={loadTransition} dataMenu={dataMenu} toggleDrawerOpen={toggleDrawerOpen} />
        </div>
      </div>
    );
  }
}

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  dataMenu: PropTypes.array.isRequired
};

SidebarContent.defaultProps = {
  toggleDrawerOpen: () => { },
  loadTransition: () => { }
};

const reducerAuth = 'Auth';

const mapStateToProps = state => ({
  userType: state.getIn([reducerAuth, 'userType']),
});

const SidebarContentMapped = connect(
  mapStateToProps,
)(SidebarContent);

export default withStyles(styles)(SidebarContentMapped);
