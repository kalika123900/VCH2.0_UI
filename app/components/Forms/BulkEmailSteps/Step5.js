import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from 'dan-components/Forms/user-jss';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RecipientStudents from '../../Profile/RecipientStudents';

class Step5 extends React.Component {
  render() {
    const title = brand.name + ' - View Recipients';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <RecipientStudents />
      </div>
    );
  }
}

Step5.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Step5);
