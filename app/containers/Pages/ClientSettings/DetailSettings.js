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
      company_id: user.cId,
      key,
      value: value ? '1' : '0'
    };

    postData(`${API_URL}/client/set-settings`, data)
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
              <ListItemText primary="Bi-weekly Emails" secondary="Send me bi-weekly updates about my campaign via email" />
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
              <ListItemText primary="Updates via Text" secondary="Send me updates about my campaign via text " />
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
              <ListItemText primary="Share Email Personally" secondary="Share my email with candidates that I message individually" />
              <ListItemSecondaryAction>
                <Switch
                  name="share-email-personally"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('share-email-personally') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Email Sharing" secondary="Share my email with candidates that I contact through bulk messages and campaigns " />
              <ListItemSecondaryAction>
                <Switch
                  name="email-sharing"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('email-sharing') !== -1}
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
