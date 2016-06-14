import React, {Component, PropTypes} from 'react';

import autobind from 'autobind-decorator';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import LocationHelpers from '../../helpers/Location';

class SimpleMap extends Component {
  static propTypes = {
    zoom: PropTypes.number,
    style: PropTypes.object,
    center: LocationHelpers.LocationPropType,
    marker: LocationHelpers.LocationPropType,

    onClick: PropTypes.func
  };

  static defaultProps = {
    zoom: 12
  };

  render() {
    let style = { height: '200px' };
    Object.assign(style, this.props.style);

    let content = [].concat(this.props.children);
    if (this.props.marker) {
      content.push(<Marker position={LocationHelpers.locationToArray(this.props.marker)} key="marker" />);
    }

    let center = this.props.center;
    if (!center && this.props.marker) {
      center = this.props.marker;
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