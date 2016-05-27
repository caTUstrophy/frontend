import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

import { browserHistory } from 'react-router'

export default class MatchingList extends Component {
    navigateToMatchingPage(id) {
        browserHistory.push(`/matching/${ id }`);
    }

    render() {
        return (
            <List>
                {this.props.matchings.map(matching =>
                    <ListItem key={matching.ID}
                              primaryText={`${matching.FirstName} ${matching.LastName}`}
                              secondaryText={matching.Mail}
                              onTouchTap={this.navigateToMatchingPage.bind(this, matching.ID)} />
                )}
            </List>
        )
    }
}

MatchingList.propTypes = {
    matchings: PropTypes.array.isRequired // todo: specify more detailed schema?
};
