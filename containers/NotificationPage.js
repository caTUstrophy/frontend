import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadNotification } from './../actions/notifications'
import NotificationCard from './../components/NotificationCard'

function loadData(props) {
  const { loadNotification, ID } = props;
  loadNotification(ID);
}

class NotificationPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ID !== this.props.ID) {
      loadData(nextProps)
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
  const notifications = state.entities.notifications;

  return {
    ID,
    notification: notifications[ID]
  }
}

export default connect(mapStateToProps, {
  loadNotification
})(NotificationPage)
