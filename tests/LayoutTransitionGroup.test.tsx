import {mount} from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import * as React from 'react';

import {LayoutTransitionGroup} from '../src';

describe('LayoutTransitionGroup', () => {
    class MyComponent extends LayoutTransitionGroup {
        render() {
            return (
                <div>Foo</div>
            );
        }
    }

    it('should render normally', () => {
        const wrapper = mount(<MyComponent />);

        expect(wrapper.render().text()).toEqual('Foo');
    });
});
