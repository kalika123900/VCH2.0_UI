import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import formatDate from '../../../Helpers/formatDate';

function createData(id, client, campaign, create_date) {
  return {
    id,
    client,
    campaign,
    create_date,
  };
}

class AwaitingCampaigns extends React.Component {
  state = {
    redirect: false,
    isCampaigns: false,
    campaignId: null,
    campaignData: [],
    page: 0,
    rowsPerPage: 5
  }

  setRedirect = (id) => {
    this.setState({
      redirect: true,
      campaignId: id
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/admin/campaign-review/${btoa(this.state.campaignId)}`} />;
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentDidMount() {
    const _that = this;
    async function getData(url) {
      const response = await fetch(url, {
        method: 'GET',
      });

      return await response.json();
    }

    getData(`${API_URL}/campaign/pending-campaigns`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            const campaignData = [];
            res.data.map(item => {
              const name = item.name;
              item.campaign_masters.map(campaign => {
                const date = formatDate(campaign.created_at);
                campaignData.push(
                  createData(campaign.id, name, campaign.campaign_name, date)
                );
              });
              _that.setState({ campaignData });
            });
            this.setState({ isCampaigns: true });
          } else {
            this.setState({ isCampaigns: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { isCampaigns, rowsPerPage, page, campaignData } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, campaignData.length - (page * rowsPerPage));

    if (isCampaigns == false) return null;
    return (
      <Fragment>
        {this.renderRedirect()}
        <div className={classes.rootTable} style={{ wordBreak: 'normal' }}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Recent Awaiting Campaigns</Typography>
            </div>
            <div className={classes.spacer} />
          </Toolbar>
          {campaignData.length > 0
            ? (
              <Table className={classNames(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="default">Client Name</TableCell>
                    <TableCell padding="default">Campaign Name</TableCell>
                    <TableCell align="left">Create Date</TableCell>
                    {/* <TableCell align="left">Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaignData.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
                    <TableRow key={n.id} onClick={() => this.setRedirect(n.id)}>
                      <TableCell padding="default">{n.client}</TableCell>
                      <TableCell padding="default">{n.campaign}</TableCell>
                      <TableCell align="left">{n.create_date}</TableCell>
                      {/* <TableCell align="left">
                        <Button>
                          <DeleteIcon />
                        </Button>
                      </TableCell> */}
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
                      count={campaignData.length}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[5, 10, 15]}
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
                No Awaiting campaigns !
              </Typography>
            )
          }
        </div>
      </Fragment>
    );
  }
}

AwaitingCampaigns.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AwaitingCampaigns);
