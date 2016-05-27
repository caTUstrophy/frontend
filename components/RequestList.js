import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

import { browserHistory } from 'react-router'

export default class RequestList extends Component {
    navigateToRequestPage(id) {
        browserHistory.push(`/request/${ id }`);
    }

    render() {
        return (
            <List>
                {this.props.requests.map(request =>
                    <ListItem key={request.ID}
                              primaryText={`${request.FirstName} ${request.LastName}`}
                              secondaryText={request.Mail}
                              onTouchTap={this.navigateToRequestPage.bind(this, request.ID)} />
                )}
            </List>
        )
    }
}

RequestList.propTypes = {
    requests: PropTypes.array.isRequired // todo: specify more detailed schema?
};