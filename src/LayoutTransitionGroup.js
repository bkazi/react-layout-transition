import React from 'react';

import fireOnce from './utils/fireOnce.js';

class LayoutTransitionGroup extends React.Component {
    initialDimens = new Map();
    finalDimens = new Map();
    state = {
        _transitionPending: false,
        _transitionRefs: undefined,
    }

    beginTransition = (stateUpdateFn, refs) => {
        if (refs.constructor !== Array) refs = [refs];
        // Traverse top layers for inital positions
        const childNodes = [].concat(...refs.map((ref) => Array.from(ref.childNodes)));
        childNodes.forEach((child, index) => {
            // mark initial elements with unique keys to track
            const key = `.${index}`;
            child.setAttribute('data-layout-key', key);

            this.initialDimens.set(key, child.getBoundingClientRect());
        });

        // Update state
        this.setState((prevState) => ({
            ...stateUpdateFn(prevState),
            _transitionPending: true,
            _transitionRefs: refs,
        }));
    };

    componentDidUpdate(prevProps, prevState) {
        if (!this.state._transitionPending) return;

        // Traverse top layer for final positions
        const refs = this.state._transitionRefs;
        const childNodes = [].concat(...refs.map((ref) => Array.from(ref.childNodes)));
        childNodes.forEach((child) => {
            if (!child.dataset.layoutKey) return;
            this.finalDimens.set(child.dataset.layoutKey, child.getBoundingClientRect());
        });

        // Fix existing nodes in same place
        childNodes.forEach((child, i) => {
            const key = child.dataset.layoutKey;
            if (!key) {
                child.style.opacity = 0;
                child.style.pointerEvents = 'none';
                return;
            };
            const initialDimen = this.initialDimens.get(key);
            const finalDimen = this.finalDimens.get(key);
            const x = initialDimen.left - finalDimen.left;
            const y = initialDimen.top - finalDimen.top;
            const sx = initialDimen.width / finalDimen.width;
            const sy = initialDimen.height / finalDimen.height;
            child.style.transition = '';
            child.style.transform = `translate(${x}px, ${y}px) scale(${sx}, ${sy})`;
            child.style.transformOrigin = '0 0';
        });

        // Transition
            // Animate into new position
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const initialNodes = [];
                const newNodes = [];
                childNodes.forEach((child, i) => {
                    if (!child.dataset.layoutKey) {
                        newNodes.push(child);
                        return;
                    }
                    child.style.transition = 'transform 200ms ease-in-out';
                    child.style.transform = '';
                    initialNodes.push(child);
                });
                fireOnce(initialNodes, 'transitionend', () => {
                    initialNodes.forEach((child) => {
                        child.style.transition = '';
                        child.removeAttribute('data-layout-key');
                    });
                    newNodes.forEach((child) => {
                        child.style.transition = 'opacity 200ms ease-in-out';
                        child.style.opacity = 1;
                        child.style.pointerEvents = '';
                    });
                });
            });
        });

        this.setState((state) => ({
            _transitionPending: false,
            _transitionRefs: undefined,
            _transitionInitialDimens: undefined,
        }));
    }

    render() {
        return (
            <div>
                {this.state.children}
            </div>
        );
    }
}

export default LayoutTransitionGroup;
