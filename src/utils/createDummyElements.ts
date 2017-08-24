export default function createDummyElements(
    elements: HTMLElement[],
    dimensArray: ClientRect[],
): HTMLElement[] {
    const newElements: HTMLElement[] = [];
    elements.forEach((el, idx) => {
        const element = el.cloneNode(true) as HTMLElement;
        element.style.position = 'absolute';
        element.style.top = dimensArray[idx].top.toString();
        element.style.left = dimensArray[idx].left.toString();
        element.style.height = dimensArray[idx].height.toString();
        element.style.width = dimensArray[idx].width.toString();
        newElements.push(element);
    });

    return newElements;
}
