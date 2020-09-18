import React, { Component, Fragment } from 'react'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { getData, postData } from 'dan-helpers/request';
import { setNotif } from 'dan-actions/NotifActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeSecureDecrypt } from 'dan-helpers/security';
import Loading from 'dan-components/Loading';
import styles from './list-jss';

class ViewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: [],
      userId: '',
      total_shortlisted: '',
      interested: '',
      applied: '',
      defaultID: '',
      listData: false,
      shortListData: false
    }
  }

  componentDidMount() {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    this.setState({ userId: user.id })
    this.getListData(0, 24);
    this.getShortList(user.id)
  }

  getShortList = (userId) => {
    getData(`${API_URL}/utils/get-shortlist-count?user_id=${userId}`)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ interested: res.data[0].interested, applied: res.data[1].applied, total_shortlisted: res.data[2].total_shortlisted, listData: true });
        }
        else {
          console.log('something not good')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getListData = (offset, rows) => {
    getData(`${API_URL}/utils/get-lists?offset=${offset}&rows=${rows}`)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ card: res.data, shortListData: true })
          if (res.data.length != 0) {
            this.setState({ defaultID: res.data[0].id })
          }
        }
        else {
          console.log('something not good')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRedirectShortList = (type) => {
    const { defaultID } = this.state;
    this.props.history.push(`/student/table-List/${btoa(defaultID)}#${type}`);
  }

  handleRedirect = (id) => {
    const { userId } = this.state
    const data = {
      student_id: userId,
      action: 'list_click',
      role_id: id,
      notes: '',
    }
    postData(`${API_URL}/utils/generate-log`, data)
      .then((res) => {
        if (res.status === 1) {

        }
      })
      .catch((err) => {
        console.error(err);
      });

    this.props.history.push(`/student/table-List/${btoa(id)}`);
  }

  render() {
    const { classes } = this.props;
    const { card, total_shortlisted, interested, applied, shortListData, listData } = this.state;

    const renderCard = card.map((item, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
          <Card className="Card">
            <CardHeader className={classes.cardTitle}
              title={item.title}
            />
            <CardMedia
              component="img"
              className={classes.media}
              image={item.img_url}
            />
            <CardContent className={classes.content}>
              <Typography color="textSecondary" component="p" className={classes.cardDesc}>
                {item.description}
              </Typography>
            </CardContent>
            <Grid style={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" onClick={(e) => this.handleRedirect(item.id)} className={classes.cardButton}>
                View List
              </Button>
            </Grid>
          </Card>
        </Grid>
      )
    });

    return (
      <Fragment>
        {(shortListData && listData) ?
          <Grid container direction="row" spacing={2} >
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Typography variant="h4" color="primary" className={classes.heading}>
                My ShortList
              </Typography>
              <Divider />
              <Grid>
                <Card className="Card" className={classes.card}>
                  <Typography variant="h6" color="secondary">
                    Shortlisted
                  </Typography>
                  <CardContent>
                    <Typography variant="body1" color="textSecondary">
                      {total_shortlisted}&nbsp;&nbsp;Rows
                    </Typography>
                  </CardContent>
                  <Button variant="contained" onClick={(e) => this.handleRedirectShortList('all')} color="primary" >
                    View List
                  </Button>
                </Card>
              </Grid>
              <Grid>
                <Card className="Card" className={classes.card}>
                  <Typography variant="h6" color="secondary">
                    Applied
                  </Typography>
                  <CardContent>
                    <Typography variant="body1" color="textSecondary">
                      {applied}&nbsp;&nbsp;Rows
                    </Typography>
                  </CardContent>
                  <Button variant="contained" onClick={(e) => this.handleRedirectShortList('applied')} color="primary" >
                    View List
                  </Button>
                </Card>
              </Grid>
              <Grid>
                <Card className="Card" className={classes.card}>
                  <Typography variant="h6" color="secondary">
                    Interested
                  </Typography>
                  <CardContent>
                    <Typography variant="body1" color="textSecondary">
                      {interested}&nbsp;&nbsp;Rows
                    </Typography>
                  </CardContent>
                  <Button variant="contained" onClick={(e) => this.handleRedirectShortList('interested')} color="primary" >
                    View List
                  </Button>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Typography variant="h4" color="primary" className={classes.heading} style={{ textAlign: 'left' }}>
                VCH Lists
              </Typography>
              <Divider />
              <Grid className={classes.button}  >
                <Button variant="contained" color="#696969" style={{ borderRadius: '6px' }}>
                  + Consultancy
                </Button>
                <Button variant="contained" color="#696969" style={{ borderRadius: '6px' }}>
                  + Accountancy
                 </Button>
                <Button variant="contained" color="#696969" style={{ borderRadius: '6px' }}>
                  + Finance
                </Button>
                <Button variant="contained" color="#696969" style={{ borderRadius: '6px' }}>
                  + Engineering
                 </Button>
                <Button variant="contained" color="#696969" style={{ borderRadius: '6px' }}>
                  + Architecture
                </Button>
                <Button variant="contained" color="#696969" style={{ borderRadius: '6px' }}>
                  + Law
                </Button>
                <Button variant="contained" color="#696969" style={{ borderRadius: '6px' }}>
                  + Property
                </Button>
                <Button variant="contained" color="#696969" style={{ borderRadius: '6px' }}>
                  + FMCGs
                </Button>
                <Button variant="contained" color="#696969" style={{ borderRadius: '6px' }}>
                  + Recruiting
                </Button>
              </Grid>
              <Grid container spacing={2} style={{ alignItems: 'right', marginTop: 5 }}>
                {renderCard}
              </Grid>
            </Grid>
          </ Grid >
          : <Loading />
        }
      </Fragment>
    )
  }
}

ViewList.propTypes = {
  setNotif: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setNotif: bindActionCreators(setNotif, dispatch)
});

const ViewListMapped = connect(
  null,
  mapDispatchToProps
)(ViewList);

export default withStyles(styles)(ViewListMapped);
