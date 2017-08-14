import * as React from 'react';
import * as warning from 'warning';

import {
    childrenToMap,
    compareChildren,
    createDummyElements,
    createInvertObjectArray,
    fireOnce,
    getDimensArray,
} from './utils';

declare var process: {
    env: {
        NODE_ENV: string;
    };
};

export interface ISharedElementTransitionGroupProps {
    children?: any;
}

export interface ISharedElementTransitionGroupState {
    outgoingShow: boolean;
    incomingShow: boolean;
    children: Map<string, React.ReactElement<any>>;
    transitionPending: boolean;
}

class SharedElementTransitionGroup extends React.Component<
    ISharedElementTransitionGroupProps,
    ISharedElementTransitionGroupState
> {
    private outgoingSharedElements: HTMLElement[] = [];
    private outgoingRef?: HTMLElement;
    private incomingSharedElements: HTMLElement[] = [];
    private incomingRef?: HTMLElement;
    private containerRef: HTMLDivElement | null;

    constructor(props: ISharedElementTransitionGroupProps) {
        super();

        this.state = {
            children: childrenToMap(props.children),
            incomingShow: false,
            outgoingShow: true,
            transitionPending: false,
        };
    }

    public componentWillReceiveProps(
        nextProps: ISharedElementTransitionGroupProps,
    ) {
        const prevChildren = this.state.children;
        const newChildren = childrenToMap(nextProps.children);

        const allChildren: Map<string, React.ReactElement<any>> = new Map([
            ...Array.from(prevChildren),
            ...Array.from(newChildren),
        ]);

        allChildren.forEach((value, key) => {
            const outgoing = prevChildren.has(key);
            const incoming = newChildren.has(key);

            if (outgoing) {
                allChildren.set(
                    key,
                    React.cloneElement(value, {
                        innerRef: (ref: HTMLElement) => {
                            this.outgoingRef = ref;
                        },
                        outgoing: true,
                    }),
                );
            } else if (incoming) {
                allChildren.set(
                    key,
                    React.cloneElement(value, {
                        incoming: true,
                        innerRef: (ref: HTMLElement) => {
                            this.incomingRef = ref;
                        },
                    }),
                );
            }
        });

        this.setState(prevState => ({
            ...prevState,
            children: allChildren,
            transitionPending: true,
        }));
    }

    public componentDidUpdate(
        prevProps: ISharedElementTransitionGroupProps,
        prevState: ISharedElementTransitionGroupProps,
    ) {
        if (!this.state.transitionPending) {
            return;
        }
        if (compareChildren(this.state.children, prevState.children)) {
            return;
        }
        if (!this.incomingRef || !this.outgoingRef) {
            return;
        }
        if (!this.containerRef) {
            return;
        }

        this.setState(state => ({
            transitionPending: false,
        }));

        const {outgoingSharedElements} = this.getSharedElements();
        if (!outgoingSharedElements.length) {
            return;
        }
        const initialDimensArr = getDimensArray(
            this.outgoingSharedElements,
            this.containerRef,
        );
        const finalDimensArr = getDimensArray(
            this.incomingSharedElements,
            this.containerRef,
        );
        const allChildren = this.state.children;

        const newElements = createDummyElements(
            outgoingSharedElements,
            initialDimensArr,
        );
        fireOnce(newElements, 'transitionend', (events: TransitionEvent[]) => {
            if (!this.incomingRef) {
                return;
            }

            this.incomingRef.addEventListener('transitionend', () => {
                events.forEach(event => {
                    (event.target as HTMLElement).remove();
                });
                for (const [key, value] of Array.from(allChildren.entries())) {
                    const changedChildren = new Map();
                    let element;
                    if (value.props.incoming) {
                        element = React.cloneElement(value, {
                            incoming: undefined,
                            ref: undefined,
                        });
                        changedChildren.set(key, element);
                    }
                    this.outgoingRef = undefined;
                    this.incomingRef = undefined;
                    this.outgoingSharedElements = [];
                    this.incomingSharedElements = [];
                    this.setState(state => ({
                        ...state,
                        children: changedChildren,
                        incomingShow: false,
                        outgoingShow: false,
                    }));
                }
            });
            this.setState(state => ({
                ...state,
                incomingShow: true,
            }));
        });

        newElements.forEach((element, idx) => {
            if (this.containerRef) {
                this.containerRef.appendChild(element);
            }
        });

        const invert = createInvertObjectArray(
            initialDimensArr,
            finalDimensArr,
        );
        this.outgoingRef.addEventListener('transitionend', () => {
            newElements.forEach((element, idx) => {
                element.style.transform = `translate(${invert[idx]
                    .x}px, ${invert[idx].y}px) scale(${invert[idx]
                    .sx}, ${invert[idx].sy})`;
            });
        });

        this.setState(state => ({
            ...state,
            outgoingShow: false,
        }));
    }

    public render() {
        const outgoingStyles = {
            opacity: this.state.outgoingShow ? 1 : 0,
            position: 'absolute',
            transition: 'opacity 300ms ease-out',
        };
        const incomingStyles = {
            opacity: this.state.incomingShow ? 1 : 0,
            position: 'absolute',
            transition: 'opacity 300ms ease-out',
        };
        const normalStyles = {
            position: 'absolute',
        };
        const containerStyles = {
            position: 'relative' as 'relative',
        };

        return (
            <div
                ref={ref => {
                    this.containerRef = ref;
                }}
                style={containerStyles}
            >
                {Array.from(this.state.children.values()).map(child => {
                    if (child.props.outgoing) {
                        return React.cloneElement(child, {
                            style: outgoingStyles,
                        });
                    } else if (child.props.incoming) {
                        return React.cloneElement(child, {
                            style: incomingStyles,
                        });
                    } else {
                        return React.cloneElement(child, {style: normalStyles});
                    }
                })}
            </div>
        );
    }

    private getSharedElements = (): {
        outgoingSharedElements: HTMLElement[];
        incomingSharedElements: HTMLElement[];
    } => {
        if (
            this.outgoingSharedElements.length &&
            this.incomingSharedElements.length
        ) {
            return {
                incomingSharedElements: this.incomingSharedElements,
                outgoingSharedElements: this.outgoingSharedElements,
            };
        }
        if (!this.outgoingRef || !this.incomingRef) {
            return {
                incomingSharedElements: [],
                outgoingSharedElements: [],
            };
        }

        this.outgoingSharedElements = [];
        this.incomingSharedElements = [];

        const outgoingMarkedEls = Array.from(
            this.outgoingRef.querySelectorAll('[id]'),
        );
        const incomingMarkedEls = Array.from(
            this.incomingRef.querySelectorAll('[id]'),
        );

        const outgoingSet = new Set(
            Array.from(outgoingMarkedEls).map(el => el.id),
        );
        const incomingSet = new Set(
            Array.from(incomingMarkedEls).map(el => el.id),
        );

        for (const element of outgoingMarkedEls) {
            if (incomingSet.has(element.id) && element instanceof HTMLElement) {
                this.outgoingSharedElements.push(element);
            }
        }
        for (const element of incomingMarkedEls) {
            if (outgoingSet.has(element.id) && element instanceof HTMLElement) {
                this.incomingSharedElements.push(element);
            }
        }

        if ('production' !== process.env.NODE_ENV) {
            warning(
                !!this.outgoingSharedElements.length &&
                    !!this.incomingSharedElements.length,
                'No elements were marked as shared. Are you sure this was intended',
            );
        }

        return {
            incomingSharedElements: this.incomingSharedElements,
            outgoingSharedElements: this.outgoingSharedElements,
        };
    };
}

export default SharedElementTransitionGroup;
