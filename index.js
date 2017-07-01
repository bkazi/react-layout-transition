import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Example from './src/Example';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Example);

if (module.hot) {
  module.hot.accept('./src/Example', () => {
    const NewApp = require('./src/Example').default;
    render(NewApp);
  });
}
