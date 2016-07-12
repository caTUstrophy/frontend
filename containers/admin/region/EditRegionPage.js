import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'

import autobind from 'autobind-decorator'

import RegionForm from '../../../forms/RegionForm'
import { getLocation } from '../../../actions/location'
import { loadRegion, updateRegion, UPDATE_REGION_SUCCESS } from '../../../actions'
import {LocationPropType} from "../../../helpers/Location";
import Center from '../../layout/Center'

function loadData(props) {
  const { loadRegion, ID } = props;
  loadRegion(ID);
}

class EditRegionPage extends Component {
  static propTypes = {
    ID: PropTypes.string.isRequired,
    region: PropTypes.object,
    location: LocationPropType,

    loadRegion: PropTypes.func.isRequired,
    getLocation: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }
  
  @autobind
  handleSubmit(region) {
    let extendedRegion = Object.assign({}, this.props.region, region);
    this.props.updateRegion(extendedRegion)
      .then(result => {
        if (result.type == UPDATE_REGION_SUCCESS) {
          browserHistory.push('/admin/regions'); // todo: improve this
        }
      }).catch(e => {
      console.log("Catch", e);
    });
  }

  render() {
    return (
      <Center vertical={true}>
        <RegionForm onSubmit={this.handleSubmit}
                    region={this.props.region}
                    defaultLocation={this.props.location} />
      </Center>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { ID } = ownProps.params;
  let region = state.entities.regions[ID];
  if (region) {
    region = Object.assign({}, region)
  }

  return {
    ID,
    region,
    location: state.location
  }
};

export default connect(mapStateToProps, {
  loadRegion,
  updateRegion,
  getLocation
})(EditRegionPage)
