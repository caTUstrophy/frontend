import React, { Component, PropTypes } from 'react';

import autobind from 'autobind-decorator';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { List, ListItem } from 'material-ui/List';


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class PermissionsForm extends Component {
  static propTypes = {
    permissions: PropTypes.array.isRequired,
    onDeletePermission: PropTypes.func.isRequired
  };

  @autobind
  handleEmailSubmit(email) {
    this.props.onPromoteAdmin(email.Mail, this.props.region.ID);
    // todo: dispatch this.props.resetInlineEmailForm on success
  }

  render() {
    const { permissions } = this.props;

    let list;
    if (permissions.length === 0) {
      list = <ListItem key="empty"
                       primaryText="No permissions for this user"
                       disabled={true}/>;
    } else {


      list = permissions.map(permission => {
        let region;
        if (permission.Region.Name) {
          region = `in region "${permission.Region.Name}"`; // todo: link to region?
        } else {
          region = <i>globally</i>;
        }

        let rightIcon;
        if (permission.AccessRight != 'superadmin') {
          rightIcon = (
            <IconButton
              touch={true}
              tooltip="Remove permission"
              tooltipPosition="bottom-center"
              onTouchTap={this.props.onDeletePermission.bind(this, permission)}>
              <DeleteIcon />
            </IconButton>
          );
        }

        return <ListItem key={permission.ID}
                         primaryText={<span><b>{capitalizeFirstLetter(permission.AccessRight)}</b> &nbsp; {region}</span>}
                         secondaryText={permission.Region ? permission.Region.Description : null}
                         disabled={permission.AccessRight == 'superadmin'}
                         rightIconButton={rightIcon} />
      });
    }
    return <div>
      <h2>Permissions</h2>
      <List>{list}</List>
    </div>;
    // todo: <RaisedButton label="Promote to Superadmin" secondary={true} />
  }
}