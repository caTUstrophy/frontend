import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../../actions'
import User from '../../components/User'

function loadData(props) {
  const { ID } = props;
  props.loadUser(ID, [ 'name' ]);
}

class UserPage extends Component {
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
    const { user, ID } = this.props;
    if (!user) {
      return <h1><i>Loading {ID}’s profile...</i></h1>
    }

    console.dir(user);

    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <User user={user} />
      </div>
    )
  }
}

UserPage.propTypes = {
  ID: PropTypes.number.isRequired,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const ID = parseInt(ownProps.params.ID);

  const users = state.entities.users;

  return {
    ID,
    user: users[ID]
  }
}

export default connect(mapStateToProps, {
  loadUser
})(UserPage)
