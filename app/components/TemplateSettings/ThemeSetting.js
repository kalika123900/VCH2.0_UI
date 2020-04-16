import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Palette from '@material-ui/icons/Palette';
import Close from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ThemeThumb from './ThemeThumbs';
import styles from './settings-jss';
import { makeSecureEncrypt } from '../../Helpers/security';
import { makeSecureDecrypt } from '../../Helpers/security';

class TemplateSettings extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    this.state = {
      mode: user.mode,
      show: false,
      showAllThemes: false,
      theme: user.theme
    };
  }

  // Theme Mode Handle
  handleSwitchMode = (event) => {
    const mode = event.target.checked ? 'dark' : 'light';
    this.setState({ mode });
  };

  // Show Hide Panel
  handleTogglePanel = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  // Toggle All Themes
  handleToggleAllThemes = () => {
    const { showAllThemes } = this.state;
    this.setState({ showAllThemes: !showAllThemes });
  }

  changeTheme = (e) => {
    this.setState({ theme: e.target.value });
  }

  handleUiChange = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
      id: user.id,
      cId: user.cId,
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username,
      phone: user.phone,
      managerType: user.type,
      type: 'CLIENT',
      token: user.token,
      mode: this.state.mode,
      theme: this.state.theme
    })));
    window.location.reload();
  }

  render() {
    const {
      classes,
      palette
    } = this.props;
    const { show, mode, theme, showAllThemes } = this.state;

    return (
      <aside
        className={
          classNames(
            classes.settingSidebar,
            classes.rightSidebar,
            show && classes.expanded
          )
        }
      >
        <div className={classes.toggleButton}>
          <Fab
            size="small"
            color="primary"
            aria-label="toggle"
            className={classes.button}
            onClick={this.handleTogglePanel}
            classes={{
              root: classes.buttonDrawer,
            }}
          >
            {show ? <Close /> : <Palette />}
          </Fab>
        </div>
        <Slide direction='left' in={show} mountOnEnter unmountOnExit>
          <div className={classes.root}>
            <section className={classes.settingWraper}>
              <Paper className={classes.optBlock}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className={classes.title}>
                    <Icon className={classes.icon}>invert_colors</Icon>
                        Theme Mode
                      </FormLabel>
                  <FormGroup className={classes.themeMode}>
                    <span>Light Mode</span>
                    <FormControlLabel
                      className={classes.switch}
                      control={(
                        <Switch
                          checked={mode === 'dark'}
                          onChange={(e) => this.handleSwitchMode(e, 'dark')}
                          value="dark"
                          color="default"
                          classes={{
                            track: classes.themeCheckBar,
                            thumb: classes.themeCheck,
                          }}
                        />
                      )}
                    />
                    <span>Dark Mode</span>
                  </FormGroup>
                </FormControl>
              </Paper>
              <Paper className={classes.optBlock}>
                <FormControl component="fieldset" className={classes.themeGroup}>
                  <FormLabel component="legend" className={classes.title}>
                    <Icon className={classes.icon}>color_lens</Icon>
                        Theme Color
                  </FormLabel>
                  {palette !== undefined && palette.map((item, index) => (
                    <FormControlLabel
                      key={index.toString()}
                      className={
                        classNames(
                          classes.themeField,
                          index > 7 && !showAllThemes ? classes.hide : ''
                        )
                      }
                      control={(
                        <ThemeThumb
                          value={item.value}
                          selectedValue={this.state.theme}
                          handleChange={e => this.changeTheme(e)}
                          name={item.name}
                        />
                      )}
                    />
                  ))}
                  <div className={classes.center}>
                    <Button color="primary" onClick={this.handleToggleAllThemes}>
                      {showAllThemes ? 'Hide Some' : 'Show All'}
                    </Button>
                  </div>
                </FormControl>
              </Paper>
              <Button variant="contained" color="primary" onClick={e => this.handleUiChange()}>
                Change & Save
              </Button>
            </section>
          </div>
        </Slide>
      </aside >
    );
  }
}

TemplateSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  palette: PropTypes.object,
};

TemplateSettings.defaultProps = {
  palette: undefined
};


const reducer = 'ui';

const mapStateToProps = state => ({
  force: state, // force state from reducer
  palette: state.getIn([reducer, 'palette']),
});

const TemplateSettingsMapped = connect(
  mapStateToProps
)(TemplateSettings);

export default withStyles(styles)(TemplateSettingsMapped);
