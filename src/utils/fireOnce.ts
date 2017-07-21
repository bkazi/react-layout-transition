export default function fireOnce(nodes: Array<HTMLElement>, eventType: string, func: Function) {
    const totalCount = nodes.length;
    let count = 0;
    const events: Array<Event> = [];
    const eventListener = (event: Event) => {
        count++;
        events.push(event);
        if (count === totalCount) {
            func(events);
        }
        event.target.removeEventListener(eventType, eventListener);
    };
    nodes.forEach((node) => {
        node.addEventListener(eventType, eventListener);
    });
}
