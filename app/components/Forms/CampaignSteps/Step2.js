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

const roleData = []

class Step2 extends React.Component {
  state = {
    open: false
  }

  componentDidMount() {

  }

  submitRole = (data) => {
    console.log(data)
  };

  handleRole = (id) => {
    const { addInfo } = this.props;
    addInfo({ role: id });
  };

  handleOpen = () => {
    let value = !this.state.open;
    this.setState({ open: value });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <Fragment>
        {roleData.length > 0 ?
          roleData.map((value) => (
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
              submit={this.submitRole}
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
