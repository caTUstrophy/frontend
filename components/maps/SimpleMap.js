import React, {Component, PropTypes} from 'react';

import autobind from 'autobind-decorator';
import { Map, Marker, Polygon, TileLayer, ScaleControl } from 'react-leaflet';

import LocationHelpers from '../../helpers/Location';

class SimpleMap extends Component {
  static propTypes = {
    zoom: PropTypes.number,
    style: PropTypes.object,
    center: LocationHelpers.LocationPropType,
    showScale: PropTypes.bool,

    marker: LocationHelpers.LocationPropType,
    area: PropTypes.arrayOf(LocationHelpers.LocationPropType),

    onClick: PropTypes.func
  };

  static defaultProps = {
    showScale: true,
    zoom: 12
  };

  render() {
    let style = { height: '200px' };
    Object.assign(style, this.props.style);

    let content = [].concat(this.props.children);
    if (this.props.showScale) {
      content.push(<ScaleControl key="scale" />);
    }
    if (this.props.marker) {
      content.push(<Marker position={LocationHelpers.locationToArray(this.props.marker)} key="marker" />);
    }
    if (this.props.area) {
      content.push(<Polygon positions={LocationHelpers.locationsToArray(this.props.area)} key="area" />);
    }

    let center = this.props.center;
    if (!center) {
      if (this.props.marker) {
        center = this.props.marker;
      } else if (this.props.area) {
        center = {
          Latitude: this.props.area.map(point => point.Latitude).reduce((a, b) => a + b) / this.props.area.length,
          Longitude: this.props.area.map(point => point.Longitude).reduce((a, b) => a + b) / this.props.area.length,
        }
      }
    }
    center = center ||  {
      Latitude: 0,
      Longitude: 0
    };

    return <Map center={LocationHelpers.locationToArray(center)} zoom={this.props.zoom} style={style} onClick={this.props.onClick}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {content}
    </Map>
  }
}

export default SimpleMap