import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Add from '@material-ui/icons/Add';
import Star from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import styles from './contact-jss';
import { fetchAction } from 'dan-actions/ContactActions';

class ContactList extends React.Component {
  state = {
    filter: 'all',
    selectAll: false,
    sendIcon: false
  };

  handleChange = (event, value) => {
    this.setState({ filter: value });
  };

  selectAllContact = e => {
    const MappedDataContact = this.props.dataContact.toJS();
    const newDataContact = MappedDataContact.map(item => {
      return {
        ...item,
        selected: e.target.checked
      }
    });

    this.props.fetchData(newDataContact)
    this.setState({ selectAll: e.target.checked, sendIcon: e.target.checked });
  }

  selectContact = (e, id) => {
    const MappedDataContact = this.props.dataContact.toJS();
    const newDataContact = MappedDataContact.map(item => {
      if (item.id == id) {
        return {
          ...item,
          selected: e.target.checked
        }
      }
      return {
        ...item
      }
    });

    this.props.fetchData(newDataContact);
    this.setState({ sendIcon: e.target.checked });
  }

  render() {
    const {
      classes,
      dataContact,
      itemSelected,
      showDetail,
      search,
      keyword,
      clippedRight,
      addContact,
      addFn, total
    } = this.props;
    const { filter, selectAll, sendIcon } = this.state;

    const favoriteData = dataContact.filter(item => item.get('favorited') === true);

    const getItem = dataArray => dataArray.map(data => {
      const index = dataContact.indexOf(data);
      if (data.get('name').toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
      return (
        <Grid className={classes.checkGrid} key={data.get('id')}>
          <Checkbox
            checked={data.get('selected')}
            className={data.get('selected') ? '' : classes.checkItem}
            onChange={e => this.selectContact(e, data.get('id'))}
          />
          <ListItem
            button
            className={index === itemSelected ? classes.selected : ''}
            onClick={() => showDetail(data)}
          >
            <ListItemAvatar>
              <Avatar alt={data.get('name')} src={data.get('avatar')} className={classes.avatar} />
            </ListItemAvatar>
            <ListItemText primary={data.get('name')} secondary={data.get('title')} />
          </ListItem>
        </Grid>
      );
    });

    return (
      <Fragment>
        <Drawer
          variant="permanent"
          anchor="left"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <div className={classNames(classes.toolbar, clippedRight && classes.clippedRight)}>
              <div className={classes.flex}>
                <Tooltip title="Select all">
                  <Checkbox checked={selectAll} onChange={e => this.selectAllContact(e)} />
                </Tooltip>
                {sendIcon &&
                  <Tooltip title="Send Email">
                    <SendIcon onClick={this.props.compose} style={{ margin: 3, cursor: 'pointer' }} />
                  </Tooltip>
                }
                <div className={classes.searchWrapper}>
                  <div className={classes.search}>
                    <SearchIcon />
                  </div>
                  <input className={classes.input} onChange={(event) => search(event)} placeholder="Search" />
                </div>
              </div>
            </div>
            <div className={classes.total}>
              {total}
              &nbsp;
              Contacts
            </div>
            <List>
              {filter === 'all' ? getItem(dataContact) : getItem(favoriteData)}
            </List>
          </div>
        </Drawer>
        <BottomNavigation value={filter} onChange={this.handleChange} className={classes.bottomFilter}>
          <BottomNavigationAction label="All" value="all" icon={<PermContactCalendar />} />
          <BottomNavigationAction label="Favorites" value="favorites" icon={<Star />} />
        </BottomNavigation>
      </Fragment>
    );
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  dataContact: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  itemSelected: PropTypes.number.isRequired,
  addContact: PropTypes.func,
  addFn: PropTypes.bool,
  showDetail: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  clippedRight: PropTypes.bool,
};

ContactList.defaultProps = {
  clippedRight: false,
  addContact: () => { },
  addFn: false,
};

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
});

const ContactListMapped = connect(
  null,
  constDispatchToProps
)(ContactList);

export default withStyles(styles)(ContactListMapped);
