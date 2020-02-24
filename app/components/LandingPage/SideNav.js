import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import styles from '../Sidebar/sidebar-jss';

function createData(id, name, url) {
  return {
    id,
    name,
    url,
  };
}

const MenuContent = props => {
  const {
    classes,
    menuList,
    gotoSlide,
    active
  } = props;
  const getMenus = menuArray => menuArray.map((item, index) => (
    <ListItem
      key={index.toString()}
      button
      className={classNames(classes.headCapital, active === item.id && classes.active)}
      to={item.url}
      onClick={() => gotoSlide(item.id)}
    >
      <ListItemText classes={{ primary: classes.primary }} variant="inset" primary={item.name} />
    </ListItem>
  ));
  return (
    <div className={classes.drawerInner}>
      <div className={classes.drawerHeader}>
        <div className={classes.brandBig}>
          <img src={logo} alt={brand.name} />
          <h3>{brand.name}</h3>
        </div>
      </div>
      <div className={classNames(classes.menuContainer, classes.landingNav, classes.rounded)}>
        <List className={classes.dense} component="nav">
          {getMenus(menuList)}
        </List>
        <Typography variant="caption" className={classes.copyright}>
          &copy; 2019 Dandelion Designs
          <br />
          All Right Reserved
        </Typography>
      </div>
    </div>
  );
};

MenuContent.propTypes = {
  classes: PropTypes.object.isRequired,
  active: PropTypes.number.isRequired,
  menuList: PropTypes.array.isRequired,
  gotoSlide: PropTypes.func.isRequired
};

MenuContent.defaultProps = {
  toggleDrawerOpen: () => {},
  loadTransition: () => {},
};

const MenuContentStyle = withStyles(styles)(MenuContent);

class SideNav extends React.Component {
  state = {
    anchor: 'left',
    menuList: [
      createData(0, 'Home', '#banner'),
      createData(1, 'Feature', '#feature'),
      createData(2, 'Showcase', '#showcase'),
      createData(3, 'Testimonials', '#testimonials'),
      createData(4, 'Technology', '#tech'),
      createData(5, 'Pricing', '#pricing'),
      createData(6, 'Contact', '#contact'),
    ]
  };

  render() {
    const { anchor, menuList } = this.state;
    const {
      classes,
      open,
      gotoSlide,
      curSlide
    } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawer, classes.drawerPaper, !open ? classes.drawerPaperClose : ''),
        }}
        open={open}
        anchor={anchor}
      >
        <MenuContentStyle
          drawerPaper={open}
          menuList={menuList}
          gotoSlide={gotoSlide}
          active={curSlide}
        />
      </Drawer>
    );
  }
}

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  gotoSlide: PropTypes.func.isRequired,
  curSlide: PropTypes.number.isRequired,
};

export default withStyles(styles)(SideNav);
