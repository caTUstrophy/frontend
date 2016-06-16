import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Polygon } from 'react-leaflet';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import { loadRequests, loadOffers, loadRegions } from '../../actions'
import RequestList from '../../components/RequestList'
import OfferList from '../../components/OfferList';
import RegionList from '../../components/regions/RegionList';
import SimpleMap from '../../components/maps/SimpleMap';
import { calculateCenter, toLeaflet } from '../../helpers/Location';

export class AdminHomePage extends Component {
  static propTypes = {
    requests: PropTypes.array.isRequired,
    offers: PropTypes.array.isRequired,
    loadRequests: PropTypes.func.isRequired,
    loadOffers: PropTypes.func.isRequired,
    loadRegions: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    // this.props.loadRequests();
    // this.props.loadOffers();
    this.props.loadRegions();
  }

  handleFocusRegion(region) {
    browserHistory.push(`/admin/manage/${ region.ID }`);
  }

  renderRequests(requests) {
    if (!requests) {
      return <h1><i>Loading requests...</i></h1>
    }

    return (
      <RequestList requests={requests} onTouchTapItem={(request) => browserHistory.push(`/admin/requests/${ request.ID }`)} />
    )
  }

  renderOffers(offers) {
    if (!offers) {
      return <h1><i>Loading offers...</i></h1>
    }

    return (
      <OfferList offers={offers} onTouchTapItem={(offer) => browserHistory.push(`/admin/offers/${ offer.ID }`)} />
    )
  }
  
  render() {
    const { requests, offers, regions } = this.props;
    const halfWidth = {width: '50%', margin: '1rem'};

    if (!regions) {
      return <h2>Loading...</h2>; // todo: display loading animation
    }

    return (
      <div style={{display: 'flex'}}>
        <Paper style={{width: '20%'}}>
          <RegionList regions={regions} onTouchTapItem={this.handleFocusRegion.bind(this)} />
        </Paper>
        <SimpleMap center={calculateCenter(regions.map((region) => calculateCenter(region.Boundaries.Points)))}
                   style={{width: '80%', height: 400}}>
          {regions.map(region => <Polygon positions={toLeaflet(region.Boundaries.Points)} onClick={this.handleFocusRegion.bind(this, region)} key={region.ID} />) /* todo: style */}
        </SimpleMap>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { entities: { requests, offers, regions } } = state;
  
  return {
    requests: Object.values(requests),
    offers: Object.values(offers),
    regions: Object.values(regions)
  }
}

export default connect(mapStateToProps, {
  loadRequests,
  loadOffers,
  loadRegions
})(AdminHomePage)