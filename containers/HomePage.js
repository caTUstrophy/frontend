import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'
import { get as _get } from 'lodash';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { loadUserOffers, OFFERS_REQUEST } from '../actions/offers'
import OfferList from '../components/posts/OfferList'
import {OfferPropType} from "../schemas/OfferSchema";
import { loadUserRequests, REQUESTS_REQUEST } from '../actions/requests'
import RequestList from '../components/posts/RequestList'
import {RequestPropType} from "../schemas/RequestSchema";
import { loadUserMatchings, MATCHINGS_REQUEST } from '../actions/matchings'
import MatchingList from '../components/MatchingList'
import {MatchingPropType} from "../schemas/MatchingSchema";
import loadingHelper from "./helpers/loadingHelper";

import Center from './layout/Center'
import Loading from './misc/Loading'
import extractMatching from "./helpers/extractMatching";

class HomePage extends Component {
  static propTypes = {
    offers: PropTypes.arrayOf(OfferPropType),
    loadUserOffers: PropTypes.func.isRequired,
    requests: PropTypes.arrayOf(RequestPropType),
    loadUserRequests: PropTypes.func.isRequired,
    matchings: PropTypes.arrayOf(MatchingPropType),
    loadUserMatchings: PropTypes.func.isRequired
  };
  
  componentWillMount() {
    this.props.loadUserOffers();
    this.props.loadUserRequests();
    this.props.loadUserMatchings();
  }
  
  @autobind
  handleTouchTapOffer(offer) {
    browserHistory.push(`/me/offers/${ offer.ID }`)
  }
  
  renderOffers() {
    const { offers, offersLoading } = this.props;
    
    if (offersLoading) {
      return <Loading resourceName="your offers" />;
    }
    
    return <OfferList offers={offers} onTouchTapItem={this.handleTouchTapOffer} />;
  }
  
  @autobind
  handleTouchTapRequest(request) {
    browserHistory.push(`/me/requests/${ request.ID }`)
  }
  
  renderRequests() {
    const { requests, requestsLoading } = this.props;
    
    if (requestsLoading) {
      return <Loading resourceName="your requests" />;
    }
    
    return <RequestList requests={requests} onTouchTapItem={this.handleTouchTapRequest} />;
  }
  
  @autobind
  handleTouchTapMatching(matching) {
    browserHistory.push(`/me/matchings/${ matching.ID }`)
  }
  
  renderMatchings() {
    const { matchings, matchingsLoading } = this.props;
    
    if (matchingsLoading) {
      return <Loading resourceName="your matchings" />;
    }
    
    return <MatchingList matchings={matchings} onTouchTapItem={this.handleTouchTapMatching} />;
  }
  
  render() {
    let welcomeMessage;
    let noEntries = !this.props.requestsLoading && this.props.requests.length === 0
                    && !this.props.offersLoading && this.props.offers.length === 0;
    
    if (noEntries) {
      welcomeMessage = <div>
        <h1>Welcome to CaTUstrophy.</h1>
        Get started by creating your first offer or request.<br/>
        Just click the plus button in the bottom-right corner.
      </div>;
    }
    
    const flexGridHackStyle = {padding: 0};
    
    return (
      <div style={{marginBottom: '5rem'}}>
        <Center style={{textAlign: 'center'}}>
          <img src="../images/logo.svg" alt="CaTUstrophy" style={{height: '20vh'}} />
          {welcomeMessage}
        </Center>
  
        <div className="row">
          <div className="xlarge-4 medium-6 small-12 columns" style={flexGridHackStyle}>
            <h1>Your Offers</h1>
            {this.renderOffers()}
          </div>
          <div className="xlarge-4 medium-6 small-12 columns" style={flexGridHackStyle}>
            <h1>Your Requests</h1>
            {this.renderRequests()}
          </div>
          <div className="xlarge-4 medium-6 small-12 columns" style={flexGridHackStyle}>
            <h1>Your Matchings</h1>
            {this.renderMatchings()}
          </div>
        </div>
  
        <IconMenu
          iconButtonElement={<FloatingActionButton style={{position: 'fixed', bottom: '2rem', right: '2rem'}}
                                                   secondary={true} >
            <ContentAdd />
          </FloatingActionButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'bottom'}}>
          <MenuItem primaryText="Request" onTouchTap={() => browserHistory.push('/requests/create')} /><br/>
          <MenuItem primaryText="Offer" onTouchTap={() => browserHistory.push('/offers/create')} />
        </IconMenu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const myOfferIds = _get(state.mappings, 'my.offers');
  const offers = myOfferIds && myOfferIds.map(offerId => state.entities.offers[offerId]);
  const myRequestIds = _get(state.mappings, 'my.requests');
  const requests = myRequestIds && myRequestIds.map(requestId => state.entities.requests[requestId]);
  const myMatchingIds = _get(state.mappings, 'my.matchings');
  const matchings = myMatchingIds && myMatchingIds.map(matchingId => extractMatching(state, matchingId));
  
  return {
    offers,
    offersLoading: loadingHelper(state, offers, OFFERS_REQUEST),
    requests,
    requestsLoading: loadingHelper(state, requests, REQUESTS_REQUEST),
    matchings,
    matchingsLoading: loadingHelper(state, matchings, MATCHINGS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUserOffers,
  loadUserRequests,
  loadUserMatchings
})(HomePage)
