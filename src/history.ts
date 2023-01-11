import { createBrowserHistory } from 'history';

export enum ROUTES {
  ROOT = '/',
}

const history = createBrowserHistory({window});

const navigateTo = (route: string) => {
  console.log(route);
  history.push(route);
};

export { navigateTo, history };
