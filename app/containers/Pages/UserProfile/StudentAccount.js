import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import qs from 'qs';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import styles from 'dan-components/Profile/profile-jss';
import Grid from '@material-ui/core/Grid';
import {
  StudentCover,
  StudentSummary,
  StudentSkills,
  StudentQualification,
  StudentExperience,
  StudentCompanies,
  StudentIndustries
} from 'dan-components';
import { makeSecureDecrypt } from 'dan-helpers/security';
import { skillMenu, companyList, sectorsData } from 'dan-api/apps/profileOption';

function getIdsItem(arr, data) {
  return arr.map(item => data[item]);
}

function stringToArray(string) {
  if (string != null && string.length > 0) {
    const splitArray = string.split(',');

    const data = [];
    splitArray.map(item => {
      if (isNaN(item)) {
        data.push(item);
      } else if (item > 1000) {
        data.push(item);
      } else if (typeof item === 'string' && item.length > 0) {
        data.push(item);
      }
    });

    return data;
  }
  return [];
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

class UserProfile extends React.Component {
  state = {
    skills: [],
    companies: [],
    industries: []
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    }

    postData(`${API_URL}/student/get-skills-interests`, data)
      .then((res) => {
        if (res.status === 1) {
          const skills = getIdsItem(res.data.skills, skillMenu);
          const companies = stringToArray(res.data.companies);
          const industries = stringToArray(res.data.industries);
          this.setState({ skills, companies, industries });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const title = brand.name + ' - Profile';
    const description = brand.desc;
    const { classes } = this.props;
    const { skills, companies, industries } = this.state;

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

        {/* student cover */}
        <StudentCover />

        <Fragment>
          <Grid className={classes.papperBlock} >

            {/* Personal Details */}
            <StudentSummary />
            <Divider className={classes.divider} />

            {/* My Skills */}
            <StudentSkills skills={skills} />
            <Divider className={classes.divider} />

            {/* My Qualifications */}
            <StudentQualification />
            <Divider className={classes.divider} />

            {/* Experience */}
            <StudentExperience />
            <Divider className={classes.divider} />

            {/* My Interested Companies */}
            <StudentCompanies companies={companies} />
            <Divider className={classes.divider} />

            {/* My Interested Industries */}
            <StudentIndustries industries={industries} />
            <Divider className={classes.divider} />

          </Grid>
        </Fragment>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);
