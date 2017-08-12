function getDimens(element: HTMLElement, container: HTMLElement): ClientRect {
    const clientRect = element.getBoundingClientRect();
    const newObj = {
        bottom: clientRect.bottom,
        height: clientRect.height,
        left: clientRect.left + window.pageXOffset - container.offsetLeft,
        right: clientRect.right,
        top: clientRect.top + window.pageYOffset - container.offsetTop,
        width: clientRect.width,
    };
    return newObj;
}

function getDimensArray(
    elements: HTMLElement[],
    container: HTMLElement,
): ClientRect[] {
    return elements.map(element => getDimens(element, container));
}

export default getDimens;
export {getDimensArray};
