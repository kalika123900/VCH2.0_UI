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
import styles from 'dan-components/Tables/tableStyle-jss';
import DeleteIcon from '@material-ui/icons/Delete';
import { CampaignFilter } from 'dan-components';
import Grid from '@material-ui/core/Grid';

let id = 0;
function createData(campaigns, client_name, start_date, end_date, views, auth_status, status) {
  id += 1;
  return {
    id,
    campaigns,
    client_name,
    start_date,
    end_date,
    views,
    auth_status,
    status
  };
}

const data = [
  createData('Campaign 1', 'Lorem Ipsum', '01-January-2020', '01-March-2020', '14k', 'Approved', 'Active'),
  createData('Campaign 2', 'Lorem Ipsum', '02-January-2020', '01-February-2020', '18k', 'Pending', 'Inactive'),
  createData('Campaign 3', 'Lorem Ipsum', '04-January-2020', '01-April-2020', '13k', 'Pending', 'Active'),
  createData('Campaign 4', 'Lorem Ipsum', '05-January-2020', '01-September-2020', '35k', 'Pending', 'Inactive'),
  createData('Campaign 5', 'Lorem Ipsum', '01-February-2020', '01-October-2020', '24k', 'Approved', 'Active'),
  createData('Campaign 6', 'Lorem Ipsum', '05-February-2020', '08-October-2020', '45k', 'Pending', 'Inactive'),
  createData('Campaign 7', 'Lorem Ipsum', '14-February-2020', '12-October-2020', '68k', 'Approved', 'Active'),
];



class CampaignTable extends React.Component {
  state = {
    redirect: false,
    showFilter: false,
    btnText: "Show Filter",
  }

  handleFilter = () => {
    if (this.state.showFilter) {
      this.setState({ showFilter: false, btnText: "Show Filter" })
    } else {
      this.setState({ showFilter: true, btnText: "Hide Filter" })
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true,
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/admin/campaign-review' />
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {this.renderRedirect()}
        <Grid style={{ width: '100%' }}>
          {this.state.showFilter && <CampaignFilter />}
        </Grid>
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Campaigns</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="filter">
                <Button variant="contained" onClick={(e) => this.handleFilter(e)} color="primary" className={classes.button}>
                  {isWidthUp('sm', 'sm') && this.state.btnText}
                </Button>
              </Tooltip>
            </div>
          </Toolbar>
          <Table className={classNames(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
                <TableCell padding="default">ID</TableCell>
                <TableCell padding="left">Campaign Name</TableCell>
                <TableCell padding="left">Client Name</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Views</TableCell>
                <TableCell align="left">Authorization Status</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => ([
                <TableRow key={n.id} onClick={this.setRedirect}>
                  <TableCell padding="default">{n.id}</TableCell>
                  <TableCell padding="left">{n.campaigns}</TableCell>
                  <TableCell padding="left">{n.client_name}</TableCell>
                  <TableCell align="left">{n.start_date}</TableCell>
                  <TableCell align="left">{n.end_date}</TableCell>
                  <TableCell align="left">{n.views}</TableCell>
                  <TableCell align="left">{n.auth_status}</TableCell>
                  <TableCell align="left">{n.status}</TableCell>
                  <TableCell align="left"> <Button><DeleteIcon /></Button></TableCell>
                </TableRow>
              ]))}
            </TableBody>
          </Table>
        </div >
      </Fragment>
    );
  }
}

CampaignTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignTable);
