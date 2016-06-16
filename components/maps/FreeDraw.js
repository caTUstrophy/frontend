import { MapLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import LeafletFreeDraw from 'leaflet.freedraw-browserify';

LeafletFreeDraw(Leaflet);

class FreeDraw extends MapLayer {
  componentWillMount() {
    let freeDraw = new L.FreeDraw({
      mode: L.FreeDraw.MODES.CREATE | L.FreeDraw.MODES.EDIT
    });

    freeDraw.options.setHullAlgorithm('Wildhoney/ConcaveHull');
    freeDraw.on('markers', (event) => this.props.onMarkers && this.props.onMarkers(event));
    freeDraw.options.exitModeAfterCreate(true);

    // some obscure way of 'exporting'
    // we don't need to manually attach the layer to the map
    this.leafletElement = freeDraw;
  }

  render() {
    return null;
  }
}

export default FreeDraw