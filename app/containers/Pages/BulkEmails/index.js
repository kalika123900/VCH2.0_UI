import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { CreateBulkEmail } from 'dan-components';

class BulkEmails extends React.Component {
  submitForm = () => {
    console.log("Form Submitted");
  }

  render() {
    const title = brand.name + ' - Bulk Emails';
    const description = brand.desc;

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
        <CreateBulkEmail onSubmit={() => this.submitForm()} />
      </div>
    );
  }
}

export default BulkEmails;
