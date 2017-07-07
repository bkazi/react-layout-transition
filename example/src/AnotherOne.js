import React from 'react';
import {LayoutTransitionGroup} from '../../index.js';

class AnotherOne extends LayoutTransitionGroup {
    state = {
        count: 3,
    };

    increment = () => {
        this.beginTransition(this.listRef, (prevState) => ({
            count: prevState.count + 1,
        }));
    };

    render() {
        const linearStyle = {
            minHeight: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        };

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
                    style={linearStyle}
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

export default AnotherOne;
