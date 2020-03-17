import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from 'dan-components/Forms/user-jss';
import Grid from '@material-ui/core/Grid';
import { Pagination } from 'dan-components';
import datas from 'dan-api/apps/connectionData';
import { ExploreFilter } from 'dan-components';
import { StudentCard } from 'dan-components';
import Button from '@material-ui/core/Button';

const customStyles = {
  root: {
    display: 'block'
  }
}

class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      showFilter: false,
      btnText: " Show Filter",
      page: 1,
      contentsPerPage: 24
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
    const { page, contentsPerPage } = this.state;

    const indexOfLastTodo = page * contentsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - contentsPerPage;
    const currentContent = datas.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderContent = currentContent.map((data, index) => (
      <Grid item md={3} sm={6} xs={12} key={index.toString()} >
        <StudentCard
          cover={data.cover}
          avatar={data.avatar}
          name={data.name}
          title={data.title}
          isVerified={data.verified}
          btnText="See Profile"
          university={data.university}
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
      </div>
    );
  }
}

Explore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(customStyles, styles)(Explore);
