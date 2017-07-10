import React from 'react';
import Loadable from 'react-loadable';

import Header from './Header';
import Footer from './Footer';

const LoadingComponent = () => {
    return (
        <div>Loading</div>
    );
};

const LoadableSharedElExample = Loadable({
    loader: () => import(/* webpackChunkName: 'SharedElementExample' */ './SharedElementExample'),
    loading: LoadingComponent,
});

const LoadableLayoutTransitionExample = Loadable({
    loader: () => import(/* webpackChunkName: 'LayoutTransitionExample' */ './LayoutTransitionExample'),
    loading: LoadingComponent,
});

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className='container'>
                    <div className='about'>
                        <h2 className='about__title'>About</h2>
                        <p>
                            This project aims to provide React components that can <em>✨automagically✨</em> animate between changes in your layout.
                            Inspired by existing solutions on native platforms, it hopes to bring similar functionality and ease to the web.
                        </p>
                    </div>
                </div>
                <LoadableSharedElExample />
                <LoadableLayoutTransitionExample />
                <Footer />
            </div>
        );
    }
}

export default App;
