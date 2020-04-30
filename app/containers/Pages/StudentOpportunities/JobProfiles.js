import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../components/Profile/profile-jss';
import Grid from '@material-ui/core/Grid';
import ClientCard from '../../../components/CardPaper/ClientCard';
import { JobFilter } from 'dan-components';
import Button from '@material-ui/core/Button';

const customStyles = {
  root: {
    display: 'block'
  }
}

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
}

class JobProfiles extends React.Component {
  state = {
    showFilter: false,
    btnText: " Show Filter",
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
    const { datas } = this.state;
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
          {this.state.showFilter && <JobFilter />}
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          justify="center"
          direction="row"
          spacing={3}
          style={{ marginTop: 20 }}
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
                  btnText="See Opportunities"
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}


JobProfiles.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(customStyles, styles)(JobProfiles);
