import React, { Component, Fragment } from 'react'
import styles from 'dan-components/Tables/tableStyle-jss';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, Button, TextField, Typography, Select, Input, MenuItem, ListItemText } from '@material-ui/core';
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
import { RecommendationPopup } from 'dan-components'
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
      interested: false
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
  };
  handleChange = (e) => {
    this.setState({ tableColum: e.target.value })
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
    getData(`${API_URL}/utils/get-recommendation?offset=${offset}&rows=${rows}&user_id=${userId} `)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ suggestData: res.data, recomList: true })
          if (res.data.length == 0) {
            this.setState({ recPopup: true, open: true })
          }
        }
        else {
          console.log('something not good')
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
    var logdata = {}
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
  render() {
    const { classes } = this.props;
    const { tab, arr, tableColum, tableData, suggestData, ShortlistData, recPopup, open, shortList, selectList, recomList } = this.state;


    return (
      <Fragment>
        {(shortList && selectList && recomList) ?


          <Fragment>
            {tab != 2 ? '' : recPopup && <RecommendationPopup
              open={open}
              handleClose={this.handleClose}
              handleAction={this.handleAction} />
            }
            <Tabs style={{ textAlign: 'center', justifyContent: 'center', textOverflow: 'ellipsis' }}
              className={classes.tabletab}
              value={tab}
              onChange={this.handleChangeTab}
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label={this.state.title} style={{ textOverflow: 'ellipsis' }} />
              <Tab label="My Shortlist" />
              <Tab label="Suggested for me" />
            </Tabs>
            <Grid className={classes.tabletab1}>
              <Grid
              >
                <Button variant="contained" color="#696969" onClick={this.handleRedirect} style={{ margin: '10px', borderRadius: '6px' }} >
                  Back to all lists
            </Button>
                <Select
                  multiple
                  value={tableColum}
                  name="tableColum"
                  renderValue={() => {
                    return 'Columns'
                  }}
                  onChange={this.handleChange}
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
              </Grid>
              <Grid className={classes.textField1} >
                <TextField
                  id="outlined-margin-dense"
                  placeholder="search for keywords"
                  className={classes.textField1}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {tab === 0 && (<Table style={{ minWidth: '650px', minWidth: '650px' }}>
              <TableHead>

                <TableRow>
                  {(tableColum.indexOf('Interested') != '-1') && <TableCell padding="default">Interested</TableCell>}
                  {(tableColum.indexOf('Applied') != '-1') && <TableCell padding="default">Applied</TableCell>}
                  {(tableColum.indexOf('Notes') != '-1') && <TableCell padding="default">Notes</TableCell>}
                  {(tableColum.indexOf('Company Name') != '-1') && <TableCell padding="default">Company Name</TableCell>}
                  {(tableColum.indexOf('Company Size') != '-1') && <TableCell padding="default">Company Size</TableCell>}
                  {(tableColum.indexOf('Role Type') != '-1') && <TableCell padding="default">Role Type</TableCell>}
                  {(tableColum.indexOf('Job Title') != '-1') && <TableCell padding="default">Job Title</TableCell>}
                  {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell padding="default">Role Start Date</TableCell>}
                  {(tableColum.indexOf('Duration') != '-1') && <TableCell padding="default">Duration</TableCell>}
                  {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell padding="default">Application Start Date</TableCell>}
                  {(tableColum.indexOf('Application End Date') != '-1') && <TableCell padding="default">Application End Date</TableCell>}
                  {(tableColum.indexOf('Location') != '-1') && <TableCell padding="default">Location</TableCell>}
                  {(tableColum.indexOf('Salary') != '-1') && <TableCell padding="default">Salary</TableCell>}
                  {(tableColum.indexOf('Application Link') != '-1') && <TableCell padding="default">Application Link</TableCell>}
                  {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell padding="default">Application Requirements</TableCell>}
                  {(tableColum.indexOf('Other Details') != '-1') && <TableCell padding="default">Other Details</TableCell>}
                  {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell padding="default">Visa Sponsorship Available</TableCell>}
                  {(tableColum.indexOf('Industries') != '-1') && <TableCell padding="default">Industries</TableCell>}
                  {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell padding="default">Graduation Year</TableCell>}
                  {(tableColum.indexOf('Website URL') != '-1') && <TableCell padding="default">Website URL</TableCell>}

                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item, index) =>
                  (
                    <TableRow key={index}>
                      <TableCell padding="default">
                        <Checkbox
                          checked={item.interested}
                          color="default"
                          name="interested"
                          value={item.interested}
                          onChange={(e) => this.handleSelect(e, item.id, index)}
                          inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                      </TableCell>
                      <TableCell align="left"><Checkbox
                        checked={item.applied}
                        color="default"
                        name='applied'
                        value={(item.applied == null || item.applied == false) ? true : false}
                        onChange={(e) => this.handleSelect(e, item.id, index)}
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                      /></TableCell>
                      {(tableColum.indexOf('Notes') != '-1') && <TableCell padding="default">
                        <TextField className="text" variant="outlined" name="note" value={item.note} onBlur={(e) => this.handleNoteData(e, item.id, index)} onChange={(e) => this.handleNotes(e, item.id, index)} placeholder="Notes" />
                      </TableCell>}
                      {(tableColum.indexOf('Company Name') != '-1') && <TableCell padding="default">{item.company_name}</TableCell>}
                      {(tableColum.indexOf('Company Size') != '-1') && <TableCell padding="default">{item.company_size}</TableCell>}
                      {(tableColum.indexOf('Role Type') != '-1') && <TableCell padding="default">{item.role_type}</TableCell>}
                      {(tableColum.indexOf('Job Title') != '-1') && <TableCell padding="default">{item.job_title}</TableCell>}
                      {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell padding="default">{item.role_start_date}</TableCell>}
                      {(tableColum.indexOf('Duration') != '-1') && <TableCell padding="default">{item.duration}</TableCell>}
                      {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell padding="default">{item.application_start_date}</TableCell>}
                      {(tableColum.indexOf('Application End Date') != '-1') && <TableCell padding="default">{item.applicationend_date}</TableCell>}
                      {(tableColum.indexOf('Location') != '-1') && <TableCell padding="default">{item.location}</TableCell>}
                      {(tableColum.indexOf('Salary') != '-1') && <TableCell padding="default">{item.salary}</TableCell>}
                      {(tableColum.indexOf('Application Link') != '-1') && <TableCell padding="default"> <Link onClick={(e) => this.handlleOpenLink(item.application_link, item.id)} to="#">{item.application_link}</Link></TableCell>}
                      {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell padding="default">{item.application_requirements}</TableCell>}
                      {(tableColum.indexOf('Other Details') != '-1') && <TableCell padding="default">{item.other_details}</TableCell>}
                      {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell padding="default">{item.visa_sponsorship_available}</TableCell>}
                      {(tableColum.indexOf('Industries') != '-1') && <TableCell padding="default">{item.industries}</TableCell>}
                      {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell padding="default">{item.graduation_year}</TableCell>}
                      {(tableColum.indexOf('Website URL') != '-1') && <TableCell padding="default">{item.website_url}</TableCell>}


                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>)}
            {tab === 1 && (
              <Table style={{ minWidth: '650px', minWidth: '650px' }}>
                <TableHead>

                  <TableRow>
                    {(tableColum.indexOf('Interested') != '-1') && <TableCell padding="default">Interested</TableCell>}
                    {(tableColum.indexOf('Applied') != '-1') && <TableCell padding="default">Applied</TableCell>}
                    {(tableColum.indexOf('Notes') != '-1') && <TableCell padding="default">Notes</TableCell>}
                    {(tableColum.indexOf('Company Name') != '-1') && <TableCell padding="default">Company Name</TableCell>}
                    {(tableColum.indexOf('Company Size') != '-1') && <TableCell padding="default">Company Size</TableCell>}
                    {(tableColum.indexOf('Role Type') != '-1') && <TableCell padding="default">Role Type</TableCell>}
                    {(tableColum.indexOf('Job Title') != '-1') && <TableCell padding="default">Job Title</TableCell>}
                    {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell padding="default">Role Start Date</TableCell>}
                    {(tableColum.indexOf('Duration') != '-1') && <TableCell padding="default">Duration</TableCell>}
                    {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell padding="default">Application Start Date</TableCell>}
                    {(tableColum.indexOf('Application End Date') != '-1') && <TableCell padding="default">Application End Date</TableCell>}
                    {(tableColum.indexOf('Location') != '-1') && <TableCell padding="default">Location</TableCell>}
                    {(tableColum.indexOf('Salary') != '-1') && <TableCell padding="default">Salary</TableCell>}
                    {(tableColum.indexOf('Application Link') != '-1') && <TableCell padding="default">Application Link</TableCell>}
                    {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell padding="default">Application Requirements</TableCell>}
                    {(tableColum.indexOf('Other Details') != '-1') && <TableCell padding="default">Other Details</TableCell>}
                    {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell padding="default">Visa Sponsorship Available</TableCell>}
                    {(tableColum.indexOf('Industries') != '-1') && <TableCell padding="default">Industries</TableCell>}
                    {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell padding="default">Graduation Year</TableCell>}
                    {(tableColum.indexOf('Website URL') != '-1') && <TableCell padding="default">Website URL</TableCell>}

                  </TableRow>
                </TableHead>
                <TableBody>
                  {ShortlistData.map((item, index) =>
                    (
                      <TableRow key={index} >
                        <TableCell padding="default">
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
                        {(tableColum.indexOf('Notes') != '-1') && <TableCell padding="default">
                          <TextField className="text" variant="outlined" name="note" value={item.note} onBlur={(e) => this.handleNoteData(e, item.id, index)} onChange={(e) => this.handleNotes(e, item.id, index)} placeholder="Notes" />
                        </TableCell>}
                        {(tableColum.indexOf('Company Name') != '-1') && <TableCell padding="default">{item.company_name}</TableCell>}
                        {(tableColum.indexOf('Company Size') != '-1') && <TableCell padding="default">{item.company_size}</TableCell>}
                        {(tableColum.indexOf('Role Type') != '-1') && <TableCell padding="default">{item.role_type}</TableCell>}
                        {(tableColum.indexOf('Job Title') != '-1') && <TableCell padding="default">{item.job_title}</TableCell>}
                        {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell padding="default">{item.role_start_date}</TableCell>}
                        {(tableColum.indexOf('Duration') != '-1') && <TableCell padding="default">{item.duration}</TableCell>}
                        {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell padding="default">{item.application_start_date}</TableCell>}
                        {(tableColum.indexOf('Application End Date') != '-1') && <TableCell padding="default">{item.applicationend_date}</TableCell>}
                        {(tableColum.indexOf('Location') != '-1') && <TableCell padding="default">{item.location}</TableCell>}
                        {(tableColum.indexOf('Salary') != '-1') && <TableCell padding="default">{item.salary}</TableCell>}
                        {(tableColum.indexOf('Application Link') != '-1') && <TableCell padding="default"><Link onClick={(e) => this.handlleOpenLink(item.application_link, item.id)} to="#">{item.application_link}</Link></TableCell>}
                        {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell padding="default">{item.application_requirements}</TableCell>}
                        {(tableColum.indexOf('Other Details') != '-1') && <TableCell padding="default">{item.other_details}</TableCell>}
                        {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell padding="default">{item.visa_sponsorship_available}</TableCell>}
                        {(tableColum.indexOf('Industries') != '-1') && <TableCell padding="default">{item.industries}</TableCell>}
                        {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell padding="default">{item.graduation_year}</TableCell>}
                        {(tableColum.indexOf('Website URL') != '-1') && <TableCell padding="default">{item.website_url}</TableCell>}


                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            )}

            {tab === 2 && (
              <Table style={{ minWidth: '650px', minWidth: '650px' }}>
                <TableHead>

                  <TableRow>
                    {(tableColum.indexOf('Interested') != '-1') && <TableCell padding="default">Interested</TableCell>}
                    {(tableColum.indexOf('Applied') != '-1') && <TableCell padding="default">Applied</TableCell>}
                    {(tableColum.indexOf('Notes') != '-1') && <TableCell padding="default">Notes</TableCell>}
                    {(tableColum.indexOf('Company Name') != '-1') && <TableCell padding="default">Company Name</TableCell>}
                    {(tableColum.indexOf('Company Size') != '-1') && <TableCell padding="default">Company Size</TableCell>}
                    {(tableColum.indexOf('Role Type') != '-1') && <TableCell padding="default">Role Type</TableCell>}
                    {(tableColum.indexOf('Job Title') != '-1') && <TableCell padding="default">Job Title</TableCell>}
                    {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell padding="default">Role Start Date</TableCell>}
                    {(tableColum.indexOf('Duration') != '-1') && <TableCell padding="default">Duration</TableCell>}
                    {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell padding="default">Application Start Date</TableCell>}
                    {(tableColum.indexOf('Application End Date') != '-1') && <TableCell padding="default">Application End Date</TableCell>}
                    {(tableColum.indexOf('Location') != '-1') && <TableCell padding="default">Location</TableCell>}
                    {(tableColum.indexOf('Salary') != '-1') && <TableCell padding="default">Salary</TableCell>}
                    {(tableColum.indexOf('Application Link') != '-1') && <TableCell padding="default">Application Link</TableCell>}
                    {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell padding="default">Application Requirements</TableCell>}
                    {(tableColum.indexOf('Other Details') != '-1') && <TableCell padding="default">Other Details</TableCell>}
                    {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell padding="default">Visa Sponsorship Available</TableCell>}
                    {(tableColum.indexOf('Industries') != '-1') && <TableCell padding="default">Industries</TableCell>}
                    {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell padding="default">Graduation Year</TableCell>}
                    {(tableColum.indexOf('Website URL') != '-1') && <TableCell padding="default">Website URL</TableCell>}

                  </TableRow>
                </TableHead>
                <TableBody>
                  {suggestData.map((item, index) =>
                    (
                      <TableRow key={index}>
                        <TableCell padding="default">
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
                        {(tableColum.indexOf('Notes') != '-1') && <TableCell padding="default">
                          <TextField className="text" variant="outlined" name="note" value={item.note} onBlur={(e) => this.handleNoteData(e, item.id, index)} onChange={(e) => this.handleNotes(e, item.id, index)} placeholder="Notes" />
                        </TableCell>}
                        {(tableColum.indexOf('Company Name') != '-1') && <TableCell padding="default">{item.company_name}</TableCell>}
                        {(tableColum.indexOf('Company Size') != '-1') && <TableCell padding="default">{item.company_size}</TableCell>}
                        {(tableColum.indexOf('Role Type') != '-1') && <TableCell padding="default">{item.role_type}</TableCell>}
                        {(tableColum.indexOf('Job Title') != '-1') && <TableCell padding="default">{item.job_title}</TableCell>}
                        {(tableColum.indexOf('Role Start Date') != '-1') && <TableCell padding="default">{item.role_start_date}</TableCell>}
                        {(tableColum.indexOf('Duration') != '-1') && <TableCell padding="default">{item.duration}</TableCell>}
                        {(tableColum.indexOf('Application Start Date') != '-1') && <TableCell padding="default">{item.application_start_date}</TableCell>}
                        {(tableColum.indexOf('Application End Date') != '-1') && <TableCell padding="default">{item.applicationend_date}</TableCell>}
                        {(tableColum.indexOf('Location') != '-1') && <TableCell padding="default">{item.location}</TableCell>}
                        {(tableColum.indexOf('Salary') != '-1') && <TableCell padding="default">{item.salary}</TableCell>}
                        {(tableColum.indexOf('Application Link') != '-1') && <TableCell padding="default"><Link onClick={(e) => this.handlleOpenLink(item.application_link, item.id)} to="#">{item.application_link}</Link></TableCell>}
                        {(tableColum.indexOf('Application Requirements') != '-1') && <TableCell padding="default">{item.application_requirements}</TableCell>}
                        {(tableColum.indexOf('Other Details') != '-1') && <TableCell padding="default">{item.other_details}</TableCell>}
                        {(tableColum.indexOf('Visa Sponsorship Available') != '-1') && <TableCell padding="default">{item.visa_sponsorship_available}</TableCell>}
                        {(tableColum.indexOf('Industries') != '-1') && <TableCell padding="default">{item.industries}</TableCell>}
                        {(tableColum.indexOf('Graduation Year') != '-1') && <TableCell padding="default">{item.graduation_year}</TableCell>}
                        {(tableColum.indexOf('Website URL') != '-1') && <TableCell padding="default">{item.website_url}</TableCell>}


                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            )}

          </Fragment > : <Loading />}
      </Fragment>
    )
  }
}
export default withStyles(styles)(ListDataTable);