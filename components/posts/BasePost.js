import React, { Component, PropTypes } from 'react'

import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import LabelIcon from 'material-ui/svg-icons/action/label-outline'
import RadiusIcon from 'material-ui/svg-icons/maps/zoom-out-map'
import UnmatchedIcon from 'material-ui/svg-icons/social/share'
import MatchedIcon from 'material-ui/svg-icons/social/people'

import Chip from 'material-ui/Chip';

import { PostBasePropType } from '../../schemas/PostBaseSchema'
import { toString } from "../../helpers/Location"

export default class BasePost extends Component {
  static propTypes = {
    post: PostBasePropType.isRequired
  };
  
  static iconStyle = {marginRight: '0.5rem'};
  static rowStyle = {display: 'flex', alignItems: 'center', marginBottom: '0.5rem'};

  render() {
    const post = this.props.post;

    return (
      <div>
        <h2>{post.Name}</h2>
        <div style={{marginBottom: '1rem'}}>
          {post.Description ? post.Description : <i>No description</i>}
        </div>
  
        {post.Matched
          ? <div style={Object.assign({}, BasePost.rowStyle, { color: 'red'})}>
              <MatchedIcon style={BasePost.iconStyle} color="red" /> This request has been matched!
            </div>
          : <div style={BasePost.rowStyle}><UnmatchedIcon style={BasePost.iconStyle} /> <i>Not matched yet</i></div>
        }
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <AccountIcon style={BasePost.iconStyle} /> {post.User ? post.User.Name : "You"}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LocationIcon style={BasePost.iconStyle} /> {toString(post.Location)}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <RadiusIcon style={BasePost.iconStyle} /> {'Within a ' + post.Radius + ' km radius'}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LabelIcon style={BasePost.iconStyle} />
          {post.Tags && post.Tags.length > 0
            ? post.Tags.map(({ Name }) => <Chip key={Name} style={{margin: '0 2px'}}>{Name}</Chip>)
            : <i>Untagged</i>
          }
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <TimerIcon style={BasePost.iconStyle} /> {new Date(post.ValidityPeriod).toString()}
        </div>
      </div>
    )
  }
}