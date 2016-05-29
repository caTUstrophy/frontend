import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { loadRequests, loadOffers } from '../../actions'
import RequestList from '../../components/RequestList'
import OfferList from '../../components/OfferList'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class RequestsPage extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.loadRequests();
    this.props.loadOffers();
  }

  renderRequests(requests) {
    if (!requests) {
      return <h1><i>Loading requests...</i></h1>
    }

    return (
      <RequestList requests={requests} />
    )
  }

  renderOffers(offers) {
    if (!offers) {
      return <h1><i>Loading offers...</i></h1>
    }

    return (
      <OfferList offers={offers} />
    )
  }
  
  render() {
    const { requests, offers } = this.props;

    const halfWidth = {width: '50%', margin: '1rem'};

    return (
      <div style={{display: 'flex'}}>
        <Card style={halfWidth}>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title="Requests" />
          <CardText>{this.renderRequests(requests)}</CardText>
          <CardActions style={{display: 'flex'}}>
            <FlatButton label="See all"  style={{marginLeft: 'auto'}} onTouchTap={() => browserHistory.push('/requests')} />
          </CardActions>
        </Card>
        <Card style={halfWidth}>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title="Offers" />
          <CardText>{this.renderOffers(offers)}</CardText>
          <CardActions style={{display: 'flex'}}>
            <FlatButton label="See all"  style={{marginLeft: 'auto'}} onTouchTap={() => browserHistory.push('/offers')} />
          </CardActions>
        </Card>
      </div>
    )
  }
}

RequestsPage.propTypes = {
  requests: PropTypes.array.isRequired,
  loadRequests: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { requests, offers } } = state;
  
  return {
    requests: Object.values(requests),
    offers: Object.values(offers)
  }
}

export default connect(mapStateToProps, {
  loadRequests,
  loadOffers
})(RequestsPage)