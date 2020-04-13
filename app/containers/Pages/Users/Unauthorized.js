import React, { Fragment } from 'react';
import { ErrorWrap } from 'dan-components';

class Unauthorized extends React.Component {
  render() {
    return (
      <Fragment>
        <ErrorWrap title="" desc="Oops, Unauthorized Access :(" />
      </Fragment>
    )
  }
}

export default Unauthorized;