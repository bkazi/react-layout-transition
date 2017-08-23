import {createInvertObject} from '../';

export default function fixElementPosition(
    childNodes: Element[],
    initialDimens: Map<string, ClientRect>,
    finalDimens: Map<string, ClientRect>,
) {
    childNodes.forEach(child => {
        if (child instanceof HTMLElement) {
            const key = child.dataset.layoutKey;
            if (!key) {
                child.style.opacity = '0';
                child.style.pointerEvents = 'none';
                return;
            }
            const initialDimen = initialDimens.get(key);
            if (!initialDimen) {
                return;
            }
            const finalDimen = finalDimens.get(key);
            if (!finalDimen) {
                return;
            }
            const invert = createInvertObject(finalDimen, initialDimen);
            child.style.transition = '';
            child.style.transform = `translate(${invert.x}px, ${invert.y}px) scale(${invert.sx}, ${invert.sy})`;
            child.style.transformOrigin = '0 0';
        }
    });
}
