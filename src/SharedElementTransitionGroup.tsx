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
import {getSharedElements} from './utils/dom';

declare var process: {
    env: {
        NODE_ENV: string;
    };
};

export interface ISharedElementTransitionGroupProps {
    children?: any;
}

export interface ISharedElementTransitionGroupState {
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
            transitionPending: false,
        };
    }

    public componentWillReceiveProps(
        nextProps: ISharedElementTransitionGroupProps,
    ) {
        this.outgoingSharedElements = [];
        this.incomingSharedElements = [];
        const prevChildren = this.state.children;
        const newChildren = childrenToMap(nextProps.children);

        const allChildren: Map<string, React.ReactElement<any>> = new Map([
            ...Array.from(prevChildren),
            ...Array.from(newChildren),
        ]);
        const children: Map<string, React.ReactElement<any>> = new Map();

        allChildren.forEach((value, key) => {
            const isOutgoing = prevChildren.has(key);
            const isIncoming = newChildren.has(key);

            if (isOutgoing) {
                children.set(
                    key,
                    React.cloneElement(value, {
                        innerRef: (ref: HTMLElement) => {
                            this.outgoingRef = ref;
                        },
                        outgoing: true,
                    }),
                );
            } else if (isIncoming) {
                children.set(
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
            children,
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
            this.setChildrenToIncoming();
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
            this.setChildrenToIncoming();
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
        const children = this.state.children;

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
                this.setChildrenToIncoming(children);
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
    }

    public render() {
        const outgoingStyles = {
            opacity: 0,
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

    private setChildrenToIncoming = (
        currentChildren?: Map<string, React.ReactElement<any>>,
    ): void => {
        const children = currentChildren
            ? currentChildren
            : this.state.children;
        let changedChildren: Map<string, React.ReactElement<any>>;
        for (const [key, value] of Array.from(children.entries())) {
            let element;
            if (value.props.incoming) {
                element = React.cloneElement(value, {
                    incoming: undefined,
                    ref: undefined,
                });
                changedChildren = childrenToMap(element);
            }
        }
        this.setState(state => ({
            ...state,
            children: changedChildren,
            incomingShow: false,
            transitionPending: false,
        }));
    };

    private getSharedElements = (): {
        incomingSharedElements: HTMLElement[];
        outgoingSharedElements: HTMLElement[];
    } => {
        if (
            !this.incomingSharedElements.length ||
            !this.outgoingSharedElements.length
        ) {
            const {
                container1SharedElements,
                container2SharedElements,
            } = getSharedElements(this.incomingRef, this.outgoingRef);
            this.incomingSharedElements = container1SharedElements;
            this.outgoingSharedElements = container2SharedElements;
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
