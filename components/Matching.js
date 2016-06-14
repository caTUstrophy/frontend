import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Card, CardHeader, CardText } from 'material-ui/Card'

export default class Matching extends Component {
    render() {
        const matching = this.props.matching;

        return (
            <Card>
                <CardHeader style={{backgroundColor: 'lightgray'}}
                            title={`${matching.FirstName} ${matching.LastName}`} />
                <CardText>
                    <pre>{JSON.stringify(matching, null, 2)}</pre>
                </CardText>
            </Card>
        )
    }
}

Matching.propTypes = {
    matching: PropTypes.shape({
        ID: PropTypes.string.isRequired
    }).isRequired
};