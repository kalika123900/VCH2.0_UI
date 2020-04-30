import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import styles from './cardStyle-jss';

class ProductCard extends React.Component {
  render() {
    const {
      classes,
      role_name,
      role_description,
      role_deadline,
      list,
      width,
      openJobDesc,
      index
    } = this.props;
    return (
      <Card className={classNames(classes.cardProduct, isWidthUp('sm', width) && list ? classes.cardList : '')}>
        <CardContent className={classes.floatingButtonWrap}>
          <Typography noWrap gutterBottom variant="h5" className={classes.title} component="h2">
            {role_name}
          </Typography>
          <Typography component="p" className={classes.desc}>
            {role_description}
          </Typography>
        </CardContent>
        <CardActions className={classes.price}>
          <Typography variant="body1">
            <span>Last Date: </span>
            <span>
              {role_deadline}
            </span>
          </Typography>
          <div className={classes.rightAction}>
            <Button size="small" variant="outlined" color="secondary" onClick={() => openJobDesc(index)}>
              See Detail
            </Button>
          </div>
        </CardActions>
      </Card>
    );
  }
}

const ProductCardResponsive = withWidth()(ProductCard);

export default withStyles(styles)(ProductCardResponsive);
