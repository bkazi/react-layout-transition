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
  //   render(Example);
  // });
  module.hot.accept('./src/AnotherOne', () => {
    render(AnotherOne);
  });
}
