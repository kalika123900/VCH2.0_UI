import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from '../Forms/user-jss';

class CustomConfirmation extends React.Component {
  render() {
    const { open, handleClose, handleAction, message } = this.props;

    return (
      <div>
        <Grid container justify="center" direction="column">
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            style={{ position: 'absolute' }}
          >
            <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
            <DialogContent style={{ width: '100%' }}>
              {message}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleAction()} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}
CustomConfirmation.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

CustomConfirmation.defaultProps = {
  message: 'Are You sure you want to remove this'
}

export default withStyles(styles)(CustomConfirmation);
