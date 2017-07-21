import * as React from 'react';

const childrenToMap = (children: React.ReactNode): Map<string, React.ReactChild> => {
    const childrenArray = React.Children.toArray(children);
    const childMap: Map<string, React.ReactChild> = new Map();
    childrenArray.forEach((child) => {
        childMap.set(child.key, child);
    });
    return childMap;
};

const compareChildren = (children1: Map<string, React.ReactNode>, children2: Map<string, React.ReactNode>): boolean => {
    const keys1 = Array.from(children1.keys());
    const keys2 = Array.from(children2.keys());

    return keys1 === keys2;
};

export {
    childrenToMap,
    compareChildren,
}