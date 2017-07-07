import React from 'react';

import SharedElementExample from './SharedElementExample';

class App extends React.Component {
    render() {
        return (
            <div>
                <p>
                    Trying to make layout transitions simple <br />
                    This project aims to provide React components that can <em>✨automagically✨</em> animate between changes in your layout.
                    Inspired by existing solutions on native platforms, it hopes to bring similar functionality and ease to the web.
                </p>
                <SharedElementExample />
            </div>
        );
    }
}

export default App;
