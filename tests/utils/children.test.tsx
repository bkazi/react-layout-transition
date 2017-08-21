import {shallow} from 'enzyme';
import * as React from 'react';

import {childrenToMap} from '../../src/utils';

describe('children', () => {
    const child0Text = 'Hello World';

    it('test', () => {
        const MyComponent = () => (
            <div>
                <div>{child0Text}</div>
                <div>Hello Again!</div>
            </div>
        );
        const childrenWrapper = shallow(<MyComponent />).children();

        const childMap = childrenToMap(childrenWrapper.getNodes());

        expect(childMap.size).toEqual(2);
        expect(childMap.has(".0")).toEqual(true);

        if (childMap.has(".0")) {
            const child0Wrapper = shallow(childMap.get(".0"));
            expect(child0Wrapper.text()).toEqual(child0Text);
        }
    });
});
