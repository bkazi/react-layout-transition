import React from 'react';
import {LayoutTransitionGroup} from '../../src/index';

class LayoutTransitionExample extends LayoutTransitionGroup {
    state = {
        config: 0,
    };

    config = (i) => {
        return () => {
            this.beginTransition((prevState) => ({
                config: i,
            }), [this.barRef, this.listRef], 250, 'cubic-bezier(0.64, 0.13, 0.05, 1.67)');
        };
    };

    render() {
        const config = this.state.config;
        const config1 = config === 0;
        const config2 = config === 1;
        const count = config1 ? 5 : config2 ? 6 : 7;

        const gridStyle = {
            height: '240px',
            width: '100%',
            maxWidth: '300px',
            margin: '0 auto',
            paddingTop: config1 ? '20px' : config2 ? '100px' : ' 200px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            flexGrow: '3',
        };

        const horizontalStyle = {
            width: '100%',
            height: '80px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        };

        const barStyle = {
            height: '80px',
        };

        const childStyle = (i) => ({
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgb(230, 150, 0)',
            margin: '16px',
        });

        const buttonHolder = {
            backgroundColor: 'rgb(150, 200, 230)',
            height: '64px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        };

        const buttonStyle = {
            height: '48px',
            flexGrow: '1',
            margin: '8px',
            backgroundColor: 'white',
            border: '0',
        };

        const verticalFlex = {
            height: '75%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        };

        const pStyle = {
            textAlign: 'center',
            flexGrow: config1 ? 0 : config2 ? 2 : 4,
        };

        return (
            <div>
                <div style={buttonHolder}>
                    <button style={buttonStyle} onClick={this.config(0)}>0</button>
                    <button style={buttonStyle} onClick={this.config(1)}>1</button>
                    <button style={buttonStyle} onClick={this.config(2)}>2</button>
                </div>
                <div
                    style={horizontalStyle}
                    ref={(ref) => {
                        this.barRef = ref;
                    }}
                >
                    <div style={{...barStyle, flexGrow: 1, backgroundColor: 'rgb(200, 0, 0)'}}></div>
                    <div style={{...barStyle, flexGrow: config1 ? 1 : config2 ? 5 : 1, backgroundColor: 'rgb(0, 200, 0)'}}></div>
                    <div style={{...barStyle, flexGrow: config1 ? 1 : config2 ? 5 : 10, backgroundColor: 'rgb(0, 0, 200)'}}></div>
                </div>
                <div
                    style={gridStyle}
                    ref={(ref) => {
                        this.listRef = ref;
                    }}
                >
                    {[...Array(count).keys()].map((i) => <div style={childStyle(i)} key={i}></div>)}
                </div>
            </div>
        );
    }
}

export default LayoutTransitionExample;
