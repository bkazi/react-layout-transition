import React from 'react';

import promisifyEventListeners from '../utils/promisifyEventListeners.js';

class LayoutTransitionGroup extends React.Component {
    state = {
        _transitionPending: false,
        _transitionRef: undefined,
        _transitionInitialDimens: undefined,
    }

    beginTransition = (ref, stateUpdateFn) => {
        // Traverse top layers for inital positions
        const childNodes = Array.from(ref.childNodes);
        this.intitialDimens = childNodes.map((child) => child.getBoundingClientRect());

        // Update state
        this.setState((prevState) => ({
            ...stateUpdateFn(prevState),
            _transitionPending: true,
            _transitionRef: ref,
        }));
    };

    componentDidUpdate(prevProps, prevState) {
        if (!this.state._transitionPending) return;

        // Traverse top layer for final positions
        const childNodes = Array.from(this.state._transitionRef.childNodes);
        this.finalDimens = childNodes.map((child) => child.getBoundingClientRect());

        // Fix existing nodes in same place
        childNodes.forEach((child, i) => {
            if (!this.intitialDimens[i]) {
                child.style.opacity = 0;
                child.style.pointerEvents = 'none';
                return;
            };
            const x = this.intitialDimens[i].left - this.finalDimens[i].left;
            const y = this.intitialDimens[i].top - this.finalDimens[i].top;
            const sx = this.intitialDimens[i].width / this.finalDimens[i].width;
            const sy = this.intitialDimens[i].height / this.finalDimens[i].height;
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
                    if (!this.intitialDimens[i]) {
                        newNodes.push(child);
                        return;
                    }
                    child.style.transition = 'transform 200ms ease-in-out';
                    child.style.transform = '';
                    initialNodes.push(child);
                });
                const promisifiedTransitionEnd = promisifyEventListeners(initialNodes, 'transitionend');
                Promise.all(promisifiedTransitionEnd)
                .then(() => {
                    initialNodes.forEach((child) => {
                        child.style.transition = '';
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
            _transitionRef: undefined,
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
