import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { Route } from 'react-router-dom';
import { ErrorWrap } from 'dan-components';

const title = brand.name + ' - Aplication Error';
const description = brand.desc;

const Error = (props) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404; // eslint-disable-line
      }
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
          <ErrorWrap {...props} title="500" desc="Sorry, server goes wrong" />
        </div>
      );
    }}
  />
);

export default Error;
