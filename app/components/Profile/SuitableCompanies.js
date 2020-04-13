import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
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

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
}

class SuitableCompanies extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    getData(`${API_URL}/student/top-companies`)
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
      <ListItem button key={item.id}>
        <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>{item.name[0]}</Avatar>
        <ListItemText primary={item.name} />
      </ListItem>
    ));

    return (
      <PapperBlock title="Suitable Companies" icon="ios-contacts-outline" whiteBg desc="">
        <List dense className={classes.profileList}>
          {companies}
        </List>
        <Divider className={classes.divider} />
        {/* <Grid container justify="center">
          <Button color="secondary" className={classes.button}>
            See All
          </Button>
        </Grid> */}
      </PapperBlock>
    );
  }
}

SuitableCompanies.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SuitableCompanies);
