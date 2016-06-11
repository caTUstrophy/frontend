import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RegionForm from '../../../forms/RegionForm'
import {browserHistory} from 'react-router'
import { createRegion, CREATE_REGION_SUCCESS } from '../../../actions/regions'
import autobind from 'autobind-decorator'

class AddRegionPage extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleSubmit(region) {
    this.props.createRegion(region)
      .then(result => {
        if (result.type == CREATE_REGION_SUCCESS) {
          browserHistory.push('/regions'); // todo: improve this
        }
      }).catch(e => {
        console.log("Catch", e);
      });
  }

  render() {
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <RegionForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

AddRegionPage.propTypes = {
  region: PropTypes.object
};

export default connect(null, {
  createRegion
})(AddRegionPage)
