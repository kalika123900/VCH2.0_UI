import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import BulkEmailForm from './BulkEmailForm';
import styles from './user-jss';
import Step1 from './CampaignSteps/Step1';
import Grid from '@material-ui/core/Grid';

class CreateBulkEmail extends React.Component {
  state = {
    tab: 0,
  };

  handleChangeTab = (e, value) => {
    this.setState({ tab: value });
  };

  render() {
    const {
      classes,
      pristine,
      submitting,
      deco
    } = this.props;
    const { tab } = this.state;
    return (
      <Paper className={classNames(classes.fullWrap, deco && classes.petal)}>
        {tab === 0 && (
          <Grid>
            <Grid >
              <Typography variant="h4" className={classes.title} gutterBottom>
                What's your main advertising goal?
              </Typography>
              <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
                Ads that focus on a specific goal help you get the results that you want
              </Typography>
            </Grid>
            <section className={classes.pageFormWrap}>
              <form >
                <Grid>
                  <FormControl className={classes.formControl}>
                    <Step1 />
                  </FormControl>
                </Grid>
                <Grid className={classes.btnArea}>
                  <Button variant="contained" fullWidth color="primary" onClick={(e) => this.handleChangeTab(e, 1)}>
                    Next
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                  </Button>
                </Grid>
              </form>
            </section>
          </Grid>
        )}
        {tab === 1 && (
          <Fragment>
            <BulkEmailForm />
          </Fragment>
        )}
      </Paper>
    );
  }
}

CreateBulkEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const CreateBulkEmailReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(CreateBulkEmail);

const reducer = 'ui';
const CreateBulkEmailMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(CreateBulkEmailReduxed);

export default withStyles(styles)(CreateBulkEmailMapped);
