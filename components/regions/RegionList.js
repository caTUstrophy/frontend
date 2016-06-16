import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

export default class RegionList extends Component {
    render() {
        let regionList;
        if (this.props.regions.length === 0) {
            regionList = <ListItem key="empty"
                                    primaryText="No regions"
                                    disabled={true}/>
        } else {
            regionList = this.props.regions.map(region =>
              <ListItem key={region.ID}
                        primaryText={region.Name}
                        secondaryText={region.Description}
                        onTouchTap={this.props.onTouchTapItem.bind(this, region)} />
            );
        }
        return (
            <List>
                {regionList}
            </List>
        )
    }
}

RegionList.propTypes = {
    regions: PropTypes.array.isRequired, // todo: specify more detailed schema?
    onTouchTapItem: PropTypes.func.isRequired
};