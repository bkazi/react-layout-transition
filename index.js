import 'babel-polyfill';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import SharedElementTransitionGroup from './SharedElementTransitionGroup.js';

class Page1 extends Component {
    render() {
        const imgStyle = {
            width: '50%',
            height: 'auto',
            left: '50%',
        };

        return (
            <div style={this.props.style} ref={this.props.innerRef}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis consequat felis. Donec velit ipsum, laoreet in massa a, volutpat pellentesque augue. Phasellus eu venenatis enim, eget aliquet est. Vestibulum interdum ut sem sed fringilla. Pellentesque aliquam rhoncus mauris et pretium.</p>
                    <Link to='/element'>
                        <img id="shared" style={imgStyle} src='https://68.media.tumblr.com/4d1f173744a32bb4b35a2d5d0babff74/tumblr_mnh29fxz111st5lhmo1_1280.jpg' />
                    </Link>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis consequat felis. Donec velit ipsum, laoreet in massa a, volutpat pellentesque augue.</p>
            </div>
        );
    }
}

class Page2 extends React.Component {
    render() {
        const imgStyle = {
            width: '100%',
            height: 'auto',
        };

        return (
            <div style={this.props.style} ref={this.props.innerRef}>
                <img id="shared" style={imgStyle} src='https://68.media.tumblr.com/4d1f173744a32bb4b35a2d5d0babff74/tumblr_mnh29fxz111st5lhmo1_1280.jpg' />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis consequat felis. Donec velit ipsum, laoreet in massa a, volutpat pellentesque augue. Phasellus eu venenatis enim, eget aliquet est. Vestibulum interdum ut sem sed fringilla. Pellentesque aliquam rhoncus mauris et pretium. Pellentesque vehicula malesuada risus, ut laoreet lectus dignissim vel. Suspendisse vel ex id tortor tincidunt rhoncus. In tempor commodo sapien placerat auctor. Maecenas sollicitudin augue massa. Quisque facilisis dui quis risus tempor euismod pharetra ut leo. Fusce sit amet dui at nisi facilisis lobortis ut ut est. Morbi a arcu eget nibh aliquam maximus sed quis ex.</p>
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter basename="/react-layout-transition">
        <Route path='/' render={({match, location, ...rest}) => {
            return (
                <SharedElementTransitionGroup>
                    {location.pathname === '/' && match.isExact && <Page1 />}
                    {location.pathname === '/element' && <Page2 />}
                </SharedElementTransitionGroup>
            );
        }} />
    </BrowserRouter>,
document.getElementById('root')
);
