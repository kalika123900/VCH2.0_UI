import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import { withStyles } from '@material-ui/core/styles';
import styles from 'dan-components/Forms/user-jss';
import Grid from '@material-ui/core/Grid';
import { Pagination, ExploreFilter, StudentCard } from 'dan-components';
// import datas from 'dan-api/apps/connectionData';
import Button from '@material-ui/core/Button';
import qs from 'qs';

const customStyles = {
  root: {
    display: 'block'
  }
};

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
}

class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      isStudent: false,
      showFilter: false,
      btnText: ' Show Filter',
      page: 1,
      contentsPerPage: 24,
      datas: []
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onGoFirst = this.onGoFirst.bind(this);
    this.onGoLast = this.onGoLast.bind(this);
  }

  onPageChange(page) {
    this.setState({ page });
  }

  onPrev() {
    let { page } = this.state;
    if (page > 1) {
      this.setState({ page: page -= 1 });
    } else {
      this.setState({ page: 1 });
    }
  }

  onNext(totalPages) {
    let { page } = this.state;
    if (page < totalPages) {
      this.setState({ page: page += 1 });
    } else {
      this.setState({ page: totalPages });
    }
  }

  onGoFirst() {
    this.setState({ page: 1 });
  }

  onGoLast(totalPages) {
    this.setState({ page: totalPages });
  }

  componentDidMount() {
    getData(`${API_URL}/utils/get-students`) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ isStudent: true, datas: res.data })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleFilter = () => {
    if (this.state.showFilter) {
      this.setState({ showFilter: false, btnText: 'Show Filter' });
    } else {
      this.setState({ showFilter: true, btnText: 'Hide Filter' });
    }
  }

  render() {
    const title = brand.name + ' - Explore';
    const description = brand.desc;
    const { classes } = this.props;
    const { page, contentsPerPage, datas, isStudent } = this.state;

    const indexOfLastTodo = page * contentsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - contentsPerPage;
    const currentContent = datas.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderContent = currentContent.map((data, index) => (
      <Grid item md={3} sm={6} xs={12} key={index.toString()}>
        <StudentCard
          user_id={data.id}
          email={data.email}
          cover={imgApi[0]}
          avatar={avatarApi[6]}
          name={`${data.firstname} ${data.lastname}`}
          title={'Computer Science'}
          isVerified={false}
          btnText="See Profile"
          university={'Oxford University'}
        />
      </Grid>
    ));

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(datas.length / contentsPerPage); i += 1) {
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
        {isStudent &&
          <Fragment>
            <Grid>
              <Button variant="contained" color="primary" onClick={(e) => this.handleFilter(e)}>
                {this.state.btnText}
              </Button>
            </Grid>
            <Grid style={{ width: '100%', marginBottom: 20 }}>
              {this.state.showFilter && <ExploreFilter />}
            </Grid>

            <Grid
              container
              alignItems="flex-start"
              justify="space-between"
              direction="row"
              spacing={2}
              className={classes.root, classes.studentCardGrid}
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

Explore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(customStyles, styles)(Explore);
