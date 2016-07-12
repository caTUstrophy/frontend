import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { NOTIFICATION_REQUEST, loadNotifications } from './../actions/notifications'
import NotificationCard from './../components/NotificationCard'
import extractNotification from './helpers/extractNotification'

import Center from './layout/Center'
import Loading from './misc/Loading'

class NotificationPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.notification) {
      this.props.loadNotifications();
    }
  }

  render() {
    const { notification, loading } = this.props;
    if (loading) {
      return <Loading resourceName="notification" />;
    }

    return (
      <Center>
        <NotificationCard notification={notification} />
      </Center>
    )
  }
}

NotificationPage.propTypes = {
  ID: PropTypes.string.isRequired,
  notification: PropTypes.object,
  loadNotification: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;

  return {
    ID,
    notification: extractNotification(state, ID),
    loading: state.loading.includes(NOTIFICATION_REQUEST)
  }
}

export default connect(mapStateToProps, { loadNotifications })(NotificationPage)
