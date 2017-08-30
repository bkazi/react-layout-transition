# react-layout-transition

![Logo](assets/logo.png)
Trying to make layout transitions simple

[![Build Status](https://travis-ci.org/bkazi/react-layout-transition.svg?branch=master)](https://travis-ci.org/bkazi/react-layout-transition)
[![Coverage Status](https://coveralls.io/repos/github/bkazi/react-layout-transition/badge.svg?branch=master)](https://coveralls.io/github/bkazi/react-layout-transition?branch=master)

Check it out at [https://react-layout-transition.surge.sh/](https://react-layout-transition.surge.sh)

This project aims to provide React components that can :sparkles: _automagically_ :sparkles: animate between changes in your layout.
Inspired by existing solutions on native platforms, it hopes to bring similar functionality and ease to the web.

These are some great pieces with example code on how to use the native platform feature
- [React Native’s LayoutAnimation is Awesome](https://medium.com/@Jpoliachik/react-native-s-layoutanimation-is-awesome-4a4d317afd3e) - Justin Poliachik (Medium)
- [Animate all the Things. Transitions in Android](https://medium.com/@andkulikov/animate-all-the-things-transitions-in-android-914af5477d50) - Andrey Kulikov (Medium)

**Note:** This is a very early implementation so do expect loads of bugs and missing features (but also be sure to report them)

## Usage

react-layout-transition is available on the npm registry and can be installed via npm/yarn

```bash
npm install --save react-layout-transition
```
You should have npm installed if you have Node.js<br />
Or you can download Node.js from https://nodejs.org/en/ which comes with npm

You can also include it directly using script tags via the [unpkg CDN](https://unpkg.com)

```html
<script src='https://unpkg.com/react-layout-transition/dist/react-layout-transition.min.js'></script>
```

## LayoutTransitionGroup

A component that animates state based changes in layout in certain parts of your view.<br>
Can handle the addition and removal of DOM nodes (as shown below)

![LayoutTransitionDemo](assets/demoGifs/layoutTransitionDemo.gif)

Find the code for above example here [here](example/src/LayoutTransitionExample.js)

### Usage
An abstract class that must be extended by your component
Must also implement the `getInterpolator` function that returns an Interpolator. (see section below)

```jsx
class MyComponent extends LayoutTransitionGroup {
    this.interpolator = new CssInterpolator();

    getInterpolator() {
        return this.interpolator;
    }

	// must call superclass method if you implement componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        // your code here
    }

    // other methods and React lifecycle methods
}
```

#### `this.beginTransition`
✨ _this is where the magic happens_ ✨

**parameters**
- `stateUpdateFn`: (currState) => newState <br/>
    A function that takes in the the current state and returns the new state. Identical to the first parameter of React's `setState` 
- `refs`: Ref[] | Ref <br/>
    The React ref to the HTML element whose top level children will be animated

## SharedElementTransitionGroup

A container around the views to transition between that animates shared elements, between their initial and final position.
It classifies elements as shared if you mark them with the same id in both the intial and final layout component and does the rest for you.

![SharedElementDemo](assets/demoGifs/sharedElementDemo.gif)

Find the code for above example here [here](example/src/SharedElementExample.js)

### Usage

```jsx
class Demo extends React.Component {
    interpolator = new CssInterpolator();

    state = {
        toggle: true,
    };

    render() {
        return (
            <div>
                // animates when toggle is changed to false
                <SharedElementTransitionGroup interpolator={this.interpolator}>
                    {this.state.toggle && <Page1 />}
                    {!this.state.toggle && <Page2 />}
                </SharedElementTransitionGroup>
            </div>
        );
    }
}
```

#### props

- `interpolator`: Interpolator <br />
    Pass an instance of the interpolator you would like to use for the animation. (see section below)

**Make sure you mark the shared elements with the same `id`s**

```jsx
class Page1 extends React.Component {
    render() {
        return (
            <div style={this.props.style} ref={this.props.innerRef}>
                <p>...</p>
                <div className='vertical-flex'>
                    // this is where the magic happens ✨
                    <img id="hero" className='img-style' src='image1.jpg' />
                    <img id="another-one" className='img-style' src='image2.jpg' />
                </div>
                <p>...</p>
            </div>
        );
    }
}

class Page2 extends React.Component {
    render() {
        return (
            <div style={this.props.style} ref={this.props.innerRef}>
                // this is where the magic happens ✨
                <img id="hero" className='img-style' src='image1.jpg' />
                <p>...</p>
                <img id="another-one" className='img-style' src='image2.jpg' />
            </div>
        );
    }
}
```

## Interpolators
Interpolators are classes that implement certain methods that are called to perform the animation. This allows seperation of animation logic from the rest of the code and also enables different kinds of animations and techniques.

There are 2 kinds of interpolators in the `interpolators` directory.

### `CssInterpolator`

```js
import CssInterpolator from 'react-layout-transition/interpolators/CssInterpolator';

const interpolator = new CssInterpolator(timing, easing);
```
Uses CSS transforms to animate elements.

The constructor takes two _optional_ parameters
- `timing`: number <br/>
    the number **milliseconds** the transition takes<br/>
    **default:** 300
- `easing`: string <br/>
    the easing function for the transition<br/>
    **default:** 'ease-in-out'

### `SpringInterpolator`

```js
import SpringInterpolator from 'react-layout-transition/interpolators/SpringInterpolator';

const interpolator = new SpringInterpolator(stiffness, damping, precision);
```
Uses CSS transforms to animate elements.

The constructor takes three _optional_ parameters
- `stiffness`: number <br/>
    the number **milliseconds** the transition takes<br/>
    **default:** 170
- `damping`: number <br/>
    the easing function for the transition<br/>
    **default:** 26
- `precision`: number <br/>
    the easing function for the transition<br/>
    **default:** 0.01

### Custom Interpolators
You can write your own interpolators as long as you implement the correct functions

```js
import Interpolator from 'react-layout-transition/interpolators/Interpolator';

class MyInterpolator extends Interpolator {
    play(
        element: HTMLElement,
        invertObject: {sx: number; sy: number; x: number; y: number},
        reverse: boolean,
        callback?: () => void,
    ): void;

    playMultiple(
        element: HTMLElement[],
        invertObject: Array<{sx: number; sy: number; x: number; y: number}>,
        reverse: boolean,
        callback?: () => void,
    ): void;
}
```

The `invertObject` is an object that contains the delta of initial and final values of
- scale in X-axis (sx)
- scale in Y-axis (sy)
- translation in X-axis (x)
- translation in Y-axis (y)

Please do report any bugs you encounter and point to me any examples and use cases that could be used to improve this

If you like the direction the project is headed in and want to help please do reach out!
