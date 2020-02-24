import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
  closeRoleAction,
  closeRoleNotifAction
} from 'dan-actions/RoleActions';
import AddRole from '../AddRole';
import styles from './step-jss';

class Step2 extends React.Component {
  componentDidMount() {
    const { fetchRoleData } = this.props;
    fetchRoleData(roleData);
  }

  submitRole = (item) => {
    const { submitRole } = this.props;
    submitRole(item);
  }

  handleChange = (e, id) => {
    this.props.addInfo(id);
  }

  render() {
    const {
      classes, dataRole, closeRoleForm, submitRole, open, addRole, role
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
                onClick={e => this.handleChange(e, value.get('id'))}
              >
                {value.get('role')}
              </Typography>
            </Grid>
          ))
        }
        <Divider />
        {open == false
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
  fetchRoleData: PropTypes.func.isRequired,
  dataRole: PropTypes.object.isRequired,
  role: PropTypes.number.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerRole = 'role';
const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  dataRole: state.getIn([reducerRole, 'roleList']),
  open: state.getIn([reducerRole, 'openFrm']),
  messageNotif: state.getIn([reducerRole, 'notifMsg']),
  role: state.getIn([reducerCampaign, 'role']),
});

const dispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep2Info, dispatch),
  fetchRoleData: bindActionCreators(fetchRoleAction, dispatch),
  submitRole: bindActionCreators(submitRoleAction, dispatch),
  addRole: () => dispatch(addRoleAction),
  closeRoleForm: () => dispatch(closeRoleAction),
  closeRoleNotif: () => dispatch(closeRoleNotifAction),
});

const Step2Mapped = connect(
  mapStateToProps,
  dispatchToProps
)(Step2);

export default withStyles(styles)(Step2Mapped);
