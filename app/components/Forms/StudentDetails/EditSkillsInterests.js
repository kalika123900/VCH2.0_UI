import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';
import { storeSkillInterests, } from 'dan-actions/studentProfileActions';
import { companyList, skillMenu, sectorsData } from 'dan-api/apps/profileOption';
import messageStyles from 'dan-styles/Messages.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function stringToArray(string) {
  const splitArray = string.split(',');
  const data = [];
  splitArray.map(item => {
    if (isNaN(item)) {
      data.push(item);
    }
    else if (item > 1000) {
      data.push(item);
    }
    else if (typeof item == 'string' && item.length > 0) {
      data.push(item);
    }
  });
  return data;
}

function getIdsItem(arr, data) {
  return arr.map(item => {
    return data[item];
  })
}

function getIds(arr, data) {
  return arr.map(item => {
    return data.indexOf(item);
  })
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

class EditSkillsInterests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openStyle: false,
      messageType: 'error',
      notifyMessage: ''
    };
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      user_id: user.id
    };

    postData(`${API_URL}/student/get-skills-interests`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          const intrestedIndustries = stringToArray(res.data.industries);
          const intrestedCompanies = stringToArray(res.data.companies);
          const skills = getIdsItem(res.data.skills, skillMenu);

          const studentData = {
            intrestedIndustries,
            intrestedCompanies,
            skills,
            oldSkills: res.data.skills
          };
          this.props.addInfo(studentData);
        } else {
          console.log('something not good ');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = event => {
    const { addInfo } = this.props;
    addInfo({ ...this.props, [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const newSkills = getIds(this.props.skills.toJS(), skillMenu);

    const data = {
      industries: this.props.intrestedIndustries.toJS(),
      companies: this.props.intrestedCompanies.toJS(),
      newSkills,
      oldSkills: this.props.oldSkills.toJS(),
      user_id: user.id
    };

    postJSON(`${API_URL}/student/create-skills-interests`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          this.setState({ notifyMessage: 'Information update successfully' });
          this.setState({ messageType: 'success' });
          this.setState({ openStyle: true });
        } else {
          this.setState({ notifyMessage: 'Information not updated' });
          this.setState({ messageType: 'error' });
          this.setState({ openStyle: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  noticeClose = event => {
    event.preventDefault();
    this.setState({ openStyle: false });
  }

  render() {
    const {
      classes,
      intrestedIndustries,
      skills,
      intrestedCompanies
    } = this.props;

    return (
      <section className={classes.pageFormWrap} >
        <form>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-industries"
              >
                Interested Industries
              </InputLabel>
              <Select
                multiple
                value={intrestedIndustries.toJS()}
                input={<Input />}
                name="intrestedIndustries"
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const industrieName = [];
                  sectorsData.map((value, index) => {
                    if (selected.includes(value)) {
                      industrieName.push(value);
                    }
                  });
                  return industrieName.join(', ');
                }
                }
                onChange={e => this.handleChange(e)}
              >
                {sectorsData.map((item, index) => (
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="industrie-checkbox"
                      component={Checkbox}
                      checked={intrestedIndustries.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-companies"
              >
                Interested Companies
              </InputLabel>
              <Select
                multiple
                value={intrestedCompanies.toJS()}
                input={<Input />}
                name="intrestedCompanies"
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const companieName = [];
                  companyList.map((value, index) => {
                    if (selected.includes(value)) {
                      companieName.push(value);
                    }
                  });
                  return companieName.join(', ');
                }
                }
                onChange={e => this.handleChange(e)}
              >
                {companyList.map((item, index) => (
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="company-checkbox"
                      component={Checkbox}
                      checked={intrestedCompanies.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="select-Skills"
              >
                Interested Skills
                </InputLabel>
              <Select
                multiple
                value={skills.toJS()}
                input={<Input />}
                name="skills"
                MenuProps={MenuProps}
                component={Select}
                renderValue={selected => {
                  const skillName = [];
                  skillMenu.map((value, index) => {
                    if (selected.includes(value)) {
                      skillName.push(value);
                    }
                  });
                  return skillName.join(', ');
                }
                }
                onChange={e => this.handleChange(e)}
              >
                {skillMenu.map((item, index) => (
                  <MenuItem key={index.toString()} value={item}>
                    <TextField
                      name="skill-checkbox"
                      component={Checkbox}
                      checked={skills.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>

            </FormControl>
          </div>
          <div className={classes.btnArea} style={{ marginTop: '35px' }}>
            <Button variant="contained" fullWidth color="primary" onClick={() => this.handleSubmit()}>
              Save Changes
            </Button>
          </div>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.openStyle}
          autoHideDuration={6000}
          onClose={this.handleCloseStyle}
        >
          <SnackbarContent
            className={this.state.messageType == 'error' ? messageStyles.bgError : messageStyles.bgSuccess}
            aria-describedby="client-snackbar"
            message={(
              <span id="client-snackbar" className={classes.message}>
                {
                  (this.state.messageType == 'error') && <ErrorIcon className="success" />
                }
                {
                  (this.state.messageType == 'success') && <CheckCircleIcon className="success" />
                }

                  &nbsp;
                {this.state.notifyMessage}
              </span>
            )}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.noticeClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </section >
    );
  }
}
const reducerStudent = 'studentProfile';

EditSkillsInterests.propTypes = {
  classes: PropTypes.object.isRequired,
  intrestedIndustries: PropTypes.object.isRequired,
  intrestedCompanies: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  oldSkills: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  intrestedIndustries: state.getIn([reducerStudent, 'intrestedIndustries']),
  intrestedCompanies: state.getIn([reducerStudent, 'intrestedCompanies']),
  skills: state.getIn([reducerStudent, 'skills']),
  oldSkills: state.getIn([reducerStudent, 'oldSkills']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeSkillInterests, dispatch)
});

const EditSkillsInterestsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSkillsInterests);

export default withStyles(styles)(EditSkillsInterestsMapped);
