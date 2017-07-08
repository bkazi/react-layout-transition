import React from 'react';

import {LayoutTransitionGroup} from 'react-layout-transition';

class Demo extends LayoutTransitionGroup {
    state = {
        count: 3,
    };

    increment = () => {
        // this is where the magic happens ✨
        this.beginTransition(this.listRef, (prevState) => ({
            count: prevState.count + 1,
        }));
    };

    render() {
        const childStyle = (i) => ({
            textAlign: 'center',
            width: '100%',
            padding: '16px',
            backgroundColor: `rgb(${(60*(i+1)) % 255}, 50, ${(40 * (i+1)) % 255})`,
        });

        return (
            <div>
                <button onClick={this.increment}>Click Me</button>
                <div
                    className='vertical-flex'
                    ref={(ref) => {
                        this.listRef = ref;
                    }}
                >
                    {[...Array(this.state.count).keys()].map((i) => <div style={childStyle(i)} key={i}>{i}</div>)}
                </div>
            </div>
        );
    }
}

const codeString = `class Demo extends LayoutTransitionGroup {
    constructor(props) {
        super(props);

        this.state = {
            count: 3,
        };
        this.increment = this.increment.bind(this);
    }

    increment() {
        // this is where the magic happens ✨
        this.beginTransition(this.listRef, (prevState) => ({
            count: prevState.count + 1,
        }));
    };

    render() {
        const childStyle = (i) => ({
            textAlign: 'center',
            width: '100%',
            padding: '16px',
            backgroundColor: \`rgb(\${(60*(i+1)) % 255}, 50, \${(40 * (i+1)) % 255})\`,
        });

        return (
            <div>
                <button onClick={this.increment}>Click Me</button>
                <div
                    className='vertical-flex'
                    ref={(ref) => {
                        this.listRef = ref;
                    }}
                >
                    {Array.from(Array(this.state.count).keys()).map((i) => <div style={childStyle(i)} key={i}>{i}</div>)}
                </div>
            </div>
        );
    }
}`;

export default Demo;
export {codeString};
