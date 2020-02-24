import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import styles from './user-jss';
import EditClientForm from './EditClientForm';

class EditClientDialog extends React.Component {
  render() {
    const {
      classes
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
            <DialogTitle id="form-dialog-title">Edit Client Details</DialogTitle>
            <DialogContent style={{ 'width': '100%' }}  >
              <FormControl style={{ 'width': '100%' }} >
                <EditClientForm />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}
EditClientDialog.propTypes = {
  classes: PropTypes.object.isRequired,

};
export default withStyles(styles)(EditClientDialog);