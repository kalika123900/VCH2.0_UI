import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import logo from 'dan-images/logo.png';
import brand from 'dan-api/dummy/brand';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import DropListMenu from './DropListMenu';
import styles from './header-jss';

class Header extends React.Component {
  state = {
    open: false
  };

  render() {
    const {
      classes,
      toggleDrawerOpen,
      gradient,
      mode,
      dataMenu,
      userType
    } = this.props;
    const { open } = this.state;

    return (
      <AppBar
        className={
          classNames(
            classes.appBar,
            classes.floatingBar,
            classes.left,
            mode === 'dark' && classes.darker,
            gradient ? classes.gradientBg : classes.solidBg
          )
        }
      >
        <Toolbar disableGutters={!open} className={classes.dropList}>
          <Hidden lgUp>
            <Fab
              size="small"
              className={classes.menuButton}
              aria-label="Menu"
              onClick={toggleDrawerOpen}
            >
              <MenuIcon />
            </Fab>
            <NavLink to={`/${userType.toLowerCase()}`} className={classes.brand}>
              <img src={logo} alt={brand.name} />
            </NavLink>
          </Hidden>
          <Hidden mdDown>
            <DropListMenu dataMenu={dataMenu} />
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  gradient: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  dataMenu: PropTypes.array.isRequired,
  userType: PropTypes.string.isRequired
};

const reducerAuth = 'Auth';

const mapStateToProps = state => ({
  userType: state.getIn([reducerAuth, 'userType']),
});

const HeaderMapped = connect(
  mapStateToProps,
)(Header);

export default withStyles(styles)(HeaderMapped);
