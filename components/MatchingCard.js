import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Leaflet from 'leaflet';
import { Marker } from 'react-leaflet';

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { MatchingPropType } from '../schemas/MatchingSchema'
import { OfferPropType } from '../schemas/OfferSchema'
import { RequestPropType } from '../schemas/RequestSchema'
import SimpleMap from '../components/maps/SimpleMap';

import Matching from './Matching'

import { loadUserProfile } from './../actions/profile'

function loadData(props) {
  props.loadUserProfile();
}

export default class MatchingCard extends Component {
  static propTypes = {
    matching: MatchingPropType.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    offer: OfferPropType.isRequired,
    request: RequestPropType.isRequired
  };

  static greenMarker = Leaflet.icon({
    iconUrl: '/images/maps/marker-icon-green.png',
    shadowUrl: '/images/maps/marker-shadow.png'
  });

  componentWillMount() {
    loadData(this.props)
  }

  render() {
    const {matching, profile, offer, request} = this.props;

    if (!matching || !profile || !offer || !request) {
      return <h1>Loading matching...</h1>; // todo: loading animation
    }

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title="Your matching" />
        <SimpleMap style={{height: '200px'}}
                   center={{ lat: (offer.Location.lat + request.Location.lat) / 2,
                   lng: (offer.Location.lng + request.Location.lng) / 2}}>
          <Marker position={offer.Location}
                  icon={MatchingCard.greenMarker}
                  onClick={function () {}} />
          <Marker position={request.Location}
                  onClick={function () {}} />
        </SimpleMap>
        <CardText>
          <Matching offer={offer} request={request} profile={profile} />
        </CardText>
      </Card>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, {
  loadUserProfile
})(MatchingCard)
