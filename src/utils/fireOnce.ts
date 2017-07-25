export default function fireOnce(
	nodes: HTMLElement[],
	eventType: string,
	func: (events: Event[]) => void,
) {
	const totalCount = nodes.length;
	let count = 0;
	const events: Event[] = [];
	const eventListener = (event: Event) => {
		count++;
		events.push(event);
		if (count === totalCount) {
			func(events);
		}
		event.target.removeEventListener(eventType, eventListener);
	};
	nodes.forEach(node => {
		node.addEventListener(eventType, eventListener);
	});
}
