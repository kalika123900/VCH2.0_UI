import React from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import { makeSecureDecrypt } from 'dan-helpers/security';
import styles from './settings-jss';
import Button from '@material-ui/core/Button';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

class DetailSettings extends React.Component {
  handleToggle = (e) => {
    const { handleIsUpdate } = this.props;
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const value = e._targetInst.stateNode.checked;
    const key = e._targetInst.stateNode.name;

    const data = {
      user_id: user.id,
      type: 'STUDENT',
      key,
      value: value ? '1' : '0'
    };

    postData(`${API_URL}/meta/set-settings`, data)
      .then((res) => {
        if (res.status == 1) {
          handleIsUpdate();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { switchData, classes, handleDelete, handleDeactivate } = this.props;

    return (
      <Grid container justify="center">
        <Grid item md={8} xs={12}>
          <List>
            <ListItem>
              <ListItemText
                primary="Bi-weekly Emails"
                secondary="Send me bi-weekly updates about my relevant opportunities via email"
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="bi-weekly-emails"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('bi-weekly-emails') !== -1}
                />
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Updates via Text"
                secondary="Send me texts about opportunities"
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="updates-via-text"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('updates-via-text') !== -1}
                />
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Email Me"
                secondary="Email me when a client reaches out to me with job invitations"
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="email-me"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('email-me') !== -1}
                />
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Text Me"
                secondary="Text me when a client reaches out to me about job applications "
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="text-me"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('text-me') !== -1}
                />
              </Grid>
            </ListItem>
          </List>
          <Grid >
            {/* <Typography variant="h6" color="error" className={classes.boxHeading}>Danger Zone</Typography> */}
            <List className={classes.listContainer}>
              <ListItem className={classes.listItem}>
                <Grid style={{ margin: '5px 5px 5px 5px' }}>
                  <ListItemText
                    primary="Disable Account"
                    secondary="You can temporary deactivate your account while you login again"
                    style={{ whiteSpace: 'pre-line' }}
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    startIcon={<NotInterestedIcon />}
                    onClick={() => handleDeactivate()}
                  >
                    Disable Account
                  </Button>
                </Grid>
              </ListItem>
              <Divider />
              <ListItem className={classes.listItem}>
                <Grid style={{ margin: '5px 5px 5px 5px' }}>
                  <ListItemText
                    primary="Delete Account"
                    secondary="You can delete your account and remove all your data from a platform"
                    style={{ whiteSpace: 'pre-line' }}
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={{ background: '#c31e1e' }}
                    onClick={() => handleDelete()}
                  >
                    Delete Account
                  </Button>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

DetailSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailSettings);
