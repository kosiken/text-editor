import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AppTheme, baseTheme } from './design-system/theme';
import { history } from './history';
import { BrowserRouter as Router } from './overrides/BrowserRouter';
import EntryPoint from './modules';
import initializeStore from './store';


// styled-components allows you to basically write css syntax inside your 
// .jsx or .tsx file
const GlobalStyle = createGlobalStyle<{ theme: AppTheme }>`
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

const store = initializeStore();

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyle />
      <Provider store={store}>
        <Router navigator={history}>
            <EntryPoint />
        </Router>
      </Provider>

    </ThemeProvider>
  );
}

export default App;
