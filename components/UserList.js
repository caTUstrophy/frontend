import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

import { UserPropType } from '../schemas/UserSchema';

export default class UserList extends Component {
  static propTypes = {
    users: UserPropType,
    onTouchTapItem: PropTypes.func.isRequired
  };

  render() {
    return (
      <List >
        {this.props.users.map(user => {
          let name = user.Name;
          if (user.PreferredName) {
            name += ` (${user.PreferredName})`;
          }
          return <ListItem key={user.ID}
                    primaryText={name}
                    secondaryText={user.Mail}
                    onTouchTap={this.props.onTouchTapItem.bind(this, user)}/>
        })}
      </List>
    )
  }
}
