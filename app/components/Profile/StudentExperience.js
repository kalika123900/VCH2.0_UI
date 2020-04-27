import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PapperBlock from '../PapperBlock/PapperBlock';
import Typography from '@material-ui/core/Typography';
import styles from './profile-jss';
import Grid from '@material-ui/core/Grid';
import BusinessIcon from '@material-ui/icons/Business';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import qs from 'qs';
import formatDate from 'dan-helpers/formatDate';
import { makeSecureDecrypt } from '../../Helpers/security';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });
  return await response.json();
}

class StudentSummary extends React.Component {
  state = {
    experience: []
  }

  handleRedirect = () => {
    this.props.history.push(`/student/edit-details?tab=${btoa(4)}`)
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    }

    postData(`${API_URL}/student/get-experience`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ experience: res.data })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    const JSX = this.state.experience.map((item, index) => {
      return <ListItem key={index.toString()}>
        <ListItemAvatar>
          <Avatar className={classNames(classes.avatar)}>
            <BusinessIcon />
          </Avatar>
        </ListItemAvatar>
        <Grid>
          <Typography variant="h6" display="inline">{item.company}</Typography>
          <Grid>
            <ListItemText primary={item.role} secondary={`From ${formatDate(item.from)} To ${formatDate(item.to)}`} />
          </Grid >
        </Grid>
      </ListItem>
    });

    return (
      <PapperBlock title="Experience" icon="ios-aperture-outline" whiteBg desc="">
        <Grid style={{ textAlign: "right" }}>
          <Button color="primary" onClick={this.handleRedirect}><EditIcon />Edit</Button>
        </Grid>
        <Grid container className={classes.colList}>
          {JSX}
        </Grid>
      </PapperBlock>
    );
  }
}

StudentSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(StudentSummary));
