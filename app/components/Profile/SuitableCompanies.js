import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './profile-jss';
import qs from 'qs';
import { makeSecureDecrypt } from '../../Helpers/security';
import { Typography } from '@material-ui/core';
import avatarApi from 'dan-api/images/avatars';

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

class SuitableCompanies extends React.Component {
  state = {
    data: []
  }

  handleRedirect = () => {
    this.props.history.push('/student/opportunities');
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    }

    postData(`${API_URL}/student/suitable-companies`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ data: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    const companies = data.map(item => (
      <ListItem button key={item.id} onClick={this.handleRedirect}>
        <Avatar className={classes.avatar} src={(data.logo != null && data.logo != '') ? data.logo : avatarApi[0]} />
        <ListItemText primary={item.name} secondary={item.email} />
      </ListItem>
    ));

    return (
      <PapperBlock title="Suitable Companies" icon="ios-contacts-outline" whiteBg desc="">
        <List dense className={classes.profileList}>
          {companies.length > 0
            ? companies
            :
            <Grid container justify="center">
              <Typography variant="subtitle1" color="textSecondary">
                Did not find a best match for you :(
              </Typography>
            </Grid>
          }
        </List>
        <Divider className={classes.divider} />
        <Grid container justify="center">
          <Button color="secondary" className={classes.button} onClick={this.handleRedirect}>
            See More
          </Button>
        </Grid>
      </PapperBlock>
    );
  }
}

SuitableCompanies.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(SuitableCompanies));
