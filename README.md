# Kosisochukwu Allison Submission

This project was bootstarapped with [CRA](https://create-react-app.dev/). Yes I could have used
[craco](https://craco.js.org/) but there isn't much custom configuration needed  to be done. The 
project wouldn't win the award for UI but it's performance is very decent and the UX is good too. 

## Table of contents

- [Technolgies used](#technologies-used)
- [Parts Implemented](#parts-implemented)
- [How to run](#how-to-run)
    - [Test mode](#run-the-local-webpack-dev-server)
    - [Production](#build-and-run-in-production)
- [Directory Structure](#directory-structure)
- [Modular Structure Explanation](#modular-structure-explanation)
- [How to improve performance of flipbook]

## Technologies used

- [Nodejs v18.12.1](https://nodejs.org/en/)
- [React v18.2.0](https://beta.reactjs.org/)
- [Cypress v12.3.0](https://cypress.io) For tests, uses Mocha and Chai under the hood for assertions.
- [Testing Library Cypress](https://testing-library.com/docs/cypress-testing-library/intro/) For tests
- [Styled Components](https://styled-components.com/) Allows you to style components with css inside your tsx or jsx file
    - Download the [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components) extension if you are using vscode to get full text highlighting.
- [Styled System](https://styled-system.com/) Styled System is a collection of utility functions that add style props to your React components
- [React Helmet](https://www.npmjs.com/package/react-helmet) For managing the `<head></head>` of the document
- [Redux / Redux Toolkit](https://redux-toolkit.js.org/) For state management
- [Redux Observable](https://redux-observable.js.org/) To manage and run redux side effects. 
- [Typesafe Actions](https://www.npmjs.com/package/typesafe-actions) To define redux actions that are typesafe with typescript.



## Parts Implemented

- Product List/Card list page
- Product Detail page
- Cart
- Dummy Checkout Page
- A search input


## How to run

> You must have node version >= 16 to run this project.


### Clone this project 

```sh

    git clone git@github.com:kosiken/shop.git

```

or use https if it suits you better

```sh

    git clone https://github.com/kosiken/shop.git

```

Install node packages. This project was built with **npm** as the 
package manager but you can still use **yarn**

```sh

    npm install

```

If this command fails check that your node version is equal 
or above `16.2.0`

### Run The Local Webpack Dev server

Run this command 

```sh

    npm run dev

```

### Build and run in production

You have to make sure you are running on an environment that has at
least 2048mb or RAM available otherwise the build may fail

```sh

    npm run build && npm run serve

```


### Run End to End Tests

#### First you have to 

- Make sure to install the dev dependencies are installed
- Make sure that then run either the dev server or the production server as outlined above


```sh

   npm run test:e2e

```

## Directory Structure 

```sh

src/
├── design-system/
│   ├── components/
│   │   ├── Badge/
│   │   ├── Box/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── LoadingIndicator/
│   │   ├── Skeleton/
│   │   └── Text/
│   └── theme/
├── helpers/
├── modules/
│   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── store/
│   ├── shopping-cart/
│   │   ├── components/
│   │   ├── helpers/
│   │   ├── hooks/
│   │   └── store/
│   └── shopping-list/
│       ├── components/
│       └── store/
├── overrides/
├── services/
├── store/


```

The `design-system` directory contains components that are used globally in all the pages.

The `overrides` directory contains any overides that may be used for some to override components or data from external libraries.

The `services` directory contains api Requests and other external services.

The `store` directories contains redux stores, reducers, actions and redux observable epics.

### Modular Structure Explanation

So in the modules folder there are unique modules, each module has the structure, though some folders may be missing from a few modules because they may not be needed there. A module may also export an index.tsx file if it has an index page to display. Modules can share data with each other, but when a particular component or logic could be used in more than one module it may be moved to the `app` module, which is like a shared module.

```sh

├── components/
├── helpers/
|── hooks/
└── store/

 ```

 The *components* folder contains React components that are related to that module for example the **shopping-cart** module contains
 the `CartItem` component that displays a single item in the cart. 

 The *helpers* directory contains utility functions that are related to that module.
 
 The *hooks* directory contains react hook that are related to that module. 

 The *store* directory contains a reducer file where the reducer for the module is located, an epics file for side effects related to the 
 module to run, The actions file contains redux actions that are associated with the module. The selectors file contains helper fuctions to 
 retrieve data from the store.


## How to improve performance of flipbook

I am not really clear on this but I think the question refers to an animation.
So to improve performance of a flipbook animation you could opt to use `requestAnimationFrame` instead of 
`setInterval()`. You could also shit the animation logic to a [web-worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). 

For CSS animations you could try delaying animations by a bit to allow a page to fully load.

 ### Author

[Allison Kosisochukwu](https://github.com/kosiken)