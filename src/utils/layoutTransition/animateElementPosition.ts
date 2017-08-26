import {createInvertObject} from '../';
import Interpolator from '../../interpolators/Interpolator';

export default function animateElementPosition(
    childNodes: Element[],
    initialDimens: Map<string, ClientRect>,
    finalDimens: Map<string, ClientRect>,
    interpolator: Interpolator,
) {
    const initialNodes: HTMLElement[] = [];
    const invertObjectArray: Array<{
        sx: number;
        sy: number;
        x: number;
        y: number;
    }> = [];
    const newNodes: HTMLElement[] = [];
    childNodes.forEach(child => {
        if (child instanceof HTMLElement) {
            const key = child.dataset.layoutKey;
            if (!key) {
                child.style.opacity = '0';
                child.style.pointerEvents = 'none';
                newNodes.push(child);
                return;
            }
            const initialDimen = initialDimens.get(key);
            const finalDimen = finalDimens.get(key);
            if (initialDimen && finalDimen) {
                invertObjectArray.push(
                    createInvertObject(finalDimen, initialDimen),
                );
                initialNodes.push(child);
            }
        }
    });
    interpolator.playMultiple(initialNodes, invertObjectArray, true, () => {
        initialNodes.forEach(child => {
            child.removeAttribute('data-layout-key');
        });
        newNodes.forEach(child => {
            child.style.transition = 'opacity 200ms ease-in-out';
            child.style.opacity = '1';
            child.style.pointerEvents = '';
        });
    });
}
