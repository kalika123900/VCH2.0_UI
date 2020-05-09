import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from 'dan-components/Forms/user-jss';
import Grid from '@material-ui/core/Grid';
import { ClientProfiles, ClientFilter } from 'dan-components';
import Button from '@material-ui/core/Button';

const customStyles = {
  root: {
    display: 'block'
  }
}
class CompanyProfiles extends React.Component {
  state = {
    showFilter: false,
    btnText: " Show Filter",
  }

  handleFilter = () => {
    if (this.state.showFilter) {
      this.setState({ showFilter: false, btnText: "Show Filter" })
    } else {
      this.setState({ showFilter: true, btnText: "Hide Filter" })
    }
  }

  render() {
    const title = brand.name + ' - Explore';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Grid>
          <Button variant="contained" color="primary" onClick={(e) => this.handleFilter(e)}>
            {this.state.btnText}
          </Button>
        </Grid>
        <Grid style={{ width: '100%' }}>
          {this.state.showFilter && <ClientFilter />}
        </Grid>
        <ClientProfiles />
      </div>
    );
  }
}

CompanyProfiles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(customStyles, styles)(CompanyProfiles);
