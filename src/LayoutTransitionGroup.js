import React from 'react';

import fireOnce from './utils/fireOnce.js';

class LayoutTransitionGroup extends React.Component {
    _lInitialDimens = new Map();
    _lfinalDimens = new Map();
    state = {
        _lTransitionPending: false,
        _lTransitionRefs: undefined,
        _lTransitionTiming: undefined,
        _lTransitionEasing: undefined,
    }

    beginTransition = (stateUpdateFn, refs, timing = 200, easing = 'ease-in-out') => {
        if (refs.constructor !== Array) refs = [refs];
        // Traverse top layers for inital positions
        const childNodes = [].concat(...refs.map((ref) => Array.from(ref.childNodes)));
        childNodes.forEach((child, index) => {
            // mark initial elements with unique keys to track
            const key = `.${index}`;
            child.setAttribute('data-layout-key', key);

            this._lInitialDimens.set(key, child.getBoundingClientRect());
        });

        // Update state
        this.setState((prevState) => ({
            ...stateUpdateFn(prevState),
            _lTransitionPending: true,
            _lTransitionRefs: refs,
            _lTransitionTiming: timing,
            _lTransitionEasing: easing,
        }));
    };

    componentDidUpdate(prevProps, prevState) {
        if (!this.state._lTransitionPending) return;

        // Traverse top layer for final positions
        const refs = this.state._lTransitionRefs;
        const childNodes = [].concat(...refs.map((ref) => Array.from(ref.childNodes)));
        childNodes.forEach((child) => {
            if (!child.dataset.layoutKey) return;
            this._lfinalDimens.set(child.dataset.layoutKey, child.getBoundingClientRect());
        });

        // Fix existing nodes in same place
        childNodes.forEach((child, i) => {
            const key = child.dataset.layoutKey;
            if (!key) {
                child.style.opacity = 0;
                child.style.pointerEvents = 'none';
                return;
            };
            const initialDimen = this._lInitialDimens.get(key);
            const finalDimen = this._lfinalDimens.get(key);
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
        const timing = this.state._lTransitionTiming;
        const easing = this.state._lTransitionEasing;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const initialNodes = [];
                const newNodes = [];
                childNodes.forEach((child, i) => {
                    if (!child.dataset.layoutKey) {
                        newNodes.push(child);
                        return;
                    }
                    child.style.transition = `transform ${timing}ms ${easing}`;
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
            _lTransitionPending: false,
            _lTransitionRefs: undefined,
            _lTransitionTiming: undefined,
            _lTransitionEasing: undefined,
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
