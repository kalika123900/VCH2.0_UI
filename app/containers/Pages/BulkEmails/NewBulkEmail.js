import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { CreateBulkEmail } from 'dan-components';

class NewBulkEmail extends React.Component {
  render() {
    const title = brand.name + ' - Create Campaign';
    const description = brand.desc;
    return (
      <div >
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


export default NewBulkEmail;
