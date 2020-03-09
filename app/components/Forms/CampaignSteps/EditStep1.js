import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './step-jss';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';

const Step2 = (props) => {
  const { classes, roles } = props;
  const [check, set_check] = useState({
    check_icon_1: null,
    BorderCss_1: '2px solid #1eaf00'
  })

  const GetMeActive = (remark) => {
    if (remark === 1) {
      set_check({
        check_icon_1: null,
        BorderCss_1: '2px solid #1eaf00'
      })
    } else if (remark === 2) {
      set_check({
        check_icon_2: null,
        BorderCss_2: '2px solid #1eaf00'
      })
    }
    else if (remark === 3) {
      set_check({
        check_icon_3: null,
        BorderCss_3: '2px solid #1eaf00'
      })
    }
  }

  return <Fragment>
    <Grid
      className={classes.gridMargin}
      style={{ 'border': check.BorderCss_1, 'cursor': 'pointer' }}
      onClick={GetMeActive.bind(this, 1)}
      key="1"
    >
      <Typography className={classes.role} variant="subtitle1">Interns For Machine Learning</Typography>

    </Grid>
    <Grid
      className={classes.gridMargin}
      style={{ 'border': check.BorderCss_2, 'cursor': 'pointer' }}
      onClick={GetMeActive.bind(this, 2)}
      key="2"
    >
      <Typography className={classes.role} variant="subtitle1">Full Stack Software Developer</Typography>
    </Grid>
    <Grid
      className={classes.gridMargin}
      style={{ 'border': check.BorderCss_3, 'cursor': 'pointer' }}
      onClick={GetMeActive.bind(this, 3)}
      key="3"
    >
      <Typography className={classes.role} variant="subtitle1">Data Scientist</Typography>
    </Grid>
    <Typography className={classes.role} variant="subtitle1">{roles}</Typography>
  </Fragment >
}

function mapStateToProps(state) {
  const { roles } = state
  return { roles: roles }
}

export default connect(mapStateToProps)(withStyles(styles)(Step2));