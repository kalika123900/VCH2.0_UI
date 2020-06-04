import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../components/Profile/profile-jss';
import Grid from '@material-ui/core/Grid';
import ClientCard from '../../../components/CardPaper/ClientCard';
import { Pagination } from 'dan-components';
import CircularProgress from 'dan-components/Loading/CircularProgress';


const customStyles = {
  root: {
    display: 'block'
  }
}

async function postData(url, data) {
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
  state = {
    isLoading: false,
    page: 1,
    contentsPerPage: 4,
    datas: [],
    jobCount: 1,
  }

  onPageChange = (page) => {
    this.setState({ page });
    this.getCompanies();
  }

  onPrev = () => {
    let { page } = this.state;
    if (page > 1) {
      this.setState({ page: page -= 1 });
    } else {
      this.setState({ page: 1 });
    }
    this.getCompanies();
  }

  onNext = (totalPages) => {
    let { page } = this.state;
    if (page < totalPages) {
      this.setState({ page: page += 1 });
    } else {
      this.setState({ page: totalPages });
    }
    this.getCompanies();
  }

  onGoFirst = () => {
    this.setState({ page: 1 });
    this.getCompanies();
  }

  onGoLast = (totalPages) => {
    this.setState({ page: totalPages });
    this.getCompanies();
  }

  getCompanies = () => {
    this.setState({ isLoading: true })
    const data = {
      offset: ((this.state.page - 1) * this.state.contentsPerPage),
      rows: this.state.contentsPerPage,
      company_id: this.props.company_id
    }

    postData(`${API_URL}/student/similar-companies`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ datas: res.data, jobCount: res.data[0].count, isLoading: false })
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
    this.getCompanies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page != this.state.page) {
      this.getCompanies();
    }
  }

  render() {
    const title = brand.name + ' - Explore';
    const description = brand.desc;
    const { classes } = this.props;
    const { page, contentsPerPage, datas, jobCount, isLoading } = this.state;

    const renderContent = datas.map((data, index) => (
      < Fragment key={index.toString()} >
        <ClientCard
          data={data}
          id={data.id}
          cover={imgApi[0]}
          avatar={(data.logo == '' || data.logo == null) ? avatarApi[0] : data.logo}
          name={data.name}
          btnText="See Opportunities"
        />
      </Fragment >
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
        {isLoading ?
          <Grid style={{ marginTop: 30 }}>
            <CircularProgress />
          </Grid>
          :
          <Fragment>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              justify="center"
              direction="row"
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
      </div>
    );
  }
}


JobProfiles.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(customStyles, styles)(JobProfiles);
