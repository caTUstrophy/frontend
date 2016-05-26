import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

import { browserHistory } from 'react-router'

export default class UserList extends Component {
  navigateToUserPage(id) {
    browserHistory.push(`/user/${ id }`);
  }

  render() {
    return (
      <List >
        {this.props.users.map(user =>
          <ListItem key={user.ID}
                    primaryText={`${user.FirstName} ${user.LastName}`}
                    secondaryText={user.Mail}
                    onTouchTap={this.navigateToUserPage.bind(this, user.ID)} />
        )}
      </List>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired // todo: specify more detailed schema?
};
