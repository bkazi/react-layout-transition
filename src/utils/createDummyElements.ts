export default function createDummyElements(
    elements: HTMLElement[],
    dimensArray: ClientRect[],
    container: HTMLElement,
    transition: string = 'transform 300ms ease-in-out',
): HTMLElement[] {
    const newElements: HTMLElement[] = [];
    elements.forEach((el, idx) => {
        const element = el.cloneNode(true) as HTMLElement;
        element.style.position = 'absolute';
        element.style.top = (dimensArray[idx].top +
            window.pageYOffset -
            container.offsetTop).toString();
        element.style.left = (dimensArray[idx].left +
            window.pageXOffset -
            container.offsetLeft).toString();
        element.style.height = dimensArray[idx].height.toString();
        element.style.width = dimensArray[idx].width.toString();
        element.style.transformOrigin = '0 0';
        element.style.transition = transition;
        newElements.push(element);
    });

    return newElements;
}
