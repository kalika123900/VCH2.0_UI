import React from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './helpSupport-jss';
import Questions from './Questions';
import Answer from './Answer';
import ContactForm from './ContactForm';

class Settings extends React.Component {
  state = {
    valueForm: [],
    answer: 0
  }

  showResult(values) {
    setTimeout(() => {
      const { valueForm } = this.state;
      this.setState({ valueForm: values });
      alert(`You submitted:\n\n${valueForm}`);
    }, 500); // simulate server latency
  }

  handleChange = (value) => {
    this.setState({ answer: value })
  };

  render() {
    const title = brand.name;
    const description = brand.desc;
    const { width } = this.props;
    const { answer } = this.state;

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
        <Grid
          container
          spacing={2}
          direction={isWidthUp('md', width) ? 'row' : 'column-reverse'}
          style={{ marginTop: "5%" }}
        >
          <Grid item md={6} xs={12}  >
            <Questions answer={answer} handleChange={this.handleChange} />
            <ContactForm onSubmit={(values) => this.showResult(values)} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Answer answer={answer} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Settings.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(withWidth()(Settings));
