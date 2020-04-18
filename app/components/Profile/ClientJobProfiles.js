import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import datas from 'dan-api/apps/ClientData';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import ClientCard from '../CardPaper/ClientCard';
import styles from './profile-jss';

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
}

class ClientProfiles extends React.Component {
  state = {
    datas: []
  }

  componentDidMount() {
    getData(`${API_URL}/student/get-jobs`) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ datas: res.data })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { classes } = this.props;
    const { datas } = this.state;

    return (
      <Grid
        container
        alignItems="flex-start"
        justify="space-between"
        direction="row"
        spacing={2}
        className={classes.root}
      >
        {
          datas.map((data, index) => (
            <Grid item md={3} sm={6} xs={12} key={index.toString()} >
              <ClientCard
                data={data}
                id={data.id}
                cover={imgApi[0]}
                avatar={(data.logo == '' || data.logo == null) ? avatarApi[0] : data.logo}
                name={data.name}
                role={data.role_name}
                roleDesc={data.role_descriptors}
                isVerified={data.verified}
                btnText="See Details"
              />
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

ClientProfiles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientProfiles);
