import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'
import Chip from 'material-ui/Chip';

export default class RequestList extends Component {
    render() {
        let requestList;
        if (this.props.requests.length === 0) {
            requestList = <ListItem key="empty"
                                    primaryText="No requests"
                                    disabled={true}/>
        } else {
            requestList = this.props.requests.map(request => {
                let description = <div style={{display: 'flex'}}>
                    <div style={{marginRight: 'auto'}}>{request.Name}</div>
                    {request.Tags.map(({Name}) => <Chip key={Name} style={{margin: '0 2px'}}>{Name}</Chip>)}
                </div>;
                
                return <ListItem key={request.ID}
                          primaryText={description}
                                 secondaryText={request.Description}
                          onTouchTap={this.props.onTouchTapItem.bind(this, request)}/>
            });
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