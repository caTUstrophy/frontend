import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'

import Center from '../layout/Center'

class NotFoundPage extends Component {
  render() {
    return (
      <Center vertical={true}>
        <Card>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title="Not found" />
          <CardText>
            We're sorry, there doesn't seem to be anything at <b>{this.props.url}</b>.<br/>
            <br/>
            <i style={{color: 'gray'}}>URL: {window.location.href}</i>
          </CardText>

          <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <FlatButton label="Go to home page"
                        secondary={true}
                        onTouchTap={() => browserHistory.push('/')} />
            <FlatButton label="Back to last page"
                        onTouchTap={() => browserHistory.goBack()} />
          </CardActions>
        </Card>
      </Center>
    )
  }
}

NotFoundPage.propTypes = {
  url: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    url: ownProps.location.pathname
  }
}

export default connect(mapStateToProps, {})(NotFoundPage)
