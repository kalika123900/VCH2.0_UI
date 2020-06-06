import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../pageListAsync';

class Landing extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    );
  }
}

export default Landing;
