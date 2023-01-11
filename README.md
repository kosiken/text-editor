# Kosisochukwu Allison Submission

This project was bootstarapped with [CRA](https://create-react-app.dev/). Yes I could have used
[craco](https://craco.js.org/) but there isn't much custom configuration needed  to be done. The 
project wouldn't win the award for UI but it's performance is very decent. 

## Table of contents

- [Technolgies used](#technologies-used)
- [Parts Implemented](#parts-implemented)
- [How to run](#how-to-run)
- [Dire]

## Technologies used

- [Nodejs v18.12.1](https://nodejs.org/en/)
- [React v18.2.0](https://beta.reactjs.org/)
- [Cypress v12.3.0](https://cypress.io) For tests, uses Mocha and Chai under the hood for assertions.
- [Testing Library Cypress](https://testing-library.com/docs/cypress-testing-library/intro/) For tests


## Parts Implemented

- Product List/Card list page
- Product Detail page
- Cart
- Dummy Checkout Page

## How to run

> You must have node version >= 16 to run this project.


### Clone this project 

```sh

    git clone git@github.com:kosiken/shop.git

```

or use https if it suits you better

```sh

    https://github.com/kosiken/shop.git

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

### Build and run

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