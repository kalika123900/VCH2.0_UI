import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { storeStep2Info } from 'dan-actions/CampaignActions';
import styles from './step-jss';
import AddRole from '../AddRole';
import { makeSecureDecrypt } from '../../../Helpers/security';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });

  return await response.json();
}

class Step2 extends React.Component {
  state = {
    open: false,
    roleData: []
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      client_id: user.id
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

  handleRole = (id) => {
    const { addInfo } = this.props;
    addInfo({ role: id });
  };

  handleOpen = () => {
    let value = !this.state.open;
    this.setState({ open: value });
  };

  render() {
    const { classes, role } = this.props;
    const { open, roleData } = this.state;
    return (
      <Fragment>
        {roleData.length > 0 ?
          roleData.map((value) => (
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
                onClick={() => this.handleRole(value.id)}
              >
                {value.role_name}
              </Typography>
            </Grid>
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
              handleClose={this.handleOpen}
            />
          )
        }
      </Fragment >
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired,
  role: PropTypes.number.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  role: state.getIn([reducerCampaign, 'role'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep2Info, dispatch)
});

const Step2Mapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2);

export default withStyles(styles)(Step2Mapped);
