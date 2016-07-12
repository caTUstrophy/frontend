import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { loadRegions } from '../../../actions/regions'
import RegionList from '../../../components/regions/RegionList'
import Center from '../../layout/Center'

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
    const { regions } = this.props;
    if (!regions) {
      return <h1><i>Loading regions...</i></h1>
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
  const { entities: { regions } } = state;

  return {
    regions: Object.values(regions)
  }
}

export default connect(mapStateToProps, {
  loadRegions
})(RegionsPage)
