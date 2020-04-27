import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import styles from '../Forms/user-jss';
import StudentClientView from './StudentClientView';

class StudentProfileDialog extends React.Component {
  render() {
    const {
      classes,
      user_id
    } = this.props;
    const { open, handleClose } = this.props;
    return (
      <div>
        <Grid container justify="center" direction="column" >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
          >
            <StudentClientView user_id={user_id} />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}
StudentProfileDialog.propTypes = {
  classes: PropTypes.object.isRequired,

};
export default withStyles(styles)(StudentProfileDialog);