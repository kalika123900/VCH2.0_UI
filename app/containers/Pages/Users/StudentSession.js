import React from 'react';
import { makeSecureEncrypt } from 'dan-helpers/security';
import { postData } from 'dan-helpers/request';

class StudentSession extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.location.search) {
      var response = this.props.location.search.split('?')
      if (response.length == 2) {
        var res = JSON.parse(atob(response[1]))
        if (res.status === 1) {
          try {
            if (localStorage.hasOwnProperty('invitation')) {
              const invited_by = localStorage.getItem('invitation');

              postData(`${API_URL}/utils/invited`, { invited_by, accepted_by: res.data.id })
                .then(() => {
                  localStorage.removeItem('invitation');
                  this.setSessionData(res);
                })
                .catch(e => {
                  console.error(e);
                });
            } else {
              this.setSessionData(res);
            }
          } catch (e) {
            this.setSessionData(res);
            console.error(e);
          }
        }
      }
    }
  }

  setSessionData = (res) => {
    localStorage.setItem('user', makeSecureEncrypt(JSON.stringify({
      id: res.data.id,
      type: 'STUDENT',
      token: res.data.token,
      email: res.data.email,
      name: res.data.name
    })));
    if (res.data.status == 0 || res.data.isEditDetails)
      window.location.href = '/student/edit-details';
    else {
      window.location.reload();
    }
  }

  render() {
    return (null)
  }
}

export default StudentSession;