import React from 'react';

import Header from './Header';
import SharedElementExample from './SharedElementExample';
import LayoutTransitionExample from './LayoutTransitionExample';
import Footer from './Footer';

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
                <SharedElementExample />
                <LayoutTransitionExample />
                <Footer />
            </div>
        );
    }
}

export default App;
