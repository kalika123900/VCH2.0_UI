import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import {
  Header,
  Sidebar
} from 'dan-components';
import menu from 'dan-api/ui/menu';
import studentMenu from 'dan-api/ui/studentMenu';
import clientMenu from 'dan-api/ui/clientMenu';
import adminMenu from 'dan-api/ui/adminMenu';
import Decoration from '../Decoration';
import styles from '../appStyles-jss';

const dataMenu = {
  '': menu,
  'STUDENT': studentMenu,
  'CLIENT': clientMenu,
  'ADMIN': adminMenu
};

class LeftSidebarLayout extends React.Component {
  render() {
    const {
      classes,
      children,
      toggleDrawer,
      sidebarOpen,
      loadTransition,
      pageLoaded,
      mode,
      gradient,
      deco,
      bgPosition,
      userType
    } = this.props;
    return (
      <Fragment>
        <Header
          toggleDrawerOpen={toggleDrawer}
          dataMenu={dataMenu[userType]}
          gradient={gradient}
          mode={mode}
        />
        <Sidebar
          open={sidebarOpen}
          toggleDrawerOpen={toggleDrawer}
          loadTransition={loadTransition}
          dataMenu={dataMenu[userType]}
        />
        <main className={classNames(classes.content)} id="mainContent">
          <Decoration
            mode={mode}
            gradient={gradient}
            decoration={deco}
            bgPosition={bgPosition}
            horizontalMenu={false}
          />
          <section className={classNames(classes.mainWrap, classes.sidebarLayout)}>
            {!pageLoaded && (<img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />)}
            <Fade
              in={pageLoaded}
              mountOnEnter
              unmountOnExit
              {...(pageLoaded ? { timeout: 700 } : {})}
            >
              <div className={!pageLoaded ? classes.hideApp : ''}>
                {/* Application content will load here */}
                {children}
              </div>
            </Fade>
          </section>
        </main>
      </Fragment>
    );
  }
}

LeftSidebarLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired
};

const reducerAuth = 'Auth';

const mapStateToProps = state => ({
  userType: state.getIn([reducerAuth, 'userType'])
});

const LeftSidebarLayoutMapped = connect(
  mapStateToProps
)(LeftSidebarLayout);

export default (withStyles(styles)(LeftSidebarLayoutMapped));
