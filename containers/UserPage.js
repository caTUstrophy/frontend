import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../actions'
import User from '../components/User'

function loadData(props) {
  const { userId } = props;
  props.loadUser(userId, [ 'name' ]);
}

class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      loadData(nextProps)
    }
  }

  render() {
    const { user, userId } = this.props;
    if (!user) {
      return <h1><i>Loading {userId}’s profile...</i></h1>
    }

    console.dir(user);

    return (
      <div>
        <User user={user} />
      </div>
    )
  }
}

UserPage.propTypes = {
  userId: PropTypes.number.isRequired,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const userId = parseInt(ownProps.params.userId);

  const { entities: { users } } = state;

  return {
    userId,
    user: users[userId]
  }
}

export default connect(mapStateToProps, {
  loadUser
})(UserPage)
