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
import styles from './settings-jss';

class DetailSettings extends React.Component {
  state = {
    checked: ['switch'],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const {
      classes,
    } = this.props;
    const { checked } = this.state;
    return (
      <Grid container justify="center">
        <Grid item md={8} xs={12}>
          <List >
            <ListItem>
              <ListItemText primary="Bi-weekly Emails" secondary="Send me bi-weekly updates about my campaign via email" />
              <ListItemSecondaryAction>
                <Switch
                  onChange={this.handleToggle('switch')}
                  checked={checked.indexOf('switch') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Updates via Text" secondary="Send me updates about my campaign via text " />
              <ListItemSecondaryAction>
                <Switch
                  onChange={this.handleToggle('switch2')}
                  checked={checked.indexOf('switch2') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Share Email Personally" secondary="Share my email with candidates that I message individually" />
              <ListItemSecondaryAction>
                <Switch
                  onChange={this.handleToggle('switch3')}
                  checked={checked.indexOf('switch3') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Email Sharing" secondary="Share my email with candidates that I contact through bulk messages and campaigns " />
              <ListItemSecondaryAction>
                <Switch
                  onChange={this.handleToggle('switch4')}
                  checked={checked.indexOf('switch4') !== -1}
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
