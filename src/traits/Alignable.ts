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

export type Alignable<T extends object> = T & Aligned;

export type OptionallyAlignable<T extends object> = T & OptionallyAligned;

