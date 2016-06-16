import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Polygon, Marker } from 'react-leaflet';

import SimpleMap from '../../components/maps/SimpleMap';
import { calculateCenter, toLeaflet } from '../../helpers/Location';

import { loadRequests, loadOffers, loadRegion } from '../../actions'

export class AdminHomePage extends Component {
  static propTypes = {
    regionId: PropTypes.string.isRequired,
    requests: PropTypes.array.isRequired,
    offers: PropTypes.array.isRequired,
    loadRequests: PropTypes.func.isRequired,
    loadOffers: PropTypes.func.isRequired,
    loadRegion: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.loadRequests(this.props.regionId);
    this.props.loadOffers(this.props.regionId);
    this.props.loadRegion(this.props.regionId);
  }
  
  render() {
    const { requests, offers, region } = this.props;

    if (!region) {
      return <h2>Loading...</h2>; // todo: add loading animation
    }

    return (
      <SimpleMap center={calculateCenter(region.Boundaries.Points)}
                 style={{width: '80%', height: 400}}>
        <Polygon positions={toLeaflet(region.Boundaries.Points)} key="region" />
        {requests.map(request => <Marker position={toLeaflet(request.Location)} key={request.ID} />)}
        {offers.map(offer => <Marker position={toLeaflet(offer.Location)} key={offer.ID} />)}
      </SimpleMap>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { entities: { requests, offers, regions } } = state;
  
  return {
    requests: Object.values(requests),
    offers: Object.values(offers),
    region: regions[ownProps.params.ID],
    regionId: ownProps.params.ID
  }
}

export default connect(mapStateToProps, {
  loadRequests,
  loadOffers,
  loadRegion
})(AdminHomePage)