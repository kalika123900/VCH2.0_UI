import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import imgApi from 'dan-api/images/university';
import avatarApi from 'dan-api/images/avatars';
import { withStyles } from '@material-ui/core/styles';
import styles from 'dan-components/Forms/user-jss';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Pagination, ExploreFilter, StudentCard } from 'dan-components';
import Button from '@material-ui/core/Button';

import { makeSecureDecrypt } from 'dan-helpers/security';
import { universityItems } from 'dan-api/apps/profileOption'
import CircularProgress from 'dan-components/Loading/CircularProgress';

const customStyles = {
  root: {
    display: 'block'
  }
};

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

class Explore extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    if (user.cId == null) {
      this.props.history.push('/client/unauthorized');
    }
    this.state = {
      keyword: '',
      isLoading: false,
      isStudent: false,
      isFilter: false,
      btnText: 'Apply Filter',
      page: 1,
      contentsPerPage: 24,
      datas: [],
      studentCount: 1,
      name: '',
      skill: [],
      role: '',
      university: [],
      course: [],
      grade: [],
      experience: 0,
      interests: [],
      activity: 0,
      location: '',
      graduation_year: []
    };
  }

  handleReset = () => {
    this.setState({
      keyword: '',
      name: '',
      skill: [],
      role: '',
      university: [],
      course: [],
      grade: [],
      experience: 0,
      interests: [],
      activity: 0,
      location: '',
      graduation_year: []
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onPageChange = (page) => {
    this.setState({ page });
    this.state.isFilter ? this.getFilterStudents() : this.getStudents();
  }

  onPrev = () => {
    let { page } = this.state;
    if (page > 1) {
      this.setState({ page: page -= 1 });
    } else {
      this.setState({ page: 1 });
    }
    this.state.isFilter ? this.getFilterStudents() : this.getStudents();
  }

  onNext = (totalPages) => {
    let { page } = this.state;
    if (page < totalPages) {
      this.setState({ page: page += 1 });
    } else {
      this.setState({ page: totalPages });
    }
    this.state.isFilter ? this.getFilterStudents() : this.getStudents();
  }

  onGoFirst = () => {
    this.setState({ page: 1 });
    this.state.isFilter ? this.getFilterStudents() : this.getStudents();
  }

  onGoLast = (totalPages) => {
    this.setState({ page: totalPages });
    this.state.isFilter ? this.getFilterStudents() : this.getStudents();
  }

  getFilterStudents = () => {
    this.setState({ isLoading: true })
    const data = {
      offset: ((this.state.page - 1) * this.state.contentsPerPage),
      rows: this.state.contentsPerPage,
      name: this.state.name,
      skill: this.state.skill,
      role: this.state.role,
      university: this.state.university,
      course: this.state.course,
      grade: this.state.grade,
      experience: this.state.experience,
      interests: this.state.interests,
      activity: this.state.activity,
      location: this.state.location,
      keyword: this.state.keyword,
      graduation_year: this.state.graduation_year
    }

    postJSON(`${API_URL}/utils/get-filter-students`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ isStudent: true, datas: res.data, studentCount: res.data[0].count, isLoading: false })
          }
          else {
            this.setState({ isStudent: false, isLoading: false, datas: res.data, studentCount: 1 });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getStudents = () => {
    this.setState({ isLoading: true })
    const data = {
      offset: ((this.state.page - 1) * this.state.contentsPerPage),
      rows: this.state.contentsPerPage
    }

    postData(`${API_URL}/utils/get-students`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.setState({ isStudent: true, datas: res.data, studentCount: res.data[0].count, isLoading: false })
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
    this.getStudents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page != this.state.page) {
      this.state.isFilter ? this.getFilterStudents() : this.getStudents();
    }
  }

  handleFilter = () => {
    if (this.state.isFilter) {
      this.setState({ isFilter: false, btnText: 'Apply Filter', page: 1 });
      this.handleReset();
      this.getStudents();
    } else {
      this.setState({ isFilter: true, btnText: 'Remove Filter', page: 1 });
    }
  }

  handleContacts = () => {
    this.props.history.push('/client/contacts')
  }

  render() {
    const title = brand.name + ' - Explore';
    const description = brand.desc;
    const { classes } = this.props;
    const { page, contentsPerPage, datas, isStudent, studentCount, isLoading } = this.state;

    const renderContent = datas.map((data, index) => {
      let cover;
      let university;
      let title;
      if (typeof data.university_name === 'string') {
        cover = (universityItems.indexOf(data.university_name) >= imgApi.length || universityItems.indexOf(data.university_name) === -1) ? imgApi[0] : imgApi[universityItems.indexOf(data.university_name)]
        university = data.university_name;
        title = data.subject
      } else if (data.university_name instanceof Array) {
        cover = (universityItems.indexOf(data.university_name[0] || ' ') >= imgApi.length || universityItems.indexOf(data.university_name[0] || ' ') === -1) ? imgApi[0] : imgApi[universityItems.indexOf(data.university_name[0] || ' ')]
        university = data.university_name[0] || '';
        title = data.subject[0] || ''
      }
      return (
        < Grid item md={3} sm={6} xs={12} key={index.toString()} >
          <StudentCard
            user_id={data.id}
            email={data.email}
            cover={cover}
            avatar={data.profile != null && data.profile != '' ? data.profile : data.gender == "Male" ? avatarApi[7] : avatarApi[6]}
            name={`${data.firstname} ${data.lastname}`}
            title={title}
            isVerified={false}
            btnText="See Profile"
            university={university}
          />
        </Grid >
      )
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(studentCount / contentsPerPage); i += 1) {
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
          <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid>
              <Button variant="contained" color="primary" onClick={(e) => this.handleFilter(e)}>
                {this.state.btnText}
              </Button>
            </Grid>
            <Grid>
              <Button variant="contained" color="secondary" onClick={(e) => this.handleContacts(e)}>
                Contacts
                </Button>
            </Grid>
          </Grid>
          <Grid style={{ width: '100%', marginBottom: 20 }}>
            {this.state.isFilter &&
              <ExploreFilter
                {...this.state}
                handleSubmit={this.getFilterStudents}
                handleChange={this.handleChange}
                handleReset={this.handleReset}
              />}
          </Grid>
        </Fragment>
        {isStudent ?
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
          </Fragment>
          :
          <Grid style={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" color="secondary">No Data Found</Typography>
          </Grid>
        }
      </div>
    );
  }
}

Explore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(customStyles, styles)(Explore);
