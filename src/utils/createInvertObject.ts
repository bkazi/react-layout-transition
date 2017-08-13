export default function createInvertObject(
    first: ClientRect,
    last: ClientRect,
): {
    sx: number;
    sy: number;
    x: number;
    y: number;
} {
    return {
        sx: last.width / first.width,
        sy: last.height / first.height,
        x: last.left - first.left,
        y: last.top - first.top,
    };
}

export function createInvertObjectArray(
    first: ClientRect[],
    last: ClientRect[],
): Array<{
    sx: number;
    sy: number;
    x: number;
    y: number;
}> {
    return first.map((dimens, idx: number) =>
        createInvertObject(dimens, last[idx]),
    );
}
