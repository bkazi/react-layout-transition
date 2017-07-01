import React from 'react';

class Page1 extends React.Component {
    render() {
        const cont = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
        };

        const img1Style = {
            maxWidth: '100%',
            height: 'auto',
        };

        const img2Style = {
            maxWidth: '100%',
            height: 'auto',
        };

        return (
            <div style={this.props.style} ref={this.props.innerRef}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis consequat felis. Donec velit ipsum, laoreet in massa a, volutpat pellentesque augue. Phasellus eu venenatis enim, eget aliquet est. Vestibulum interdum ut sem sed fringilla. Pellentesque aliquam rhoncus mauris et pretium.</p>
                <div style={cont}>
                    <img id="hero" style={img1Style} src='https://68.media.tumblr.com/4d1f173744a32bb4b35a2d5d0babff74/tumblr_mnh29fxz111st5lhmo1_1280.jpg' />
                    <img id="another-one" style={img2Style} src='https://images.unsplash.com/13/unsplash_5239d6c04342c_1.JPG' />
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis consequat felis. Donec velit ipsum, laoreet in massa a, volutpat pellentesque augue.</p>
            </div>
        );
    }
}

export default Page1;
