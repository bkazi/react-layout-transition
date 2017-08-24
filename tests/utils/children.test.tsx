import {shallow} from 'enzyme';
import * as React from 'react';

import {childrenToMap, compareChildren} from '../../src/utils';

describe('childrenToMap', () => {
    const child0Text = 'Hello World';

    it('should convert all children to a map correctly', () => {
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

        const child = childMap.get(".0")
        if (child) {
            const child0Wrapper = shallow(child);
            expect(child0Wrapper.text()).toEqual(child0Text);
        }
    });

    it('should return an empty map if no children are passed', () => {
        const childMap = childrenToMap(null);

        expect(childMap).not.toBeNull();
        expect(childMap.size).toEqual(0);
    });
});

// This test suite seems dodgy, needs more thought
describe('compareChildren', () => {
    it('should return false if both maps are empty', () => {
        const compare = compareChildren(new Map(), new Map());
        expect(compare).toEqual(false);
    });

    it('should return true when children are the same', () => {
        const MyComponent = () => (
            <div>
                <div>Hello World</div>
                <div>Hello Again!</div>
            </div>
        );
        const childrenWrapper = shallow(<MyComponent />).children();

        const childMap = childrenToMap(childrenWrapper.getNodes());

        const compare = compareChildren(childMap, childMap);

        expect(compare).toEqual(true);
    });
});
