export default function createInvertObject(
    first: ClientRect[],
    last: ClientRect[],
): Array<{
    sx: number;
    sy: number;
    x: number;
    y: number;
}> {
    return first.map((dimens, idx: number) => ({
        sx: last[idx].width / first[idx].width,
        sy: last[idx].height / first[idx].height,
        x: last[idx].left - first[idx].left,
        y: last[idx].top - first[idx].top,
    }));
}
