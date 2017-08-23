import {fireOnce} from '../';

export default function animateElementPosition(
    childNodes: Element[],
    timing: number,
    easing: string,
) {
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
}
