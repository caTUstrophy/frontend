import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { INLINE_EMAIL_FORM_ID } from '../../forms/InlineEmailForm'
import { loadRegionAdmins, loadRegion, promoteAdmin } from '../../actions'
import ManageAdminsForm from '../../forms/ManageAdminsForm'

import { RegionPropType, UserPropType } from "../../schemas"
import extractRegionWithAdmins from "../helpers/extractRegionWithAdmins";

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
    this.props.promoteAdmin(adminEmail, regionId).then(() =>
      console.log("Successfully promoted admin") // todo: handle success case
    );
  }

  @autobind
  navigateToRegion() {
    browserHistory.push(`/admin/regions/${ this.props.regionId }`);
  }

  render() {
    const { region } = this.props;
    if (!region) { // todo: check if last action was "request" and note "success"
      return <h1><i>Loading region...</i></h1>; // todo: loading animation
    }

    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <ManageAdminsForm region={region}
                          onPromoteAdmin={this.handlePromoteAdmin}
                          resetInlineEmailForm={this.props.resetInlineEmailForm}
                          navigateToRegion={this.navigateToRegion} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let regionId = ownProps.params.ID;

  return {
    region: extractRegionWithAdmins(state, regionId),
    regionId
  }
}

export default connect(mapStateToProps, {
  loadRegion,
  loadRegionAdmins,
  promoteAdmin,
  resetInlineEmailForm: () => reset(INLINE_EMAIL_FORM_ID)
})(ManageAdminsPage)
