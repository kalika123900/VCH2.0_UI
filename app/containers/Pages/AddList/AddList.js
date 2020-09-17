import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TextareaAutosize, Checkbox, ListItemText } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { postFormData, getData } from 'dan-helpers/request';
import { sectorsData } from 'dan-api/apps/profileOption';
import { setNotif } from 'dan-actions/NotifActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'dan-components/Loading/CircularProgress';
const useStyles = () => ({
  formControl: {
    minWidth: '250PX',
  },
  root: {
    flexGrow: 1,
  },
  textArea: {
    minHeight: '75px',
    width: '100%',
    maxHeight: '75px'
  },
  selectEmpty: {
    marginTop: '10px',
  },
  button: {
    borderRadius: '6px',
    color: 'black',
    padding: '10px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  }
});
class AddList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editList: [],
      listID: '',
      title: "",
      description: '',
      industry: [],
      list_image: '',
      list: '',
      isLoading: false,
      isEdit: false,
    }

  }
  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    if (e.target.name == 'list_image' || e.target.name == 'list')
      this.setState({ [e.target.name]: e.target.files[0] })
    else
      this.setState({ [e.target.name]: e.target.value })
  }
  componentDidMount() {
    this.getListData(0, 30)
  }
  getListData = (offset, rows) => {
    getData(`${API_URL}/utils/get-lists?offset=${offset}&rows=${rows}`)
      .then((res) => {
        if (res.status === 1) {
          this.setState({ editList: res.data })
        }
        else {
          console.log('something not good')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleSubmit = (e) => {
    this.setState({ isLoading: true })
    const { title, description, industry, list_image, list, listID, isEdit } = this.state;
    const data = new FormData();
    data.append('title', title)
    data.append('description', description)
    data.append('industries', JSON.stringify(industry))
    data.append('list_image', list_image)
    data.append('list', list)
    if (isEdit) {
      data.append('listID', listID)
      postFormData(`${API_URL}/admin/update-list`, data) // eslint-disable-line
        .then((res) => {
          if (res.status === 1) {
            this.props.setNotif({
              message: 'Update Successful',
              variant: 'success'

            });
            this.setState({ title: '', description: '', industry: [], list_image: '', list: '', isLoading: false, isEdit: false })
          }
          else {
            this.props.setNotif({
              message: 'Somthing went Wrong',
              variant: 'error'
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ isLoading: false })
        });
    }
    else {
      postFormData(`${API_URL}/admin/upload-list`, data) // eslint-disable-line
        .then((res) => {
          if (res.status === 1) {
            this.props.setNotif({
              message: 'upload successful',
              variant: 'success'

            });
            this.setState({ title: '', description: '', industry: [], list_image: '', list: '', isLoading: false, })
          }
          else {
            this.props.setNotif({
              message: 'Somthing went Wrong',
              variant: 'error'
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ isLoading: false })
        });
    }
  }
  handleEditList = (e) => {
    const that = this;
    const { editList } = this.state;
    if (e.target.value !== '' || e.target.value === 0) {
      const MappedEditData = editList.map((item, index) => {
        if (index === e.target.value) {
          this.setState({ isEdit: true, listID: item.id, title: item.title, description: item.description, industry: JSON.parse(item.industries), list_image: item.img_url })
          console.log(JSON.parse(item.industries))
          return item
        }
      });
    }
    else {
      this.setState({ isEdit: false, listID: '', title: '', description: '', industry: [], list_image: '' })
    }
  }

  render() {
    const { classes } = this.props;
    const { age, industry, list, list_image, title, description, isLoading, listID, editList, isEdit } = this.state
    return (
      <Grid className={classes.root2} container spacing={2} >
        <Grid item xs={3} style={{ alignItems: 'center', backgroundColor: "#eae8e8" }}  >
        </Grid>
        <Grid item xs={6} className='' style={{ padding: '30px' }}>
          <Typography variant="h4" component="h1" style={{ marginTop: '10px' }}>
            Add/Edit List
          </Typography>
          <Grid style={{ alignItems: 'center', marginTop: '20px' }} item xs={12}>
            <TextField className="text" variant="outlined" name="title" value={title} onChange={this.handleChange} placeholder="List Title" />
            <FormControl variant="outlined" className={classes.formControl} style={{ marginLeft: '20px' }} >
              <InputLabel id="demo-simple-select-outlined-label">Select List to Edit</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={title}
                name='listID'
                onChange={this.handleEditList}
                label="Select List to Edit"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {editList.map((item, index) => (

                  < MenuItem key={index} value={index} >
                    {item.title}
                  </MenuItem>
                )
                )}
              </Select>
            </FormControl>

          </Grid>
          <Grid style={{ marginTop: '20px' }}>
            <TextareaAutosize aria-label="" className={classes.textArea} rowsMin={10} name="description" value={description} onChange={this.handleChange} placeholder="List description (Max 30 words)" />
          </Grid>
          <Grid style={{ marginTop: '20px' }}>
            <Select
              style={{ maxWidth: '100%', minWidth: '100%' }}
              multiple
              value={industry}
              name="industry"
              renderValue={selected => {
                const interestsName = [];
                sectorsData.map((value, index) => {
                  if (selected.includes(value)) {
                    interestsName.push(value);
                  }
                });
                return interestsName.join(', ');
              }}
              onChange={this.handleChange}
            >
              {sectorsData.map((item, index) => (

                < MenuItem key={index} value={item} >
                  <TextField
                    name="industry"

                    component={Checkbox}
                    checked={industry.indexOf(item) > -1}
                  />
                  <ListItemText primary={item} />
                </MenuItem>
              )
              )}
            </Select>

          </Grid>
          <Grid style={{ marginTop: '20px' }}>
            <PublishIcon style={{ width: '48px', height: '70px' }} />
            <input type="file" id="file" accept="image/*" style={{ display: 'none' }} name="list_image" onChange={this.handleChange} />
            <label htmlFor="file" className={classes.button} style={{ backgroundColor: '#e7e7e7' }} >Add List Image</label>
            {(list_image instanceof File) ?
              <span style={{ textDecoration: 'underline', color: 'grey', paddingLeft: '10px', fontSize: '13px' }}>{list_image.name}</span>
              : isEdit ?
                <span style={{ textDecoration: 'underline', color: 'grey', paddingLeft: '10px', fontSize: '13px' }}>{list_image}></span>
                : ""
            }

          </Grid>

          <Grid style={{ marginTop: '20px' }}>
            <PublishIcon style={{ width: '48px', height: '70px' }} />
            <input type="file" id="file1" style={{ display: 'none' }} accept=".xlsx, .xls, .csv" name="list" onChange={this.handleChange} />
            <label htmlFor="file1" className={classes.button} style={{ backgroundColor: '#e7e7e7' }} >Add List Excel Document</label>
            {list &&
              <span style={{ textDecoration: 'underline', color: 'grey', paddingLeft: '10px', fontSize: '15px' }}>{list.name}</span>
            }
          </Grid>
          <Grid style={{ marginTop: '50px' }}>
            {!isLoading ?
              <Button variant="contained" onClick={this.handleSubmit} style={{ backgroundColor: "green", borderRadius: '6px', color: 'white' }}>
                Save
           </Button> : <CircularProgress />}
          </Grid>
        </Grid>
        <Grid item xs={3} style={{ alignItems: 'center', backgroundColor: "#eae8e8" }}  >
        </Grid>
      </Grid >
    )
  }
}
AddList.propTypes = {
  setNotif: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setNotif: bindActionCreators(setNotif, dispatch)
});

const AddListMapped = connect(
  null,
  mapDispatchToProps
)(AddList);
export default withStyles(useStyles)(AddListMapped)