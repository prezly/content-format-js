export type Stylable<T extends Record<string, any>, S extends string = Stylable.Style> = T & {
    [style in S]?: boolean;
};

export namespace Stylable {
    export enum Style {
        BOLD = 'bold',
        ITALIC = 'italic',
        UNDERLINED = 'underlined',
        SUBSCRIPT = 'subscript',
        SUPERSCRIPT = 'superscript',
    }

    export function validateStylable<T extends Record<string, any>>(value: T): Stylable<T, Style>;

    export function validateStylable<T extends Record<string, any>, S extends string>(
        value: T,
        styles: S[],
    ): Stylable<T, S>;

    export function validateStylable(value: any, styles?: string[]) {
        const marks = styles ?? Object.values(Style);
        const isValid = marks.every((mark) => !(mark in value) || typeof value[mark] === 'boolean');
        return isValid ? value : null;
    }
}
