function getDimens(element: HTMLElement, container?: HTMLElement): ClientRect {
    const clientRect = element.getBoundingClientRect();
    let newObj;
    if (container) {
        newObj = {
            bottom: clientRect.bottom,
            height: clientRect.height,
            left: clientRect.left + window.pageXOffset - container.offsetLeft,
            right: clientRect.right,
            top: clientRect.top + window.pageYOffset - container.offsetTop,
            width: clientRect.width,
        };
    } else {
        newObj = {
            bottom: clientRect.bottom,
            height: clientRect.height,
            left: clientRect.left + window.pageXOffset,
            right: clientRect.right,
            top: clientRect.top + window.pageYOffset,
            width: clientRect.width,
        };
    }
    return newObj;
}

function getDimensArray(
    elements: HTMLElement[],
    container?: HTMLElement,
): ClientRect[] {
    return elements.map(element => getDimens(element, container));
}

export default getDimens;
export {getDimensArray};
