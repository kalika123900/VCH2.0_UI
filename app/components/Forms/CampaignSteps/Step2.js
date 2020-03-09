import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import roleData from 'dan-api/apps/roleData';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { storeStep2Info } from 'dan-actions/CampaignActions';
import {
  fetchRoleAction,
  addRoleAction,
  submitRoleAction,
  closeRoleAction
} from 'dan-actions/RoleActions';
import styles from './step-jss';
import AddRole from '../AddRole';

class Step2 extends React.Component {
  componentDidMount() {
    const { fetchRoleData } = this.props;
    fetchRoleData(roleData);
  }

  submitRole = (item) => {
    const { submitRole } = this.props;
    submitRole(item);
  };

  handleRole = (id) => {
    const { addInfo } = this.props;
    addInfo(id);
  };

  render() {
    const {
      classes,
      dataRole,
      closeRoleForm,
      submitRole,
      open,
      addRole,
      role
    } = this.props;

    return (
      <Fragment>
        {
          dataRole.map((value) => (
            <Grid
              className={classes.gridMargin}
              key={value.get('id')}
            >
              <Typography
                className={role === value.get('id')
                  ? (classes.activeBoarder)
                  : null
                }
                variant="body1"
                style={{ cursor: 'pointer' }}
                onClick={() => this.handleRole(value.get('id'))}
              >
                {value.get('role')}
              </Typography>
            </Grid>
          ))
        }
        <Divider />
        {open === false
          && (
            <Button
              color="secondary"
              onClick={(e) => addRole(e)}
            >
              Create New Role
            </Button>
          )
        }
        {open
          && (
            <AddRole
              open={open}
              submit={this.submitRole}
              handleClose={closeRoleForm}
              submitRole={submitRole}
            />
          )
        }
      </Fragment>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchRoleData: PropTypes.func.isRequired,
  closeRoleForm: PropTypes.func.isRequired,
  submitRole: PropTypes.func.isRequired,
  addInfo: PropTypes.func.isRequired,
  addRole: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dataRole: PropTypes.object.isRequired,
  role: PropTypes.number.isRequired
};

const reducerRole = 'role';
const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  dataRole: state.getIn([reducerRole, 'roleList']),
  open: state.getIn([reducerRole, 'openFrm']),
  role: state.getIn([reducerCampaign, 'role'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep2Info, dispatch),
  fetchRoleData: bindActionCreators(fetchRoleAction, dispatch),
  submitRole: bindActionCreators(submitRoleAction, dispatch),
  addRole: () => dispatch(addRoleAction),
  closeRoleForm: () => dispatch(closeRoleAction)
});

const Step2Mapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2);

export default withStyles(styles)(Step2Mapped);
