import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { toggleAction, openAction, playTransitionAction } from 'dan-actions/UiActions';
import LeftSidebarLayout from './layouts/LeftSidebarLayout';
import styles from './appStyles-jss';

class Dashboard extends React.Component {
  componentDidMount = () => {
    const { history, initialOpen, loadTransition } = this.props;

    // Set expanded sidebar menu
    const currentPath = history.location.pathname;
    initialOpen(currentPath);
    // Play page transition
    loadTransition(true);

    // Execute all arguments when page changes
    this.unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        loadTransition(true);
      }, 500);
    });
  }

  render() {
    const {
      classes,
      children,
      toggleDrawer,
      sidebarOpen,
      loadTransition,
      pageLoaded,
      mode,
      history,
      gradient,
      deco,
      bgPosition
    } = this.props;
    return (
      <div
        className={
          classNames(
            classes.appFrameInner,
            classes.sideNav,
            mode === 'dark' ? 'dark-mode' : 'light-mode'
          )
        }
      >
        <LeftSidebarLayout
          history={history}
          toggleDrawer={toggleDrawer}
          loadTransition={loadTransition}
          sidebarOpen={sidebarOpen}
          pageLoaded={pageLoaded}
          mode={mode}
          gradient={gradient}
          deco={deco}
          bgPosition={bgPosition}
        >
          {children}
        </LeftSidebarLayout>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  initialOpen: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired
};

const reducer = 'ui';
const mapStateToProps = state => ({
  sidebarOpen: state.getIn([reducer, 'sidebarOpen']),
  pageLoaded: state.getIn([reducer, 'pageLoaded']),
  mode: state.getIn([reducer, 'type']),
  gradient: state.getIn([reducer, 'gradient']),
  deco: state.getIn([reducer, 'decoration']),
  bgPosition: state.getIn([reducer, 'bgPosition']),
  ...state,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleAction),
  initialOpen: bindActionCreators(openAction, dispatch),
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
});

const DashboardMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default (withStyles(styles)(DashboardMaped));
