import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import data from 'dan-api/apps/taskBoardData';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TaskBoard, AddBoard, Notification } from 'dan-components';
import {
  fetchAction,
  addAction,
  discardAction,
  submitAction,
  deleteAction,
  closeNotifAction,
} from 'dan-actions/TaskBoardActions';
const styles = theme => ({
  root: {
    display: 'block',
    width: `calc(100% + ${theme.spacing(2)}px)`,
    marginLeft: theme.spacing(1) * -1
  }
});

class TaskBoardContainer extends React.Component {
  state = {
    stateData: { lanes: [] },
  }

  async componentWillMount() {
    const response = await this.getBoard();
    await this.props.fetchBoardData(response); // eslint-disable-line
    this.setState({ stateData: this.props.boardData.toJS() }); // eslint-disable-line
  }

  getBoard() {
    return new Promise(resolve => {
      resolve(data);
      this.setState({ dataLoaded: true });
    });
  }

  handleSubmit(value) {
    this.props.submit(value); // eslint-disable-line
    this.setState({ stateData: this.props.boardData.toJS() }); // eslint-disable-line

    // Scroll to right-end
    const taskWrap = document.getElementById('task_wrap').firstElementChild.firstElementChild;
    taskWrap.scrollLeft = taskWrap.firstElementChild.offsetWidth - taskWrap.offsetWidth;
  }

  async handleDelete(id) {
    const { deleteBoard, boardData } = this.props;
    await deleteBoard(id);
    this.setState({ stateData: boardData.toJS() });
  }

  render() {
    const title = brand.name + ' - Task Board';
    const description = brand.desc;
    const { stateData, dataLoaded } = this.state;
    const {
      classes,
      openFrm,
      addBoard,
      discardBoard,
      closeNotif,
      messageNotif,
    } = this.props;
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
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root} id="task_wrap">
          <TaskBoard dataLoaded={dataLoaded} data={stateData} removeBoard={(id) => this.handleDelete(id)} />
          <AddBoard
            openForm={openFrm}
            addEvent={addBoard}
            closeForm={discardBoard}
            submit={(value) => this.handleSubmit(value)}
          />
        </div>
      </div>
    );
  }
}

TaskBoardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  openFrm: PropTypes.bool.isRequired,
  discardBoard: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  boardData: PropTypes.object.isRequired,
  fetchBoardData: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'taskboard';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  boardData: state.getIn([reducer, 'boardData']),
  openFrm: state.getIn([reducer, 'openFrm']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
  fetchBoardData: bindActionCreators(fetchAction, dispatch),
  submit: bindActionCreators(submitAction, dispatch),
  deleteBoard: bindActionCreators(deleteAction, dispatch),
  addBoard: () => dispatch(addAction),
  discardBoard: () => dispatch(discardAction),
  closeNotif: () => dispatch(closeNotifAction),
});

const TaskBoardMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(TaskBoardContainer);

export default withStyles(styles)(TaskBoardMapped);
