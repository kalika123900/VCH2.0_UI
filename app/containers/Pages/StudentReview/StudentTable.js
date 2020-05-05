import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { makeSecureDecrypt } from 'dan-helpers/security';
import avatarApi from 'dan-api/images/avatars';
import { CustomConfirmation, StudentProfileDialog } from 'dan-components';
import qs from 'qs';
import styles from 'dan-components/Tables/tableStyle-jss';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Avatar from '@material-ui/core/Avatar';

function createData(id, avatar, student_name, email, gender, nationality, status) {
  return {
    id,
    avatar,
    student_name,
    email,
    gender,
    nationality,
    status
  };
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

const status = { '0': 'Verification Pending', '1': 'Verified', '-1': 'Disable By student', '-2': 'Disable by admin' };

var studentData = [];

class StudentTable extends React.Component {
  state = {
    page: 0,
    open: false,
    action: null,
    user_id: -1,
    studentCount: 0,
    rowsPerPage: 10,
    isStudents: false,
    profile: false,
    openProfile: -1
  }

  handleProfileOpen = (id) => {
    this.setState({ profile: true, openProfile: id });
  };

  handleProfileClose = () => {
    this.setState({ profile: false, openProfile: -1 });
  };

  handleConfirmation = (id, action) => {
    let value = this.state.open ? false : true
    this.setState({ open: value, user_id: id, action })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleAction = () => {
    if (this.state.action == 'remove') {
      this.removeStudent(this.state.user_id);
    } else if (this.state.action == 'disable') {
      this.disableStudent(this.state.user_id);
    } else {
      this.enableStudent(this.state.user_id);
    }
  }

  removeStudent = (id) => {
    const data = {
      user_id: id
    };

    postData(`${API_URL}/admin/remove-student`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ open: false });
          this.getStudents();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  disableStudent = (id) => {
    const data = {
      user_id: id
    };

    postData(`${API_URL}/admin/disable-student`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ open: false });
          this.getStudents();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  enableStudent = (id) => {
    const data = {
      user_id: id
    };

    postData(`${API_URL}/admin/enable-student`, data)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ open: false });
          this.getStudents();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
    this.getStudents();
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    this.getStudents()
  };

  getStudents = () => {
    const data = {
      offset: (this.state.page * this.state.rowsPerPage),
      rows: this.state.page == 0 ? this.state.rowsPerPage : ((this.state.page + 1) * this.state.rowsPerPage)
    }

    postData(`${API_URL}/admin/get-students`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            let tempData = [];
            res.data.map(item => {
              const name = `${item.firstname} ${item.lastname}`;
              const studentStatus = status[item.status.toString()];
              const avatar = item.profile != null && item.profile != '' ? item.profile : item.gender == "Male" ? avatarApi[7] : avatarApi[6];
              const nationality = item.nationality != null && item.nationality != '' ? item.nationality : 'Not avilable';
              const gender = item.gender != null && item.gender != '' ? item.gender : 'Not avilable';
              tempData.push(createData(item.id, avatar, name, item.email, gender, nationality, studentStatus));
            });
            studentData = tempData;
            this.setState({ isStudents: true, studentCount: res.data[0].count });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getStudents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page != this.state.page) {
      this.getStudents();
    }
    else if (prevState.rowsPerPage != this.state.rowsPerPage) {
      this.getStudents();
    }
  }

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page, isStudents, studentCount, open, action } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, studentCount - (page * rowsPerPage));

    return (
      <Fragment>
        <CustomConfirmation
          open={open}
          handleClose={this.handleClose}
          handleAction={this.handleAction}
          message={action == 'disable' ?
            'Are you sure you want to disable this student?'
            :
            action == 'enable' ?
              'Are you sure you want to enable this student?'
              :
              'Are you sure you want to remove this student?'
          }
        />
        <StudentProfileDialog user_id={this.state.openProfile} open={this.state.profile} handleClose={this.handleProfileClose} />
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Our Students</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          {isStudents
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="default">Profile</TableCell>
                    <TableCell padding="default">Student Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Gender</TableCell>
                    <TableCell align="left">Nationality</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} >
                      <TableCell padding="default">
                        <Avatar alt="avatar" src={n.avatar} className={classes.avatar} />
                      </TableCell>
                      <TableCell padding="default">{n.student_name}</TableCell>
                      <TableCell align="left">{n.email}</TableCell>
                      <TableCell align="left">{n.gender}</TableCell>
                      <TableCell align="left">{n.nationality}</TableCell>
                      <TableCell align="left">{n.status}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary" onClick={(e) => this.handleProfileOpen(n.id)} style={{ marginRight: 5 }}>
                          View Profile
                        </Button>
                        {n.status == 'Disable by admin' ?
                          <Button variant="contained" color="primary" onClick={(e) => this.handleConfirmation(n.id, 'enable')}>
                            Enable
                          </Button>
                          :
                          <Button onClick={(e) => this.handleConfirmation(n.id, 'disable')}>
                            <NotInterestedIcon />
                          </Button>
                        }
                        <Button onClick={(e) => this.handleConfirmation(n.id, 'remove')}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={3}
                      count={studentCount}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[10, 20, 30, 40, 50]}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            )
            : (
              <Typography
                color="textSecondary"
                variant="body1"
                className={classes.warnMsg}
              >
                No Students Found !
              </Typography>
            )
          }
        </div >
      </Fragment>
    );
  }
}

StudentTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTable);
