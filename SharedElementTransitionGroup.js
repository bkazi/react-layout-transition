/*
[x] Clear up after transition
[x] Move to events instead of timeouts
[x] Get dimensions from children
[x] Find shared elements based on id
*/

import React from 'react';

const childrenToMap = (children) => {
    const childrenArray = React.Children.toArray(children);
    const keyedArray = childrenArray.map((child) => [child.key, child]);
    return new Map(keyedArray);
};

const compareChildren = (children1, children2) => {
    const keys1 = Array.from(children1.keys());
    const keys2 = Array.from(children2.keys());

    return keys1 === keys2;
};

class SharedElementTransitionGroup extends React.Component {
    constructor(props) {
        super();

        this.state = {
            outgoingShow: true,
            incomingShow: false,
            children: childrenToMap(props.children),
            transitionPending: false,
        };
        this.outgoingSharedElements;
        this.incomingSharedElements;
    }

    getSharedElements = () => {
        if (this.outgoingSharedElements && this.incomingSharedElements) return {outgoingSharedElements: this.outgoingSharedElements, incomingSharedElements: this.incomingSharedElements};

        this.outgoingSharedElements = [];
        this.incomingSharedElements = [];

        const outgoingMarkedEls = this.outgoingRef.querySelectorAll('[id]');
        const incomingMarkedEls = this.incomingRef.querySelectorAll('[id]');

        const outgoingSet = new Set(Array.from(outgoingMarkedEls).map((el) => el.id));
        const incomingSet = new Set(Array.from(incomingMarkedEls).map((el) => el.id));

        for (let element of outgoingMarkedEls) {
            if (incomingSet.has(element.id)) {
                this.outgoingSharedElements.push(element);
            }
        }
        for (let element of incomingMarkedEls) {
            if (outgoingSet.has(element.id)) {
                this.incomingSharedElements.push(element);
            }
        }

        return {outgoingSharedElements: this.outgoingSharedElements, incomingSharedElements: this.incomingSharedElements};
    }

    getSharedDimens = () => {
        const initialDimensArr = this.outgoingSharedElements.map((element) => element.getBoundingClientRect());
        const finalDimensArr = this.incomingSharedElements.map((element) => element.getBoundingClientRect());

        return {initialDimensArr, finalDimensArr};
    };

    componentWillReceiveProps(nextProps) {
        const prevChildren = this.state.children;
        const newChildren = childrenToMap(nextProps.children);

        const allChildren = new Map([...prevChildren, ...newChildren]);

        allChildren.forEach((value, key) => {
            const outgoing = prevChildren.has(key);
            const incoming = newChildren.has(key);

            if (outgoing) {
                allChildren.set(key, React.cloneElement(
                    value,
                    {
                        exit: () => {
                            this.exit(key);
                        },
                        innerRef: (ref) => {
                            this.outgoingRef = ref;
                        },
                        outgoing: true,
                    }
                ));
            } else if (incoming) {
                allChildren.set(key, React.cloneElement(
                    value,
                    {
                        innerRef: (ref) => {
                            this.incomingRef = ref;
                        },
                        incoming: true,
                    }
                ));
            }
        });

        this.setState((prevState) => ({
            ...prevState,
            children: allChildren,
            transitionPending: true,
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.transitionPending) return;
        if (compareChildren(this.state.children, prevState.children)) return;
        if (!this.incomingRef && !this.outgoingRef) return;

        this.setState((state) => ({
            transitionPending: false,
        }));

        this.getSharedElements();
        const {initialDimensArr, finalDimensArr} = this.getSharedDimens();
        const allChildren = this.state.children;

        const initialDimens = initialDimensArr[0];
        const finalDimens = finalDimensArr[0];

        const sharedEl = document.createElement('img');
        sharedEl.src = 'https://68.media.tumblr.com/4d1f173744a32bb4b35a2d5d0babff74/tumblr_mnh29fxz111st5lhmo1_1280.jpg';
        sharedEl.style.position = 'fixed';
        sharedEl.style.top = initialDimens.top;
        sharedEl.style.left = initialDimens.left;
        sharedEl.style.height = initialDimens.height;
        sharedEl.style.width = initialDimens.width;
        sharedEl.style.transformOrigin = '0 0';
        sharedEl.style.transition = 'transform 300ms ease-in-out';

        sharedEl.addEventListener('transitionend', (event) => {
            this.incomingRef.addEventListener('transitionend', () => {
                event.target.remove();
                for (let [key, value] of allChildren.entries()) {
                    let changedChildren = new Map();
                    let element;
                    if (value.props.incoming) {
                        element = React.cloneElement(value, {ref: undefined, incoming: undefined});
                        changedChildren.set(key, element);
                    }
                    this.outgoingRef = undefined;
                    this.incomingRef = undefined;
                    this.outgoingSharedElements = undefined;
                    this.incomingSharedElements = undefined;
                    this.setState((prevState) => ({
                        ...prevState,
                        children: changedChildren,
                        incomingShow: false,
                        outgoingShow: false,
                    }));
                }
            });
            this.setState((prevState) => ({
                ...prevState,
                incomingShow: true,
            }));
        });
        this.containerRef.appendChild(sharedEl);

        const widthScaleTransform = finalDimens.width / initialDimens.width;
        const heightScaleTransform = finalDimens.height / initialDimens.height;
        const xTranslate = finalDimens.left - initialDimens.left;
        const yTranslate = finalDimens.top - initialDimens.top;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.outgoingRef.addEventListener('transitionend', () => {
                    sharedEl.style.transform = `translate(${xTranslate}px, ${yTranslate}px) scale(${widthScaleTransform}, ${heightScaleTransform})`;
                });
                this.setState((prevState) => ({
                    ...prevState,
                    outgoingShow: false,
                }));
            });
        });
    }

    exit = (key) => {
        this.setState((prevState) => ({
            ...prevState,
            children: prevState.children.delete(key),
        }));
    };

    render() {
        const outgoingStyles = {
            position: 'absolute',
            transition: 'opacity 300ms ease-out',
            opacity: this.state.outgoingShow ? 1 : 0,
        };
        const incomingStyles = {
            position: 'absolute',
            transition: 'opacity 300ms ease-out',
            opacity: this.state.incomingShow ? 1 : 0,
        };
        const normalStyles = {
            position: 'absolute',
        };

        return (
            <div ref={(ref) => {
                    this.containerRef = ref;
                }}>
                {Array.from(this.state.children.values()).map((child) => {
                    if (child.props.outgoing) {
                        return React.cloneElement(child, {style: outgoingStyles});
                    } else if (child.props.incoming) {
                        return React.cloneElement(child, {style: incomingStyles});
                    } else {
                        return React.cloneElement(child, {style: normalStyles});
                    }
                })}
            </div>
        );
    }
}

export default SharedElementTransitionGroup;
