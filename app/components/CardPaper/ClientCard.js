import React, { Fragment } from 'react';
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
import Divider from '@material-ui/core/Divider';
import styles from './cardStyle-jss';
import { CombineStyles } from 'dan-helpers';
import { Redirect } from 'react-router-dom';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';

const customStyles = {
  customBottomNavLabel: {
    fontSize: '0.60rem',
    '& span': {
      fontSize: '0.60rem'
    }
  }
}

const combinedStyles = CombineStyles(customStyles, styles);

class ClientCard extends React.Component {
  state = {
    redirect: false,
  }
  setRedirect = () => {
    this.setState({
      redirect: true,
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/student/opportunities/job-profile' />
    }
  }
  render() {
    const {
      classes,
      cover,
      avatar,
      name,
      role,
      roleDesc,
      isVerified,
      btnText,
    } = this.props;

    return (
      <Fragment>
        {this.renderRedirect()}
        <Card className={classes.cardSocmed}>
          <CardMedia
            className={classes.mediaProfile}
            image={cover}
            title="cover"
          />
          <CardContent className={classes.contentProfile}>
            <Avatar alt="avatar" src={avatar} className={classes.avatarBig} />
            <Typography variant="h6" className={classes.name} gutterBottom>
              {name}
              {isVerified && <VerifiedUser className={classes.verified} />}
            </Typography>
            <Typography color="secondary" className={classes.subheading} gutterBottom>
              <WorkOutlineOutlinedIcon style={{ marginRight: "10px", paddingBottom: "2px" }} />
              <span >{role}</span>
            </Typography>
            <Typography color="textSecondary" variant="body2" className={classes.subheading} gutterBottom>
              <span className={Type.regular}>{roleDesc}</span>
            </Typography>
            <Button className={classes.buttonProfile}
              size="small" variant="outlined"
              color="primary"
              style={{ margin: "10px" }}
              onClick={this.setRedirect}
            >
              {btnText}
            </Button>
          </CardContent>
          <Divider />
        </Card>
      </Fragment>
    );
  }
}

ClientCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cover: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  roleDesc: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  isVerified: PropTypes.bool
};

ClientCard.defaultProps = {
  isVerified: false
};

export default withStyles(combinedStyles)(ClientCard);
