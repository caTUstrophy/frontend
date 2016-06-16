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
    zoom: 13
  };

  render() {
    let style = { height: '200px' };
    Object.assign(style, this.props.style);

    let content = [].concat(this.props.children);
    if (this.props.showScale) {
      content.push(<ScaleControl key="scale" />);
    }
    if (this.props.marker) {
      content.push(<Marker position={LocationHelpers.toLeaflet(this.props.marker)} key="marker" />);
    }
    if (this.props.area) {
      content.push(<Polygon positions={LocationHelpers.toLeaflet(this.props.area)} key="area" />);
    }

    let center = this.props.center;
    if (!center) {
      if (this.props.marker) {
        center = this.props.marker;
      } else if (this.props.area && this.props.area.length) {
        center = LocationHelpers.calculateCenter(this.props.area);
      }
    }
    center = center ||  {
      Lat: 0,
      Lng: 0
    };

    return <Map center={LocationHelpers.toLeaflet(center)} zoom={this.props.zoom} style={style} onClick={this.props.onClick}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {content}
    </Map>
  }
}

export default SimpleMap