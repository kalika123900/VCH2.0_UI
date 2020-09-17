import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import { setNotif } from 'dan-actions/NotifActions';

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
    fontWeight: 600,
    '& svg': {
      verticalAlign: 'middle'
    }
  },
  bgSuccess: {
    background: '#81c784'
  },
  bgWarning: {
    background: '#ffb74d'
  },
  bgError: {
    background: '#e57373'
  },
  bgInfo: {
    background: '#64b5f6'
  }
});

class NotifMessage extends React.Component {
  handleClose = (event, reason) => {
    const { setNotif } = this.props;
    if (reason === 'clickaway')
      return;

    setNotif({ message: '', variant: '' });
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
          className={classes[contentStyle[variant]]}
          aria-describedby="client-snackbar"
          message={(
            <span id="client-snackbar"
              className={classes.message}
            >
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
  setNotif: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  vertical: PropTypes.string.isRequired,
  horizontal: PropTypes.string.isRequired,
};

const reducer = 'notification';

const mapStateToProps = state => ({
  message: state.getIn([reducer, 'message']),
  variant: state.getIn([reducer, 'variant']),
  vertical: state.getIn([reducer, 'vertical']),
  horizontal: state.getIn([reducer, 'horizontal'])
});

const mapDispatchToProps = dispatch => ({
  setNotif: bindActionCreators(setNotif, dispatch)
});

const NotifMessageMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotifMessage);

export default withStyles(styles)(NotifMessageMapped);
