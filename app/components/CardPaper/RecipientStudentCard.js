import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Type from 'dan-styles/Typography.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import SchoolOutlined from '@material-ui/icons/SchoolOutlined';
import styles from './cardStyle-jss';

class RecipientStudentCard extends React.Component {
  render() {
    const {
      classes,
      cover,
      avatar,
      name,
      title,
      isVerified,
      btnText,
      university
    } = this.props;

    return (
      <Card className={classes.cardSocmed}>

        <CardMedia
          className={classes.mediaProfile}
          image={cover}
          title="cover"
        ></CardMedia>
        <CardContent className={classes.contentProfile}>
          <Avatar alt="avatar" src={avatar} className={classes.avatarBig} />
          <Typography variant="h6" className={classes.name} gutterBottom>
            {name}
            {isVerified && <VerifiedUser className={classes.verified} />}
          </Typography>
          <Typography className={classes.subheading} gutterBottom>
            <span className={Type.regular}>{title}</span>
          </Typography>
          <Typography variant='subtitle1' className={classes.subheading} gutterBottom>
            <SchoolOutlined /> {university}
          </Typography>
          <Button className={classes.buttonProfile} size="small" variant="outlined" color="primary" style={{ margin: "10px" }}>
            {btnText}
          </Button>
        </CardContent>

      </Card>
    );
  }
}

RecipientStudentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cover: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  isVerified: PropTypes.bool
};

RecipientStudentCard.defaultProps = {
  isVerified: false
};

export default withStyles(styles)(RecipientStudentCard);
