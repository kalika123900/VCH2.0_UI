import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import styles from '../Forms/user-jss';

class InvitePopup extends React.Component {
  render() {
    const { open, handleClose, message, handleShareFacebook, handleShareLinkedIn } = this.props;

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
            <DialogTitle id="form-dialog-title">Refer a friend to view your recomended</DialogTitle>
            <DialogContent style={{ width: '100%', fontSize: '23px' }}>
              {message}

            </DialogContent>
            <input type='text' value='https://app.varsitycareershub.co.uk/student-signup?invitation=' readOnly style={{ width: '70%', textAlign: 'center', alignSelf: 'center', padding: '7px', margin: '20px' }} />
            <DialogActions>

              <Button variant="contained" color="primary" style={{ alignSelf: 'left', padding: '5px !important', marginBottom: '20px' }} onClick={() => handleShareFacebook()} >
                <FacebookIcon /> Share on Facebook
              </Button>

              <Button variant="contained" style={{ alignSelf: 'right', padding: '5px !important', marginBottom: '20px' }} onClick={() => handleShareLinkedIn()} color="primary">
                <LinkedInIcon /> Share on LinkedIn
              </Button>

            </DialogActions>



          </Dialog>
        </Grid>
      </div>
    );
  }
}
InvitePopup.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

InvitePopup.defaultProps = {
  message: 'Share this link with a friend, as soon as they sign up you will get access to your recomended list!'
}

export default withStyles(styles)(InvitePopup);
