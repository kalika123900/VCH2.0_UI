import React from 'react';
import PropTypes from 'prop-types';
import avatarApi from 'dan-api/images/avatars';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import data from 'dan-api/apps/contactData';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';

import { makeSecureDecrypt } from '../../../Helpers/security';
import dummy from 'dan-api/dummy/dummyContents';
import {
  fetchAction,
  showDetailAction,
  hideDetailAction,
  submitAction,
  editAction,
  addAction,
  closeAction,
  removeAction,
  addToFavoriteAction,
  searchAction,
  closeNotifAction,
  composeAction,
  sendAction
} from 'dan-actions/ContactActions';
import {
  ContactList,
  ContactDetail,
  AddContact,
  Notification,
  DirectEmail
} from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

async function postJSON(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

class Contact extends React.Component {
  constructor(props) {
    super(props)
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    if (user.cId == null) {
      this.props.history.push('/client/unauthorized');
    }
  }
  componentDidMount() {
    const { fetchData } = this.props;
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );
    const data = {
      company_id: user.cId
    }

    postData(`${API_URL}/client/get-contacts`, data) // eslint-disable-line
      .then((res) => {
        if (res.status === 1) {
          let data = [];
          if (res.data.length > 0) {
            data = res.data.map(item => {
              return {
                id: item.id,
                avatar: item.profile != null && item.profile != '' ? item.profile : item.gender == 'Male' ? avatarApi[7] : avatarApi[6],
                name: `${item.firstname} ${item.lastname}`,
                title: '',
                phone: item.phone,
                // secondaryPhone: '+6280987654321',
                personalEmail: item.email,
                // companyEmail: 'johndoe@company.com',
                // address: 'Ipsum Street no.77 Block A/5A, New York',
                website: '',
                favorited: item.favorite,
                selected: false
              }
            });
          }
          fetchData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitContact = (item, avatar) => {
    const { submit } = this.props;
    const avatarBase64 = typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar;
    const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
    submit(item, avatarPreview);
  }

  handleCompose = () => {
    const { compose } = this.props;
    compose();
  }

  sendDirectEmail = (subject, emailContent, files, handleSuccess) => {
    const user = JSON.parse(
      makeSecureDecrypt(localStorage.getItem('user'))
    );

    let data = this.props.dataContact.filter(item => {
      if (item.get('selected')) return true;
      return false;
    }).map(item => {
      return {
        to: item.get('personalEmail'),
        subject,
        body: emailContent,
        type: 'direct',
        sender_id: user.cId,
        sender_type: 'client',
        receiver_id: item.get('id'),
        receiver_type: 'user'
      }
    })

    const apiData = {
      company_id: user.cId,
      emailData: data.toJS()
    }

    postData(`${API_URL}/client/client-info`, apiData)
      .then((res) => {
        if (res.status === 1) {
          apiData.company_name = `${res.data.display_name}`;

          postJSON(`${API_URL}/client/send-direct-email`, apiData) // eslint-disable-line
            .then((res) => {
              if (res.status === 1) {
                this.props.sendEmail();
                handleSuccess();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      classes,
      dataContact,
      itemSelected,
      showDetail,
      hideDetail,
      avatarInit,
      open,
      showMobileDetail,
      add,
      edit,
      close,
      remove,
      favorite,
      keyword,
      search,
      closeNotif,
      messageNotif
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root}>
          <ContactList
            addFn
            compose={this.handleCompose}
            total={dataContact.size}
            addContact={add}
            clippedRight
            itemSelected={itemSelected}
            dataContact={dataContact}
            showDetail={showDetail}
            search={search}
            keyword={keyword}
          />
          <ContactDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            dataContact={dataContact}
            itemSelected={itemSelected}
            edit={edit}
            remove={remove}
            favorite={favorite}
          />
        </div>
        <DirectEmail
          sendEmail={this.sendDirectEmail}
          open={open}
          closeForm={close}
        />
        {/* <AddContact
          addContact={add}
          openForm={open}
          closeForm={close}
          submit={this.submitContact}
          avatarInit={avatarInit}
        /> */}
      </div>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
  avatarInit: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  hideDetail: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  showMobileDetail: PropTypes.bool.isRequired,
  add: PropTypes.func.isRequired,
  compose: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  dataContact: PropTypes.object.isRequired,
  itemSelected: PropTypes.number.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'contact';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  avatarInit: state.getIn([reducer, 'avatarInit']),
  dataContact: state.getIn([reducer, 'contactList']),
  itemSelected: state.getIn([reducer, 'selectedIndex']),
  keyword: state.getIn([reducer, 'keywordValue']),
  open: state.getIn([reducer, 'openFrm']),
  showMobileDetail: state.getIn([reducer, 'showMobileDetail']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  showDetail: bindActionCreators(showDetailAction, dispatch),
  hideDetail: () => dispatch(hideDetailAction),
  submit: bindActionCreators(submitAction, dispatch),
  edit: bindActionCreators(editAction, dispatch),
  compose: () => dispatch(composeAction),
  sendEmail: () => dispatch(sendAction),
  add: () => dispatch(addAction),
  close: () => dispatch(closeAction),
  remove: bindActionCreators(removeAction, dispatch),
  favorite: bindActionCreators(addToFavoriteAction, dispatch),
  search: bindActionCreators(searchAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
});

const ContactMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Contact);

export default withStyles(styles)(ContactMapped);
