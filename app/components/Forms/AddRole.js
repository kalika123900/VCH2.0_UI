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
import { removeRoleInfo } from 'dan-actions/RoleActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeSecureDecrypt } from 'dan-helpers/security';
import { skillMenu } from 'dan-api/apps/profileOption';

function getIds(arr, data) {
  return arr.map(item => {
    return data.indexOf(item);
  })
}

async function postJSON(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

class AddRole extends React.Component {
  sendValues = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const {
      roleName,
      roleLink,
      courses,
      skills,
      roleDeadline,
      roleDescriptors,
      removeInfo,
      handleClose,
      onSuccess
    } = this.props;

    const MapSkills = getIds(skills.toJS(), skillMenu);
    const MapCourses = courses.toJS();
    const MapRoleDescriptors = roleDescriptors.toJS();

    const data = {
      roleName,
      roleLink,
      courses: MapCourses,
      skills: MapSkills,
      roleDescriptors: MapRoleDescriptors,
      roleDeadline,
      company_id: user.cId
    };

    postJSON(`${API_URL}/client/create-role`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          removeInfo();
          handleClose();
          onSuccess();
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                <NewRoleForm
                  handleClose={handleClose}
                  handleSubmit={this.sendValues}
                />
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
  roleName: PropTypes.string.isRequired,
  courses: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  roleDeadline: PropTypes.string.isRequired,
  roleDescriptors: PropTypes.object.isRequired,
  roleLink: PropTypes.string.isRequired
};

const reducerRole = 'role';

const mapStateToProps = state => ({
  roleName: state.getIn([reducerRole, 'roleName']),
  courses: state.getIn([reducerRole, 'courses']),
  skills: state.getIn([reducerRole, 'skills']),
  roleDeadline: state.getIn([reducerRole, 'roleDeadline']),
  roleDescriptors: state.getIn([reducerRole, 'roleDescriptors']),
  roleLink: state.getIn([reducerRole, 'roleLink']),
});

const mapDispatchToProps = dispatch => ({
  removeInfo: bindActionCreators(removeRoleInfo, dispatch)
});

const AddRoleMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRole);

export default withStyles(styles)(AddRoleMapped);

