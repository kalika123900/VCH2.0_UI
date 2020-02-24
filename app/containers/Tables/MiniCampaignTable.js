import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
  createData('Campaign 1', '01-January-2020', '14k'),
  createData('Campaign 2', '02-January-2020', '18k'),
  createData('Campaign 3', '04-January-2020', '13k'),
  createData('Campaign 4', '05-January-2020', '35k'),
  createData('Campaign 5', '01-February-2020', '24k'),
];

class MiniCampaignTable extends React.Component {

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
      return <Redirect to='/client/campaigns' />
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
              <Typography variant="h6">Recent Campaigns</Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Add Campaign">
                <Button variant="contained" onClick={this.setRedirect} color="secondary" className={classes.button}>
                  <AddIcon className={classNames(isWidthUp('sm', 'sm') && classes.leftIcon, classes.iconSmall)} />
                  {isWidthUp('sm', 'sm') && 'New Campaign'}
                </Button>
              </Tooltip>
            </div>
          </Toolbar>
          <Table className={classNames(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
                <TableCell padding="default">Campaign Name</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Views</TableCell>
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

MiniCampaignTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniCampaignTable);
