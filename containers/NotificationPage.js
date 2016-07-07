import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadNotifications } from './../actions/notifications'
import NotificationCard from './../components/NotificationCard'
import extractNotification from './helpers/extractNotification'

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
    const { notification, ID } = this.props;
    if (!notification) {
      return <h1><i>Loading notification #{ID}...</i></h1>
    }

    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <NotificationCard notification={notification} />
      </div>
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
    notification: extractNotification(state, ID)
  }
}

export default connect(mapStateToProps, { loadNotifications })(NotificationPage)
