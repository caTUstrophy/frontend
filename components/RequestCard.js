import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import { RequestPropType } from '../schemas/RequestSchema'
import SimpleMap from '../components/maps/SimpleMap';

import Request from '../components/Request';

export default class RequestCard extends Component {
  static propTypes = {
    request: RequestPropType.isRequired,
    editable: PropTypes.boolean,
    navigateToEditRequest: PropTypes.func.isRequired
  };

  render() {
    const request = this.props.request;
  
    let cardActions;
    if (this.props.editable) {
      cardActions = <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
        <FlatButton label="Edit request" onTouchTap={this.props.navigateToEditRequest.bind(this)} disabled={request.Matched} />;
      </CardActions>;
    }
    
    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={request.User ? <span><b>{request.User.Name}</b> requests <b>{request.Name}</b></span> : "You request"} />
        <SimpleMap style={{height: '200px'}}
                   marker={request.Location} />
        <CardText>
          <Request request={request} />
        </CardText>
        {cardActions}
      </Card>
    )
  }
}