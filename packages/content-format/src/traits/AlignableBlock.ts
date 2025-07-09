import { isEnum } from '../validation';

export type AlignableBlock<T extends Record<string, any>, Required extends boolean = true> = T &
    (Required extends true ? { align: `${AlignableBlock.Alignment}` } : { align?: `${AlignableBlock.Alignment}` });

export namespace AlignableBlock {
    export enum Alignment {
        LEFT = 'left',
        CENTER = 'center',
        RIGHT = 'right',
    }

    export function validateAlignableBlock<T extends Record<string, any>, Required extends boolean = true>(
        value: T | null,
        required: Required = true as Required,
    ): AlignableBlock<T, Required> | null {
        if (value === null) return null;

        if (required) {
            const isValid = isEnum(value.align, Alignment);

            return isValid ? (value as AlignableBlock<T, typeof required>) : null;
        }

        const isValid = !('align' in value) || isEnum(value.align, Alignment);

        return isValid ? (value as AlignableBlock<T, typeof required>) : null;
    }
}
