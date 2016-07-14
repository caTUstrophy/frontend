import React, { Component, PropTypes } from 'react'

import BasePost from './BasePost'
import { RequestPropType } from '../../schemas/RequestSchema'

export default class Request extends Component {
  static propTypes = {
    request: RequestPropType.isRequired
  };

  render() {
    return <BasePost post={this.props.request} />;
  }
}