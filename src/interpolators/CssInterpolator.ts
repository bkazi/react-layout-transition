import Interpolator from './Interpolator';

import {fireOnce} from '../utils';

export default class DefaultInterpolator extends Interpolator {
    private transition: string = 'transform 300ms ease-in-out';

    constructor() {
        super();
    }

    public play(
        element: HTMLElement,
        invertObject: {sx: number; sy: number; x: number; y: number},
        callback?: () => void,
    ) {
        element.style.transformOrigin = '0 0';
        element.style.transition = this.transition;
        element.style.transform = `translate(${invertObject.x}px, ${invertObject.y}px) scale(${invertObject.sx}, ${invertObject.sy})`;
    }

    public playMultiple(
        elements: HTMLElement[],
        invertObject: Array<{sx: number; sy: number; x: number; y: number}>,
        callback?: () => void,
    ) {
        if (callback) {
            fireOnce(elements, 'transitionend', callback);
        }
        elements.forEach((element, idx) => {
            element.style.transformOrigin = '0 0';
            element.style.transition = this.transition;
            element.style.transform = `translate(${invertObject[idx]
                .x}px, ${invertObject[idx].y}px) scale(${invertObject[idx]
                .sx}, ${invertObject[idx].sy})`;
        });
    }
}
