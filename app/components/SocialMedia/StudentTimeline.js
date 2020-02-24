import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './jss/timeline-jss';

const optionsOpt = [
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class Timeline extends React.Component {
  state = {
    anchorElOpt: null
  };

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  render() {
    const {
      classes,
      dataTimeline,
      onlike,
    } = this.props;
    const { anchorElOpt } = this.state;
    const getItem = dataArray => dataArray.map(data => (
      <li key={data.get('id')}>
        <Card >
          <CardHeader
            avatar={
              <Avatar alt="avatar" src={data.get('avatar')} className={classes.avatar} />
            }
            action={(
              <IconButton
                aria-label="More"
                aria-owns={anchorElOpt ? 'long-menu' : null}
                aria-haspopup="true"
                className={classes.button}
                onClick={this.handleClickOpt}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            title={data.get('name')}
            subheader={data.get('date')}
          />
          {data.get('image') !== '' && (
            <CardMedia
              className={classes.media}
              image={data.get('image')}
              title={data.get('name')}
            />
          )}
          <CardContent>
            <Typography component="p">
              {data.get('content')}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <IconButton aria-label="Like this" onClick={() => onlike(data)}>
              <FavoriteIcon className={data.get('liked') ? classes.liked : ''} />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </li>
    ));
    return (
      <Fragment>
        <Menu
          id="long-menu"
          anchorEl={anchorElOpt}
          open={Boolean(anchorElOpt)}
          onClose={this.handleCloseOpt}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {optionsOpt.map(option => (
            <MenuItem key={option} onClick={this.handleCloseOpt}>
              {option}
            </MenuItem>
          ))}
        </Menu>
        <ul className={classes.timeline}>
          {getItem(dataTimeline)}
        </ul>
      </Fragment>
    );
  }
}

Timeline.propTypes = {
  classes: PropTypes.object.isRequired,
  onlike: PropTypes.func,
  dataTimeline: PropTypes.object.isRequired,
};

Timeline.defaultProps = {
  onlike: () => (true),
};

export default withStyles(styles)(Timeline);
