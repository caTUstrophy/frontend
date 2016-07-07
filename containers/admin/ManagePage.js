import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import Leaflet from 'leaflet';

import SimpleMap from '../../components/maps/SimpleMap';
import Offer from '../../components/Offer';
import OfferList from '../../components/OfferList';
import Request from '../../components/Request';
import RequestList from '../../components/RequestList';
import { calculateCenter, toLeaflet } from '../../helpers/Location';

import { loadRequests, loadOffers, loadRegion, managePageSelectItem, managePageUnselectItem, createMatching } from '../../actions'

const OFFER_TYPE = 'offer';
const REQUEST_TYPE = 'request';

export class ManagePage extends Component {
  static propTypes = {
    regionId: PropTypes.string.isRequired,
    requests: PropTypes.array.isRequired,
    offers: PropTypes.array.isRequired,

    loadRequests: PropTypes.func.isRequired,
    loadOffers: PropTypes.func.isRequired,
    loadRegion: PropTypes.func.isRequired,

    createMatching: PropTypes.func.isRequired,

    selectItem: PropTypes.func.isRequired,
    unselectItem: PropTypes.func.isRequired
  };

  static greenMarker = Leaflet.icon({
    iconUrl: '/images/maps/marker-icon-green.png',
    shadowUrl: '/images/maps/marker-shadow.png'
  });

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.loadRequests(this.props.regionId);
    this.props.loadOffers(this.props.regionId);
    this.props.loadRegion(this.props.regionId);
  }

  handleMarkerClick(markerType, item) {
    if (this.props.selectedItem) {
      if (this.props.selectedItem.type == markerType) {
        this.props.unselectItem();
      } else {
        // show secondary
      }
    } else {
      this.props.selectItem(markerType, item);
    }
  }

  createMatching(offer, request) {
    console.log("Match", this.props.regionId, request.ID, offer.ID);
    this.props.createMatching(this.props.regionId, request.ID, offer.ID)
      .then(result => {
        console.log(result);
        if (result.type == 'CREATE_MATCHING_SUCCESS') {
          alert("Matching created. Success!");
          this.props.unselectItem();
        } else {
          alert("Matching failed. :(");
        }
      })
      .catch(result => alert("Matching failed. :("));
  }

  offerMarker(offer) {
    return <Marker position={toLeaflet(offer.Location)}
            icon={ManagePage.greenMarker}
            onClick={this.handleMarkerClick.bind(this, OFFER_TYPE, offer)}
            key={offer.ID} />;
  }

  generateOfferMarkers() {
    return this.props.offers.map(this.offerMarker.bind(this));
  }

  requestMarker(request) {
    return <Marker position={toLeaflet(request.Location)}
                   onClick={this.handleMarkerClick.bind(this, REQUEST_TYPE, request)}
                   key={request.ID} />;
  }

  generateRequestMarkers() {
    return this.props.requests.map(this.requestMarker.bind(this));
  }

  render() {
    const { requests, offers, region } = this.props;

    const hasSelectedItem = !!this.props.selectedItem;
    let mapCenter = calculateCenter(region.Boundaries.Points);
    let sidePanel = null;
    let sidePanelTitle = null;
    let possibleMatchesPanel = null;
    let markers;
    if (hasSelectedItem) {
      const selectedItem = this.props.selectedItem.item;
      const selectedItemType = this.props.selectedItem.type;
      mapCenter = selectedItem.Location;
      if (selectedItemType == OFFER_TYPE) {
        sidePanel = <Offer offer={selectedItem} />;
        sidePanelTitle = "Offer";
        markers = this.generateRequestMarkers();
        markers.push(this.offerMarker(selectedItem));
        possibleMatchesPanel = <RequestList requests={requests} onTouchTapItem={(request) => this.createMatching(selectedItem, request)} />;
      } else if (selectedItemType == REQUEST_TYPE) {
        sidePanel = <Request request={selectedItem} />;
        sidePanelTitle = "Request";
        markers = this.generateOfferMarkers();
        markers.push(this.requestMarker(selectedItem));
        possibleMatchesPanel = <OfferList offers={offers} onTouchTapItem={(offer) => this.createMatching(offer, selectedItem)} />;
      }
    } else {
      markers = this.generateOfferMarkers().concat(this.generateRequestMarkers());
    }

    if (!region) {
      return <h2>Loading...</h2>; // todo: add loading animation
    }

    return (
      <div style={{display: 'flex'}}>
        <Paper style={hasSelectedItem ? {width: '20%', padding: '1rem'} : {width: 0}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <b>{sidePanelTitle}</b>
            <IconButton onTouchTap={this.props.unselectItem}><CloseIcon /></IconButton>
          </div>
          {sidePanel}
        </Paper>
        <SimpleMap center={mapCenter}
                   style={{height: 400, width: hasSelectedItem ? '60%' : '100%'}}>
          <Polygon positions={toLeaflet(region.Boundaries.Points)} key="region" />
          {markers}
        </SimpleMap>
        <Paper style={hasSelectedItem ? {width: '20%', padding: '1rem'} : {width: 0}}>
          <div>
            <b>Possible matches</b>
          </div>
          {possibleMatchesPanel}
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { entities: { requests, offers, regions } } = state;
  
  return {
    requests: Object.values(requests),
    offers: Object.values(offers),
    region: regions[ownProps.params.ID],
    regionId: ownProps.params.ID,
    selectedItem: state.userInterface.managePage.selectedItem
  }
}

export default connect(mapStateToProps, {
  loadRequests,
  loadOffers,
  loadRegion,

  createMatching,

  selectItem: managePageSelectItem,
  unselectItem: managePageUnselectItem
})(ManagePage)