import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Card, CardHeader, CardText } from 'material-ui/Card'

export default class Request extends Component {
    render() {
        const request = this.props.request

        return (
            <Card>
                <CardHeader style={{backgroundColor: 'lightgray'}}
                            title={`${request.FirstName} ${request.LastName}`} />
                <CardText>
                    <pre>{JSON.stringify(request, null, 2)}</pre>
                </CardText>
            </Card>
        )
    }
}

Request.propTypes = {
    request: PropTypes.shape({
        ID: PropTypes.number.isRequired
    }).isRequired
};