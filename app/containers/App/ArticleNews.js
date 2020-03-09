import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Blog from '../Templates/Blog';
import { BlogHome, Article } from '../pageListAsync';

class ArticleNews extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Blog history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/blog" component={BlogHome} />
          <Route path="/blog/article" component={Article} />
        </Switch>
      </Blog>
    );
  }
}

ArticleNews.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default ArticleNews;
