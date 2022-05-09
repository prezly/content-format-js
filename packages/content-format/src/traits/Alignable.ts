import { isEnum } from '../validation';

export type Alignable<T extends Record<string, any>, Required extends boolean = true> = T &
    (Required extends true ? { align: `${Alignable.Alignment}` } : { align?: `${Alignable.Alignment}` });

export namespace Alignable {
    export enum Alignment {
        LEFT = 'left',
        CENTER = 'center',
        RIGHT = 'right',
    }

    export function validateAlignable<T extends Record<string, any>, Required extends boolean = true>(
        value: T | null,
        required: Required = true as Required,
    ): Alignable<T, Required> | null {
        if (value === null) return null;

        if (required) {
            const isValid = isEnum(value.align, Alignment);

            return isValid ? (value as Alignable<T, typeof required>) : null;
        }

        const isValid = !('align' in value) || isEnum(value.align, Alignment);

        return isValid ? (value as Alignable<T, typeof required>) : null;
    }
}
