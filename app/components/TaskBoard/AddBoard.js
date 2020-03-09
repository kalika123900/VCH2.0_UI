import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import FloatingPanel from '../Panel/FloatingPanel';
import AddBoardForm from './AddBoardForm';
import styles from './taskBoard-jss.js';

class AddEvent extends React.Component {
  showResult(values) {
    setTimeout(() => {
      this.props.submit(values); // eslint-disable-line
    }, 500); // simulate server latency
  }

  render() {
    const {
      classes,
      openForm,
      closeForm,
      addEvent
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Add New Board">
          <Fab color="secondary" onClick={() => addEvent()} className={classes.addBtn}>
            <Add />
          </Fab>
        </Tooltip>
        <FloatingPanel title="Add New Board" openForm={openForm} branch={branch} closeForm={() => closeForm()}>
          <AddBoardForm onSubmit={(values) => this.showResult(values)} />
        </FloatingPanel>
      </div>
    );
  }
}

AddEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  addEvent: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddEvent);
