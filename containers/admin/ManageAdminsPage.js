import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { INLINE_EMAIL_FORM_ID } from '../../forms/InlineEmailForm'
import { REGION_REQUEST, PROMOTE_ADMIN_SUCCESS, loadRegionAdmins, loadRegion, promoteAdmin } from '../../actions'
import ManageAdminsForm from '../../forms/ManageAdminsForm'
import Loading from '../misc/Loading'

import { RegionPropType, UserPropType } from "../../schemas"
import extractRegionWithAdmins from "../helpers/extractRegionWithAdmins";

import Center from '../layout/Center'


class ManageAdminsPage extends Component {
  static propTypes = {
    region: RegionPropType,
    loadRegion: PropTypes.func.isRequired,
    admins: PropTypes.arrayOf(UserPropType),
    loadRegionAdmins: PropTypes.func.isRequired,
    promoteAdmin: PropTypes.func.isRequired,
    resetInlineEmailForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadRegion(this.props.regionId);
    this.props.loadRegionAdmins(this.props.regionId);
  }

  @autobind
  handlePromoteAdmin(adminEmail, regionId) {
    console.log("Promote", adminEmail, regionId);
    this.props.promoteAdmin(adminEmail, regionId)
      .then(result => {
        if (result.type == PROMOTE_ADMIN_SUCCESS) {
          this.props.loadRegionAdmins(this.props.regionId);
        }
      }); // todo: handle error cases
  }

  @autobind
  navigateToRegion() {
    browserHistory.push(`/admin/regions/${ this.props.regionId }`);
  }

  render() {
    const { region, loading } = this.props;
    if (loading) {
      return <Loading resourceName="region" />;
    }

    return (
      <Center>
        <ManageAdminsForm region={region}
                          onPromoteAdmin={this.handlePromoteAdmin}
                          resetInlineEmailForm={this.props.resetInlineEmailForm}
                          navigateToRegion={this.navigateToRegion} />
      </Center>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let regionId = ownProps.params.ID;

  return {
    region: extractRegionWithAdmins(state, regionId),
    regionId,
    loading: state.loading.includes(REGION_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadRegion,
  loadRegionAdmins,
  promoteAdmin,
  resetInlineEmailForm: () => reset(INLINE_EMAIL_FORM_ID)
})(ManageAdminsPage)
