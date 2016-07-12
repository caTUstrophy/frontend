import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { loadRegion, loadRegionAdmins } from '../../../actions'
import Region from '../../../components/regions/Region'
import Center from '../../layout/Center'
import { RegionPropType } from '../../../schemas/RegionSchema'
import extractRegionWithAdmins from "../../helpers/extractRegionWithAdmins";

class RegionPage extends Component {
  constructor(props) {
    super(props);
  }

  loadData(regionId) {
    this.props.loadRegion(regionId);
    this.props.loadRegionAdmins(regionId);
  }

  componentWillMount() {
    this.loadData(this.props.ID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ID !== this.props.ID) {
      this.loadData(nextProps.ID);
    }
  }

  navigate(target) {
    browserHistory.push(`/admin/regions/${this.props.ID}/${target}`);
  }

  render() {
    const { region, admins, ID } = this.props;
    if (!region) {
      return <h1><i>Loading region {ID}...</i></h1>; // todo: show loading animation
    }

    return (
      <Center>
        <Region region={region}
                admins={admins}
                onClickRequests={this.navigate.bind(this, 'requests')}
                onClickOffers={this.navigate.bind(this, 'offers')}
                onClickManageAdmins={this.navigate.bind(this, 'admins')} />
      </Center>
    )
  }
}

RegionPage.propTypes = {
  ID: PropTypes.string.isRequired,
  region: RegionPropType,
  loadRegion: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;

  return {
    ID,
    region: extractRegionWithAdmins(state, ID)
  }
}

export default connect(mapStateToProps, {
  loadRegion,
  loadRegionAdmins
})(RegionPage)
