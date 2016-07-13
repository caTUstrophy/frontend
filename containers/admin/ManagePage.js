import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import Leaflet from 'leaflet';
import { Marker, Polygon } from 'react-leaflet';

import SimpleMap from '../../components/maps/SimpleMap';
import Offer from '../../components/Offer';
import OfferList from '../../components/OfferList';
import Request from '../../components/Request';
import RequestList from '../../components/RequestList';
import { calculateCenter } from '../../helpers/Location';
import Loading from '../misc/Loading'

import { loadRequests, loadOffers, loadRegion, managePageSelectItem, managePageUnselectItem, createMatching } from '../../actions'
import {RegionPropType} from "../../schemas/RegionSchema";
import {RequestPropType} from "../../schemas/RequestSchema";
import {OfferPropType} from "../../schemas/OfferSchema";

const OFFER_TYPE = 'offer';
const REQUEST_TYPE = 'request';

export class ManagePage extends Component {
  static propTypes = {
    regionId: PropTypes.string.isRequired,
    region: RegionPropType,
    requests: PropTypes.arrayOf(RequestPropType),
    offers: PropTypes.arrayOf(OfferPropType),

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
  static grayMarker = Leaflet.icon({
    iconUrl: '/images/maps/marker-icon-gray.png',
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
    return <Marker position={offer.Location}
            icon={offer.Matched ? ManagePage.grayMarker : ManagePage.greenMarker}
            onClick={this.handleMarkerClick.bind(this, OFFER_TYPE, offer)}
            key={offer.ID} />;
  }

  generateOfferMarkers() {
    return this.props.offers.map(this.offerMarker.bind(this));
  }

  requestMarker(request) {
    return <Marker position={request.Location}
                   icon={request.Matched ? ManagePage.grayMarker : undefined}
                   onClick={this.handleMarkerClick.bind(this, REQUEST_TYPE, request)}
                   key={request.ID} />;
  }

  generateRequestMarkers() {
    return this.props.requests.map(this.requestMarker.bind(this));
  }

  render() {
    const { requests, offers, region } = this.props;
  
    if (!region) {
      return <Loading resourceName="region" />;
    }

    const hasSelectedItem = !!this.props.selectedItem;
    let hasPossibleMatchings = false;
    let mapCenter = calculateCenter(region.Boundaries.Points);
    let sidePanel = null;
    let sidePanelTitle = null;
    let possibleMatchesPanel = null;
    let markers = [];
    let mapWidth = 100;
    if (hasSelectedItem) {
      mapWidth -= 20;
      const selectedItem = this.props.selectedItem.item;
      const selectedItemType = this.props.selectedItem.type;
      hasPossibleMatchings = !selectedItem.Matched;
      mapCenter = selectedItem.Location;
      if (hasPossibleMatchings) {
        mapWidth -= 20;
      }
      
      if (selectedItemType == OFFER_TYPE) {
        sidePanel = <Offer offer={selectedItem}/>;
        sidePanelTitle = "Offer";
        if (hasPossibleMatchings) {
          markers = this.generateRequestMarkers();
          possibleMatchesPanel =
            <RequestList requests={requests} onTouchTapItem={(request) => this.createMatching(selectedItem, request)}/>;
        }
        markers.push(this.offerMarker(selectedItem));
      } else if (selectedItemType == REQUEST_TYPE) {
        sidePanel = <Request request={selectedItem}/>;
        sidePanelTitle = "Request";
        if (hasPossibleMatchings) {
          markers = this.generateOfferMarkers();
          possibleMatchesPanel =
            <OfferList offers={offers} onTouchTapItem={(offer) => this.createMatching(offer, selectedItem)}/>;
        }
        markers.push(this.requestMarker(selectedItem));
      }
    } else {
      markers = this.generateOfferMarkers().concat(this.generateRequestMarkers());
    }
    
    const mapHeight = 400;

    return (
      <div>
        <div className="show-for-small-only" style={{backgroundColor: 'darkred', color: "white", textAlign: "center", padding: 10}}>
          <small>The admin interface on mobile devices is currently in experimental state</small>
        </div>
        <div style={{display: 'flex'}}>
          <Paper style={hasSelectedItem ? {width: '20%', padding: '1rem'} : {width: 0}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <b>{sidePanelTitle}</b>
              <IconButton onTouchTap={this.props.unselectItem}><CloseIcon /></IconButton>
            </div>
            {sidePanel}
          </Paper>
          <div style={{height: mapHeight, width: `${ mapWidth }%`, position: 'relative'}}>
            <SimpleMap center={mapCenter} style={{height: mapHeight}}>
              <Polygon positions={region.Boundaries.Points} key="region" />
              {markers}
            </SimpleMap>
            <h1 style={{position: 'absolute', top: 0, left: 50, pointerEvents: 'none'}}>{this.props.region.Name}</h1>
          </div>
          <Paper style={hasPossibleMatchings ? {width: '20%', padding: '1rem'} : {width: 0}}>
            <div>
              <b>Possible matches</b>
            </div>
            {possibleMatchesPanel}
          </Paper>
        </div>
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