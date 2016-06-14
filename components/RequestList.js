import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

import { browserHistory } from 'react-router'

export default class RequestList extends Component {
    render() {
        let requestList;
        if (this.props.requests.length === 0) {
            requestList = <ListItem key="empty"
                                    primaryText="No requests"
                                    disabled={true}/>
        } else {
            requestList = this.props.requests.map(request =>
              <ListItem key={request.ID}
                        primaryText={`${request.Name}`}
                        onTouchTap={this.props.onTouchTapItem.bind(this, request)} />
            );
        }
        return (
            <List>
                {requestList}
            </List>
        )
    }
}

RequestList.propTypes = {
    requests: PropTypes.arrayOf(PropTypes.shape({
        ID: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired
    })).isRequired,
    onTouchTapItem: PropTypes.func.isRequired
};