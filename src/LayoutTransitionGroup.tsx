import * as React from 'react';
import * as warning from 'warning';

import {createInvertObject, fireOnce, getDimens} from './utils';
import {getFlattenedChildren} from './utils/dom';
import {ifMarkedThenMeasure, markAndMeasure} from './utils/layoutTransition';

declare var process: {
    env: {
        NODE_ENV: string;
    };
};

export interface ILayoutTransitionGroupState {
    _lTransitionPending: boolean;
    _lTransitionRefs?: HTMLElement[];
    _lTransitionTiming?: number;
    _lTransitionEasing?: string;
}

/**
 * Class for the base component used to manage layout transitions
 */
class LayoutTransitionGroup extends React.Component<
    {},
    ILayoutTransitionGroupState
> {
    private initialDimens: Map<string, ClientRect> = new Map();
    private finalDimens: Map<string, ClientRect> = new Map();

    public constructor() {
        super();

        this.state = {
            _lTransitionEasing: undefined,
            _lTransitionPending: false,
            _lTransitionRefs: undefined,
            _lTransitionTiming: undefined,
        };
    }

    public componentDidUpdate(prevProps: {}, prevState: {}) {
        if (!this.state._lTransitionPending) {
            return;
        }
        if (!this.state._lTransitionRefs) {
            return;
        }

        // Traverse top layer for final positions
        const refs = this.state._lTransitionRefs;
        const childNodes = getFlattenedChildren(refs);
        this.finalDimens = ifMarkedThenMeasure(childNodes, getDimens);

        // Fix existing nodes in same place
        childNodes.forEach((child, i) => {
            if (child instanceof HTMLElement) {
                const key = child.dataset.layoutKey;
                if (!key) {
                    child.style.opacity = '0';
                    child.style.pointerEvents = 'none';
                    return;
                }
                const initialDimen = this.initialDimens.get(key);
                if (!initialDimen) {
                    return;
                }
                const finalDimen = this.finalDimens.get(key);
                if (!finalDimen) {
                    return;
                }
                const invert = createInvertObject(finalDimen, initialDimen);
                child.style.transition = '';
                child.style.transform = `translate(${invert.x}px, ${invert.y}px) scale(${invert.sx}, ${invert.sy})`;
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
                    initialNodes.forEach(child => {
                        child.style.transition = '';
                        child.removeAttribute('data-layout-key');
                    });
                    newNodes.forEach(child => {
                        child.style.transition = 'opacity 200ms ease-in-out';
                        child.style.opacity = '1';
                        child.style.pointerEvents = '';
                    });
                });
            });
        });

        this.setState(state => ({
            _lTransitionEasing: undefined,
            _lTransitionPending: false,
            _lTransitionRefs: undefined,
            _lTransitionTiming: undefined,
        }));
    }

    /**
     * @param stateUpdateFn Function to update the state for transition
     * @param refs The ref(s) to the elements to transition
     * @param timing Value (in ms) for the transition
     * @param easing The easing curve to use for transition
     */
    protected beginTransition = (
        stateUpdateFn: ({}) => {},
        refs: HTMLElement[] | HTMLElement,
        timing = 200,
        easing = 'ease-in-out',
    ) => {
        if ('production' !== process.env.NODE_ENV) {
            const param1 =
                !!stateUpdateFn && typeof stateUpdateFn === 'function';
            const param2 =
                !!refs &&
                (refs instanceof Array || refs instanceof HTMLElement);
            const param3 = !timing || (!!timing && typeof timing === 'number');
            const param4 = !easing || (!!easing && typeof easing === 'string');
            const all = param1 && param2 && param3 && param4;
            if (!all) {
                warning(
                    all,
                    'Function called with incorrect parameter types. Correct signature is beginTransition(stateUpdateFn: (previousState) => newState, refs: HTMLElement | HTMLElement[] [, timing?: number, easing?: string)',
                );
            } else {
                warning(
                    stateUpdateFn && typeof stateUpdateFn === 'function',
                    'First parameter of beginTransition must be the state update function',
                );
                warning(
                    refs &&
                        (refs instanceof Array || refs instanceof HTMLElement),
                    'Second parameter of beginTransition must be an array of HTML refs or a single HTML ref',
                );
                warning(
                    !timing || (timing && typeof timing === 'number'),
                    'If third parameter of beginTransition is defined it must be a number',
                );
                warning(
                    !easing || (easing && typeof easing === 'string'),
                    'If fourth parameter of beginTransition is defined then it must be a string',
                );
            }
        }
        if (!stateUpdateFn || !refs) {
            return;
        }

        if (!(refs instanceof Array)) {
            refs = [refs];
        }
        // Traverse top layers for inital positions
        const childNodes = getFlattenedChildren(refs);
        this.initialDimens = markAndMeasure(childNodes, getDimens);

        // Update state
        this.setState(prevState => ({
            ...stateUpdateFn(prevState),
            _lTransitionEasing: easing,
            _lTransitionPending: true,
            _lTransitionRefs: refs,
            _lTransitionTiming: timing,
        }));
    };
}

export default LayoutTransitionGroup;
