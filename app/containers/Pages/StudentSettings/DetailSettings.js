import React from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';
import styles from './settings-jss';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
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
      type: 'CLIENT',
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
    const { switchData } = this.props;

    return (
      <Grid container justify="center">
        <Grid item md={8} xs={12}>
          <List>
            <ListItem>
              <ListItemText primary="Bi-weekly Emails" secondary="Send me bi-weekly updates about my relevant opportunities via email" />
              <ListItemSecondaryAction>
                <Switch
                  name="bi-weekly-emails"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('bi-weekly-emails') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Updates via Text" secondary="Send me texts about opportunities" />
              <ListItemSecondaryAction>
                <Switch
                  name="updates-via-text"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('updates-via-text') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Email Me" secondary="Email me when a client reaches out to me with job invitations" />
              <ListItemSecondaryAction>
                <Switch
                  name="email-me"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('email-me') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Text Me" secondary="Text me when a client reaches out to me about job applications " />
              <ListItemSecondaryAction>
                <Switch
                  name="text-me"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('text-me') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }
}

DetailSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailSettings);
