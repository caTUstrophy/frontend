import React, {Component, PropTypes} from 'react';

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
    showScale: true
  };

  render() {
    let style = { height: '200px' };
    Object.assign(style, this.props.style);
    
    let mapProps = { style, onClick: this.props.onClick };

    let content = [].concat(this.props.children);
    if (this.props.showScale) {
      content.push(<ScaleControl key="scale" />);
    }
    if (this.props.marker) {
      content.push(<Marker position={this.props.marker} key="marker" />);
    }
    if (this.props.area) {
      content.push(<Polygon positions={this.props.area} key="area" />);
    }

    // calculate bounds
    if (this.props.zoom) {
      mapProps.zoom = this.props.zoom;
    } else {
      var points = [];
      if (this.props.area) {
        points = points.concat(this.props.area);
      }
      if (this.props.children) {
        let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        children.forEach((child) => {
          if (child.props) {
            if (child.props.positions) { // areas
              points = points.concat(child.props.positions);
            } else if (child.props.position) { // markers
              points.push(child.props.position)
            }
          }
        });
      }
  
      if (points.length > 0) {
        mapProps.bounds = new L.LatLngBounds(points);
      } else {
        mapProps.zoom = 13; // fallback if properties / children not (yet) available
      }
    }
    
    let center = this.props.center;
    if (!center) {
      if (this.props.marker) {
        center = this.props.marker;
      } else if (this.props.area && this.props.area.length) {
        center = LocationHelpers.calculateCenter(this.props.area);
      }
    }
    mapProps.center = center ||  {
      lat: 0,
      lng: 0
    };
    
    return <Map {...mapProps}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
      {content}
    </Map>
    
  }
}

export default SimpleMap