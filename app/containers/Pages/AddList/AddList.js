import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
import styles from './list-jss';

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
      roles_data_url: '',
    }
  }

  handleChange = (e) => {
    if (e.target.name == 'list_image' || e.target.name == 'list')
      this.setState({ [e.target.name]: e.target.files[0] });
    else
      this.setState({ [e.target.name]: e.target.value });
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
    const that = this;
    this.setState({ isLoading: true });

    const { title, description, industry, list_image, list, listID, isEdit, roles_data_url } = this.state;

    const data = new FormData();

    data.append('title', title)
    data.append('description', description)
    data.append('industries', JSON.stringify(industry))
    data.append('list_image', list_image)
    data.append('list', list)

    if (isEdit) {
      data.append('listID', listID)
      data.append('roles_data_url', roles_data_url)
      postFormData(`${API_URL}/admin/update-list`, data) // eslint-disable-line
        .then((res) => {
          if (res.status === 1) {
            this.props.setNotif({
              message: 'Update Successful',
              variant: 'success'

            });
            this.setState({ title: '', description: '', industry: [], list_image: '', list: '', isLoading: false, isEdit: false })
            that.getListData(0, 30)
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
            this.setState({ title: '', description: '', industry: [], list_image: '', list: '', isLoading: false })
            that.getListData(0, 30)
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
    console.log(editList)
    if (e.target.value !== '' || e.target.value === 0) {
      const MappedEditData = editList.map((item, index) => {
        if (index === e.target.value) {
          this.setState({ isEdit: true, listID: item.id, title: item.title, description: item.description, industry: JSON.parse(item.industries), list_image: item.img_url, roles_data_url: item.roles_data_url })
          // console.log(JSON.parse(item.industries))
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
    const { industry, list, list_image, title, description, isLoading, editList, isEdit, roles_data_url } = this.state;
    let buttonStatus = true
    if (buttonStatus && title != '' && (list != '' || roles_data_url != '') && description != '' && list_image != '' && industry != '') {
      buttonStatus = false
    }

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Typography variant="h4" component="h2" color="primary" style={{ marginBottom: 20 }}>
          Add/Edit List
        </Typography>
        <Grid container md={12} lg={8} spacing={2} >
          <Grid item sm={12} xs={12} lg={6}>
            <Typography variant="p" style={{ marginBottom: 2 }}>
              List Title
            </Typography>
            <TextField
              className={classes.textField}
              variant="outlined"
              name="title"
              value={title}
              onChange={this.handleChange}
              placeholder="List Title"
            />
          </Grid>
          <Grid item sm={12} xs={12} lg={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Typography variant="p" style={{ marginBottom: 2 }}>
                Select List to edit or update
              </Typography>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name='listID'
                autoWidth={true}
                variant="outlined"
                onChange={this.handleEditList}
                label="Select List to Edit"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {editList.map((item, index) => (
                  < MenuItem key={index} value={index} className={classes.menuItem}>
                    {item.title}
                  </MenuItem>
                )
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container md={12} xs={12} lg={8}>
          <TextareaAutosize
            aria-label=""
            className={classes.textArea}
            name="description"
            value={description}
            onChange={this.handleChange}
            placeholder="List description (Max 30 words)"
          />
        </Grid>
        <Grid container md={12} sm={12} xs={12} lg={8} >
          <Typography variant="p" style={{ marginTop: 25, marginLeft: 8 }}>
            List Industries
          </Typography>
          <Select
            labelId="simple-select-industry-label"
            multiple
            value={industry}
            name="industry"
            className={classes.selectArea}
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
        <Grid container md={12} sm={12} xs={12} lg={8} style={{ marginTop: 40 }} >
          <Grid className={classes.buttonArea}>
            <input
              type="file"
              id="file"
              accept="image/*"
              style={{ display: 'none' }}
              name="list_image"
              onChange={this.handleChange}
            />
            <label htmlFor="file" className={classes.button} >Add List Image</label>
            <PublishIcon />
            {(list_image instanceof File) ?
              <span >{list_image.name}</span>
              : isEdit ?

                <a href={list_image} rel="image" target="_blank">View List Image</a>
                : ""
            }
          </Grid>
        </Grid>
        <Grid container md={12} sm={12} xs={12} lg={8} >
          <Grid
            className={classes.buttonArea}
          >
            <input
              type="file"
              id="file1"
              style={{ display: 'none' }}
              accept=".xlsx"
              name="list"
              onChange={this.handleChange}
            />
            <label
              htmlFor="file1"
              className={classes.button}
            >
              Add List Excel Document
            </label>
            <PublishIcon />
            {(list instanceof File) ?
              <span >{list.name}</span>
              : isEdit ?
                <a href={`${API_URL}/list_data_files/${roles_data_url}`} rel="File" target="_blank">View Data File</a>
                : ""
            }
          </Grid>
        </Grid>
        {!isLoading
          ? <Grid container md={4} sm={12} xs={12} lg={4} style={{ marginTop: 50 }}>

            <Button style={{ width: '100%' }} variant="contained" color="secondary" disabled={buttonStatus} onClick={this.handleSubmit}>
              Save
            </Button>


          </Grid>
          :
          <CircularProgress />}
      </Grid>
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

export default withStyles(styles)(AddListMapped);
