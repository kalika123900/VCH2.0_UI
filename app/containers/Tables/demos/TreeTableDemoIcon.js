import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import openAction from 'dan-actions/TreeTableActions';
import { TreeTable } from 'dan-components';
import data from './dataTreeTable.js';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
});

const branch = 'treeTablePM';

class TreeTableDemoIcon extends Component {
  render() {
    const {
      arrowMore,
      treeOpen,
      classes,
      toggleTree
    } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <TreeTable
            treeOpen={treeOpen}
            toggleTree={toggleTree}
            arrowMore={arrowMore}
            dataTable={data}
            branch={branch}
            expandIcon="ios-add-circle-outline"
            collapseIcon="ios-remove-circle-outline"
          />
        </div>
      </div>
    );
  }
}

TreeTableDemoIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  treeOpen: PropTypes.object.isRequired,
  arrowMore: PropTypes.object.isRequired,
  toggleTree: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  treeOpen: state.getIn([branch, 'treeOpen']),
  arrowMore: state.getIn([branch, 'arrowMore']),
});

const mapDispatchToProps = dispatch => ({
  toggleTree: bindActionCreators(openAction, dispatch)
});

const TreeTableIconMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeTableDemoIcon);

export default withStyles(styles)(TreeTableIconMapped);
