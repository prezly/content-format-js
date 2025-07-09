import { isEnum } from '../validation';

export type AlignableText<T extends Record<string, any>, Required extends boolean = true> = T &
    (Required extends true ? { align: `${AlignableText.Alignment}` } : { align?: `${AlignableText.Alignment}` });

export namespace AlignableText {
    export enum Alignment {
        LEFT = 'left',
        CENTER = 'center',
        RIGHT = 'right',
        JUSTIFY = 'justify',
    }

    export function validateAlignableText<T extends Record<string, any>, Required extends boolean = true>(
        value: T | null,
        required: Required = true as Required,
    ): AlignableText<T, Required> | null {
        if (value === null) return null;

        if (required) {
            const isValid = isEnum(value.align, Alignment);

            return isValid ? (value as AlignableText<T, typeof required>) : null;
        }

        const isValid = !('align' in value) || isEnum(value.align, Alignment);

        return isValid ? (value as AlignableText<T, typeof required>) : null;
    }
}
