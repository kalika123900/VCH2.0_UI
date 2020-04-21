import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { isWidthUp } from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import styles from 'dan-components/Tables/tableStyle-jss';

let id = 0;
function createData(bulk_emails, start_date, end_date, clicks, status) {
  id += 1;
  return {
    id,
    bulk_emails,
    start_date,
    end_date,
    clicks,
    status
  };
}

const data = [
  createData('Email 1', '01-January-2020', '01-March-2020', '14k', 'Active'),
  createData('Email 2', '02-January-2020', '01-February-2020', '18k', 'Inactive'),
  createData('Email 3', '04-January-2020', '01-April-2020', '13k', 'Active'),
  createData('Email 4', '05-January-2020', '01-September-2020', '35k', 'Inactive'),
  createData('Email 5', '01-February-2020', '01-October-2020', '24k', 'Active'),
  createData('Email 6', '05-February-2020', '08-October-2020', '45k', 'Inactive'),
  createData('Email 7', '14-February-2020', '12-October-2020', '68k', 'Active'),
];

class BulkEmailTable extends React.Component {
  state = {
    redirect: false,
    newBulkEmail: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  setNewBulkEmail = () => {
    this.setState({
      newBulkEmail: true
    })
  }
  renderNewBulkEmail = () => {
    if (this.state.newBulkEmail) {
      return <Redirect to='/client/bulk-emails' />
    }
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/client/email-details' />
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {this.renderRedirect()}
        {this.renderNewBulkEmail()}
        <div className={classes.rootTable} style={{ wordBreak: 'normal' }}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Ongoing Bulk Emails</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Add Bulk Email">
                <Button variant="contained" onClick={() => this.setNewBulkEmail()} color="secondary" className={classes.button}>
                  <AddIcon className={classNames(isWidthUp('sm', 'sm') && classes.leftIcon, classes.iconSmall)} />
                  {isWidthUp('sm', 'sm') && 'New Bulk Email'}
                </Button>
              </Tooltip>
            </div>
          </Toolbar>
          <Table className={classNames(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
                <TableCell padding="default">Bulk Email Title</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Clicks</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => ([
                <TableRow key={n.id} onClick={this.setRedirect}>
                  <TableCell padding="default">{n.bulk_emails}</TableCell>
                  <TableCell align="left">{n.start_date}</TableCell>
                  <TableCell align="left">{n.end_date}</TableCell>
                  <TableCell align="left">{n.clicks}</TableCell>
                  <TableCell align="left">{n.status}</TableCell>
                </TableRow>
              ]))}
            </TableBody>
          </Table>
        </div >
      </Fragment>
    );
  }
}

BulkEmailTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulkEmailTable);
