import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import DeleteIcon from '@material-ui/icons/Delete';

let id = 0;
function createData(client, bulk_email, create_date) {
  id += 1;
  return {
    id,
    client,
    bulk_email,
    create_date,
  };
}

const data = [
  createData('Jhone Doe', 'Bulk Email 1', '01-January-2020'),
  createData('Jhone Doe', 'Bulk Email 2', '02-January-2020'),
  createData('Jhone Doe', 'Bulk Email 3', '04-January-2020'),
  createData('Jhone Doe', 'Bulk Email 4', '05-January-2020'),
  createData('Jhone Doe', 'Bulk Email 5', '01-February-2020'),
  createData('Jhone Doe', 'Bulk Email 6', '05-February-2020'),
  createData('Jhone Doe', 'Bulk Email 7', '14-February-2020'),
];

class BulkEmailTable extends React.Component {
  state = {
    redirect: false,
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {/* {this.renderRedirect()} */}
        <div className={classes.rootTable} >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Recent Awaiting Bulk Emails</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          <Table className={classNames(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
                <TableCell padding="default">Client Name</TableCell>
                <TableCell align="left">Bulk Email Heading</TableCell>
                <TableCell align="left">Create Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => ([
                <TableRow key={n.id}>
                  <TableCell padding="default">{n.client}</TableCell>
                  <TableCell align="left">{n.bulk_email}</TableCell>
                  <TableCell align="left">{n.create_date}</TableCell>
                  <TableCell align="left">
                    <Button >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
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
