import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';
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
function createData(campaigns, start_date, views) {
  id += 1;
  return {
    id,
    campaigns,
    start_date,
    views,
  };
}

const data = [
  createData('Lorem Ipsum doren', '01-January-2020', '34k'),
  createData('Lorem Ipsum doren', '02-January-2020', '15k'),
  createData('Lorem Ipsum doren', '04-January-2020', '28k'),
  createData('Lorem Ipsum doren', '05-January-2020', '10k'),
  createData('Lorem Ipsum doren', '01-February-2020', '09k'),
];


class MiniBulkEmailTable extends React.Component {
  state = {
    redirect: false,
  }
  setRedirect = () => {
    this.setState({
      redirect: true,
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/client/bulk-emails' />
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {this.renderRedirect()}
        <div className={classes.rootTable}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Bulk Emails</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Add Item">
                <Button variant="contained" onClick={this.setRedirect} color="primary" className={classes.button}>
                  <AddIcon className={classNames(isWidthUp('sm', 'sm') && classes.leftIcon, classes.iconSmall)} />
                  {isWidthUp('sm', 'sm') && 'New Bulk Email'}
                </Button>
              </Tooltip>
            </div>
          </Toolbar>
          <Table className={classNames(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
                <TableCell padding="default">Email Campaign Name</TableCell>
                <TableCell align="left">Sent Date</TableCell>
                <TableCell align="left">Opened Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => ([
                <TableRow key={n.id}>
                  <TableCell padding="default">{n.campaigns}</TableCell>
                  <TableCell align="left">{n.start_date}</TableCell>
                  <TableCell align="left">{n.views}</TableCell>
                </TableRow>
              ]))}
            </TableBody>
          </Table>
        </div>
      </Fragment>
    );
  }
}

MiniBulkEmailTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniBulkEmailTable);
