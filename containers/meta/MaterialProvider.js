import React, { Component, PropTypes } from 'react'

// Needed for onTouchTap, info at https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey400, red500 } from 'material-ui/styles/colors';

const theme = getMuiTheme({
  palette: {
    primary1Color: blueGrey400,
    accent1Color: red500
  }
});

class MaterialProvider extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div style={{fontFamily: theme.fontFamily, height: '100%'}}>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default MaterialProvider
