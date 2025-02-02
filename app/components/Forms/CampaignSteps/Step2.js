import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { storeStep2Info } from 'dan-actions/CampaignActions';
import styles from './step-jss';
import AddRole from '../AddRole';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeSecureDecrypt } from '../../../Helpers/security';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

class Step2 extends React.Component {
  state = {
    open: false,
    didUpdate: false,
    roleData: [],
    usedRoleData: []
  }

  newRoleFetch = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
    };

    postData(`${API_URL}/client/fetch-role`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ roleData: res.data });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  fetchRoles = () => {
    const { userType } = this.props;
    if (userType == "CLIENT") {
      const user = JSON.parse(
        makeSecureDecrypt(localStorage.getItem('user'))
      );

      const data = {
        company_id: user.cId,
      };

      postData(`${API_URL}/client/fetch-role`, data)
        .then((res) => {
          if (res.status === 1) {
            postData(`${API_URL}/client/fetch-used-role`, data)
              .then((result) => {
                if (result.status === 1) {
                  this.setState({ usedRoleData: result.data, roleData: res.data });
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  componentDidMount() {
    this.fetchRoles();
  }

  removeRole = (id) => {
    const data = {
      role_id: id,
    };

    postData(`${API_URL}/client/remove-role`, data)
      .then((res) => {
        if (res.status === 1) {
          this.fetchRoles();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleRole = (id, name, roleDate) => {
    const { addInfo } = this.props;

    let roleDeadline = new Date(roleDate);
    const year = roleDeadline.getFullYear();
    let date = roleDeadline.getDate();
    let month = roleDeadline.getMonth();

    if (date < 10) {
      date = '0' + date;
    }
    if (month < 9) {
      month = '0' + (month + 1);
    } else {
      month += 1;
    }
    const dateMonthYear = year + '-' + (month) + '-' + date;
    addInfo({ role: id, roleName: name, roleDeadline: dateMonthYear });
  };

  handleOpen = () => {
    let value = !this.state.open;
    this.setState({ open: value });
  };

  render() {
    const { classes, role, userType } = this.props;
    const { open, roleData, usedRoleData } = this.state;
    let reduxRoleData = null;
    if (userType == "ADMIN") {
      reduxRoleData = this.props.roleData.toJS();
    }

    return (
      userType == "ADMIN" ? (
        <Fragment>
          {reduxRoleData.length > 0
            ? (reduxRoleData.map((value) => (
              <Grid
                className={classes.gridMargin}
                key={value.id}
              >
                <Typography
                  className={role === value.id
                    ? (classes.activeBoarder)
                    : null
                  }
                  variant="body1"
                  style={{ cursor: 'pointer' }}
                >
                  {value.role_name}
                </Typography>
              </Grid>
            )))
            : (

              <Typography
                variant="caption"
                color="error"
                style={{
                  padding: 20
                }}
              >
                It looks like Client haven't added any roles
              </Typography>
            )
          }
        </Fragment>
      ) : (
          <Fragment>
            {
              roleData.length > 0 ?
                roleData.map((value) => (
                  (usedRoleData.indexOf(value.id) === -1)
                    ? (
                      <Fragment>
                        <Grid
                          className={classes.gridMargin}
                          key={value.id}
                        >
                          <Typography
                            className={role === value.id
                              ? (classes.activeBoarder)
                              : null
                            }
                            variant="body1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.handleRole(value.id, value.role_name, value.role_deadline)}
                          >
                            {value.role_name}
                            {role == value.id &&
                              <Button onClick={e => this.removeRole(value.id)} >
                                <DeleteIcon />
                              </Button>
                            }
                          </Typography>
                        </Grid>
                      </Fragment>
                    )
                    : (
                      <Grid
                        className={classes.gridMargin}
                        key={value.id}
                      >
                        <Typography
                          className={role === value.id
                            ? (classes.activeBoarder)
                            : null
                          }
                          variant="body1"
                          style={{ cursor: 'pointer' }}
                        // onClick={() => this.handleRole(value.id)}
                        >
                          {value.role_name}
                        </Typography>
                        <Typography variant="caption" color="error">(Role already in use)</Typography>
                      </Grid>
                    )
                ))
                :
                <Typography
                  variant="caption"
                  color="error"
                  style={{
                    padding: 20
                  }}
                >
                  It looks like you haven't added any roles yet
                </Typography>
            }
            <Divider />
            {
              open === false
              && (
                <Button
                  color="secondary"
                  onClick={(e) => this.handleOpen()}
                >
                  Create New Role
                </Button>
              )
            }
            {
              open
              && (
                <AddRole
                  open={open}
                  onSuccess={this.newRoleFetch}
                  handleClose={this.handleOpen}
                />
              )
            }
          </Fragment>
        )
    )
  }
}

Step2.propTypes = {
  classes: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired,
  role: PropTypes.number.isRequired,
  roleData: PropTypes.object.isRequired,
  roleDeadline: PropTypes.string.isRequired
};

const reducerCampaign = 'campaign';
const reducerA = 'Auth';

const mapStateToProps = state => ({
  role: state.getIn([reducerCampaign, 'role']),
  userType: state.getIn([reducerA, 'userType']),
  roleData: state.getIn([reducerCampaign, 'roleData']),
  roleDeadline: state.getIn([reducerCampaign, 'roleDeadline']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep2Info, dispatch)
});

const Step2Mapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2);

export default withStyles(styles)(Step2Mapped);
