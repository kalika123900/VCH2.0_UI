import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
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
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import styles from '../CampaignSteps/step-jss';

class Step3 extends React.Component {
  state = {
    language: '',
    labelWidth: 0,
    category: '',
    customDemographic: '',
    keyword: [],
    customKeyword: '',
    customUniversity: '',
    university: [
      { id: 1, status: false, value: 'oxford', label: 'Oxford' },
      { id: 2, status: false, value: 'rgpv', label: 'RGPV ' },
      { id: 3, status: false, value: 'ips', label: 'IPS' },
      { id: 4, status: false, value: 'iiit', label: 'IIIT University' },
    ],
    demographic: [
      { id: 1, status: false, value: 'no-preference', label: 'No preference' },
      { id: 2, status: false, value: 'women', label: 'Women ' },
      { id: 3, status: false, value: 'men', label: 'Men' },
      { id: 4, status: false, value: 'bame', label: 'BAME' },
    ]
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckbox = (e, id) => {
    let arr = this.state[e.target.name]
    arr.forEach(item => {
      if (item.id === id) {
        item.status = item.status ? false : true
      }
    });
    this.setState({ [e.target.name]: arr })
  };

  addCustomItem = (e, stateItem) => {
    if (this.state[e.target.offsetParent.name].length > 0) {
      let customItem = this.state[e.target.offsetParent.name]
      let length = this.state[e.target.offsetParent.name].length
      let newItemObj = {
        id: (length + 1), status: false, value: customItem, label: customItem
      }
      let newItemArr = [...this.state[stateItem], newItemObj]
      this.setState({ [stateItem]: newItemArr, [e.target.offsetParent.name]: '' })
    }
  }

  addKeyword = () => {
    if (this.state.customKeyword.length > 0) {
      let customKeyword = '+ ' + this.state.customKeyword
      let newKeywordObj = { value: customKeyword, label: customKeyword }
      let newKeywordArr = [...this.state.keyword, newKeywordObj]
      this.setState({ keyword: newKeywordArr, customKeyword: '' })
    }
  }

  handleSuggestedKeyword = (e) => {
    let customKeyword = e.target.outerText
    let newKeywordObj = { value: customKeyword, label: customKeyword }
    let newKeywordArr = [...this.state.keyword, newKeywordObj]
    this.setState({ keyword: newKeywordArr, customKeyword: '' })
  }

  render() {
    const { classes } = this.props;

    const { language, labelWidth, customUniversity, customDemographic, keyword, customKeyword } = this.state;

    const checkboxButtons = this.state.demographic.map((item, index) => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              name="demographic"
              checked={item.status}
              value={item.value}
              onChange={(e) => { this.handleCheckbox(e, item.id) }}
            />
          }
          label={item.label}
          key={index}
        />
      )
    })

    const universities = this.state.university.map((item, index) => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              name="university"
              checked={item.status}
              value={item.value}
              onChange={(e) => { this.handleCheckbox(e, item.id) }}
            />
          }
          label={item.label}
          key={index}
        />
      )
    })

    const keywordList = keyword.length > 0 ? keyword.map((item, index) => {
      return (
        <Typography variant="subtitle1" className={classes.choosenTerms} key={index}>
          {item.label}
        </Typography>
      )
    }) : null

    return (
      <div className={classes.root, classes.step3Root}>
        {/* section 1 */}
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" style={{ textAlign: "left" }} >
              Which language do you want to Email?
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
                <MenuItem value={10}>English</MenuItem>
                <MenuItem value={20}>French</MenuItem>
                <MenuItem value={30}>Hindi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* section 2 */}
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={6} xs={12}>
            <Grid style={{ textAlign: "left" }}>
              <FormControl component="fieldset" required={true} className={classes.formControl}>
                <Typography variant="h6" >Specify precise demographic for the algorithm to give preference to</Typography>
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
                    onClick={(e) => this.addCustomItem(e, "demographic")}
                  >
                    <AddIcon />
                    Add New
                  </Button>
                </Tooltip>
              </FormControl>
            </Grid>
          </Grid>
          {/* <Grid item md={6} xs={12} style={{ padding: "5%" }}>
            <Typography variant="h6">
              Potential audience size
          </Typography>
            <Typography variant="h6">
              65,714
          </Typography>
            <Typography variant="body1" >
              people per month
          </Typography>
            <Typography variant="body2" style={{ marginTop: "8px" }}>
              This is an estimate of how many people search for businesses like yours in your
              selected locations. Audience size doesn't affect your cost.
          </Typography>
          </Grid> */}
        </Grid>
        <Grid container spacing={3} className={classes.divider}>
          <Grid item md={6} xs={12}>
            <Grid style={{ textAlign: "left" }}>
              <FormControl component="fieldset" required={true} className={classes.customWidth, classes.formControl}>
                <Typography variant="h6" >Specify Universities for algorithm to prefer</Typography>
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
                    onClick={(e) => this.addCustomItem(e, "university")}
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
            <Typography variant="h6" style={{ textAlign: "left" }}>
              Specify key words for the algorithm to prefer
            </Typography>
          </Grid>
          <Grid className={classes.customGrid}>
            {keywordList !== null && keywordList}
          </Grid>
          <Grid style={{ width: "100%" }}>
            <TextField
              name="customKeyword"
              placeholder="For example : Something"
              value={customKeyword}
              className={classes.textField}
              margin="normal"
              variant="filled"
              onChange={(e) => this.handleChange(e)}
              style={{ width: "100%" }}
            />
            <Grid>
              <Tooltip title="Add New">
                <Button variant="text" color="secondary" style={{ textAlign: "left" }} onClick={(e) => this.addKeyword()} >
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
            <Typography variant="h6" style={{ textAlign: "left", marginBottom: "5px" }}>
              Suggested Keywords for you
          </Typography>
            <Grid container>
              <Button variant="outlined" color="secondary"
                className={classes.button}
                onClick={(e) => this.handleSuggestedKeyword(e)}
              >
                + new job
            </Button>&nbsp;&nbsp;
            <Button variant="outlined" color="secondary"
                className={classes.button}
                onClick={(e) => this.handleSuggestedKeyword(e)}
              >
                + entry level government jobs
            </Button>&nbsp;
            <Button variant="outlined" color="secondary"
                className={classes.button}
                onClick={(e) => this.handleSuggestedKeyword(e)}
              >
                + high paying entry level jobs
            </Button>&nbsp;
            <Button variant="outlined" color="secondary"
                className={classes.button}
                onClick={(e) => this.handleSuggestedKeyword(e)}
              >
                + entry level sales jpobs
            </Button>&nbsp;
            <Button variant="outlined" color="secondary"
                className={classes.button}
                onClick={(e) => this.handleSuggestedKeyword(e)}
              >
                + entry level business jobs
            </Button>&nbsp;
            <Button variant="outlined" color="secondary"
                className={classes.button}
                onClick={(e) => this.handleSuggestedKeyword(e)}
              >
                + entry level computer jobs
            </Button>&nbsp;
            <Button variant="outlined" color="secondary"
                className={classes.button}
                onClick={(e) => this.handleSuggestedKeyword(e)}
              >
                + part time job openings
            </Button>&nbsp;
            <Button variant="outlined" color="secondary"
                className={classes.button}
                onClick={(e) => this.handleSuggestedKeyword(e)}
              >
                + job now
            </Button>&nbsp;
          </Grid>
          </Grid>
        </Grid>
      </div >
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Step3);
