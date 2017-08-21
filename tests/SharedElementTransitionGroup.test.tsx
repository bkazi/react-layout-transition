import {mount} from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import * as React from 'react';

import {SharedElementTransitionGroup} from '../src';

describe('SharedElementTransitionGroup', () => {
    const Foo = () => (
        <div>Foo</div>
    );
    const Bar = () => (
        <div>Bar</div>
    );
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

    it('should render the correct elements', () => {
        const wrapper = mount(<MyComponent />);
        wrapper.setState({
            toggle: false,
        });

        expect(wrapper.find('Foo')).not.toBePresent();
        expect(wrapper.find('Bar')).toBePresent();
    });
});
