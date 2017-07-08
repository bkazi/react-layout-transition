import React from 'react';
import {SharedElementTransitionGroup} from 'react-layout-transition';

import Page1, {codeString as page1CodeString} from './Page1';
import Page2, {codeString as page2CodeString} from './Page2';

class Demo extends React.Component {
    state = {
        switch: true,
    };

    toggle = () => {
        this.setState((prevState) => ({
            switch: !prevState.switch,
        }));
    };

    render() {
        return (
            <div>
                <button onClick={this.toggle}>Click Me</button>
                <SharedElementTransitionGroup>
                    {this.state.switch && <Page1 />}
                    {!this.state.switch && <Page2 />}
                </SharedElementTransitionGroup>
            </div>
        );
    }
}

const codeString = `${page1CodeString}

${page2CodeString}

class Demo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            switch: true,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState((prevState) => ({
            switch: !prevState.switch,
        }));
    };

    render() {
        return (
            <div>
                <button onClick={this.toggle}>Click Me</button>
                <SharedElementTransitionGroup>
                    {this.state.switch && <Page1 />}
                    {!this.state.switch && <Page2 />}
                </SharedElementTransitionGroup>
            </div>
        );
    }
}`;

export default Demo;
export {codeString};
