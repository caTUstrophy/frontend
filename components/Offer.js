import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Card, CardHeader, CardText } from 'material-ui/Card'

export default class Offer extends Component {
    render() {
        const offer = this.props.offer

        return (
            <Card>
                <CardHeader style={{backgroundColor: 'lightgray'}}
                            title={`${offer.Title}`} />
                <CardText>
                    <pre>{JSON.stringify(offer, null, 2)}</pre>
                </CardText>
            </Card>
        )
    }
}

Offer.propTypes = {
    offer: PropTypes.shape({
        ID: PropTypes.number.isRequired
    }).isRequired
};