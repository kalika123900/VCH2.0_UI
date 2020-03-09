import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { withStyles } from '@material-ui/core/styles';
import link from 'dan-api/ui/link';
import styles from './landingStyle-jss';

function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <ParallaxProvider>
      <div className={classes.bannerParallaxWrap}>
        <Parallax
          offsetYMax={10}
          offsetYMin={-60}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.lineBanner1)} />
        </Parallax>
        <Parallax
          offsetYMax={15}
          offsetYMin={-50}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.lineBanner2)} />
        </Parallax>
        <Parallax
          offsetYMax={70}
          offsetYMin={-1}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.petalBanner1)} />
        </Parallax>
        <Parallax
          offsetYMax={60}
          offsetYMin={-30}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.petalBanner2)} />
        </Parallax>
      </div>
    </ParallaxProvider>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

class Banner extends React.Component {
  render() {
    const { classes, gradient, slideMode } = this.props;
    return (
      <div
        className={
          classNames(
            classes.banner,
            gradient ? classes.gradient : classes.solid,
            slideMode ? classes.out : classes.fit
          )
        }
      >
        {!slideMode && <ParallaxDecoStyled />}
        <div className={!slideMode ? classes.container : ''}>
          <Typography component="h2" variant="h2" gutterBottom>Dandelion Pro</Typography>
          <Typography component="p" variant="h5" gutterBottom>A React.js Website Template </Typography>
          <div className={classes.btnArea}>
            <Button
              size="large"
              variant="outlined"
              className={classNames(classes.button, classes.btnLight)}
              href={link.buy}
              target="_blank"
            >
              Buy Now
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to="/client"
            >
              See Demo
            </Button>
          </div>
          <div className={classes.previewApp}>
            <Hidden smDown>
              <div className={classNames(classes.m2, classes.screen, slideMode ? classes.bottom : '')}>
                <img src="/images/screen/crypto.jpg" alt="crm dashboard" />
              </div>
            </Hidden>
            <div className={classNames(classes.m1, classes.screen)}>
              <img src="/images/screen/personal.jpg" alt="personal dashboard" />
            </div>
            <Hidden smDown>
              <div className={classNames(classes.m3, classes.screen, slideMode ? classes.bottom : '')}>
                <img src="/images/screen/crm.jpg" alt="crypto dashboard" />
              </div>
            </Hidden>
          </div>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
  gradient: PropTypes.bool.isRequired,
  slideMode: PropTypes.bool
};

Banner.defaultProps = {
  slideMode: false
};

const reducer = 'ui';
const mapStateToProps = state => ({
  gradient: state.getIn([reducer, 'gradient']),
});

const BannerMaped = connect(
  mapStateToProps,
)(Banner);

export default (withStyles(styles)(BannerMaped));
