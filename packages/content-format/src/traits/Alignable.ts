export enum Alignment {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

export interface Aligned {
    align: Alignment;
}

export interface OptionallyAligned {
    align?: Alignment;
}

export type Alignable<T extends Record<string, any>> = T & Aligned;

export type OptionallyAlignable<T extends Record<string, any>> = T & OptionallyAligned;
