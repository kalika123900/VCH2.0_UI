import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import { makeSecureDecrypt } from 'dan-helpers/security';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../components/Profile/profile-jss';
import Grid from '@material-ui/core/Grid';
import ClientCard from '../../../components/CardPaper/ClientCard';
import { JobFilter } from 'dan-components';
import { Pagination } from 'dan-components';
import Button from '@material-ui/core/Button';
import CircularProgress from 'dan-components/Loading/CircularProgress';
import qs from 'qs';

const customStyles = {
  root: {
    display: 'block'
  }
}

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

async function postJSON(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

class JobProfiles extends React.Component {
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    if (user.email == '' || user.email == undefined || user.email == null) {
      props.history.push('/student/edit-details');
    }
  }

  state = {
    isLoading: false,
    isJob: false,
    isFilter: false,
    btnText: 'Apply Filter',
    page: 1,
    contentsPerPage: 24,
    datas: [],
    jobCount: 1,
    skill: [],
    location: '',
    workType: [],
    interests: []
  }

  handleReset = () => {
    this.setState({
      skill: [],
      location: '',
      workType: [],
      interests: []
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onPageChange = (page) => {
    this.setState({ page });
    this.state.isFilter ? this.getFilterJobs() : this.getJobs();
  }

  onPrev = () => {
    let { page } = this.state;
    if (page > 1) {
      this.setState({ page: page -= 1 });
    } else {
      this.setState({ page: 1 });
    }
    this.state.isFilter ? this.getFilterJobs() : this.getJobs();
  }

  onNext = (totalPages) => {
    let { page } = this.state;
    if (page < totalPages) {
      this.setState({ page: page += 1 });
    } else {
      this.setState({ page: totalPages });
    }
    this.state.isFilter ? this.getFilterJobs() : this.getJobs();
  }

  onGoFirst = () => {
    this.setState({ page: 1 });
    this.state.isFilter ? this.getFilterJobs() : this.getJobs();
  }

  onGoLast = (totalPages) => {
    this.setState({ page: totalPages });
    this.state.isFilter ? this.getFilterJobs() : this.getJobs();
  }

  getFilterJobs = () => {
    this.setState({ isLoading: true })
    const data = {
      offset: ((this.state.page - 1) * this.state.contentsPerPage),
      rows: this.state.contentsPerPage,
      skill: this.state.skill,
      location: this.state.location,
      workType: this.state.workType,
      interests: this.state.interests,
    }

    postJSON(`${API_URL}/student/get-filter-jobs`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ isJob: true, datas: res.data, jobCount: res.data[0].count, isLoading: false })
          }
          else {
            this.setState({ isJob: false, isLoading: false, datas: res.data, jobCount: 1 });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getJobs = () => {
    this.setState({ isLoading: true })
    const data = {
      offset: ((this.state.page - 1) * this.state.contentsPerPage),
      rows: this.state.contentsPerPage
    }

    postData(`${API_URL}/student/get-jobs`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ isJob: true, datas: res.data, jobCount: res.data[0].count, isLoading: false })
          }
          else {
            this.setState({ isLoading: false });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getJobs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page != this.state.page) {
      this.state.isFilter ? this.getFilterJobs() : this.getJobs();
    }
  }

  handleFilter = () => {
    if (this.state.isFilter) {
      this.setState({ isFilter: false, btnText: 'Apply Filter', page: 1 });
      this.handleReset();
      this.getJobs();
    } else {
      this.setState({ isFilter: true, btnText: 'Remove Filter', page: 1 });
    }
  }

  render() {
    const title = brand.name + ' - Explore';
    const description = brand.desc;
    const { classes } = this.props;
    const { page, contentsPerPage, datas, isJob, jobCount, isLoading } = this.state;

    const renderContent = datas.map((data, index) => (
      < Grid item md={3} sm={6} xs={12} key={index.toString()} >
        <ClientCard
          data={data}
          id={data.id}
          cover={imgApi[0]}
          avatar={(data.logo == '' || data.logo == null) ? avatarApi[0] : data.logo}
          name={data.name}
          btnText="See Opportunities"
        />
      </Grid >
    ));

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(jobCount / contentsPerPage); i += 1) {
      pageNumbers.push(i);
    }


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
        <Fragment>
          <Grid>
            <Button variant="contained" color="primary" onClick={(e) => this.handleFilter(e)}>
              {this.state.btnText}
            </Button>
          </Grid>
          <Grid style={{ width: '100%' }}>
            {this.state.isFilter &&
              <JobFilter
                {...this.state}
                handleSubmit={this.getFilterJobs}
                handleChange={this.handleChange}
                handleReset={this.handleReset}
              />}
          </Grid>
        </Fragment>

        {isJob ?
          <Fragment>
            {isLoading ?
              <Grid>
                <CircularProgress />
              </Grid>
              :
              <Fragment>
                <Grid
                  container
                  alignItems="flex-start"
                  justify="center"
                  direction="row"
                  spacing={3}
                  style={{ marginTop: 20 }}
                >
                  {renderContent}
                </Grid>

                <Pagination
                  curpage={page}
                  totpages={pageNumbers.length}
                  boundaryPagesRange={1}
                  onChange={this.onPageChange}
                  siblingPagesRange={1}
                  hideEllipsis={false}
                  onPrev={this.onPrev}
                  onNext={() => this.onNext(pageNumbers.length)}
                  onGoFirst={this.onGoFirst}
                  onGoLast={() => this.onGoLast(pageNumbers.length)}
                />
              </Fragment>
            }
          </Fragment>
          :
          <Grid style={{ textAlign: 'center', marginTop: 20 }}>
            <Typography variant="subtitle2" color="secondary">No Jobs Found</Typography>
          </Grid>
        }
      </div>
    );
  }
}


JobProfiles.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(customStyles, styles)(JobProfiles);
