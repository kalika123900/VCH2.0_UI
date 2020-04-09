import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from './email-jss';

const recentCampaign = [
  'Development Campaign',
  'Test Development',
  'Testing Campaign'
];


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class EmailHeader extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }
  state = {
    cname: 'Test Development'
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, search, handleDrawerToggle } = this.props;
    const { cname } = this.state;

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerToggle()}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.flex}>
            <div className={classes.wrapper}>
              <div className={classes.search}>
                <SearchIcon />
              </div>
              <input className={classes.input} onChange={(event) => search(event)} placeholder="Search Email" />
            </div>
            {this.props.userType == 'CLIENT' &&
              <div className={classes.selectWrapper}>
                <Select
                  placeholder="Recent Campaign"
                  value={cname}
                  name="cname"
                  onChange={(e) => this.handleChange(e)}
                  MenuProps={MenuProps}
                  style={{ width: '100%' }}
                >
                  {recentCampaign.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            }
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

EmailHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

const reducerA = 'Auth';
const mapStateToProps = state => ({
  userType: state.getIn([reducerA, 'userType'])
});

const EmailHeaderMapped = connect(
  mapStateToProps
)(EmailHeader);

export default withStyles(styles)(EmailHeaderMapped);
