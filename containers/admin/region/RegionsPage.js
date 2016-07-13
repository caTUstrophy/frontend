import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { REGIONS_REQUEST, loadRegions } from '../../../actions/regions'
import RegionList from '../../../components/regions/RegionList'

import Center from '../../layout/Center'
import Loading from '../../misc/Loading'

class RegionsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadRegions();
  }

  @autobind
  handleTouchTapItem(offer) {
    browserHistory.push(`/admin/regions/${ offer.ID }`);
  }

  render() {
    const { regions, loading } = this.props;
    if (loading) {
      return <Loading resourceName="regions" />;
    }

    return (
      <Center>
        <h1>Regions</h1>
        <RegionList regions={regions} onTouchTapItem={this.handleTouchTapItem} />
        <FloatingActionButton style={{position: 'fixed', bottom: '2rem', right: '2rem'}}
                              secondary={true}
                              onTouchTap={() => browserHistory.push('/admin/regions/create')}>
          <ContentAdd />
        </FloatingActionButton>
      </Center>
    )
  }
}

RegionsPage.propTypes = {
  regions: PropTypes.array.isRequired,
  loadRegions: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { regions }, loading } = state;

  return {
    regions: Object.values(regions),
    loading: loading.includes(REGIONS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadRegions
})(RegionsPage)
