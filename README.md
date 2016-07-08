[![Build Status](https://travis-ci.org/caTUstrophy/frontend.svg?branch=master)](https://travis-ci.org/caTUstrophy/frontend) 
[![Dependency Status](https://www.versioneye.com/user/projects/575d2d507757a00041b3b7fc//badge.svg?style=plastic)](https://www.versioneye.com/user/projects/575d2d507757a00041b3b7fc/)
[![Coverage Status](https://coveralls.io/repos/github/caTUstrophy/frontend/badge.svg?branch=master)](https://coveralls.io/github/caTUstrophy/frontend?branch=master)

# CaTUstrophy frontend
Frontend part for our catastrophe aid tool. 

## Setup

We assume you run a reasonable sort of Linux or OS X with **node.js 6.x** (use [nvm](https://github.com/creationix/nvm)!) and **npm 3.x**. 

1. Clone this repo

   `git clone https://github.com/caTUstrophy/frontend.git`
2. Change into folder

   `cd frontend`
3. Install packages

   `npm i`
4. Configure your environment. Start by cloning the example configuration and adapt to your needs.
   
   `cp environment.js.example environment.js`
5. (Optional: Fire up the [backend](https://github.com/caTUstrophy/backend))
6. Start development server

   `npm start`
7. Open spawned website: http://localhost:3000/

Changes you make to the code are applied immediately and hot-loaded.
Hit `CTRL`+`H` to show/hide the Redux DevTools, 
`CTRL`+`M` to move them around and
`CTRL`+`SHIFT`+`M` to switch between the available monitors:


- [Inspector](https://github.com/alexkuz/redux-devtools-inspector)
- [Slider](https://github.com/calesce/redux-slider-monitor)
- [Chart](https://github.com/romseguy/redux-devtools-chart-monitor) (might require reopening the DevTools to render correctly)


## Technology overview
All new code should be written in ES7/JSX. And embrace the ecosystem!

### Core technologies
- [React](http://facebook.github.io/react/) (user interface / DOM)
- [Redux](http://redux.js.org/) (predictable state container)
- [Material-UI](http://www.material-ui.com/)

### Implied remarkable packages

- [react-redux](http://redux.js.org/docs/basics/UsageWithReact.html) (bindings)
- [react-router](https://github.com/reactjs/react-router) (router)
    - [react-router-redux](https://github.com/reactjs/react-router-redux) (bindings for router)
- [redux-devtools](https://github.com/gaearon/redux-devtools) (live-editing / time travel)
    - [redux-slider-monitor](https://github.com/calesce/redux-slider-monitor) (additional monitor for better time travel)
    
### Tooling

- [webpack](https://webpack.github.io/) (module bundling etc.)
- [babel](http://babeljs.io/) (transpiler)
- [express](http://expressjs.com/) (development server)
- obviously relies on node.js / npm



## Design

- Follow the [material design guidelines](https://www.google.com/design/spec/material-design/introduction.html)
    - See [icons](https://design.google.com/icons/)
- Use [Material-UI](http://www.material-ui.com/)'s React components where possible
    - style with [theming](http://www.material-ui.com/#/customization/themes) (not CSS) where applicable
    
### CSS
We use [Foundation Sites](http://foundation.zurb.com/sites/docs/). 
Write SASS, only. 
Use their mixins et cetera wherever possible.
Don't use prefixes, we have [autoprefixer](https://github.com/postcss/autoprefixer) set up (aggressively i.e. `> 1%`).

*We should eventually use [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) to generate a CSS file, but for now it doesn't seem strictly necessary.*

## Testing
- Write tests for everything. 
- Put your tests in `test/`.
    - Put them in a matching subfolder, replicating the project structure. (E.g. forms located in `forms/` are to be tested in `test/forms/`)
- Start the tests with `npm test` (calls `mocha-webpack --webpack-config webpack.config.js --recursive test` internally)
- Configure your IDE to run tests while you develop.

### Tooling

- [mocha](http://mochajs.org/) (test framework) via [mocha-webpack](https://github.com/zinserjan/mocha-webpack)
- [unexpected](http://unexpected.js.org/) (assertions)
    - [unexpected-react](http://bruderstein.github.io/unexpected-react/) (JSX assertions)
    - [sinon](http://sinonjs.org/) (spies) and [unexpected-sinon](http://unexpected.js.org/unexpected-sinon/) (spy assertions)
- [ReactTestUtils](https://facebook.github.io/react/docs/test-utils.html) (official react testing utilities)
- [domino](https://github.com/fgnass/domino) (fast fake DOM)
- Some `test/helpers` (mostly copied from [smaato/react-test-kit](https://github.com/smaato/react-test-kit))
- Travis runs `npm test` automatically, current status: [![Build Status](https://travis-ci.org/caTUstrophy/frontend.svg?branch=master)](https://travis-ci.org/caTUstrophy/frontend)

### Code coverage
Code coverage is assessed with [nyc](https://www.npmjs.com/package/nyc) which is built on top of [istanbul](https://www.npmjs.com/package/istanbul).
It is monitored and published with [coveralls](https://www.npmjs.com/package/coveralls).
You can see the current details at [coveralls.io](https://coveralls.io/github/caTUstrophy/frontend) or with this fancy badge: [![Coverage Status](https://coveralls.io/repos/github/caTUstrophy/frontend/badge.svg?branch=master)](https://coveralls.io/github/caTUstrophy/frontend?branch=master)

## Deploying

Run `npm run-script bundle` to create a webpack build in `dist/`.
The command internally runs

    webpack -p --progress --config webpack.production.config.js
    
Read `webpack.production.config.js` for the details.

Currently there is no HTML generated, an `index.html` should be derived manually.

There are no CSS files for now, it is inlined with the JS sources by webpack.

## Resources to familiarize yourself with the technologies
- [React tutorial](http://facebook.github.io/react/docs/tutorial.html) in the [official docs](http://facebook.github.io/react/docs/top-level-api.html)
    - the official docs have many *guides* and *tips*.
- [30 free videos](https://egghead.io/series/getting-started-with-redux) on Redux, by the creator
