import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Forms/user-jss';
import imgApi from 'dan-api/images/university';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Reply from '@material-ui/icons/Reply';
import avatarApi from 'dan-api/images/avatars';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Pagination from '../../Pagination/Pagination';
import Typography from '@material-ui/core/Typography';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import RecipientStudentCard from '../../CardPaper/RecipientStudentCard';
import { universityItems, keywordsData, skillMenu } from 'dan-api/apps/profileOption';
import { emailStep5Info } from 'dan-actions/BulkEmailActions';
import CircularProgress from '../../Loading/CircularProgress';

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

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);


class Step5 extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      contentsPerPage: 24,
      isProgress: true,
      studentCount: 0,
      clickThrough60: 0,
      clickThrough90: 0
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

  getBulkEmailStudents = () => {
    this.setState({ isProgress: true })
    const MapSkills = getIds(this.props.skills.toJS(), skillMenu);
    const MapUniversity = getIds(this.props.university.toJS(), universityItems);

    const data = {
      university_ids: MapUniversity,
      skill_ids: MapSkills,
      ethnicity: this.props.ethnicity,
      dataSize: this.props.audience,
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
          const count = res.data.data.length;
          let clickThrough60 = Math.floor((count * 60) / 100);
          let clickThrough90 = Math.floor((count * 90) / 100);
          if (clickThrough60 < 10) {
            clickThrough60 = `0${clickThrough60}`
          }
          if (clickThrough90 < 10) {
            clickThrough90 = `0${clickThrough90}`
          }
          this.setState({ studentCount: count, clickThrough60, clickThrough90 });
          this.props.addInfo({ ...this.props, studentList: res.data.data })
          this.props.handleCreateBulkEmail(res.data.data.length);
          this.setState({ isProgress: false })
        } else {
          this.setState({ isProgress: false })
        }
      })
      .catch((err) => {
        this.setState({ isProgress: false })
        console.error(err);
      });

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.audience != this.props.audience) {
      this.getBulkEmailStudents()
    }
  }


  componentDidMount() {
    this.getBulkEmailStudents();
  }

  handleRemove = (id) => {
    let MapBlackList = this.props.blackList.toJS();
    MapBlackList.push(id)
    this.props.addInfo({ ...this.props, blackList: MapBlackList })
  }

  handleSliderChange = (e, newValue) => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, audience: newValue });
  };


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
          cover={(universityItems.indexOf(data.university_name) >= imgApi.length || universityItems.indexOf(data.university_name) === -1) ? imgApi[0] : imgApi[universityItems.indexOf(data.university_name)]}
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
        <Grid item md={12} xs={12} className={classes.customSlider}>
          <Typography variant="h6" >Choose audience size of your Bulk Email</Typography>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="Pretto slider"
            value={this.props.audience}
            min={1}
            step={1}
            max={25}
            onChange={(e, value) => this.handleSliderChange(e, value)}
          />
          <Typography variant="caption">(slider value represents x% count of total audience)</Typography>
        </Grid>
        <Grid item md={12} xs={12} style={{ marginBottom: 20 }}>
          <Typography variant="h6">
            Estimated performance
                </Typography>
          <Typography variant="subtitle1">
            <RemoveRedEye style={{ marginRight: 10 }} />
            {this.state.studentCount} candidates targeted initially
                </Typography>
          <Typography variant="subtitle1">
            <Reply style={{ marginRight: 10 }} />
            {`${this.state.clickThrough60} - ${this.state.clickThrough90}`} expected total click-throughs
                </Typography>
        </Grid>
        {(!this.state.isProgress && renderContent.length != 0)
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
          !this.state.isProgress ?
            <Typography variant="caption" color="error">
              No students are perfect according to your needs
            </Typography>
            :
            <CircularProgress />
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
  audience: state.getIn([reducerBulkEmail, 'audience']),
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
