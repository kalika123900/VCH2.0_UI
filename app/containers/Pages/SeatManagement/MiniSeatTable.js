import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { isWidthUp } from '@material-ui/core/withWidth';

let id = 0;
function createData(name, status) {
  id += 1;
  return {
    id,
    name,
    status
  };
}

const data = [
  createData('Lorem Ipsum', 'Active'),
  createData('Lorem Ipsum', 'Inactive'),
  createData('Lorem Ipsum', 'Active'),
  createData('Lorem Ipsum', 'Inactive'),
  createData('Lorem Ipsum', 'Active'),
];

class MiniSeatTable extends React.Component {
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
      return <Redirect to='/client/seat-management' />
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {this.renderRedirect()}
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Created Seats</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Add Campaign">
                <Button variant="contained" onClick={this.setRedirect} color="secondary" className={classes.button}>
                  <AddIcon className={classNames(isWidthUp('sm', 'sm') && classes.leftIcon, classes.iconSmall)} />
                  {isWidthUp('sm', 'sm') && 'Add New'}
                </Button>
              </Tooltip>
            </div>
          </Toolbar>
          <Table className={classNames(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Profile</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => ([
                <TableRow key={n.id}>
                  <TableCell padding="default"><Avatar className={classes.greenAvatar} >L</Avatar></TableCell>
                  <TableCell padding="default">{n.name}</TableCell>
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

MiniSeatTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniSeatTable);