import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'

import autobind from 'autobind-decorator'

import RegionForm from '../../../forms/RegionForm'
import { createRegion, CREATE_REGION_SUCCESS } from '../../../actions/regions'
import { getLocation } from '../../../actions/location'

class AddRegionPage extends Component {
  static propTypes = {
    region: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getLocation();
  }

  @autobind
  handleSubmit(region) {
    this.props.createRegion(region)
      .then(result => {
        if (result.type == CREATE_REGION_SUCCESS) {
          browserHistory.push('/admin/regions'); // todo: improve this
        }
      }).catch(e => {
        console.log("Catch", e);
      });
  }

  render() {
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <RegionForm onSubmit={this.handleSubmit}
                    defaultLocation={this.props.location} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.location
  }
};

export default connect(mapStateToProps, {
  createRegion,
  getLocation
})(AddRegionPage)
