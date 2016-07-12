import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { OFFER_REQUEST, loadOffer } from '../../actions'
import OfferCard from '../../components/OfferCard'

function loadData(props) {
  const { loadOffer, ID } = props;
  loadOffer(ID);
}

class OfferPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ID !== this.props.ID) {
      loadData(nextProps)
    }
  }

  render() {
    const { offer, ID, loading } = this.props;
    if (loading) {
      return <h1><i>Loading offer #{ID}...</i></h1>
    }

    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <OfferCard offer={offer} />
      </div>
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
  const offers = state.entities.offers;
  const loading = state.loading.loading;

  return {
    ID,
    offer: offers[ID],
    loading: loading.includes(OFFER_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadOffer
})(OfferPage)
