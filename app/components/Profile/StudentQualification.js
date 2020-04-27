import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './profile-jss';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import qs from 'qs';
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
    education: []
  }

  handleRedirect = () => {
    this.props.history.push(`/student/edit-details?tab=${btoa(3)}`)
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    }

    postData(`${API_URL}/student/get-education`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ education: res.data })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    const JSX = this.state.education.map((item, index) => {
      return <ListItem key={index.toString()}>
        <ListItemAvatar>
          <Avatar className={classNames(classes.avatar)}>
            <SchoolIcon />
          </Avatar>
        </ListItemAvatar>
        <Grid>
          <Typography variant="h6" display="inline">{item.subject}</Typography>
          <Typography variant="body2" display="inline" style={{ marginLeft: "5px" }}>{item.type == 'University' ? item.university_name : item.institute_name}</Typography>
          <Grid>
            <Typography variant="body1" display="inline" >Year :</Typography>
            <Typography variant="body2" display="inline" style={{ marginLeft: "5px" }}>{`From ${item.education_from} To ${item.education_to}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="body1" display="inline" >Grade :</Typography>
            <Typography variant="body2" display="inline" style={{ marginLeft: "5px" }}>{item.score}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    });

    return (
      <PapperBlock title="Qualifications" icon="ios-aperture-outline" whiteBg desc="">
        <Grid style={{ textAlign: "right" }}>
          <Button color="primary" onClick={this.handleRedirect}><EditIcon />Edit</Button>
        </Grid>
        <Grid container className={classes.colList}>
          <Grid >
            {JSX}
          </Grid>
        </Grid>
      </PapperBlock>
    );
  }
}

StudentSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(StudentSummary));
