import * as React from 'react';
import * as warning from 'warning';

import Interpolator from './interpolators/Interpolator';
import {createInvertObject, fireOnce, getDimens} from './utils';
import {getFlattenedChildren} from './utils/dom';
import {
    animateElementPosition,
    ifMarkedThenMeasure,
    markAndMeasure,
} from './utils/layoutTransition';

declare var process: {
    env: {
        NODE_ENV: string;
    };
};

export interface ILayoutTransitionGroupState {
    _lTransitionPending: boolean;
    _lTransitionRefs?: HTMLElement[];
}

/**
 * Class for the base component used to manage layout transitions
 */
abstract class LayoutTransitionGroup extends React.Component<
    {},
    ILayoutTransitionGroupState
> {
    private initialDimens: Map<string, ClientRect> = new Map();
    private finalDimens: Map<string, ClientRect> = new Map();

    public constructor() {
        super();

        this.state = {
            _lTransitionPending: false,
            _lTransitionRefs: undefined,
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

        animateElementPosition(
            childNodes,
            this.initialDimens,
            this.finalDimens,
            this.getInterpolator(),
        );

        this.setState(state => ({
            _lTransitionPending: false,
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
    ) => {
        if ('production' !== process.env.NODE_ENV) {
            const param1 =
                !!stateUpdateFn && typeof stateUpdateFn === 'function';
            const param2 =
                !!refs &&
                (refs instanceof Array || refs instanceof HTMLElement);
            const all = param1 && param2;
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
            _lTransitionPending: true,
            _lTransitionRefs: refs,
        }));
    };

    protected abstract getInterpolator(): Interpolator;
}

export default LayoutTransitionGroup;
