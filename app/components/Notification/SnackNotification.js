import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import messageStyles from 'dan-styles/Messages.scss';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';

const variantIcon = {
  success: <CheckCircleIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />
};

const contentStyle = {
  success: 'bgSuccess',
  warning: 'bgWarning',
  error: 'bgError',
  info: 'bgInfo'
};

const styles = theme => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: 0,
  },
  message: {
    fontWeight: 600
  }
});

class NotifMessage extends React.Component {
  handleClose = (event, reason) => {
    const { close } = this.props;
    if (reason === 'clickaway') {
      return;
    }
    close();
  };

  render() {
    const {
      classes, message, variant, vertical, horizontal
    } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical,
          horizontal
        }}
        open={message !== ''}
        autoHideDuration={4000}
        onClose={() => this.handleClose()}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <SnackbarContent
          className={messageStyles[contentStyle[variant]]}
          aria-describedby="client-snackbar"
          message={(
            <span id="client-snackbar" className={classes.message}>
              {variantIcon[variant]}
              &nbsp;
              {message}
            </span>
          )}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={() => this.handleClose()}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

NotifMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
};

NotifMessage.defaultProps = {
  vertical: 'top',
  horizontal: 'right'
};

export default withStyles(styles)(NotifMessage);