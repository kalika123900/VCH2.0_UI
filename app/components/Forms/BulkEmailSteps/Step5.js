import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Forms/user-jss';
import imgApi from 'dan-api/images/university';
import avatarApi from 'dan-api/images/avatars';
import datas from 'dan-api/apps/connectionData';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Pagination from '../../Pagination/Pagination';
import Typography from '@material-ui/core/Typography';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import RecipientStudentCard from '../../CardPaper/RecipientStudentCard';
import { universityItems, keywordsData, skillMenu } from 'dan-api/apps/profileOption';
import { emailStep5Info } from 'dan-actions/BulkEmailActions';

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

function getIds(arr, data) {
  return arr.map(item => data.indexOf(item));
}

class Step5 extends React.Component {
  constructor() {
    super();
    this.state = {
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

  componentDidMount() {
    //     const MapSkills = getIds(this.props.skills.toJS(), skillMenu);
    //     const MapKeywords = getIds(this.props.keywords.toJS(), keywordsData);
    //     const MapUniversity = getIds(this.props.university.toJS(), universityItems);

    //     const data = {
    //       university: MapUniversity,
    //       keywords: MapKeywords,
    //       skills: MapSkills,
    //       ethnicity: this.props.ethnicity,
    // dataSize
    // university_ids
    // skill_ids
    // ethnicity
    // genders
    // subjects
    // sectors
    // selected_year
    // languages
    // qualification_type
    // experience
    //     };

    const MapSkills = getIds(this.props.skills.toJS(), skillMenu);
    const MapUniversity = getIds(this.props.university.toJS(), universityItems);

    const data = {
      university_ids: MapUniversity,
      skill_ids: MapSkills,
      ethnicity: this.props.ethnicity,
      dataSize: 10,
      genders: this.props.gender,
      subjects: this.props.subjects,
      sectors: this.props.interestedSectors,
      selected_year: this.props.selectedYear,
      languages: this.props.languages,
      qualification_type: this.props.qualificationType,
      experience: this.props.experience
    };


    postJSON(`${API_URL}/bulkemail/get-email-students`, data)
      .then((res) => {
        if (res.status === 1) {
          this.props.addInfo({ ...this.props, studentList: res.data.data })
          this.props.handleCreateBulkEmail(res.data.data.length);
        }
      })
      .catch((err) => {
        console.error(err);
      });

  }

  handleRemove = (id) => {
    let MapBlackList = this.props.blackList.toJS();
    MapBlackList.push(id)
    this.props.addInfo({ ...this.props, blackList: MapBlackList })
  }

  render() {
    const title = brand.name + ' - View Recipients';
    const description = brand.desc;
    const { classes } = this.props;
    const { page, contentsPerPage } = this.state;

    const MapStudentList = this.props.studentList.toJS();
    const MapBlackList = this.props.blackList.toJS();

    const studentList = MapStudentList.filter(item => {
      return (MapBlackList.indexOf(item.id) == -1);
    })

    const indexOfLastTodo = page * contentsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - contentsPerPage;
    const currentContent = studentList.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderContent = currentContent.map((data, index) => (
      <Grid className={classes.posRelative} item md={3} sm={6} xs={12} key={index.toString()} >
        <RecipientStudentCard
          user_id={data.id}
          cover={imgApi[universityItems.indexOf(data.university_name)]}
          avatar={data.profile != null && data.profile != '' ? data.profile : data.gender == "Male" ? avatarApi[7] : avatarApi[6]}
          name={`${data.firstname} ${data.lastname}`}
          title=''
          btnText="See Profile"
          university={data.university_name}
        />
        <Button className={classes.removePos} onClick={(e) => this.handleRemove(data.id)}> <RemoveCircle /></Button>
      </Grid>
    ));


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(studentList.length / contentsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    return (
      <div >
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        {renderContent.length != 0
          ?
          <Fragment>
            <Grid
              container
              alignItems="flex-start"
              justify="space-between"
              direction="row"
              spacing={2}
              className={classes.root}
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
          :
          <Typography variant="caption" color="error">
            No students are perfect according to your needs
          </Typography>
        }
      </div>
    );
  }
}

Step5.propTypes = {
  classes: PropTypes.object.isRequired,
};

const reducerBulkEmail = 'bulkEmail';
const reducerA = 'Auth';

const mapStateToProps = state => ({
  university: state.getIn([reducerBulkEmail, 'university']),
  keywords: state.getIn([reducerBulkEmail, 'keywords']),
  ethnicity: state.getIn([reducerBulkEmail, 'ethnicity']),
  skills: state.getIn([reducerBulkEmail, 'skills']),
  blackList: state.getIn([reducerBulkEmail, 'blackList']),
  studentList: state.getIn([reducerBulkEmail, 'studentList']),
  userType: state.getIn([reducerA, 'userType']),
  gender: state.getIn([reducerBulkEmail, 'gender']),
  subjects: state.getIn([reducerBulkEmail, 'subjects']),
  interestedSectors: state.getIn([reducerBulkEmail, 'interestedSectors']),
  languages: state.getIn([reducerBulkEmail, 'languages']),
  selectedYear: state.getIn([reducerBulkEmail, 'selectedYear']),
  experience: state.getIn([reducerBulkEmail, 'experience']),
  qualificationType: state.getIn([reducerBulkEmail, 'qualificationType']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(emailStep5Info, dispatch)
})

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step5);

export default withStyles(styles)(StepMapped);
