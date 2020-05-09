import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styles from './sidebar-jss';
import SidebarContent from './SidebarContent';

class Sidebar extends React.Component {
  render() {
    const {
      classes,
      open,
      toggleDrawerOpen,
      loadTransition,
      dataMenu
    } = this.props;
    return (
      <Fragment>
        <Hidden lgUp>
          <SwipeableDrawer
            onClose={toggleDrawerOpen}
            onOpen={toggleDrawerOpen}
            open={open}
            anchor="left"
          >
            <div className={classes.swipeDrawerPaper}>
              <SidebarContent
                drawerPaper
                toggleDrawerOpen={toggleDrawerOpen}
                loadTransition={loadTransition}
                dataMenu={dataMenu}
              />
            </div>
          </SwipeableDrawer>
        </Hidden>
      </Fragment>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dataMenu: PropTypes.array.isRequired,
};

export default withStyles(styles)(Sidebar);
