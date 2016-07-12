import { PropTypes } from 'react';

import { MapLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import LeafletFreeDraw from 'leaflet.freedraw-browserify';

import { LocationPropType } from '../../helpers/Location'

LeafletFreeDraw(Leaflet);

class FreeDraw extends MapLayer {
  static propTypes = {
    polygon: PropTypes.arrayOf(LocationPropType),
    onMarkers: PropTypes.func.isRequired
  };
  
  componentWillMount() {
    this.freeDraw = new L.FreeDraw({
      mode: (this.props.polygon ? 0 : L.FreeDraw.MODES.CREATE) | L.FreeDraw.MODES.EDIT
    });
  
    this.freeDraw.options.setHullAlgorithm('Wildhoney/ConcaveHull');
    this.freeDraw.on('markers', (event) => this.props.onMarkers && this.props.onMarkers(event));
    this.freeDraw.options.exitModeAfterCreate(true);
        
    // some obscure way of 'exporting'
    // we don't need to manually attach the layer to the map
    this.leafletElement = this.freeDraw;
  
    if (this.props.polygon) {
      setTimeout(() => {
        this.freeDraw.createPolygon(this.props.polygon, true);
      }, 50);
    }
  }
  
  componentWillUnmount() {
    this.freeDraw.off('markers');
  }

  render() {
    return null;
  }
}

export default FreeDraw