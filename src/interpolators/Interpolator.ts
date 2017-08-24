abstract class Interpolator {
    public abstract play(
        element: HTMLElement,
        invertObject: {sx: number; sy: number; x: number; y: number},
        callback?: () => void,
    ): void;

    public abstract playMultiple(
        element: HTMLElement[],
        invertObject: Array<{sx: number; sy: number; x: number; y: number}>,
        callback?: () => void,
    ): void;
}

export default Interpolator;
