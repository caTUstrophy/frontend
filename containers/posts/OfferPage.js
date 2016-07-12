import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import { loadOffer, OFFER_REQUEST } from '../../actions'
import OfferCard from '../../components/OfferCard'
import Center from '../layout/Center'

class OfferPage extends Component {
  constructor(props) {
    super(props);
  }

  loadData() {
    this.props.loadOffer(this.props.ID);
  }
  
  componentWillMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ID !== this.props.ID) {
      this.loadData();
    }
  }
  
  @autobind
  handleNavigateToEditOffer() {
    browserHistory.push(`/me/offers/${ this.props.ID }/edit`);
  }

  render() {
    const { offer, ID, isOwnOffer, loading } = this.props;
    if (loading) {
      return <h1><i>Loading offer #{ID}...</i></h1>
    }

    return (
      <Center vertical={true}>
        <OfferCard offer={offer} editable={isOwnOffer} navigateToEditOffer={this.handleNavigateToEditOffer} />
      </Center>
    )
  }
}

OfferPage.propTypes = {
  ID: PropTypes.string.isRequired,
  offer: PropTypes.object,
  loadOffer: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;
  const offer = state.entities.offers[ID];
  const loading = state.loading;
  
  return {
    ID,
    isOwnOffer: offer && offer.User && offer.User.Mail == state.login.token.iss,
    offer,
    loading: loading.includes(OFFER_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadOffer
})(OfferPage)
