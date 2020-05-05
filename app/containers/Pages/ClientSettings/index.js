import React from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';
import DetailSettings from './DetailSettings';
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

class Settings extends React.Component {

  state = {
    switchData: []
  }

  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    if (user.cId == null) {
      this.props.history.push('/client/unauthorized');
    }
  }

  handleIsUpdate = () => {
    this.getData();
  }

  getData = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId,
    };

    postData(`${API_URL}/client/get-settings`, data)
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
    const { switchData } = this.state;
    const { classes } = this.props;
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
          <DetailSettings switchData={switchData} handleIsUpdate={this.handleIsUpdate} />
        </Paper>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
