import React from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AppTheme, baseTheme } from './design-system/theme';
import { history } from './history';
import { BrowserRouter as Router } from './overrides/BrowserRouter';
import EntryPoint from './modules';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectScriptWaveLoaded } from './modules/app/store/selectors';
import { SCRIPTS_ENUM } from './types';
import { loadScriptAction } from './modules/app/store/actions';


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

  .simple-block {
    padding: 20px 0;


   & input {
    width: 100%;
    padding: 10px;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    outline: none;
    font-size: 14px;
}

& .caption { 
  border: none
}
  }

  
`;




function App() {
  const dispatch = useDispatch();
  const facebook = useSelector(selectScriptWaveLoaded(SCRIPTS_ENUM.FACEBOOK))
  const twitter = useSelector(selectScriptWaveLoaded(SCRIPTS_ENUM.TWITTER));

  React.useEffect(() => {
    if(facebook.loaded || facebook.loading || facebook.error) {
      return;
    }
    else {
      console.log('dispatching Facebook')
      dispatch(loadScriptAction(SCRIPTS_ENUM.FACEBOOK));
    }
    
  }, [facebook.loaded, facebook.error, facebook.loading, dispatch]);

  React.useEffect(() => {
    if(twitter.loaded || twitter.loading || twitter.error) {
      return;
    }
    else {
      dispatch(loadScriptAction(SCRIPTS_ENUM.TWITTER));
    }
    
  }, [twitter.error, twitter.loaded, twitter.loading, dispatch]);
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyle />
    
        <Router navigator={history}>
            <EntryPoint />
        </Router>
   
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
