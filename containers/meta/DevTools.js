import React from 'react'
import { createDevTools } from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'

import SliderMonitor from 'redux-slider-monitor'
import Inspector from 'redux-devtools-inspector'
import ChartMonitor from 'redux-devtools-chart-monitor'

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-m"
               changeMonitorKey="ctrl-shift-m"
               defaultIsVisible={false}>
    <Inspector />
    <SliderMonitor keyboardEnabled />
    <ChartMonitor />
  </DockMonitor>
)
