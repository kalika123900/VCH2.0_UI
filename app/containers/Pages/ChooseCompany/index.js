import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeSecureEncrypt } from 'dan-helpers/security';


class SimpleDialog extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.location.search) {
      var response = this.props.location.search.split('?')
      if (response.length == 2) {
        var res = JSON.parse(atob(response[1]))
        this.state = {
          open: true,
          companies: res.companies,
          id: res.id,
          name: res.name,
          email: res.email,
          role: res.role,
          username: res.username,
          phone: res.phone,
          managerType: res.type,
          token: res.token,
          type: 'CLIENT',
          mode: 'light',
          theme: 'blueTheme',
          via: 'ADMIN'
        }
      }
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleListItemClick = (cId) => {
    localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
      id: this.state.id,
      cId,
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      username: this.state.username,
      phone: this.state.phone,
      managerType: this.state.type,
      token: this.state.token,
      type: this.state.type,
      mode: this.state.mode,
      theme: this.state.theme,
      via: this.state.via
    })));
    window.location.reload();
  };

  render() {
    const { companies, open } = this.state;

    return (
      <Dialog aria-labelledby="simple-dialog-title" open={open} >
        <DialogTitle id="simple-dialog-title">Choose Company</DialogTitle>
        <List>
          {companies.map((item) => (
            <ListItem button onClick={() => this.handleListItemClick(item.id)} key={item.name}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Dialog >
    );
  }
}

export default SimpleDialog
