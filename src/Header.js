import React from 'react';

import Logo from '../assets/logo.svg';

const Header = () => {
    return (
        <div className='main-header'>
            <img className='main-header__img' src={Logo} />
            <h1 className='main-header__title'>React Layout Transition</h1>
            <p className='main-header__desc'>Trying to make layout transitions simple</p>
            <span><a className='main-header__link' href='https://github.com/bkazi/react-layout-transition'>Github</a></span>
        </div>
    );
};

export default Header;
