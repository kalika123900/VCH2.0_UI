import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import styles from './user-jss';
import NewRoleForm from './NewRoleForm';

class AddRole extends React.Component {
  sendValues = (values) => {
    const { submit } = this.props;
    setTimeout(() => {
      submit(values);
    }, 100);
  }

  render() {
    const { open, handleClose } = this.props;

    return (
      <div>
        <Grid container justify="center" direction="column">
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Create New Role</DialogTitle>
            <DialogContent style={{ width: '100%' }}>
              <FormControl style={{ width: '100%' }}>
                <NewRoleForm handleClose={handleClose} onSubmit={this.sendValues} />
              </FormControl>
            </DialogContent>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

AddRole.propTypes = {
  classes: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddRole);
