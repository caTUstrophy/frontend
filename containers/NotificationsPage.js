import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { loadNotifications } from '.././actions/notifications'
import NotificationList from '.././components/NotificationList'
import extractNotification from './helpers/extractNotification'

import Center from './layout/Center'
import Loading from './misc/Loading'

class NotificationsPage extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleTouchTapItem(notification) {
    browserHistory.push(`/notifications/${ notification.ID }`)
  }

  render() {
    const { notifications, loading } = this.props;
    if (loading) {
      return <Loading resourceName="your notifications" />;
    }

    return (
      <Center>
        <h1>Your Notifications</h1>
        <NotificationList notifications={notifications} onTouchTapItem={this.handleTouchTapItem} />
      </Center>
    )
  }
}

NotificationsPage.propTypes = {
  notifications: PropTypes.array.isRequired,
  loadNotifications: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { notifications } } = state;

  return {
    notifications: Object.keys(notifications).map(extractNotification.bind(this, state)),
    loading: state.loading.includes(NotificationList)
  }
}

export default connect(mapStateToProps, {
  loadNotifications
})(NotificationsPage)