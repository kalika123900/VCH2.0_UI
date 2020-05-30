import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {
  setRecentCampaign
} from 'dan-actions/EmailActions';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from './email-jss';
import qs from 'qs';
import { makeSecureDecrypt } from 'dan-helpers/security';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(data)
  });
  return await response.json();
}


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
  state = {
    cname: 'All Messages',
    recentCampaign: [{ id: -1, campaign_name: 'All Messages' }]
  }

  getRecentCampaign = () => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    const data = {
      company_id: user.cId
    }

    postData(`${API_URL}/campaign/get-recent-campaign`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          let data = [{ id: -1, campaign_name: 'All Messages' }]
          if (res.data.length > 0) {
            res.data.map(item => {
              data.push(item)
            })
          }
          this.setState({ recentCampaign: data })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.state.recentCampaign.map(item => {
      if (item.campaign_name == event.target.value)
        this.props.addInfo({ id: item.id })
    })
  };

  componentDidMount() {
    this.getRecentCampaign();
  }

  render() {
    const { classes, search, handleDrawerToggle } = this.props;
    const { cname, recentCampaign } = this.state;

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
            <div className={classes.wrapper} style={{ width: '100%' }}>
              <div className={classes.search}>
                <SearchIcon />
              </div>
              <input className={classes.input} onChange={(event) => search(event)} placeholder="Search Email" />
            </div>
            {(this.props.userType == 'CLIENT' && this.props.currentPage != 'bulkemail') &&
              <div className={classes.selectWrapper}>
                <Select
                  value={cname}
                  name="cname"
                  onChange={(e) => this.handleChange(e)}
                  MenuProps={MenuProps}
                  style={{ width: '100%' }}
                >
                  {recentCampaign.map((item, index) => (
                    <MenuItem key={index} value={item.campaign_name} gutters>
                      <ListItemText primary={item.campaign_name} style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }} />
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
const reducer = 'email';
const mapStateToProps = state => ({
  userType: state.getIn([reducerA, 'userType']),
  currentPage: state.getIn([reducer, 'currentPage']),
});


const constDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(setRecentCampaign, dispatch)
});

const EmailHeaderMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(EmailHeader);

export default withStyles(styles)(EmailHeaderMapped);
