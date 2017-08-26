import {mount} from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import * as React from 'react';

import {LayoutTransitionGroup} from '../src';
import CssInterpolator from '../src/interpolators/CssInterpolator';

describe('LayoutTransitionGroup', () => {
    class MyComponent extends LayoutTransitionGroup {
        private interpolator = new CssInterpolator();

        public render() {
            return (
                <div>Foo</div>
            );
        }

        protected getInterpolator() {
            return this.interpolator;
        }
    }

    it('should render normally', () => {
        const wrapper = mount(<MyComponent />);

        expect(wrapper.render().text()).toEqual('Foo');
    });
});
