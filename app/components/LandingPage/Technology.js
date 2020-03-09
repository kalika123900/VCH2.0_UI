import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import reactLogo from 'dan-images/logo/react.png';
import reduxLogo from 'dan-images/logo/redux.png';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import muiLogo from 'dan-images/logo/mui.png';
import routerLogo from 'dan-images/logo/react_router.png';
import webpackLogo from 'dan-images/logo/webpack.png';
import jssLogo from 'dan-images/logo/jss.png';
import Title from './Title';
import styles from './landingStyle-jss';

function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <div className={classes.parallaxWrap}>
      <ParallaxProvider>
        <Parallax
          offsetYMax={180}
          offsetYMin={-200}
          slowerScrollRate
          tag="figure"
        >
          <svg
            fill="#fff"
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide3
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide3.svg#Line-Side3" />
          </svg>
        </Parallax>
        <Parallax
          offsetYMax={100}
          offsetYMin={-200}
          slowerScrollRate
          tag="figure"
        >
          <svg
            fill="#fff"
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide4
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide4.svg#Line-Side4" />
          </svg>
        </Parallax>
      </ParallaxProvider>
    </div>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

class Technology extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <div className={classes.tech}>
        {!slideMode && (<ParallaxDecoStyled />)}
        <div className={slideMode ? classes.fullWidth : classes.container}>
          <Title title="The technologies" desc="Cras convallis lacus orci, tristique tincidunt magna consequat in." align="center" monocolor={slideMode && true} />
          <Grid container className={classes.root} spacing={3}>
            <Grid item sm={4} xs={12}>
              <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                <figure>
                  <img src={reactLogo} alt="react" />
                </figure>
                <Typography variant="h5" className={classes.react}>React.js</Typography>
              </div>
              <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                <figure>
                  <img src={routerLogo} alt="react router" />
                </figure>
                <Typography variant="h5" className={classes.router}>React Router</Typography>
              </div>
            </Grid>
            <Grid item sm={4} xs={12}>
              <div className={classes.centerTech}>
                <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                  <figure>
                    <img src={reduxLogo} alt="redux" />
                  </figure>
                  <Typography variant="h5" className={classes.redux}>Redux.js</Typography>
                </div>
                <Hidden smDown>
                  <Button variant="contained" size="large" color="secondary">Request To Implement Technology</Button>
                </Hidden>
                <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                  <figure>
                    <img src={webpackLogo} alt="webpack" />
                  </figure>
                  <Typography variant="h5" className={classes.webpack}>Webpack</Typography>
                </div>
              </div>
            </Grid>
            <Grid item sm={4} xs={12}>
              <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                <figure>
                  <img src={muiLogo} alt="mui" />
                </figure>
                <Typography variant="h5" className={classes.mui}>Material UI</Typography>
              </div>
              <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                <figure>
                  <img src={jssLogo} alt="jss" />
                </figure>
                <Typography variant="h5" className={classes.jss}>CSS in JS</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Technology.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

Technology.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Technology);
