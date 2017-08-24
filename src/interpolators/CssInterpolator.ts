import Interpolator from './Interpolator';

import {fireOnce} from '../utils';

export default class CssInterpolator extends Interpolator {
    private transition: string = 'transform 300ms ease-in-out';

    constructor() {
        super();
    }

    public play(
        element: HTMLElement,
        invertObject: {sx: number; sy: number; x: number; y: number},
        reverse: boolean = false,
        callback?: () => void,
    ) {
        if (callback) {
            element.addEventListener('transitionend', () => {
                element.style.transition = '';
                callback();
            });
        }
        element.style.transformOrigin = '0 0';
        if (reverse) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    element.style.transition = this.transition;
                    element.style.transform = '';
                });
            });
        } else {
            element.style.transition = this.transition;
        }
        element.style.transform = `translate(${invertObject.x}px, ${invertObject.y}px) scale(${invertObject.sx}, ${invertObject.sy})`;
    }

    public playMultiple(
        elements: HTMLElement[],
        invertObject: Array<{sx: number; sy: number; x: number; y: number}>,
        reverse: boolean = false,
        callback?: () => void,
    ) {
        if (callback) {
            fireOnce(elements, 'transitionend', () => {
                elements.forEach(el => {
                    el.style.transition = '';
                });
                callback();
            });
        }
        elements.forEach((element, idx) => {
            element.style.transformOrigin = '0 0';
            element.style.transform = `translate(${invertObject[idx]
                .x}px, ${invertObject[idx].y}px) scale(${invertObject[idx]
                .sx}, ${invertObject[idx].sy})`;
            if (reverse) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        element.style.transition = this.transition;
                        element.style.transform = '';
                    });
                });
            } else {
                element.style.transition = this.transition;
            }
        });
    }
}
