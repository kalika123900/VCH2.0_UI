import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './widget-jss';
import formatDate from '../../Helpers/formatDate';

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
}

// const dataTimeline = [
//   {
//     time: '11:20',
//     title: 'Jhon Doe',
//     desc: 'Quisque a consequat ante, at volutpat enim.'
//   },
//   {
//     time: 'Yesteray',
//     title: 'Nick Jhones',
//     desc: 'Aenean sit amet magna vel magna fringilla fermentum.'
//   },
//   {
//     time: 'Yesterday',
//     title: 'Tony Stark',
//     desc: 'Nam posuere accumsan porta.'
//   },
//   {
//     time: '11 Oct 2018',
//     title: 'Rahul Mishra',
//     desc: 'Curabitur egestas consequat lorem.'
//   },
//   {
//     time: 'Last week',
//     title: 'Amit yadav',
//     desc: 'Vestibulum nec mi suscipit, dapibus purus a'
//   },
// ];

class TimelineWidget extends React.Component {
  state = {
    dataTimeline: []
  }
  componentDidMount() {
    const _that = this;

    getData(`${API_URL}/admin/get-tokens`)
      .then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            var tokenData = [];
            res.data.map(item => {
              const client_name = item.firstname + ' ' + item.lastname;
              const created_at = formatDate(item.created_at);

              tokenData.push({
                time: created_at,
                title: client_name,
                desc: 'No Description Avilable'
              });
            });
            _that.setState({ dataTimeline: tokenData });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { dataTimeline } = this.state;
    const { classes } = this.props;
    return (
      <PapperBlock whiteBg noMargin title="Recent Generated Tokens" icon="ios-time-outline" desc="">
        <div className={classes.activityWrap}>
          <List>
            {dataTimeline.map((item, index) => (
              <ListItem key={index.toString()} className={classes.activityList}>
                <ListItemIcon>
                  <div className={classes.timeDot}>
                    <time>{item.time}</time>
                    <span />
                  </div>
                </ListItemIcon>
                <ListItemText primary={item.title} className={classes.activityText} secondary={item.desc} />
              </ListItem>
            ))}
          </List>
        </div>
      </PapperBlock>
    );
  }
}

TimelineWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimelineWidget);
