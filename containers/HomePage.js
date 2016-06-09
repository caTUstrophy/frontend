import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

class HomePage extends Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '40rem', margin: 'auto', textAlign: 'center'}}>
          <img src="../images/logo.svg" alt="CaTUstrophy" width="200rem" height="200rem"/>
          <h1>Welcome to CaTUstrophy</h1>


          <IconMenu
            iconButtonElement={<FloatingActionButton style={{position: 'fixed', bottom: '2rem', right: '2rem'}}
                                secondary={true} >
              <ContentAdd />
            </FloatingActionButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}>
            <MenuItem primaryText="Request" onTouchTap={() => browserHistory.push('/requests/create')} />
            <MenuItem primaryText="Offer" onTouchTap={() => browserHistory.push('/offers/create')} />
          </IconMenu>
        </div>
      </div>
    )
  }
}

export default HomePage
