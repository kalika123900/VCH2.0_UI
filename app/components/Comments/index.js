import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Type from 'dan-styles/Typography.scss';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Send from '@material-ui/icons/Send';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import dummy from 'dan-api/dummy/dummyContents';
import styles from '../SocialMedia/jss/socialMedia-jss';

class Comment extends React.Component {
  state = {
    comment: ''
  };

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const {
      classes,
      dataList,
    } = this.props;
    const { comment } = this.state;
    const getItem = dataArray => dataArray.map(data => (
      <Fragment key={data.id}>
        <ListItem>
          <div className={classes.commentContent}>
            <div className={classes.commentHead}>
              <Avatar alt="avatar" src={data.avatar} className={classes.avatarComment} />
              <section>
                <Typography variant="subtitle1">{data.from}</Typography>
                <Typography variant="caption"><span className={classNames(Type.light, Type.textGrey)}>{data.date}</span></Typography>
              </section>
            </div>
            <Typography className={classes.commentText}>{data.message}</Typography>
          </div>
        </ListItem>
        <Divider />
      </Fragment>
    ));

    return (
      <div>
        <section className={classes.commentAction}>
          <div className={classes.commentForm}>
            <Avatar alt="avatar" src={dummy.user.avatar} className={classes.avatarMini} />
            <Input
              placeholder="Write Comment"
              onChange={this.handleChange}
              value={comment}
              className={classes.input}
              inputProps={{
                'aria-label': 'Comment',
              }}
            />
            <Fab size="small" onClick={() => this.handleSubmit(comment)} color="secondary" aria-label="send" className={classes.button}>
              <Send />
            </Fab>
          </div>
        </section>
        <List>
          {getItem(dataList)}
        </List>
      </div>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  dataList: PropTypes.array.isRequired,
};

const CommentResponsive = withMobileDialog()(Comment);
export default withStyles(styles)(CommentResponsive);
