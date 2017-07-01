import React from 'react';

class Page1 extends React.Component {
    render() {
        const imgStyle = {
            width: '50%',
            height: 'auto',
            left: '50%',
        };

        return (
            <div style={this.props.style} ref={this.props.innerRef}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis consequat felis. Donec velit ipsum, laoreet in massa a, volutpat pellentesque augue. Phasellus eu venenatis enim, eget aliquet est. Vestibulum interdum ut sem sed fringilla. Pellentesque aliquam rhoncus mauris et pretium.</p>
                <img id="hero" style={imgStyle} src='https://68.media.tumblr.com/4d1f173744a32bb4b35a2d5d0babff74/tumblr_mnh29fxz111st5lhmo1_1280.jpg' />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis consequat felis. Donec velit ipsum, laoreet in massa a, volutpat pellentesque augue.</p>
            </div>
        );
    }
}

export default Page1;
