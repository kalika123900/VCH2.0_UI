import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import dummy from 'dan-api/dummy/dummyContents';
import { withStyles } from '@material-ui/core/styles';
import bgCover from 'dan-images/petal_bg.svg';
import styles from 'dan-components/SocialMedia/jss/cover-jss';
import {
  StudentCover,
  StudentProfile,
} from 'dan-components';

class UserProfile extends React.Component {
  render() {
    const title = brand.name + ' - Profile';
    const description = brand.desc;
    const { classes } = this.props;

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
        <StudentCover
          coverImg={bgCover}
          avatar={dummy.user.avatar}
          name={dummy.user.name}
          desc="Lorem Ipsum dolar Consectetur adipiscing elit."
        />
        <StudentProfile />
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);
