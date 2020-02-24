import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import { withStyles } from '@material-ui/core/styles';
import styles from './jss/cover-jss';

class Cover extends React.Component {
  render() {
    const {
      classes,
      avatar,
      name,
      desc,
      coverImg,
    } = this.props;

    return (
      <div className={classes.customCover, classes.cover} style={{ backgroundImage: `url(${coverImg})` }}>
        <div className={classes.content}>
          <Avatar alt={name} src={avatar} className={classes.avatar} />
          <Typography variant="h4" className={classes.name} gutterBottom>
            {name}
            <VerifiedUser className={classes.verified} />
          </Typography>
          <Typography className={classes.subheading} gutterBottom>
            {desc}
          </Typography>
        </div>
      </div>
    );
  }
}

Cover.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
};

export default withStyles(styles)(Cover);
