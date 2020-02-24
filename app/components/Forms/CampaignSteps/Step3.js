import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { bindActionCreators } from 'redux';
import { storeStep3Info } from 'dan-actions/CampaignActions';
import styles from './step-jss';

class Step3 extends React.Component {
  state = {
    labelWidth: 0,
    category: '',
    customDemographic: '',
    customKeyword: '',
    customUniversity: '',
    keyword: [
      { id: 15, status: false, value: 'job', label: 'Job' },
      { id: 16, status: false, value: 'fresher', label: 'Fresher' },
      { id: 18, status: false, value: 'entry_level', label: 'Entry Level' },
      { id: 19, status: false, value: 'experienced', label: 'Experienced' }
    ],
    university: [
      { id: 15, status: false, value: 'oxford', label: 'Oxford' },
      { id: 16, status: false, value: 'rgpv', label: 'RGPV' },
      { id: 17, status: false, value: 'iist-university', label: 'IIST University' },
      { id: 18, status: false, value: 'oriental-university', label: 'Oriental University' },
    ],
    demographic: [
      { id: -1, status: false, value: 'no-preference', label: 'No preference' },
      { id: 0, status: false, value: 'women', label: 'Women' },
      { id: 1, status: false, value: 'men', label: 'Men' },
      { id: 2, status: false, value: 'bame', label: 'BAME' },
    ]
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name == 'language') {
      this.props.addInfo({
        language: event.target.value,
        gender: this.props.gender,
        keywords: this.props.keywords,
        university: this.props.university
      });
    }
  };

  handleCheckbox = (e, id) => {
    const arr = this.state[e.target.name];
    arr.forEach(item => {
      if (item.id === id) {
        item.status = !item.status;
      }
    });
    this.setState({ [e.target.name]: arr });

    if (e.target.name == 'demographic') {
      let gender = this.props.gender.toJS();
      if (gender.indexOf(id) === -1) {
        gender.push(id);
      } else if (!e.target.checked) {
        gender = gender.filter(item => item !== id);
      }
      this.props.addInfo({
        language: this.props.language,
        gender,
        keywords: this.props.keywords,
        university: this.props.university
      });
    }
    if (e.target.name == 'university') {
      let university = this.props.university.toJS();
      if (university.indexOf(id) === -1) {
        university.push(id);
      } else if (!e.target.checked) {
        university = university.filter(item => item !== id);
      }
      this.props.addInfo({
        language: this.props.language,
        gender: this.props.gender,
        keywords: this.props.keywords,
        university
      });
    }
  };

  addCustomItem = (e, stateItem) => {
    if (this.state[e.target.offsetParent.name].length > 0) {
      const customItem = this.state[e.target.offsetParent.name];
      const { length } = this.state[e.target.offsetParent.name];
      const newItemObj = {
        id: (length + 1), status: false, value: customItem, label: customItem
      };
      const newItemArr = [...this.state[stateItem], newItemObj];
      this.setState({ [stateItem]: newItemArr, [e.target.offsetParent.name]: '' });
    }
  }

  addKeyword = () => {
    if (this.state.customKeyword.length > 0) {
      const { customKeyword } = this.state;
      const id = this.state.keyword.length + 1;
      const newKeywordObj = {
        id,
        status: true,
        value: customKeyword,
        label: customKeyword
      };
      const newKeywordArr = [...this.state.keyword, newKeywordObj];
      this.setState({ keyword: newKeywordArr, customKeyword: '' });

      const keywords = this.props.keywords.toJS();
      if (keywords.indexOf(id) === -1) {
        keywords.push(id);
      }

      this.props.addInfo({
        language: this.props.language,
        gender: this.props.gender,
        university: this.props.university,
        keywords
      });
    }
  }

  handleSuggestedKeyword = (e, id) => {
    const newKeywordArr = this.state.keyword.map((item, index) => {
      if (item.id === id) {
        return {
          id,
          status: true,
          value: item.value,
          label: item.label
        };
      }
      return item;
    });
    this.setState({ keyword: newKeywordArr });

    const keywords = this.props.keywords.toJS();
    if (keywords.indexOf(id) === -1) {
      keywords.push(id);
    }

    this.props.addInfo({
      language: this.props.language,
      gender: this.props.gender,
      university: this.props.university,
      keywords
    });
  }

  render() {
    const {
      classes, language, gender, university, keywords
    } = this.props;

    const {
      labelWidth, customUniversity, customDemographic, keyword, customKeyword
    } = this.state;

    const checkboxButtons = this.state.demographic.map((item, index) => (
      <FormControlLabel
        control={(
          <Checkbox
            name="demographic"
            checked={!!gender.includes(item.id)}
            value={item.value}
            onChange={(e) => { this.handleCheckbox(e, item.id); }}
          />
        )}
        label={item.label}
        key={index}
      />
    ));

    const universities = this.state.university.map((item, index) => (
      <FormControlLabel
        control={(
          <Checkbox
            name="university"
            checked={!!university.includes(item.id)}
            value={item.value}
            onChange={(e) => { this.handleCheckbox(e, item.id); }}
          />
        )}
        label={item.label}
        key={index}
      />
    ));

    const suggestedKeywords = this.state.keyword.map((item, index) => (
      <Fragment key={index}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={(e) => this.handleSuggestedKeyword(e, item.id)}
        >
          +
          {' '}
          {item.label}
        </Button>
      </Fragment>
    ));

    const keywordList = keyword.map((item, index) => {
      if (item.status === true || keywords.includes(item.id)) {
        return (
          <Typography variant="subtitle1" className={classes.choosenTerms} key={index}>
            {item.label}
          </Typography>
        );
      }
    });

    return (
      <div className={classes.root, classes.step3Root}>
        {/* section 1 */}
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" style={{ textAlign: 'left' }}>
              Which language do you want to advertise in?
            </Typography>
            <FormControl variant="outlined" style={{ minWidth: 120, float: 'left' }}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-language-simple"
              >
                Language
              </InputLabel>
              <Select
                value={language}
                onChange={this.handleChange}
                input={(
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="language"
                    id="outlined-language-simple"
                  />
                )}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="hindi">Hindi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* section 2 */}
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={classes.formControl}>
                <Typography variant="h6">Specify precise demographic for the algorithm to give preference to</Typography>
                <FormGroup>
                  {checkboxButtons}
                </FormGroup>
                <TextField
                  name="customDemographic"
                  className={classes.textField}
                  placeholder="For example : Plumber"
                  value={customDemographic}
                  margin="normal"
                  variant="filled"
                  onChange={(e) => this.handleChange(e)}
                />
                <Tooltip title="Add Another">
                  <Button
                    name="customDemographic"
                    variant="text"
                    color="secondary"
                    onClick={(e) => this.addCustomItem(e, 'demographic')}
                  >
                    <AddIcon />
                    Add New
                  </Button>
                </Tooltip>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Grid style={{ textAlign: 'left' }}>
              <FormControl component="fieldset" required className={classes.customWidth, classes.formControl}>
                <Typography variant="h6">Specify Universities for algorithm to prefer</Typography>
                <FormGroup>
                  {universities}
                </FormGroup>
                <TextField
                  name="customUniversity"
                  className={classes.textField}
                  placeholder="For example : RGPV"
                  value={customUniversity}
                  margin="normal"
                  variant="filled"
                  onChange={(e) => this.handleChange(e)}
                />
                <Tooltip title="Add Another">
                  <Button
                    name="customUniversity"
                    variant="text"
                    color="secondary"
                    onClick={(e) => this.addCustomItem(e, 'university')}
                  >
                    <AddIcon />
                    Add New
                  </Button>
                </Tooltip>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {/* section 3 */}
        <Grid container spacing={3} className={classes.divider}>
          <Grid>
            <Typography variant="h6" style={{ textAlign: 'left' }}>
              Specify key words for the algorithm to prefer
            </Typography>
          </Grid>
          <Grid className={classes.customGrid}>
            {keywordList !== null && keywordList}
          </Grid>
          <Grid style={{ width: '100%' }}>
            <TextField
              name="customKeyword"
              placeholder="For example : Something"
              value={customKeyword}
              className={classes.textField}
              margin="normal"
              variant="filled"
              onChange={(e) => this.handleChange(e)}
              style={{ width: '100%' }}
            />
            <Grid>
              <Tooltip title="Add New">
                <Button variant="text" color="secondary" style={{ textAlign: 'left' }} onClick={(e) => this.addKeyword()}>
                  <AddIcon />
                  Add New
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        {/* section 4 */}
        <Grid container spacing={3} className={classes.divider}>
          <Grid>
            <Typography variant="h6" style={{ textAlign: 'left', marginBottom: '5px' }}>
              Suggested Keywords for you
            </Typography>
            <Grid container>
              {suggestedKeywords}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  gender: PropTypes.object.isRequired,
  university: PropTypes.object.isRequired,
  keywords: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const reducerCampaign = 'campaign';

const mapStateToProps = state => ({
  language: state.getIn([reducerCampaign, 'language']),
  gender: state.getIn([reducerCampaign, 'gender']),
  university: state.getIn([reducerCampaign, 'university']),
  keywords: state.getIn([reducerCampaign, 'keywords']),
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeStep3Info, dispatch)
});

const StepMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3);

export default withStyles(styles)(StepMapped);
