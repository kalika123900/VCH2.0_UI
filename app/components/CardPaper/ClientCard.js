import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import styles from './cardStyle-jss';
import { CombineStyles } from 'dan-helpers';
import { withRouter } from 'react-router-dom';

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
  handleRedirect = (id) => {
    this.props.history.push(`/student/opportunities/${btoa(id)}`);
  }

  render() {
    const {
      id,
      classes,
      cover,
      avatar,
      name,
      btnText,
      data
    } = this.props;

    return (
      <Fragment>
        <Card className={classes.cardSocmed}>
          <CardMedia
            className={classes.mediaProfile}
            image={cover}
            title="cover"
          />
          <CardContent className={classes.contentProfile} >
            <Avatar alt="avatar" src={avatar} className={classes.avatarBig} />
            <Typography variant="h6" className={classes.name} gutterBottom>
              {name}
            </Typography>
            <Typography color="secondary" className={classes.subheading} gutterBottom>


            </Typography>
            <Typography color="textSecondary" variant="body2" className={classes.subheading} gutterBottom>

            </Typography>
            <Button className={classes.buttonProfile}
              size="small" variant="outlined"
              color="primary"
              style={{ margin: "10px 10px 25px 10px" }}
              onClick={() => this.handleRedirect(id)}
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

export default withStyles(combinedStyles)(withRouter(ClientCard));
