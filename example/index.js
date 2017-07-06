import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// import Example from './src/Example';
import AnotherOne from './src/AnotherOne';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(AnotherOne);

if (module.hot) {
  // module.hot.accept('./src/Example', () => {
  //   const NewApp = require('./src/Example').default;
  //   render(NewApp);
  // });
  module.hot.accept('./src/AnotherOne', () => {
    const NewApp = require('./src/AnotherOne').default;
    render(NewApp);
  });
}
