import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocalPhone from '@material-ui/icons/LocalPhone';
import DateRange from '@material-ui/icons/DateRange';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PapperBlock from '../PapperBlock/PapperBlock';
import EmailIcon from '@material-ui/icons/Email';
import styles from './profile-jss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import qs from 'qs';
import { makeSecureDecrypt } from '../../Helpers/security';
import formatDate from '../../Helpers/formatDate';

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
    name: '',
    email: '',
    dob: '',
    phone: ''
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    }
    postData(`${API_URL}/student/get-personal-details`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({
            name: `${res.data.firstname} ${res.data.lastname}`,
            email: res.data.email,
            phone: res.data.phone,
            dob: formatDate(res.data.dob)
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { name, email, phone, dob } = this.state;
    const { classes } = this.props;

    return (
      <PapperBlock title="Account Summary" icon="ios-contact-outline" whiteBg noMargin desc="">
        <List dense className={classes.profileList}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Name" secondary={name} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DateRange />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Born" secondary={dob} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocalPhone />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Phone" secondary={phone} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EmailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
        </List>
      </PapperBlock>
    );
  }
}

StudentSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentSummary);
