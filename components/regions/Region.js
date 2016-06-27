import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import FingerprintIcon from 'material-ui/svg-icons/action/fingerprint'
import CropFreeIcon from 'material-ui/svg-icons/image/crop-free'

import SimpleMap from '../maps/SimpleMap'
import { geodesicArea } from '../../helpers/Location';

import { RegionPropType } from '../../schemas/RegionSchema'

export default class Region extends Component {
  static propTypes = {
    region: RegionPropType.isRequired,
    onClickRequests: PropTypes.func.isRequired,
    onClickOffers: PropTypes.func.isRequired,
    onClickManageAdmins: PropTypes.func.isRequired
  };
  
  renderAdminList() {
    return <List>
      <ListItem key="empty"
                primaryText="No administrators for this region"
                disabled={true}/>
    </List>;
  }
  
  render() {
    const region = this.props.region;

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={region.Name} />
        <CardText>
          <h2>{region.Name}</h2>
          {region.Description}
        </CardText>
        <SimpleMap area={region.Boundaries.Points} style={{'height': '400px'}} />
        <CardText>
          <h4>Administration</h4>
          {this.renderAdminList()}
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <RaisedButton label="Manage admins" onTouchTap={this.props.onClickManageAdmins} />
          </div>

          <h4 style={{marginTop: '2rem'}}>Details</h4>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            <CropFreeIcon style={{marginRight: '0.5rem'}} /> {(geodesicArea(region.Boundaries.Points) / 1e6).toFixed(2)}km²
          </div>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            <FingerprintIcon style={{marginRight: '0.5rem'}} /> {region.ID}
          </div>
        </CardText>
        <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <FlatButton label="Requests" onTouchTap={this.props.onClickRequests} />
          <FlatButton label="Offers" onTouchTap={this.props.onClickOffers} />
        </CardActions>
      </Card>
    )
  }
}