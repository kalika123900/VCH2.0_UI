import React, { Component, Fragment } from 'react'
import styles from 'dan-components/Tables/tableStyle-jss';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, Button, TextField, Typography, Select, Input, MenuItem, ListItemText, Hidden } from '@material-ui/core';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { findLastIndex } from 'lodash';
import { tableName } from 'dan-api/apps/tableData';
import { getData, postData } from 'dan-helpers/request';
import { makeSecureDecrypt } from 'dan-helpers/security';
import { RecommendationPopup, InvitePopup } from 'dan-components'
import Loading from 'dan-components/Loading';

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

class ListDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      arr: ['1', '2', '3', '4', '5', '6', '7'],
      tableColum: ["Interested",
        "Applied",
        'Notes',
        "Company Name",
        "Company Size",
        "Role Type",
        "Job Title",
        "Duration",
        "Application Start Date",
        'Application Link'
      ],
      tableData: [],
      ShortlistData: [],
      suggestData: [],
      userId: '',
      title: '',
      recPopup: false,
      open: false,
      tempListData: [],
      selectList: false,
      shortList: false,
      recomList: false,
      applied: false,
      interested: false,
      invitePopup: true,
      searchkey: ''
    }
  }

  handleChangeTab = (event, value) => {
    this.setState({ tab: value, applied: true, interested: true });
    if (value == 2) {
      const data = {
        student_id: this.state.userId,
        action: 'recommended_tab_click',
        role_id: '-1',
        notes: '',
      }
      postData(`${API_URL}/utils/generate-log`, data)
        .then((res) => {
          if (res.status === 1) {

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleRedirect = (e) => {
    this.props.history.push(`/student/view-list`);
  }

  componentDidMount() {
    console.log(this.props.location)
    if (this.props.location.hash) {
      let temp = this.props.location.hash.split("#").pop()
      if (temp == 'all') {
        this.setState({})
      }

    }
    else {
      this.setState({})
    }
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    this.setState({ userId: user.id })
    this.getTableData(0, 24, user.id);
    this.getShortListData(0, 24, user.id);
    this.getSuggestData(0, 24, user.id);
  }

  getShortListData = (offset, rows, userId) => {
    getData(`${API_URL}/utils/get-shortlist?offset=${offset}&rows=${rows}&user_id=${userId} `)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ ShortlistData: res.data, shortList: true })
        }
        else {
          console.log('something not good')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getSuggestData = (offset, rows, userId) => {
    getData(`${API_URL}/student/is-invited?user_id=${userId}`)
      .then((res) => {
        if (res.status === 1) {
          getData(`${API_URL}/utils/get-recommendation?offset=${offset}&rows=${rows}&user_id=${userId} `)
            .then((res) => {
              if (res.status === 1) {
                this.setState({ invitePopup: false, suggestData: res.data, recomList: true })
                if (res.data.length == 0) {
                  this.setState({ recPopup: true, invitePopup: false, open: true })
                }
              }
              else {
                console.log('something not good')
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.setState({ recomList: true, open: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTableData = (offset, rows, userId) => {
    const Id = atob(this.props.match.params.id)
    getData(`${API_URL}/utils/get-list-data?listID=${Id}&offset=${offset}&rows=${rows}&user_id=${userId} `)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ tableData: res.data, title: res.data[0].title, selectList: true })
        }
        else {
          console.log('something not good')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlleOpenLink = (link, id) => {
    const { tab, userId } = this.state
    const that = this;
    window.open(link, "_blank");
    if (tab == 2) {
      const logdata = {
        student_id: userId,
        action: 'recommended_role_click',
        role_id: id,
        notes: '',
      }
      postData(`${API_URL}/utils/generate-log`, logdata)
        .then((res) => {
          if (res.status === 1) {

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const logdata = {
      student_id: userId,
      action: 'link_click',
      role_id: id,
      notes: '',
    }

    postData(`${API_URL}/utils/generate-log`, logdata)
      .then((res) => {
        if (res.status === 1) {

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleNoteData = (e, id, index) => {
    const MappedData = this.state.tempListData[index];
    const { tab, userId } = this.state
    if (tab == 2) {
      const logdata = {
        student_id: userId,
        action: 'recommended_role_click',
        role_id: id,
        notes: '',
      }
      postData(`${API_URL}/utils/generate-log`, logdata)
        .then((res) => {
          if (res.status === 1) {

          }
        })
        .catch((err) => {
          console.log(err);
        });

    }
    if (e.target.name == 'note') {
      const logdata = {
        student_id: userId,
        action: e.target.name,
        role_id: id,
        notes: e.target.value,
      }

      postData(`${API_URL}/utils/generate-log`, logdata)
        .then((res) => {
          if (res.status === 1) {

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.state.tempListData.length != 0) {
      const data = {
        user_id: userId,
        role_id: MappedData.id,
        interested: MappedData.interested ? true : false,
        applied: MappedData.applied ? true : false,
        note: MappedData.note ? MappedData.note : ''
      }
      postData(`${API_URL}/utils/toggle-role-data`, data)
        .then((res) => {
          if (res.status === 1) {
            that.getShortListData(0, 24, userId);
          }
          else {
            console.log('something not good')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleNotes = (e, id, index1) => {
    const { userId, tableData, ShortlistData, suggestData, tab } = this.state;
    var tableMappedData = [];
    if (tab === 0) {
      tableMappedData = tableData.map((item, index) => {
        if (index === index1) {
          return { ...item, [e.target.name]: e.target.value }
        }
        return item
      });
      this.setState({ tableData: tableMappedData, tempListData: tableMappedData })
    }
    else if (tab === 1) {
      tableMappedData = ShortlistData.map((item, index) => {
        if (index === index1) {
          return { ...item, [e.target.name]: e.target.value }
        }
        return item
      });
      this.setState({ ShortlistData: tableMappedData, tempListData: tableMappedData })
    }
    else if (tab === 2) {
      tableMappedData = suggestData.map((item, index) => {
        if (index === index1) {
          return { ...item, [e.target.name]: e.target.value }
        }
        return item
      });
      this.setState({ suggestData: tableMappedData, tempListData: tableMappedData })
    }

  }

  handleSelect = (e, id, index1) => {
    console.log(e.target.name, e.target.checked)
    const that = this;
    const { userId, tableData, tab, ShortlistData, suggestData } = this.state;
    if (tab == 2) {
      const logdata = {
        student_id: userId,
        action: 'recommended_role_click',
        role_id: id,
        notes: '',
      }
      postData(`${API_URL}/utils/generate-log`, logdata)
        .then((res) => {
          if (res.status === 1) {

          }
        })
        .catch((err) => {
          console.log(err);
        });

    }

    if (e.target.name == 'applied' || e.target.name == 'interested') {
      if (e.target.checked == true) {
        logdata = {
          student_id: userId,
          action: e.target.name,
          role_id: id,
          note: '',
        }
      }
      else {
        logdata = {
          student_id: userId,
          action: 'remove_' + e.target.name,
          role_id: id,
          notes: '',
        }
      }
    }

    if (e.target.name != 'note') {
      var tableMappedData = [];
      if (tab === 0) {
        tableMappedData = tableData.map((item, index) => {
          if (index === index1) {
            return { ...item, [e.target.name]: e.target.checked }
          }
          return item
        });
        this.setState({ tableData: tableMappedData })
      }
      else if (tab === 1) {
        tableMappedData = ShortlistData.map((item, index) => {
          if (index === index1) {
            return { ...item, [e.target.name]: e.target.checked }
          }
          return item
        });
        this.setState({ ShortlistData: tableMappedData })
      }
      else if (tab === 2) {
        tableMappedData = suggestData.map((item, index) => {
          if (index === index1) {
            return { ...item, [e.target.name]: e.target.checked }
          }
          return item
        });
        this.setState({ suggestData: tableMappedData })
      }
      const data = {
        user_id: userId,
        role_id: id,
        interested: tableMappedData[index1].interested ? true : false,
        applied: tableMappedData[index1].applied ? true : false,
        note: tableMappedData[index1].note ? tableMappedData[index1].note : '',
      }
      postData(`${API_URL}/utils/toggle-role-data`, data)
        .then((res) => {
          if (res.status === 1) {
            that.getShortListData(0, 24, that.state.userId);
          }
          else {
            console.log('something not good')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleAction = () => {
    this.props.history.push(`/student/edit-details`);
  }
  handleShareFacebook = (e) => {
    const userId = this.state.userId

    let url =
      "https://www.facebook.com/sharer.php?display=popup&u=" + "https://app.varsitycareershub.co.uk/student-signup/" + userId
    let options = "toolbar=0,status=0,resizable=1,width=626,height=436";
    window.open(url, " ", options);
  }
  handleShareLinkedIn = (e) => {
    const userId = this.state.userId

    let url = "https://www.linkedin.com/sharing/share-offsite/?url=" + "https://app.varsitycareershub.co.uk/student-signup/" + userId
    let options = "toolbar=0,status=0,resizable=1,width=626,height=436";
    window.open(url, " ", options);
  }

  render() {
    const { classes } = this.props;
    const { tab, arr, invitePopup, tableColum, tableData, suggestData, ShortlistData, recPopup, open, shortList, selectList, searchkey, recomList } = this.state;

    let MappedTableData = tableData;
    let MappedShortlistData = ShortlistData;
    let MappedSuggestData = suggestData;

    if (searchkey !== '') {
      MappedTableData = tableData.filter(item => {
        for (const [key, value] of Object.entries(item)) {
          if (value && value.toString().toLowerCase().indexOf(searchkey.toLowerCase()) !== -1)
            return true;
        }
        return false
      });
      MappedShortlistData = ShortlistData.filter(item => {
        for (const [key, value] of Object.entries(item)) {
          if (value && value.toString().toLowerCase().indexOf(searchkey.toLowerCase()) !== -1)
            return true;
        }
        return false
      });

      MappedSuggestData = MappedSuggestData.filter(item => {
        for (const [key, value] of Object.entries(item)) {
          if (value && value.toString().toLowerCase().indexOf(searchkey.toLowerCase()) !== -1)
            return true;
        }
        return false
      });

    }

    return (
      <Fragment>
        <Button variant="contained" color="#696969" onClick={this.handleRedirect} style={{ margin: '10px', borderRadius: '6px' }} >
          Back to all lists
        </Button>
        {(shortList && selectList && recomList) ?
          <Fragment>
            {tab != 2 ? '' : invitePopup && <InvitePopup
              open={open}
              handleClose={this.handleClose}
              user_id={this.state.userId}
              handleShareFacebook={() => this.handleShareFacebook()}
              handleShareLinkedIn={() => this.handleShareLinkedIn()}
            />
            }
            {tab != 2 ? '' : recPopup && <RecommendationPopup
              open={open}
              handleClose={this.handleClose}
              handleAction={this.handleAction} />
            }
            <Hidden lgUp>
              <Tabs
                value={tab}
                variant="scrollable"
                onChange={this.handleChangeTab}
                indicatorColor="secondary"
                textColor="secondary"
                scrollButtons="auto"
              >
                <Tab label={this.state.title} />
                <Tab label="My Shortlist" />
                <Tab label="Suggested for me" />
              </Tabs>
            </Hidden>
            <Hidden mdDown>
              <Tabs
                value={tab}
                centered
                onChange={this.handleChangeTab}
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab label={this.state.title} />
                <Tab label="My Shortlist" />
                <Tab label="Suggested for me" />
              </Tabs>
            </Hidden>
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item xs={6} align="center" >
                <Select
                  multiple
                  value={tableColum}
                  name="tableColum"
                  renderValue={() => {
                    return 'Select Columns'
                  }}
                  onChange={this.handleChange}
                  style={{ margin: 10 }}
                >
                  {tableName.map((item, index) => (

                    < MenuItem key={index} value={item} >
                      <TextField
                        name="columns"

                        component={Checkbox}
                        checked={tableColum.indexOf(item) > -1}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  )
                  )}
                </Select>
                {/* </Grid> */}
              </Grid>
              <Grid item xs={6} align="center">
                <TextField
                  id="outlined-margin-dense"
                  placeholder="search for keywords"
                  className={classes.searchField}
                  variant="outlined"
                  name='searchkey'
                  value={searchkey}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>

            {/* Table */}
            {(tab === 0 && tableData.length) || (tab === 1 && ShortlistData.length) || (tab === 2 && suggestData.length) ?
              <Grid style={{ minWidth: '100%', overflowX: 'auto' }}>
                <Table >
                  <TableHead >
                    <TableRow>
                      {(tableColum.indexOf('Interested') != '-1') && <TableCell className={classes.listTableHead} align="center">Interested</TableCell>}
                      {(tableColum.indexOf('Applied') != '-1') && <TableCell className={classes.listTableHead} align="center">Applied</TableCell>}
                      {(tableColum.indexOf('Notes') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 260 }} align="center">Notes</TableCell>}
                      {(tableColum.indexOf('Company Name') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Company Name</TableCell>}
                      {(tableColum.indexOf('Company Size') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Company Size</TableCell>}
                      {(tableColum.indexOf('Role Type') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Role Type</TableCell>}
                      {(tableColum.indexOf('Job Title') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Job Title</TableCell>}
                      {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Role Start Date</TableCell>}
                      {(tableColum.indexOf('Duration') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Duration</TableCell>}
                      {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Application Start Date</TableCell>}
                      {(tableColum.indexOf('Application End Date') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Application End Date</TableCell>}
                      {(tableColum.indexOf('Location') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Location</TableCell>}
                      {(tableColum.indexOf('Salary') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Salary</TableCell>}
                      {(tableColum.indexOf('Application Link') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Application Link</TableCell>}
                      {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Application Requirements</TableCell>}
                      {(tableColum.indexOf('Other Details') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Other Details</TableCell>}
                      {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Visa Sponsorship Available</TableCell>}
                      {(tableColum.indexOf('Industries') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Industries</TableCell>}
                      {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Graduation Year</TableCell>}
                      {(tableColum.indexOf('Website URL') != '-1') && <TableCell className={classes.listTableHead} style={{ minWidth: 200 }} align="center">Website URL</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {tab === 0 && (
                      MappedTableData.map((item, index) =>
                        (
                          <TableRow key={index}>
                            <TableCell align="center">
                              <Checkbox
                                checked={item.interested}
                                color="default"
                                name="interested"
                                value={item.interested}
                                onChange={(e) => this.handleSelect(e, item.id, index)}
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Checkbox
                                checked={item.applied}
                                color="default"
                                name='applied'
                                value={(item.applied == null || item.applied == false) ? true : false}
                                onChange={(e) => this.handleSelect(e, item.id, index)}
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                              />
                            </TableCell>
                            {(tableColum.indexOf('Notes') != '-1') && <TableCell align="center">
                              <TextField className={classes.text} variant="outlined" name="note" value={item.note} onBlur={(e) => this.handleNoteData(e, item.id, index)} onChange={(e) => this.handleNotes(e, item.id, index)} placeholder="Notes" />
                            </TableCell>}
                            {(tableColum.indexOf('Company Name') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.company_name}</TableCell>}
                            {(tableColum.indexOf('Company Size') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.company_size}</TableCell>}
                            {(tableColum.indexOf('Role Type') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.role_type}</TableCell>}
                            {(tableColum.indexOf('Job Title') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.job_title}</TableCell>}
                            {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.role_start_date}</TableCell>}
                            {(tableColum.indexOf('Duration') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.duration}</TableCell>}
                            {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.application_start_date}</TableCell>}
                            {(tableColum.indexOf('Application End Date') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.applicationend_date}</TableCell>}
                            {(tableColum.indexOf('Location') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.location}</TableCell>}
                            {(tableColum.indexOf('Salary') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.salary}</TableCell>}
                            {(tableColum.indexOf('Application Link') != '-1') && <TableCell className={classes.listTableBody} align="center"> <Link onClick={(e) => this.handlleOpenLink(item.application_link, item.id)} to="#">{item.application_link}</Link></TableCell>}
                            {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.application_requirements}</TableCell>}
                            {(tableColum.indexOf('Other Details') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.other_details}</TableCell>}
                            {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.visa_sponsorship_available}</TableCell>}
                            {(tableColum.indexOf('Industries') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.industries}</TableCell>}
                            {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.graduation_year}</TableCell>}
                            {(tableColum.indexOf('Website URL') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.website_url}</TableCell>}
                          </TableRow>
                        )
                      )
                    )}

                    {tab === 1 && (
                      MappedShortlistData.map((item, index) =>
                        (
                          <TableRow key={index} >
                            <TableCell align="center">
                              <Checkbox
                                checked={(item.interested == null || item.interested == false) ? false : true}
                                color="default"
                                name="interested"
                                value={(item.interested == null || item.interested == false) ? true : false}
                                onClick={(e) => this.handleSelect(e, item.id, index)}
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Checkbox
                                checked={(item.applied == null || item.applied == false) ? false : true}
                                color="default"
                                name='applied'
                                value={(item.applied == null || item.applied == false) ? true : false}
                                onClick={(e) => this.handleSelect(e, item.id, index)}
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                              />
                            </TableCell>
                            {(tableColum.indexOf('Notes') != '-1') && <TableCell align="center">
                              <TextField className={classes.text} variant="outlined" name="note" value={item.note} onBlur={(e) => this.handleNoteData(e, item.id, index)} onChange={(e) => this.handleNotes(e, item.id, index)} placeholder="Notes" />
                            </TableCell>}
                            {(tableColum.indexOf('Company Name') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.company_name}</TableCell>}
                            {(tableColum.indexOf('Company Size') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.company_size}</TableCell>}
                            {(tableColum.indexOf('Role Type') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.role_type}</TableCell>}
                            {(tableColum.indexOf('Job Title') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.job_title}</TableCell>}
                            {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.role_start_date}</TableCell>}
                            {(tableColum.indexOf('Duration') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.duration}</TableCell>}
                            {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.application_start_date}</TableCell>}
                            {(tableColum.indexOf('Application End Date') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.applicationend_date}</TableCell>}
                            {(tableColum.indexOf('Location') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.location}</TableCell>}
                            {(tableColum.indexOf('Salary') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.salary}</TableCell>}
                            {(tableColum.indexOf('Application Link') != '-1') && <TableCell className={classes.listTableBody} align="center"><Link onClick={(e) => this.handlleOpenLink(item.application_link, item.id)} to="#">{item.application_link}</Link></TableCell>}
                            {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.application_requirements}</TableCell>}
                            {(tableColum.indexOf('Other Details') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.other_details}</TableCell>}
                            {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.visa_sponsorship_available}</TableCell>}
                            {(tableColum.indexOf('Industries') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.industries}</TableCell>}
                            {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.graduation_year}</TableCell>}
                            {(tableColum.indexOf('Website URL') != '-1') && <TableCell className={classes.listTableBody} align="center">{item.website_url}</TableCell>}
                          </TableRow>
                        )
                      )
                    )}
                    {tab === 2 && (
                      MappedSuggestData.map((item, index) =>
                        (
                          <TableRow key={index}>
                            <TableCell align="center">
                              <Checkbox
                                checked={(item.interested == null || item.interested == false) ? false : true}
                                color="default"
                                name="interested"
                                value={(item.interested == null || item.interested == false) ? true : false}
                                onClick={(e) => this.handleSelect(e, item.id, index)}
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                              />
                            </TableCell>
                            <TableCell align="left"><Checkbox
                              checked={(item.applied == null || item.applied == false) ? false : true}
                              color="default"
                              name='applied'
                              value={(item.applied == null || item.applied == false) ? true : false}
                              onClick={(e) => this.handleSelect(e, item.id, index)}
                              inputProps={{ 'aria-label': 'checkbox with default color' }}
                            /></TableCell>
                            {(tableColum.indexOf('Notes') != '-1') && <TableCell align="center">
                              <TextField className={classes.text} variant="outlined" name="note" value={item.note} onBlur={(e) => this.handleNoteData(e, item.id, index)} onChange={(e) => this.handleNotes(e, item.id, index)} placeholder="Notes" />
                            </TableCell>}
                            {(tableColum.indexOf('Company Name') != '-1') && <TableCell align="center">{item.company_name}</TableCell>}
                            {(tableColum.indexOf('Company Size') != '-1') && <TableCell align="center">{item.company_size}</TableCell>}
                            {(tableColum.indexOf('Role Type') != '-1') && <TableCell align="center">{item.role_type}</TableCell>}
                            {(tableColum.indexOf('Job Title') != '-1') && <TableCell align="center">{item.job_title}</TableCell>}
                            {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell align="center">{item.role_start_date}</TableCell>}
                            {(tableColum.indexOf('Duration') != '-1') && <TableCell align="center">{item.duration}</TableCell>}
                            {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell align="center">{item.application_start_date}</TableCell>}
                            {(tableColum.indexOf('Application End Date') != '-1') && <TableCell align="center">{item.applicationend_date}</TableCell>}
                            {(tableColum.indexOf('Location') != '-1') && <TableCell align="center">{item.location}</TableCell>}
                            {(tableColum.indexOf('Salary') != '-1') && <TableCell align="center">{item.salary}</TableCell>}
                            {(tableColum.indexOf('Application Link') != '-1') && <TableCell align="center"><Link onClick={(e) => this.handlleOpenLink(item.application_link, item.id)} to="#">{item.application_link}</Link></TableCell>}
                            {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell align="center">{item.application_requirements}</TableCell>}
                            {(tableColum.indexOf('Other Details') != '-1') && <TableCell align="center">{item.other_details}</TableCell>}
                            {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell align="center">{item.visa_sponsorship_available}</TableCell>}
                            {(tableColum.indexOf('Industries') != '-1') && <TableCell align="center">{item.industries}</TableCell>}
                            {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell align="center">{item.graduation_year}</TableCell>}
                            {(tableColum.indexOf('Website URL') != '-1') && <TableCell align="center">{item.website_url}</TableCell>}


                          </TableRow>
                        )
                      )
                    )}

                  </TableBody >
                </Table >
              </Grid>
              :
              <Grid style={{ textAlign: 'center', marginTop: 50, marginBottom: 50 }}>
                <Typography variant="h6" color="textSecondary" >
                  No Data Found
                </Typography>
              </Grid>
            }
          </Fragment >
          : <Loading />
        }
      </Fragment>
    )
  }
}

export default withStyles(styles)(ListDataTable);
