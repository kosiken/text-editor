import React from 'react';

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AppTheme, baseTheme } from './design-system/theme';
import func from './store';
import { history } from './history';

import { BrowserRouter as Router } from './overrides/BrowserRouter';
import EntryPoint from './modules';

const GlobalStyle = createGlobalStyle<{ theme: AppTheme }>`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #F8F8F8;
    font-family: Rubik;
    font-size: 0.9rem
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: ${({ theme }) => theme.colors.darkOrange};
    }
    &:visited {
      color: ${({ theme }) => theme.colors.darkGreen};
    }
  }

  // Newer semantic elements don't have block styling in IE11
  article, header, nav, section, footer, aside {
    display: block;
  }
`;

const { store, persistor } = func();

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyle />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Router navigator={history}>
            <EntryPoint />
        </Router>
        </PersistGate>
      </Provider>

    </ThemeProvider>
  );
}

export default App;
