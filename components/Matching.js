import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import autobind from 'autobind-decorator'

import { OfferPropType } from '../schemas/OfferSchema'
import { RequestPropType } from '../schemas/RequestSchema'
import { UserPropType } from '../schemas/UserSchema'
import { MatchingPropType } from '../schemas/MatchingSchema'

import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import LabelIcon from 'material-ui/svg-icons/action/label'
import RaisedButton from 'material-ui/RaisedButton'

import { toString } from "../helpers/Location"
import { rejectMatching, PUT_REJECT_MATCHING_SUCCESS } from './../actions/matchings'


export default class Matching extends Component {
  static propTypes = {
    offer: OfferPropType.isRequired,
    request: RequestPropType.isRequired,
    profile: UserPropType.isRequired,
    matching: MatchingPropType.isRequired,
    rejectMatching: PropTypes.func.isRequired,
  };

  @autobind
  handleSubmit(matchingID) {
    this.props.rejectMatching(matchingID)
      .then(result => {
        if (result.type == PUT_REJECT_MATCHING_SUCCESS) {
          browserHistory.push('/me/matchings')
        }
      }); // todo: handle error cases
  }

  render() {
    const {offer, request, profile} = this.props;
    const matchingID = this.props.matching.ID;
    const user = this.props.profile;
    const userPost = user.ID === this.props.request.User.ID ? this.props.request : this.props.offer;
    const userPostType = user.ID === this.props.request.User.ID ? "request" : "offer";
    const matchedPost = user.ID === this.props.request.User.ID ? this.props.offer : this.props.request;
    const matchedPostType = user.ID === this.props.request.User.ID ? "offer" : "request";

    if (!offer || !request || !profile) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <h2>{userPost.Name}</h2>
        <p>Your {userPostType} for {userPost.Name} has been matched with another user's {matchedPostType}. <br/>Here are their contact details:</p>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <AccountIcon style={{marginRight: '0.5rem'}} /> {matchedPost.User ? matchedPost.User.Name : "Someone"}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <EmailIcon style={{marginRight: '0.5rem'}} /> {matchedPost.User ? matchedPost.User.Mail : "Email"}
        </div>
        {matchedPost.User.PhoneNumbers.map((phoneNumber, index) =>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}} key={index}>
            <PhoneIcon style={{marginRight: '0.5rem'}} /> {phoneNumber}
          </div>
        )}
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LocationIcon style={{marginRight: '0.5rem'}} /> {toString(matchedPost.Location)}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LabelIcon style={{marginRight: '0.5rem'}} /> <i>Untagged</i>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <TimerIcon style={{marginRight: '0.5rem'}} /> {new Date(matchedPost.ValidityPeriod).toString()}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem'}}>
          <RaisedButton onTouchTap={() => this.handleSubmit(matchingID)} label="Reject matching" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return { }
}

export default connect(mapStateToProps, {
  rejectMatching
})(Matching)