import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// import SharedElementExample from './src/SharedElementTransition';
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
  // module.hot.accept('./src/SharedElementTransition', () => {
  //   render(SharedElementExample);
  // });
  module.hot.accept('./src/LayoutTransitionExample', () => {
    render(LayoutTransitionExample);
  });
}
