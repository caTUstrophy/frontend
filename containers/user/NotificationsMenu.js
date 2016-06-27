import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import NotificationsActiveIcon from 'material-ui/svg-icons/social/notifications-active';

class NotificationsMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { notifications } = this.props;
    return (
        <IconButton tooltip="Notifications" onTouchTap={() => browserHistory.push('/notifications')}>
          { Object.keys(notifications).length > 0
            ? <NotificationsActiveIcon color={"#d50000"} />
            : <NotificationsIcon color={"white"} /> }
        </IconButton>
    );
  }
}

NotificationsMenu.propTypes = {
};

function mapStateToProps(state, ownProps) {
  const { notifications } = state.entities;
  return {
    notifications
  }
}

export default connect(mapStateToProps, {
})(NotificationsMenu)