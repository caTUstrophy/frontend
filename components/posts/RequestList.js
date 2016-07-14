import React, { Component, PropTypes } from 'react'

import BasePostList from './BasePostList'
import { RequestPropType } from '../../schemas/RequestSchema'

export default class RequestList extends Component {
    static propTypes = {
        requests: PropTypes.arrayOf(RequestPropType).isRequired,
        onTouchTapItem: PropTypes.func.isRequired
    };
    
    render() {
        return <BasePostList posts={this.props.requests} postTypeName={"request"} onTouchTapItem={this.props.onTouchTapItem} />;
    }
}
