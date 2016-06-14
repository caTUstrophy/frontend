import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadRegions } from '../../../actions/regions'
import RegionList from '../../../components/regions/RegionList'

class RegionsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadRegions();
  }

  render() {
    const { regions } = this.props;
    if (!regions) {
      return <h1><i>Loading regions...</i></h1>
    }

    return (
      <div>
        <h1>Regions</h1>
        <RegionList regions={regions} onTouchTapItem={(region) => console.log("Region selected", region)} />
      </div>
    )
  }
}

RegionsPage.propTypes = {
  regions: PropTypes.array.isRequired,
  loadRegions: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { regions } } = state;

  return {
    regions: Object.values(regions)
  }
}

export default connect(mapStateToProps, {
  loadRegions
})(RegionsPage)
