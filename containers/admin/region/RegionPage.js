import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadRegion } from '../../../actions'
import Region from '../../../components/regions/Region'
import { RegionPropType } from '../../../schemas/RegionSchema'

function loadData(props) {
  const { loadRegion, ID } = props;
  loadRegion(ID);
}

class RegionPage extends Component {
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
    const { region, ID } = this.props;
    if (!region) {
      return <h1><i>Loading region {ID}...</i></h1>
    }

    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <Region region={region} />
      </div>
    )
  }
}

RegionPage.propTypes = {
  ID: PropTypes.string.isRequired,
  region: RegionPropType,
  loadRegion: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;
  const regions = state.entities.regions;

  return {
    ID,
    region: regions[ID]
  }
}

export default connect(mapStateToProps, {
  loadRegion
})(RegionPage)