import {mount} from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import * as React from 'react';

import {SharedElementTransitionGroup} from '../src';

describe('SharedElementTransitionGroup (no refs, no shared elements marked)', () => {
    class Foo extends React.Component {
        public render() {
            return <div>Foo</div>;
        }
    };
    class Bar extends React.Component {
        public render() {
            return <div>Bar</div>;
        }
    };

    class MyComponent extends React.Component {
        public state: {
            toggle: boolean,
        };
        constructor() {
            super();

            this.state = {
                toggle: true,
            };
        }

        public render() {
            return (
                <SharedElementTransitionGroup>
                    {this.state.toggle && <Foo />}
                    {!this.state.toggle && <Bar />}
                </SharedElementTransitionGroup>
            );
        }
    }

    beforeEach(() => {
        jasmineEnzyme();
    });

    it('should render the correct elements', () => {
        const wrapper = mount(<MyComponent />);

        expect(wrapper.find('Foo')).toBePresent();
        expect(wrapper.find('Bar')).not.toBePresent();
    });

    it('should render the correct elements after state change', () => {
        const wrapper = mount(<MyComponent />);
        wrapper.setState({
            toggle: false,
        });

        expect(wrapper.find('Foo')).not.toBePresent();
        expect(wrapper.find('Bar')).toBePresent();
    });
});

describe('SharedElementTransitionGroup (with refs, no shared elements marked)', () => {
    class Foo extends React.Component {
        public render() {
            return <div ref={this.props.innerRef}>Foo</div>;
        }
    };
    class Bar extends React.Component {
        public render() {
            return <div ref={this.props.innerRef}>Bar</div>;
        }
    };

    class MyComponent extends React.Component {
        public state: {
            toggle: boolean,
        };
        constructor() {
            super();

            this.state = {
                toggle: true,
            };
        }

        public render() {
            return (
                <SharedElementTransitionGroup>
                    {this.state.toggle && <Foo />}
                    {!this.state.toggle && <Bar />}
                </SharedElementTransitionGroup>
            );
        }
    }

    beforeEach(() => {
        jasmineEnzyme();
    });

    it('should render the correct elements', () => {
        const wrapper = mount(<MyComponent />);

        expect(wrapper.find('Foo')).toBePresent();
        expect(wrapper.find('Bar')).not.toBePresent();
    });

    it('should render the correct elements after state change', () => {
        const wrapper = mount(<MyComponent />);
        wrapper.setState({
            toggle: false,
        });

        expect(wrapper.find('Foo')).not.toBePresent();
        expect(wrapper.find('Bar')).toBePresent();
    });
});

describe('SharedElementTransitionGroup (with refs and shared elements marked)', () => {
    class Foo extends React.Component {
        public render() {
            return (
            <div ref={this.props.innerRef}>
                <div id="shared">Foo</div>
            </div>
            );
        }
    };
    class Bar extends React.Component {
        public render() {
            return (
            <div ref={this.props.innerRef}>
                <div id="shared">Foo Bar</div>
            </div>
            );
        }
    };

    class MyComponent extends React.Component {
        public state: {
            toggle: boolean,
        };
        constructor() {
            super();

            this.state = {
                toggle: true,
            };
        }

        public render() {
            return (
                <SharedElementTransitionGroup>
                    {this.state.toggle && <Foo />}
                    {!this.state.toggle && <Bar />}
                </SharedElementTransitionGroup>
            );
        }
    }

    beforeEach(() => {
        jasmineEnzyme();
    });

    it('should render the correct elements', () => {
        const wrapper = mount(<MyComponent />);

        expect(wrapper.find('Foo')).toBePresent();
        expect(wrapper.find('Bar')).not.toBePresent();
    });

    it('should render the correct elements immediately after state change', () => {
        const wrapper = mount(<MyComponent />);
        wrapper.setState({
            toggle: false,
        });

        expect(wrapper.find('Foo')).toBePresent();
        expect(wrapper.find('Bar')).toBePresent();
    });

    xit('should render the correct elements after transitions', () => {
        const wrapper = mount(<MyComponent />);
        wrapper.setState({
            toggle: false,
        });

    });
});
