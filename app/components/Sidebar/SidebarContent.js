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

class SidebarContent extends React.Component {
  state = {
    transform: 0,
  };

  componentDidMount = () => {
    // Scroll content to top
    const mainContent = document.getElementById('sidebar');
    mainContent.addEventListener('scroll', this.handleScroll);
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
    const { transform } = this.state;

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
              alt={dummy.user.name}
              src={dummy.user.avatar}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <div>
              <h4>{dummy.user.name}</h4>
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
