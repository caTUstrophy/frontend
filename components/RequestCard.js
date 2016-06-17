import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { RequestPropType } from '../schemas/RequestSchema'
import SimpleMap from '../components/maps/SimpleMap';

export default class RequestCard extends Component {
  static propTypes = {
    request: RequestPropType.isRequired
  };

  render() {
    const request = this.props.request;

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={request.User ? <span><b>{request.User.Name}</b> requests <b>{request.Name}</b></span> : "You request"} />
        <SimpleMap style={{height: '200px'}}
                   marker={request.Location} />
        <CardText>
          <Request request={request} />
        </CardText>
      </Card>
    )
  }
}