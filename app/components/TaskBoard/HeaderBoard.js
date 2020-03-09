import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './taskBoard-jss';

class CustomHeader extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRemove = (id) => {
    const { removeBoard } = this.props;
    removeBoard(id);
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const {
      classes,
      title,
      color,
      label,
      id
    } = this.props;
    return (
      <div>
        <span className={classes.deco} style={{ background: color }} />
        <Typography variant="h5" className={classes.mainTitle}>{title}</Typography>
        <Typography variant="caption" className={classes.labelCaption}>{label}</Typography>
        <div className={classes.headerOpt}>
          <IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            PaperProps={{
              style: {
                width: 200,
              },
            }}
          >
            <MenuItem onClick={() => this.handleRemove(id)}>Remove</MenuItem>
            <MenuItem onClick={this.handleClose}>Option 1</MenuItem>
            <MenuItem onClick={this.handleClose}>Option 2</MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
}

CustomHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  removeBoard: PropTypes.func.isRequired,
  title: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
};

CustomHeader.defaultProps = {
  title: '',
  label: '',
  color: '#FF5722'
};

export default withStyles(styles)(CustomHeader);
