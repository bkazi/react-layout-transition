import * as React from 'react';

import fireOnce from './utils/fireOnce';

const getFlattenedChildren = (refs: HTMLElement[]): Element[] => {
    const childNodes = refs
        .map((ref) => Array.from(ref.children))
        .reduce((acc, nodes) => acc.concat(nodes))
    return childNodes;
};

export interface LayoutTransitionGroupState {
    _lTransitionPending: boolean,
    _lTransitionRefs?: HTMLElement[],
    _lTransitionTiming?: number,
    _lTransitionEasing?: string,
}

class LayoutTransitionGroup extends React.Component<{}, LayoutTransitionGroupState> {
    _lInitialDimens: Map<string, ClientRect> = new Map();
    _lfinalDimens: Map<string, ClientRect> = new Map();

    constructor() {
        super();

        this.state = {
            _lTransitionPending: false,
            _lTransitionRefs: undefined,
            _lTransitionTiming: undefined,
            _lTransitionEasing: undefined,
        }
    }

    beginTransition = (stateUpdateFn: Function, refs: HTMLElement[] | HTMLElement, timing= 200, easing = 'ease-in-out') => {
        if (!(refs instanceof Array)) refs = [refs];
        // Traverse top layers for inital positions
        const childNodes = getFlattenedChildren(refs);
        childNodes.forEach((child, index) => {
            if (!(child instanceof HTMLElement)) return;
            // mark initial elements with unique keys to track
            const key = `.${index}`;
            child.dataset.layoutKey = key;

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

    componentDidUpdate(prevProps: {}, prevState: {}) {
        if (!this.state._lTransitionPending) return;
        if (!this.state._lTransitionRefs) return;

        // Traverse top layer for final positions
        const refs = this.state._lTransitionRefs;
        const childNodes = getFlattenedChildren(refs);
        childNodes.forEach((child) => {
            if (child instanceof HTMLElement) {
                const key = child.dataset.layoutKey;
                if (key) {
                    this._lfinalDimens.set(key, child.getBoundingClientRect());
                }
            }
        });

        // Fix existing nodes in same place
        childNodes.forEach((child, i) => {
            if (child instanceof HTMLElement) {
                const key = child.dataset.layoutKey;
                if (!key) {
                    child.style.opacity = '0';
                    child.style.pointerEvents = 'none';
                    return;
                };
                const initialDimen = this._lInitialDimens.get(key);
                if (!initialDimen) return;
                const finalDimen = this._lfinalDimens.get(key);
                if (!finalDimen) return;
                const x = initialDimen.left - finalDimen.left;
                const y = initialDimen.top - finalDimen.top;
                const sx = initialDimen.width / finalDimen.width;
                const sy = initialDimen.height / finalDimen.height;
                child.style.transition = '';
                child.style.transform = `translate(${x}px, ${y}px) scale(${sx}, ${sy})`;
                child.style.transformOrigin = '0 0';
            }
        });

        // Transition
            // Animate into new position
        const timing = this.state._lTransitionTiming;
        const easing = this.state._lTransitionEasing;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const initialNodes: HTMLElement[] = [];
                const newNodes: HTMLElement[] = [];
                childNodes.forEach((child, i) => {
                    if (child instanceof HTMLElement) {
                        const key = child.dataset.layoutKey;
                        if (!key) {
                            newNodes.push(child);
                            return;
                        }
                        child.style.transition = `transform ${timing}ms ${easing}`;
                        child.style.transform = '';
                        initialNodes.push(child);
                    }
                });
                fireOnce(initialNodes, 'transitionend', () => {
                    initialNodes.forEach((child) => {
                        child.style.transition = '';
                        child.removeAttribute('data-layout-key');
                    });
                    newNodes.forEach((child) => {
                        child.style.transition = 'opacity 200ms ease-in-out';
                        child.style.opacity = '1';
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
}

export default LayoutTransitionGroup;
