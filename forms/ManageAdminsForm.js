import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'

import InlineEmailForm from './InlineEmailForm'
import { RegionPropType } from "../schemas/RegionSchema"


export default class ManageAdminsForm extends Component {
  static propTypes = {
    region: RegionPropType,
    onPromoteAdmin: PropTypes.func.isRequired,
    resetInlineEmailForm: PropTypes.func.isRequired,
    navigateToRegion: PropTypes.func.isRequired
  };

  @autobind
  handleEmailSubmit(email) {
    this.props.onPromoteAdmin(email.Mail, this.props.region.ID);
    // todo: dispatch this.props.resetInlineEmailForm on success
  }

  renderAdminList(admins) {
    let list;
    if (admins.length === 0) {
      list = <ListItem key="empty"
                       primaryText="No administrators for this region"
                       disabled={true}/>;
    } else {
      list = admins.map(admin => <ListItem key={admin.ID} primaryText={`${admin.Name}`}
                                           secondaryText={admin.Mail} onTouchTap={() => browserHistory.push(`/system/users/${admin.ID}`)} />);
    }
    return <List>{list}</List>;
  }

  render() {
    const { region } = this.props;

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={`Manage administrators for ${region.Name}`} />
        <CardText>
          {this.renderAdminList(region.admins)}
          <InlineEmailForm onSubmit={this.handleEmailSubmit} submitButtonText="Add user to admins" ref="add-admin-email-form" />
        </CardText>

        <CardActions style={{display: 'flex'}}>
          <FlatButton label="Back to region" onTouchTap={this.props.navigateToRegion} />
        </CardActions>
      </Card>
    );
  }
}