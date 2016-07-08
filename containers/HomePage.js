import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import Center from './layout/Center'

class HomePage extends Component {
  render() {
    return (
      <Center style={{textAlign: 'center'}}>
        <img src="../images/logo.svg" alt="CaTUstrophy" style={{height: '20vh'}} />
        <h1>Welcome to CaTUstrophy.</h1>
        Get started by creating your first offer or request.<br/>
        Just click the plus button in the bottom-right corner.


        <IconMenu
          iconButtonElement={<FloatingActionButton style={{position: 'fixed', bottom: '2rem', right: '2rem'}}
                              secondary={true} >
            <ContentAdd />
          </FloatingActionButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'bottom'}}>
          <MenuItem primaryText="Request" onTouchTap={() => browserHistory.push('/requests/create')} /><br/>
          <MenuItem primaryText="Offer" onTouchTap={() => browserHistory.push('/offers/create')} />
        </IconMenu>
      </Center>
    );
  }
}

export default HomePage
