import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/timelineData';
import { fetchAction } from 'dan-actions/SocmedActions';
import styles from 'dan-components/SocialMedia/jss/cover-jss';
import { Student } from 'dan-components';
import StudentDemographics from '../Widgets/StudentDemographics';

class StudentDashboard extends PureComponent {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(data);
  }

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes, dataProps } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <StudentDemographics />
        <Student data={dataProps} />
      </div>
    );
  }
}

StudentDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  dataProps: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
};


const reducer = 'socmed';

const mapStateToProps = state => ({
  force: state,
  dataProps: state.getIn([reducer, 'dataTimeline'])
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch)
});

const StudentDashboardMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(StudentDashboard);

export default withStyles(styles)(StudentDashboardMapped);
