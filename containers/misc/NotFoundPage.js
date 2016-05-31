import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'

class NotFoundPage extends Component {
  render() {
    return (
      <div style={{display: 'flex', height: '100%'}}>
        <div style={{width: '40rem', margin: 'auto'}}>
          <Card>
            <CardHeader style={{backgroundColor: 'lightgray'}}
                        title="Not found" />
            <CardText>
              We're sorry, there doesn't seem to be anything at <b>{this.props.url}</b>.
            </CardText>

            <CardActions style={{display: 'flex'}}>
              <FlatButton label="Back to home"
                            secondary={true}
                            onTouchTap={() => browserHistory.push('/')}
                            style={{marginLeft: 'auto'}} />
            </CardActions>
          </Card>
        </div>
      </div>
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
