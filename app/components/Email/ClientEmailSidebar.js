import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import ClientEmailMenu from './ClientEmailMenu';
import styles from './email-jss';

class EmailSidebar extends React.Component {
  render() {
    const {
      classes,
      compose,
      goto,
      selected,
      handleDrawerToggle,
      mobileOpen
    } = this.props;
    return (
      <Fragment>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <ClientEmailMenu compose={compose} goto={goto} onClose={handleDrawerToggle} selected={selected} />
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            className={classes.sidebar}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <ClientEmailMenu compose={compose} goto={goto} selected={selected} />
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

EmailSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  compose: PropTypes.func.isRequired,
  goto: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(EmailSidebar);
