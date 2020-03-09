import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Title from './Title';
import styles from './landingStyle-jss';

class Contact extends React.Component {
  state = {
    name: '',
    email: '',
    messages: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, slideMode } = this.props;
    const { name, email, messages } = this.state;
    return (
      <div className={classNames(classes.contact, !slideMode && classes.withBg)}>
        <div className={classes.container}>
          <div className={classes.contactBubble}>
            <Title title="Say hello to us" align="left" nomargin />
            <Typography component="p" className={classes.contactText}>Vivamus et luctus mauris. Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam. Vestibulum feugiat rhoncus metus. In non erat et ipsum molestie porta sit amet ut felis.</Typography>
            <Grid container spacing={3}>
              <Grid item lg={6} xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    fullWidth
                    id="standard-name"
                    label="Who are You?"
                    className={classes.textField}
                    value={name}
                    required
                    onChange={this.handleChange('name')}
                    margin="normal"
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    fullWidth
                    id="standard-email"
                    label="You'r email?"
                    className={classes.textField}
                    value={email}
                    required
                    onChange={this.handleChange('email')}
                    margin="normal"
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    fullWidth
                    id="standard-multiline-flexible"
                    label="Messages"
                    multiline
                    rows="4"
                    value={messages}
                    onChange={this.handleChange('messages')}
                    className={classes.textField}
                    margin="normal"
                  />
                </FormControl>
                <div className={classes.btnArea}>
                  <Button variant="contained" size="large" className={classes.button} color="secondary">Send</Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

Contact.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Contact);
