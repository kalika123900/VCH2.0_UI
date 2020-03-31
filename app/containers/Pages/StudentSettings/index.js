import React from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import qs from 'qs';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeSecureDecrypt } from 'dan-helpers/security';
import DetailSettings from './DetailSettings';
import styles from './settings-jss';
import Button from '@material-ui/core/Button';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { removeAuth } from 'dan-actions/AuthActions';

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

class Settings extends React.Component {
  state = {
    switchData: []
  }

  handleIsUpdate = () => {
    this.getData();
  }

  handleDeactivate = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    };

    postData(`${API_URL}/student/disable-account`, data)
      .then((res) => {
        if (res.status == 1) {
          localStorage.removeItem('user');
          this.props.removeAuth();
          this.props.history.push('/');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleDelete = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    };

    postData(`${API_URL}/student/delete-account`, data)
      .then((res) => {
        if (res.status == 1) {
          localStorage.removeItem('user');
          this.props.removeAuth();
          this.props.history.push('/');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getData = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id,
      type: 'STUDENT'
    };

    postData(`${API_URL}/meta/get-settings`, data)
      .then((res) => {
        if (res.status == 1) {
          const temp = [];

          res.data.map(item => {
            if (item.value == '1') {
              temp.push(item.key);
            }
          });

          this.setState({ switchData: temp });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { classes } = this.props;
    const { switchData } = this.state;

    const title = brand.name;
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Paper className={classes.root}>
          <DetailSettings
            switchData={switchData}
            handleIsUpdate={this.handleIsUpdate}
            handleDeactivate={this.handleDeactivate}
            handleDelete={this.handleDelete}
          />
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeAuth: bindActionCreators(removeAuth, dispatch),
});

const SettingsMapped = connect(null,
  mapDispatchToProps,
)(Settings);

export default withStyles(styles)(SettingsMapped);

