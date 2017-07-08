import React from 'react';

class Page2 extends React.Component {
    render() {
        return (
            <div style={this.props.style} ref={this.props.innerRef}>
                <img id="hero" className='example-image' src='https://68.media.tumblr.com/4d1f173744a32bb4b35a2d5d0babff74/tumblr_mnh29fxz111st5lhmo1_1280.jpg' />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis consequat felis. Donec velit ipsum, laoreet in massa a, volutpat pellentesque augue. Phasellus eu venenatis enim, eget aliquet est. Vestibulum interdum ut sem sed fringilla. Pellentesque aliquam rhoncus mauris et pretium. Pellentesque vehicula malesuada risus, ut laoreet lectus dignissim vel. Suspendisse vel ex id tortor tincidunt rhoncus. In tempor commodo sapien placerat auctor. Maecenas sollicitudin augue massa. Quisque facilisis dui quis risus tempor euismod pharetra ut leo. Fusce sit amet dui at nisi facilisis lobortis ut ut est. Morbi a arcu eget nibh aliquam maximus sed quis ex.</p>
                <img id="another-one" className='example-image' src='http://wefunction.com/wordpress/wp-content/uploads/2013/10/tumblr_ms9mpnB2o61st5lhmo1_1280.jpg' />
            </div>
        );
    }
}

export default Page2;
