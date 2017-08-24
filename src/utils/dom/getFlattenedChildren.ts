export default function getFlattenedChildren(refs: HTMLElement[]): Element[] {
    const childNodes = refs
        .map(ref => Array.from(ref.children))
        .reduce((acc, nodes) => acc.concat(nodes));
    return childNodes;
}
