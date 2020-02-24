import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import datas from 'dan-api/apps/ClientData';
import ClientCard from '../CardPaper/ClientCard';
import styles from './profile-jss';

class ClientProfiles extends React.Component {
  render() {
    const { classes } = this.props;
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
                cover={data.cover}
                avatar={data.avatar}
                name={data.name}
                role={data.role}
                roleDesc={data.roleDesc}
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
