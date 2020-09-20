import React from 'react';
import { makeSecureEncrypt } from 'dan-helpers/security';

class StudentSession extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.location.search) {
      var response = this.props.location.search.split('?')
      if (response.length == 2) {
        var res = JSON.parse(atob(response[1]))
        if (res.status === 1) {
          try {
            if (sessionStorage.hasOwnProperty('invitation')) {
              const invited_by = atob(sessionStorage.getItem('invitation'));

              postData(`${API_URL}/utils/invited`, { invited_by, accepted_by: res.data.id })
                .catch(e => {
                  console.error(e);
                });
            }
          } catch (e) {
            console.error(e);
          }

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
      }
    }
  }
  render() {
    return (null)
  }
}

export default StudentSession;