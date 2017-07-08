import React from 'react';

import SharedElementExample from './SharedElementExample';

class App extends React.Component {
    render() {
        return (
            <div>
                <div className='main-header'>
                    <img className='main-header__img' src='assets/logo.svg' />
                    <h1 className='main-header__title'>React Layout Transition</h1>
                    <p className='main-header__desc'>Trying to make layout transitions simple</p>
                    <span><a className='main-header__link' href='https://github.com/bkazi/react-layout-transition'>Github</a></span>
                </div>
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
            </div>
        );
    }
}

export default App;
