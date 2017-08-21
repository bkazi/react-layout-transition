import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// import SharedElementExample from './src/SharedElementExample';
import LayoutTransitionExample from './src/LayoutTransitionExample';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(LayoutTransitionExample);

if (module.hot) {
  // module.hot.accept('./src/SharedElementExample', () => {
  //   render(SharedElementExample);
  // });
  module.hot.accept('./src/LayoutTransitionExample', () => {
    render(LayoutTransitionExample);
  });
}
