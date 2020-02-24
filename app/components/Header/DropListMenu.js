import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ExpandMore from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styles from './header-jss';

const LinkBtn = React.forwardRef((props, ref) => <NavLink to={props.to} {...props} innerRef={ref} />); // eslint-disable-line

// eslint-disable-next-line
class DropListMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [],
      openMenu: [],
      anchorEl: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
  }

  componentDidMount() {
    const { open } = this.props;
    setTimeout(() => {
      this.setState({ active: open });
    }, 50);
  }

  handleOpenMenu = (event, key, keyParent) => {
    const { openSubMenu } = this.props;
    openSubMenu(key, keyParent);
    this.setState({ anchorEl: event.currentTarget });
    setTimeout(() => {
      this.setState({
        openMenu: this.props.open, // eslint-disable-line
      });
    }, 50);
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ openMenu: [] });
  }

  handleActiveParent = key => {
    this.setState({
      active: [key],
      openMenu: []
    });
  }

  render() {
    const { classes, open, dataMenu } = this.props;
    const { active, openMenu, anchorEl } = this.state;
    const getMenus = (parent, menuArray) => menuArray.map((item, index) => {
      if (item.multilevel) {
        return false;
      }
      if (item.child) {
        return (
          <div key={index.toString()}>
            <Button
              aria-owns={open ? 'menu-list-grow' : undefined}
              buttonRef={node => {
                this.anchorEl = node;
              }}
              className={
                classNames(
                  classes.headMenu,
                  open.indexOf(item.key) > -1 ? classes.opened : '',
                  active.indexOf(item.key) > -1 ? classes.selected : ''
                )
              }
              onClick={(event) => this.handleOpenMenu(event, item.key, item.keyParent)}
              style={{ color: 'white' }}
            >
              {item.name}
              <ExpandMore className={classes.rightIcon} />
            </Button>
            <Popper
              open={openMenu.indexOf(item.key) > -1}
              anchorEl={anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom', background: '#3f51b5' }}
                >
                  <Paper className={classes.dropDownMenu}>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <List role="menu" component="nav" style={{ overflow: 'hidden' }} className={classes.paperMenu}>
                        {getMenus(item.key, item.child)}
                      </List>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        );
      }
      if (item.title) {
        return false;
      }
      return (
        <ListItem
          key={index.toString()}
          exact
          component={LinkBtn}
          to={item.link}
          onClick={() => this.handleActiveParent(parent)}
          className={(classes.menuItem, classes.headMenu)}
        >
          <ListItemText className={classes.menuitemColor} primary={item.name} />
        </ListItem>
      );
    });
    return (
      <nav className={classes.DropListMenu}>
        <div>
          {getMenus(null, dataMenu)}
        </div>
      </nav>
    );
  }
}

DropListMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  dataMenu: PropTypes.array.isRequired
};

const openAction = (key, keyParent) => ({ type: 'OPEN_SUBMENU', key, keyParent });
const reducer = 'ui';

const mapStateToProps = state => ({
  force: state, // force active class for sidebar menu
  open: state.getIn([reducer, 'subMenuOpen'])
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch)
});

const DropListMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropListMenu);

export default withStyles(styles)(DropListMenuMapped);
