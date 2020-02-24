import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import logo from 'dan-images/logo.png';
import brand from 'dan-api/dummy/brand';
import DropListMenu from './DropListMenu';
import styles from './header-jss';
import Grid from '@material-ui/core/Grid';

const elem = document.documentElement;

class Header extends React.Component {
  state = {
    open: false,
    fullScreen: false,
    turnDarker: false,
    showTitle: false
  };

  // Initial header style
  flagDarker = false;

  flagTitle = false;

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = (scroll > 30);
    const newFlagTitle = (scroll > 40);
    if (this.flagDarker !== newFlagDarker) {
      this.setState({ turnDarker: newFlagDarker });
      this.flagDarker = newFlagDarker;
    }
    if (this.flagTitle !== newFlagTitle) {
      this.setState({ showTitle: newFlagTitle });
      this.flagTitle = newFlagTitle;
    }
  }

  openFullScreen = () => {
    this.setState({ fullScreen: true });
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  closeFullScreen = () => {
    this.setState({ fullScreen: false });
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  turnMode = mode => {
    const { changeMode } = this.props;
    if (mode === 'light') {
      changeMode('dark');
    } else {
      changeMode('light');
    }
  };

  render() {
    const {
      classes,
      toggleDrawerOpen,
      position,
      gradient,
      dataMenu,
      baseURI
    } = this.props;
    const {
      open,
      turnDarker,
    } = this.state;

    const setMargin = (sidebarPosition) => {
      if (sidebarPosition === 'right-sidebar') {
        return classes.right;
      }
      if (sidebarPosition === 'left-sidebar-big') {
        return classes.leftBig;
      }
      return classes.left;
    };

    return (
      <AppBar
        className={
          classNames(
            classes.appBar,
            classes.floatingBar,
            classes.headerCustom,
            setMargin(position),
            turnDarker && classes.darker,
            gradient ? classes.gradientBg : classes.solidBg
          )
        }
      >
        <Hidden smDown>
          <NavLink className={classes.logoBlock} to={"/" + baseURI}>
            <img style={{ width: "70px" }} src={logo} alt={brand.name} />
          </NavLink>
          <Grid style={{ padding: '15px' }}>
            <DropListMenu dataMenu={dataMenu} />
          </Grid>
        </Hidden>

        <Hidden smUp>
          <Toolbar disableGutters={!open}>
            <Fab size="small"
              className={classes.menuButton}
              aria-label="Menu"
              onClick={toggleDrawerOpen}
            >
              <MenuIcon />
            </Fab>
            <NavLink to={"/" + baseURI} className={classNames(classes.brand, classes.brandBar)}>
              <img style={{ width: "70px" }} src={logo} alt={brand.name} />
            </NavLink>
          </Toolbar>
        </Hidden>
      </AppBar >
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  margin: PropTypes.bool.isRequired,
  gradient: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  openGuide: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loadTransition: PropTypes.func,
  dataMenu: PropTypes.array.isRequired,
  baseURI: PropTypes.string.isRequired
};

export default withStyles(styles)(Header);
