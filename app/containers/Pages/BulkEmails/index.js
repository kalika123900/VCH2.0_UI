import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { CreateBulkEmail } from 'dan-components';
import NewBulkEmail from './NewBulkEmail';

class BulkEmails extends React.Component {
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
        <CreateBulkEmail />
      </div>
    );
  }
}

export default BulkEmails;
