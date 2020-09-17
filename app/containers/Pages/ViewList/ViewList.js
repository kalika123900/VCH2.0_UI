import React, { Component, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
import { ITEM_TYPES } from 'react-ultimate-pagination';
import { setNotif } from 'dan-actions/NotifActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeSecureDecrypt } from 'dan-helpers/security';
import Loading from 'dan-components/Loading';

const useStyles = () => ({
  Subheading: {
    maxHeight: '100%',
    minHeight: '30px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
      textOverflow: 'clip',
      whiteSpace: 'normal'
    }
  },
  root: {
    maxWidth: '345px',
  },
  root2: {
    flexGrow: 1,
  },
  media: {
    height: '100%',
    width: '100%',
  },
  button: {
    '& > *': {
      margin: '10px',
    },
  },
  text: {
    width: '55px',
    marginRight: '25px',
    height: '2px',
    padding: '0'
  }
});
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
          this.setState({ interested: res.data[0].interested, applied: res.data[1].applied, total_shortlisted: res.data[2].total_shortlisted, listData: true })

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
        console.log(err);
      });

    this.props.history.push(`/student/table-List/${btoa(id)}`);
  }
  render() {
    const { classes } = this.props;
    const { card, total_shortlisted, interested, applied, shortListData, listData } = this.state;
    const renderCard = card.map((item, index) => {
      return (
        <Grid item xs={4} key={index}>
          <Card className="Card" style={{ maxWidth: "345px", textOverflow: 'ellipsis', }}>
            <CardHeader className='card' style={{ minHeight: '100px', maxHeight: '100px', textOverflow: 'ellipsis', overflow: 'hidden' }}

              title={item.title}
            />
            <CardMedia
              component="img"
              className={classes.media}
              image={item.img_url}

            />
            <CardContent>
              <Typography variant="body2" className={classes.Subheading} color="textSecondary" component="p">
                {item.description}
              </Typography>
              <Grid alignItems="center" container
                direction="row"
                justify="center"
                margin-b
              >
                <Button variant="contained" color="primary" onClick={(e) => this.handleRedirect(item.id)} style={{ marginTop: '30px' }}>
                  View List
                 </Button>
              </Grid>
            </CardContent>

          </Card>
        </Grid>
      )
    })
    return (
      <Fragment>
        {(shortListData && listData) ?
          <Grid className={classes.root2} container spacing={2} >

            <Grid item xs={3} style={{ alignItems: 'center' }}  >
              <img src="/images/logo.png" alt="logo" style={{ height: '10px', width: '100%' }} />
              <Typography variant="h4" component="h2" style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                My ShortList
          </Typography>
              <Divider />
              <Grid>
                <Card className="Card" style={{ maxWidth: "100%", textAlign: 'center', marginTop: '10px' }}>
                  My Shortlist
              <CardContent>
                    <TextField className={classes.text} value={total_shortlisted} variant="outlined" disabled={true} />
                Rows
              </CardContent>
                  <Grid alignItems="center" container
                    direction="row"
                    justify="center"
                    margin-b
                  >
                    <Button variant="contained" onClick={(e) => this.handleRedirectShortList('all')} color="primary" style={{ marginBottom: '30px', marginTop: '30px' }}>
                      View List
                 </Button>
                  </Grid>

                </Card>
              </Grid>
              <Grid>
                <Card className="Card" style={{ maxWidth: "100%", textAlign: 'center', marginTop: '10px' }}>
                  Applied
              <CardContent>
                    <TextField className={classes.text} value={applied} disabled={true} variant="outlined" />
                Rows
              </CardContent>
                  <Grid alignItems="center" container
                    direction="row"
                    justify="center"
                    margin-b
                  >
                    <Button variant="contained" onClick={(e) => this.handleRedirectShortList('applied')} color="primary" style={{ marginBottom: '30px', marginTop: '30px' }}>
                      View List
                 </Button>
                  </Grid>

                </Card>
              </Grid>
              <Grid>
                <Card className="Card" style={{ maxWidth: "100%", textAlign: 'center', marginTop: '10px' }}>
                  Interested
              <CardContent>
                    <TextField className={classes.text} value={interested} disabled={true} variant="outlined" />
                Rows
              </CardContent>
                  <Grid alignItems="center" container
                    direction="row"
                    justify="center"
                    margin-b
                  >
                    <Button variant="contained" onClick={(e) => this.handleRedirectShortList('interested')} color="primary" style={{ marginBottom: '30px', marginTop: '30px' }}>
                      View List
                 </Button>
                  </Grid>

                </Card>
              </Grid>

            </Grid>
            <Grid item xs={9} >
              <Typography variant="h4" component="h1" style={{ marginTop: '10px' }}>
                VCH Lists
          </Typography>
              <Divider variant="inset" />
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
              </Grid>
              <Grid className={classes.button}>
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
              <Grid container spacing={3} style={{ alignItems: 'right' }}>
                {renderCard}
              </Grid>
            </Grid>
          </ Grid >
          : <Loading />}
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

export default withStyles(useStyles)(ViewListMapped)