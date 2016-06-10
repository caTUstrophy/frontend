# CaTUstrophy frontend [![Build Status](https://travis-ci.org/caTUstrophy/frontend.svg?branch=master)](https://travis-ci.org/caTUstrophy/frontend)
Frontend part for our catastrophe aid tool. 

## Setup

We assume you run a reasonable sort of Linux or OS X with **node.js 6.x** (use [nvm](https://github.com/creationix/nvm)!) and **npm 3.x**. 

1. Clone this repo

   `git clone https://github.com/caTUstrophy/frontend.git`
2. Change into folder

   `cd frontend`
3. Install packages

   `npm i`
4. (Optional: Fire up the [backend](https://github.com/caTUstrophy/backend))
5. Start development server

   `npm start`
6. Open spawned website: http://localhost:3000/

Changes you make to the code are applied immediately and hot-loaded.
Hit `CTRL`+`H` to show/hide the Redux DevTools and `CTRL`+`M` to move them around.


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
See [#3](https://github.com/caTUstrophy/frontend/issues/3) to discuss how to write and include the styles.

- Follow the [material design guidelines](https://www.google.com/design/spec/material-design/introduction.html)
    - See [icons](https://design.google.com/icons/)
- Use [Material-UI](http://www.material-ui.com/)'s React components where possible
    - style with [theming](http://www.material-ui.com/#/customization/themes) (not CSS) where applicable

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

## Deploying

Run `npm run-script bundle` to create a webpack build in `dist/`.
The command internally runs

    webpack -p --progress --config webpack.production.config.js
    
Read `webpack.production.config.js` for the details.

Currently there is no HTML generated, an `index.html` should be derived manually.

There are no CSS files anyway, see [#3](https://github.com/caTUstrophy/frontend/issues/3).

## Resources to familiarize yourself with the technologies
- [React tutorial](http://facebook.github.io/react/docs/tutorial.html) in the [official docs](http://facebook.github.io/react/docs/top-level-api.html)
    - the official docs have many *guides* and *tips*.
- [30 free videos](https://egghead.io/series/getting-started-with-redux) on Redux, by the creator
