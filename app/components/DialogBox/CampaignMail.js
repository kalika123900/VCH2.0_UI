import React from 'react';
import classnames from 'classnames';

class CampaignMail extends React.Component {
  render() {
    const { subject, mailBody } = this.props;

    return (
      <div>
        <span class="mcnPreviewText"></span>
        <table>
          <tr>
            <td >
              <table >
                <tr>
                  <td class="td">
                    <div >
                      <table >
                        <tr>
                          <td class="p30-15" >
                            <table >
                              <tr>
                                <td
                                  class="text white center">
                                  <div >{subject}</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table >
                        <tr>
                          <td class="p30-15">
                            <table >
                              <tr>
                                <td>
                                  {mailBody}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table >
                        <tbody>
                          <tr>
                            <td>
                              <table >
                                <tbody>
                                  <tr>
                                    <th class="column">
                                    </th>

                                    <th class="column">
                                      <table >
                                        <tr>
                                          <td
                                            class="text white center">
                                            <div ><a href="app.varsitycareershub.co.uk/student/messages">Respond on VCH</a></div>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>

                                    <th class="column">
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div >
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <table >
                              <tbody>
                                <tr>
                                  <th class="column">
                                    <table >
                                      <tr>
                                        <td class="text center">
                                          <div >Varsity Careers Hub Ltd</div>
                                        </td>
                                      </tr>
                                    </table>
                                  </th>
                                  <th class="column">
                                    <table >
                                      <tr>
                                        <td class="text white center">
                                          <div ><a
                                            href='app.varsitycareershub.co.uk/student'>My Account</a></div>
                                        </td>
                                      </tr>
                                    </table>
                                  </th>
                                  <th class="column">
                                    <table >
                                      <tr>
                                        <td
                                          class="text white center">
                                          <div><a
                                            href='app.varsitycareershub.co.uk/student/settings'>Update your preferences
                                        here</a></div>
                                        </td>
                                      </tr>
                                    </table>
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table >
                    <div >
                      <table >
                        <tr>
                          <td class="p30-15" >
                            <table >
                              <tr>
                                <td class="text center"
                                >
                                  <div ><a
                                    href="mailto:opportunities@varsitycareershub.co.uk">opportunities@varsitycareershub.co.uk</a>
                              to your mailing list to ensure you don’t miss out on future messages</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div >
                  </td >
                </tr >
              </table >
            </td >
          </tr >
        </table >
      </div >
    )
  }
}

export default CampaignMail;