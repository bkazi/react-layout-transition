import Interpolator from './Interpolator';

import {fireOnce} from '../utils';

export default class SpringInterpolator extends Interpolator {
    private stiffness: number;
    private damping: number;
    private precision: number;

    constructor(
        stiffness: number = 170,
        damping: number = 26,
        precision: number = 0.01,
    ) {
        super();
        this.stiffness = stiffness;
        this.damping = damping;
        this.precision = precision;
    }

    public play(
        element: HTMLElement,
        invertObject: {sx: number; sy: number; x: number; y: number},
        reverse: boolean = false,
        callback?: () => void,
    ) {
        element.style.transformOrigin = '0 0';
        element.style.transition = 'transform 300ms ease-in-out';
        element.style.transform = `translate(${invertObject.x}px, ${invertObject.y}px) scale(${invertObject.sx}, ${invertObject.sy})`;
    }

    public playMultiple(
        elements: HTMLElement[],
        invertObject: Array<{sx: number; sy: number; x: number; y: number}>,
        reverse: boolean = false,
        callback?: () => void,
    ) {
        const map: Map<
            HTMLElement,
            {
                invert: {
                    sx: number;
                    sy: number;
                    x: number;
                    y: number;
                };
                state: {
                    sx: {x: number; v: number; isAnimating: boolean};
                    sy: {x: number; v: number; isAnimating: boolean};
                    x: {x: number; v: number; isAnimating: boolean};
                    y: {x: number; v: number; isAnimating: boolean};
                };
            }
        > = new Map();
        elements.forEach((el, idx) => {
            el.style.transformOrigin = '0 0';
            map.set(el, {
                invert: invertObject[idx],
                state: {
                    sx: {
                        isAnimating: !(invertObject[idx].sx === 1),
                        v: 0,
                        x: 1,
                    },
                    sy: {
                        isAnimating: !(invertObject[idx].sy === 1),
                        v: 0,
                        x: 1,
                    },
                    x: {x: 0, v: 0, isAnimating: !(invertObject[idx].x === 0)},
                    y: {x: 0, v: 0, isAnimating: !(invertObject[idx].y === 0)},
                },
            });
        });
        let animComplete = false;
        const update = () => {
            if (animComplete) {
                if (callback) {
                    callback();
                }
                return;
            }

            requestAnimationFrame(update);

            elements.forEach((element, idx) => {
                const obj = map.get(element);
                if (obj) {
                    let currState = obj.state;
                    const invert = obj.invert;
                    const updatedX = this.getMotion(
                        currState.x.x,
                        currState.x.v,
                        invert.x,
                    );
                    const updatedY = this.getMotion(
                        currState.y.x,
                        currState.y.v,
                        invert.y,
                    );
                    const updatedSx = this.getMotion(
                        currState.sx.x,
                        currState.sx.v,
                        invert.sx,
                    );
                    const updatedSy = this.getMotion(
                        currState.sy.x,
                        currState.sy.v,
                        invert.sy,
                    );
                    element.style.transform = `translate(${updatedX.x}px, ${updatedY.x}px) scale(${updatedSx.x}, ${updatedSy.x})`;
                    currState = {
                        sx: {
                            ...updatedSx,
                            isAnimating: !(updatedSx.x === invert.sx),
                        },
                        sy: {
                            ...updatedSy,
                            isAnimating: !(updatedSy.x === invert.sy),
                        },
                        x: {
                            ...updatedX,
                            isAnimating: !(updatedX.x === invert.x),
                        },
                        y: {
                            ...updatedY,
                            isAnimating: !(updatedY.x === invert.y),
                        },
                    };
                    if (
                        currState.sx.isAnimating ||
                        currState.sy.isAnimating ||
                        currState.x.isAnimating ||
                        currState.y.isAnimating
                    ) {
                        map.set(element, {
                            invert,
                            state: currState,
                        });
                    } else {
                        map.delete(element);
                    }
                }
            });
            animComplete = map.size === 0;
        };
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                update();
            });
        });
    }

    // Credit to react-motion by chenglou
    // https://github.com/chenglou/react-motion/blob/master/src/stepper.js
    private getMotion = (
        currX: number,
        currV: number,
        finalX: number,
    ): {x: number; v: number} => {
        if (currX === finalX) {
            return {x: finalX, v: 0};
        }
        const seconds = 1000 / 60 / 1000;
        const Fspring = -this.stiffness * (currX - finalX);
        const Fdamping = -this.damping * currV;

        const a = Fspring + Fdamping;

        const newV = currV + a * seconds;
        const newX = currX + newV * seconds;

        const precision = this.precision;
        if (Math.abs(newV) < precision && Math.abs(newX - finalX) < precision) {
            return {x: finalX, v: 0};
        }

        return {x: newX, v: newV};
    };
}
