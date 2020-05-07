import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DirectEmailForm from './DirectEmailForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './email-jss';

class ComposeEmail extends React.Component {
  render() {
    const {
      open,
      closeForm,
    } = this.props;
    const branch = '';
    return (
      <div>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Compose Email"
          extraSize
        >
          <DirectEmailForm
            sendEmail={this.props.sendEmail}
            closeForm={closeForm}
          />
        </FloatingPanel>
      </div>
    );
  }
}

ComposeEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired
};

export default withStyles(styles)(ComposeEmail);
