export enum Alignment {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

export interface AlignableNode {
    align: Alignment;
}

export interface OptionallyAlignableNode {
    align?: Alignment;
}

export type Alignable<T extends object> = T & AlignableNode;

export type OptionallyAlignable<T extends object> = T & OptionallyAlignableNode;

export function isAlignableNode<T extends object>(value: T): value is T & AlignableNode {
    return (
        typeof value === 'object' &&
        value &&
        'align' in value &&
        Object.values(Alignment).includes((value as any as AlignableNode).align)
    );
}
