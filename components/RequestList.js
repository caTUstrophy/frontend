import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

import { browserHistory } from 'react-router'

export default class RequestList extends Component {
    navigateToRequestPage(id) {
        browserHistory.push(`/request/${ id }`);
    }

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
                        onTouchTap={this.navigateToRequestPage.bind(this, request.ID)} />
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
    requests: PropTypes.array.isRequired // todo: specify more detailed schema?
};