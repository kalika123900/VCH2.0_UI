import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { storeStep1Info } from 'dan-actions/CampaignActions';
import styles from './step-jss';

class Step1 extends React.Component {
  state = {
    goalOption: [
      { id: 1, value: 'Get more people to an event' },
      { id: 2, value: 'Get more applications to a role' },
      { id: 3, value: 'Improve brand image among graduates' }
    ]
  }

  handleChange = (e, item) => {
    this.props.addInfo({
      id: item.id,
      value: item.value
    });
  }

  render() {
    const { classes } = this.props;
    const goal = this.props.goal.toJS();
    const { goalOption } = this.state;
    return (
      <Fragment>
        {
          goalOption.map((item) => (
            <Grid
              className={classes.gridMargin}
              key={item.id}
            >
              <Typography
                className={goal.id == item.id
                  ? (classes.activeBoarder)
                  : null
                }
                variant="body1"
                style={{ cursor: 'pointer' }}
                onClick={e => this.handleChange(e, item)}
              >
                {item.value}
              </Typography>
            </Grid>
          ))
        }
      </Fragment>
    );
  }
}

Step1.propTypes = {
  goal: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  goal: state.getIn([reducerCampaign, 'goal']),
});

const dispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep1Info, dispatch)
});

const Step1Mapped = connect(
  mapStateToProps,
  dispatchToProps
)(Step1);

export default withStyles(styles)(Step1Mapped);
