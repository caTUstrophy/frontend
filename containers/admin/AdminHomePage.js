import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Polygon } from 'react-leaflet';
import Paper from 'material-ui/Paper';

import { loadRegions, REGIONS_REQUEST } from '../../actions'
import RegionList from '../../components/regions/RegionList';
import SimpleMap from '../../components/maps/SimpleMap';
import { calculateCenter } from '../../helpers/Location';
import Loading from '../misc/Loading'

export class AdminHomePage extends Component {
  static propTypes = {
    loadRegions: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.loadRegions();
  }

  handleFocusRegion(region) {
    browserHistory.push(`/admin/manage/${ region.ID }`);
  }
  
  render() {
    const { regions, loadingRegions } = this.props;

    if (!regions && loadingRegions) {
      return <Loading resourceName="region" />;
    }

    return (
      <div>
        <div className="show-for-small-only" style={{backgroundColor: 'darkred', color: "white", textAlign: "center", padding: 10}}>
          <small>The admin interface on mobile devices is currently in experimental state</small>
        </div>
        <div style={{display: 'flex'}}>
          <Paper style={{width: '20%'}}>
            <RegionList regions={regions} onTouchTapItem={this.handleFocusRegion.bind(this)} />
          </Paper>
          <SimpleMap center={calculateCenter(regions.map((region) => calculateCenter(region.Boundaries.Points)))}
                     style={{width: '80%', height: 400}}>
            {regions.map(region => <Polygon positions={region.Boundaries.Points} onClick={this.handleFocusRegion.bind(this, region)} key={region.ID} />) /* todo: style */}
          </SimpleMap>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { entities: { regions }, loading } = state;
  
  return {
    regions: Object.values(regions),
    regionsLoading: loading.includes(REGIONS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadRegions
})(AdminHomePage)