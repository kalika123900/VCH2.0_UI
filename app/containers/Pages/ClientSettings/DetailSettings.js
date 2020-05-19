import React from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import qs from 'qs';
import { Notification } from 'dan-components';
import { makeSecureDecrypt } from 'dan-helpers/security';
import styles from './settings-jss';
import { TextField, Typography } from '@material-ui/core';

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
  state = {
    displayName: '',
    message: ''
  }

  handleClose = () => {
    this.setState({ message: '' })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
      display_name: this.state.displayName
    }

    postData(`${API_URL}/client/change-name`, data)
      .then((res) => {
        if (res.status == 1) {
          this.setState({ message: 'Display Name updated' });
          this.getName();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

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

  getName = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
    };

    postData(`${API_URL}/client/client-info`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ displayName: `${res.data.display_name}` });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getName();
  }

  render() {
    const { switchData, classes } = this.props;
    const { displayName } = this.state;

    return (
      <Grid container justify="center">
        <Notification message={this.state.message} close={this.handleClose} />
        <Grid item md={8} xs={12}>
          <List>
            <ListItem>
              <ListItemText
                primary="Bi-weekly Emails"
                secondary="Send me bi-weekly updates about my campaign via email"
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
                secondary="Send me updates about my campaign via text "
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
                primary="Share Email Personally"
                secondary="Share my email with candidates that I message individually"
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="share-email-personally"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('share-email-personally') !== -1}
                />
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Email Sharing"
                secondary="Share my email with candidates that I contact through bulk messages and campaigns "
                style={{ whiteSpace: 'pre-line' }}
              />
              <Grid style={{ marginLeft: 5 }}>
                <Switch
                  name="email-sharing"
                  onChange={(e) => this.handleToggle(e)}
                  checked={switchData.indexOf('email-sharing') !== -1}
                />
              </Grid>
            </ListItem>
          </List>
          <Grid style={{ marginTop: 10 }}>
            <List>
              <ListItem className={classes.listItem}>
                <Grid>
                  <ListItemText
                    primary="Display Name"
                    secondary=" Name that displays on student email inbox "
                    style={{ whiteSpace: 'pre-line' }}
                  />
                </Grid>
                <Grid style={{ marginLeft: 5 }} >
                  <TextField
                    name='displayName'
                    value={displayName}
                    placeholder='Display Name'
                    onChange={this.handleChange}
                  />
                  <Button
                    style={{ marginLeft: 10 }}
                    disabled={displayName.length == 0 ? true : false}
                    onClick={this.handleSubmit}
                  >
                    save
                  </Button>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid >
    );
  }
}

DetailSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailSettings);
